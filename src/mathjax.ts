/**
 * mathjax.ts
 *
 * Server-Side Mathjax converter (TeX to CHTML).
 *
 * see official examples for more information
 * https://github.com/mathjax/MathJax-demos-node
 * 
 * changes from v3
 * https://docs.mathjax.org/en/v4.1/upgrading/whats-new-4.0.html
 * https://docs.mathjax.org/en/v4.1/upgrading/whats-new-4.0/breaking.html
*/

/* eslint-disable */
// Import the global MathJax object
import { createRequire } from "node:module";
import { combineConfig } from "@mathjax/src/js/components/global.js";
import { insert, OptionList } from "@mathjax/src/mjs/util/Options.js";
import { Loader } from "@mathjax/src/mjs/components/loader.js";

// Needed for asyncLoad
import { mathjax } from "@mathjax/src/mjs/mathjax.js";

// Import
import { type LiteDocument } from "@mathjax/src/js/adaptors/lite/Document.js";
import { LiteElement } from "@mathjax/src/js/adaptors/lite/Element.js";
import { type LiteText } from "@mathjax/src/js/adaptors/lite/Text.js";
import { type LiteAdaptor, liteAdaptor } from "@mathjax/src/js/adaptors/liteAdaptor.js";
import { CHTML } from "@mathjax/src/js/output/chtml.js";
import { MathDocument } from "@mathjax/src/js/core/MathDocument.js";
import { TeX } from "@mathjax/src/js/input/tex.js";
import { MathItem } from "@mathjax/src/js/core/MathItem.js";
import { RegisterHTMLHandler } from "@mathjax/src/js/handlers/html.js";
import { allFonts, defaultFontURL, FontName, IChtmlFontDataClass, InitFont, preloadDynamicFonts, resolveFontURL } from "./fonts.js";
import { enableAllExtensions, enabledExtensions } from "./extensions.js";
import { DeepPartial, merge } from "./merge.js";

// Use the MathJax "component" API
import "@mathjax/src/components/mjs/core/core.js";
import "@mathjax/src/components/mjs/adaptors/liteDOM/liteDOM.js";
import "@mathjax/src/components/mjs/input/tex-base/tex-base.js";
import "@mathjax/src/components/mjs/output/chtml/chtml.js";

// Import extensions.
import "@mathjax/src/components/mjs/input/tex/extensions/ams/ams.js";
import "@mathjax/src/components/mjs/input/tex/extensions/configmacros/configmacros.js";
import "@mathjax/src/components/mjs/input/tex/extensions/noerrors/noerrors.js";
import "@mathjax/src/components/mjs/input/tex/extensions/newcommand/newcommand.js";
/* eslint-enable */

type N = LiteElement;
type T = LiteText;
type D = LiteDocument;

// Tell the loader that some packages are pre-loaded.
const preloadedPackages = [
  "base",
  "ams", 
  "configmacros",
  "noerrors", 
  "newcommand"
];
Loader.preLoaded("core", "input/tex", "output/chtml");
Loader.preLoaded(...preloadedPackages);

// Build the MathJax component configuration.
const defaultConfig: OptionList = {
  // loader: {
  //   require: (absPath: string): void | Promise<unknown> => import(absPath),
  // },
  tex: {
    packages: [ ...preloadedPackages ],
    macros: {
      bm: ["\\boldsymbol{#1}", 1],
      require: ["", 0],
    }
  },
  output: {
    fontData: allFonts["mathjax-newcm"],
    scale: 1.21, // magic # chosen which look nice for me
    exFactor: 5,
    font: "mathjax-newcm" satisfies FontName,
  },
  chtml: {
    adaptiveCSS: true,
    fontURL: defaultFontURL("mathjax-newcm"),
  },
};

const defaultConvertOption: ConvertOptions = {
  inline: false,
  em: 16,
  ex: 8,
  width: 80 * 16,
};

// Configure asyncLoad (Currently unsupported feature) -------------------
const syncRequire = createRequire(import.meta.url);
mathjax.asyncIsSynchronous = true;
mathjax.asyncLoad = (file: string) => {
  console.warn("asyncLoader is not supported: ", file);
  return syncRequire(file);
};

// ----------------------------------------------------------------------

/**
 * Imports all MathJax-extension and dynamic-font scripts.
 * This method is applied globally and should be called only once.
 */
export async function enableMathJaxExtensions() {
  await enableAllExtensions();
  await preloadDynamicFonts();
}

// ----------------------------------------------------------------------
interface AnyObject {
  [x: string]: any;
}

export interface Options extends DeepPartial<EngineOptions> {
  tex?: DeepPartial<TexInputOptions>;
  output?: DeepPartial<OutputOptions>;
  chtml?: DeepPartial<CHTMLOptions>;
}

interface EngineOptions {
  fontURL: string | ((name: string) => string);
}

/// http://docs.mathjax.org/en/4.1/options/input/tex.html
interface TexInputOptions {
  packages: string | [string] | AnyObject;
  inlineMath: [[string, string]];
  displayMath: [[string, string]];
  processEscapes: boolean;
  processEnvironments: boolean;
  processRefs: boolean;
  digits: RegExp;
  tags: string;
  tagSide: string;
  tagIndent: string;
  useLabelIds: boolean;
  multlineWidth: string;
  maxMacros: number;
  maxBuffer: number;
  baseURL: string;
  formatError: (jax: object, err: Error) => void;

  // TeX Extension Options
  // https://docs.mathjax.org/en/4.1/options/input/tex.html#tex-extension-options
  macros: AnyObject;
}

/// https://docs.mathjax.org/en/4.1/options/output/index.html
interface OutputOptions {
  scale: number;
  minScale: number;
  matchFontHeight: boolean;
  mtextInheritFont: boolean;
  merrorInheritFont: boolean;
  mtextFont: string;
  merrorFont: string;
  mathmlspacing: boolean;
  skipAttributes: AnyObject;
  exFactor: number;
  displayAlign: string;
  displayIndent: number | string;
  linebreaks: {
    inline: boolean;
    width: number | string;
    lineleading: number;
  }

  // Set MathJax Font.
  // Available fonts: mathjax-newcm
  // 
  // Since MathJax v4, fonts are provided as separate packages.
  // The font name is used by the MathJax Loader. It fetches the fontdata
  // asynchronously, either from the CDN or local filesystem. 
  // 
  // Our implementation do not use the loader, so all scripts are bundled
  // in advance. The WOFF2 files needs to be distributed separately. This 
  // requires two parameters: `fontData` and `fontURL`
  // 
  // `font`,`fontPath`,`fontExtensions` are options for the Loader, so it has
  // no effect. For convenience, we alter the original behavior and use the 
  // font name to set appropriate fontData and fontURL values.
  font: FontName | (string & {});
  fontPath: string;
  fontExtensions: string[];
  
  htmlHDW: "auto" | "use" | "force" | "ignore";
  preFilters: string[],
  postFilters: string[],

  // Developer Options
  // https://docs.mathjax.org/en/4.1/options/output/#developer-options
  fontData: object;

  [x: string]: any;
}

/// https://docs.mathjax.org/en/4.1/options/output/chtml.html
interface CHTMLOptions  {
  matchFontHeight: boolean;
  fontURL: string;
  dynamicPrefix: string;
  adaptiveCSS: boolean;
}

export interface ConvertOptions {
  inline: boolean;
  em: number;
  ex: number;
  width: number;
}

/**
 * Initialize and encapsulate mathjax instance to generate
 * CommonHTML from TeX input.
 *
 * There are 2 important methods. One converts the input.
 * The other returns a stylesheet document. The stylesheet must be included
 * in your HTML document to render the equation properly.
 */
export class MathJaxEngine {
  config: OptionList;
  adaptor: LiteAdaptor;
  tex: TeX<N, T, D>;
  chtml: CHTML<N, T, D>;
  html: MathDocument<N, T, D>;

  constructor(option?: Partial<Options>) {

    this.adaptor = liteAdaptor();
    RegisterHTMLHandler(this.adaptor);

    const config = getConfig(option);
    this.config = config;

    const tex = new TeX<N, T, D>({
      ...config.tex,
    });
    const chtml = new CHTML<N, T, D>({
      ...config.output,
      ...config.chtml,
    });

    const fontCLASS = config.output.fontData as IChtmlFontDataClass;
    InitFont.initExtensions(fontCLASS, config.fontURL);
    InitFont.preload(chtml.font);


    const html = mathjax.document("", {
      InputJax: tex,
      OutputJax: chtml,
    });

    html.addRenderAction("typeset", 155, renderDoc, renderMath);


    this.tex = tex;
    this.chtml = chtml;
    this.html = html;

    function renderDoc(_doc: MathDocument<N, T, D>) {}
    function renderMath(math: MathItem<N, T, D>, doc: MathDocument<N, T, D>) {
      const adaptor = doc.adaptor;
      const text = adaptor.node("mjx-copytext", { "aria-hidden": true }, [
        adaptor.text(math.math),
      ]);
      adaptor.setStyle(text, "position", "absolute");
      adaptor.setStyle(text, "display", "none");
      adaptor.setStyle(text, "width", "0");
      adaptor.setStyle(math.typesetRoot, "position", "relative");
      adaptor.append(math.typesetRoot, text);
    }
  }

  /**
   * convert TeX input to CHTML.
   *
   * @param tex     input string
   * @param option  parameter to override the defaults, if you wish to
   * @returns
   */
  convert(tex: string, option?: Partial<ConvertOptions>): string {
    const node = this.html.convert(tex, convOption(option));
    if (node instanceof LiteElement) {
      return this.adaptor.outerHTML(node);
    } else {
      return "ERROR";
    }
  }

  /**
   * returns adaptive css (stylesheet for the processed equations only),
   * or the full mathjax css (if configured)
   *
   * @returns css content
   */
  stylesheet(): string {
    const css = this.adaptor.textContent(this.chtml.styleSheet(this.html));
    return css.replace(/^\r?\n+$/mg, ""); // remove trailing newlines
  }
}

function getConfig(option?: Partial<Options>): OptionList {
  const config = {} as OptionList;
  const mathConf = {} as OptionList;
  const userConf = merge(defaultConfig, option ?? {});

  const baseConf = { 
    tex: { 
      packages: [
        ...defaultConfig.tex.packages,
        ...enabledExtensions
      ]
    },
  };
    
  combineConfig(config, baseConf);
  combineConfig(config, userConf);

  if (option?.fontURL !== undefined && option?.chtml?.fontURL === undefined) {
    const font = option.output?.font ?? ("mathjax-newcm" satisfies FontName);
    const setFontURL = {
      chtml: {
        fontURL: resolveFontURL(font, option.fontURL)
      }
    } satisfies Options;
    combineConfig(config, setFontURL);
  }

  insert(mathConf, config, false); // consume the [+] and [-] directives

  return mathConf;
}




function convOption(option?: Partial<ConvertOptions>): {[key: string]: any} {
  return {
    display: !(option?.inline ?? defaultConvertOption.inline),
    em: option?.em ?? defaultConvertOption.em,
    ex: option?.ex ?? defaultConvertOption.ex,
    containerWidth: option?.width ?? defaultConvertOption.width,
    scale: 1.0,
  };
}