import { MathJaxBbmFontExtension } from "@mathjax/mathjax-bbm-font-extension/mjs/chtml.js";
import { MathJaxBboldxFontExtension } from "@mathjax/mathjax-bboldx-font-extension/mjs/chtml.js";
import { MathJaxDsfontFontExtension } from "@mathjax/mathjax-dsfont-font-extension/mjs/chtml.js";
import { MathJaxMhchemFontExtension } from "@mathjax/mathjax-mhchem-font-extension/mjs/chtml.js";
import { MathJaxNewcmFont } from "@mathjax/mathjax-newcm-font/mjs/chtml.js";
import { ChtmlFontExtensionData  } from "@mathjax/src/js/output/chtml/FontData.js";
import { type ChtmlCharOptions, type ChtmlDelimiterData, type ChtmlVariantData } from "@mathjax/src/js/output/chtml/FontData.js";
import { Font, FontData, FontDataClass } from "@mathjax/src/js/output/common/FontData.js";

export type IChtmlFontData = FontData<ChtmlCharOptions, ChtmlVariantData, ChtmlDelimiterData>;
export type IChtmlFontDataClass = FontDataClass<ChtmlCharOptions, ChtmlVariantData, ChtmlDelimiterData>;
export type IChtmlFontExtensionData = ChtmlFontExtensionData<ChtmlCharOptions, ChtmlDelimiterData>;
export type FontName = keyof typeof allFonts;
export type FontExtensionName = keyof typeof allFontExtensions;

export const allFonts = {
  "mathjax-newcm": MathJaxNewcmFont,
} satisfies Record<string, IChtmlFontDataClass>;

export const allFontExtensions = {
  "mathjax-bbm-font-extension" : MathJaxBbmFontExtension,
  "mathjax-bboldx-font-extension" : MathJaxBboldxFontExtension,
  "mathjax-dsfont-font-extension" : MathJaxDsfontFontExtension,
  "mathjax-mhchem-font-extension" : MathJaxMhchemFontExtension,
} satisfies Record<string, IChtmlFontExtensionData>;

const enabledFontExtensions : 
{ [key in FontExtensionName]?: IChtmlFontExtensionData } = {};

const importDynamicFonts = {
  "accents-b-i": () => import("@mathjax/mathjax-newcm-font/mjs/chtml/dynamic/accents-b-i.js"),
  "accents": () => import("@mathjax/mathjax-newcm-font/mjs/chtml/dynamic/accents.js"),
  "arabic": () => import("@mathjax/mathjax-newcm-font/mjs/chtml/dynamic/arabic.js"),
  "arrows": () => import("@mathjax/mathjax-newcm-font/mjs/chtml/dynamic/arrows.js"),
  "braille-d": () => import("@mathjax/mathjax-newcm-font/mjs/chtml/dynamic/braille-d.js"),
  "braille": () => import("@mathjax/mathjax-newcm-font/mjs/chtml/dynamic/braille.js"),
  "calligraphic": () => import("@mathjax/mathjax-newcm-font/mjs/chtml/dynamic/calligraphic.js"),
  "cherokee": () => import("@mathjax/mathjax-newcm-font/mjs/chtml/dynamic/cherokee.js"),
  "cyrillic-ss": () => import("@mathjax/mathjax-newcm-font/mjs/chtml/dynamic/cyrillic-ss.js"),
  "cyrillic": () => import("@mathjax/mathjax-newcm-font/mjs/chtml/dynamic/cyrillic.js"),
  "devanagari": () => import("@mathjax/mathjax-newcm-font/mjs/chtml/dynamic/devanagari.js"),
  "double-struck": () => import("@mathjax/mathjax-newcm-font/mjs/chtml/dynamic/double-struck.js"),
  "fraktur": () => import("@mathjax/mathjax-newcm-font/mjs/chtml/dynamic/fraktur.js"),
  "greek-ss": () => import("@mathjax/mathjax-newcm-font/mjs/chtml/dynamic/greek-ss.js"),
  "greek": () => import("@mathjax/mathjax-newcm-font/mjs/chtml/dynamic/greek.js"),
  "hebrew": () => import("@mathjax/mathjax-newcm-font/mjs/chtml/dynamic/hebrew.js"),
  "latin-b": () => import("@mathjax/mathjax-newcm-font/mjs/chtml/dynamic/latin-b.js"),
  "latin-bi": () => import("@mathjax/mathjax-newcm-font/mjs/chtml/dynamic/latin-bi.js"),
  "latin-i": () => import("@mathjax/mathjax-newcm-font/mjs/chtml/dynamic/latin-i.js"),
  "latin": () => import("@mathjax/mathjax-newcm-font/mjs/chtml/dynamic/latin.js"),
  "marrows": () => import("@mathjax/mathjax-newcm-font/mjs/chtml/dynamic/marrows.js"),
  "math": () => import("@mathjax/mathjax-newcm-font/mjs/chtml/dynamic/math.js"),
  "monospace-ex": () => import("@mathjax/mathjax-newcm-font/mjs/chtml/dynamic/monospace-ex.js"),
  "monospace-l": () => import("@mathjax/mathjax-newcm-font/mjs/chtml/dynamic/monospace-l.js"),
  "monospace": () => import("@mathjax/mathjax-newcm-font/mjs/chtml/dynamic/monospace.js"),
  "mshapes": () => import("@mathjax/mathjax-newcm-font/mjs/chtml/dynamic/mshapes.js"),
  "phonetics-ss": () => import("@mathjax/mathjax-newcm-font/mjs/chtml/dynamic/phonetics-ss.js"),
  "phonetics": () => import("@mathjax/mathjax-newcm-font/mjs/chtml/dynamic/phonetics.js"),
  "PUA": () => import("@mathjax/mathjax-newcm-font/mjs/chtml/dynamic/PUA.js"),
  "sans-serif-b": () => import("@mathjax/mathjax-newcm-font/mjs/chtml/dynamic/sans-serif-b.js"),
  "sans-serif-bi": () => import("@mathjax/mathjax-newcm-font/mjs/chtml/dynamic/sans-serif-bi.js"),
  "sans-serif-ex": () => import("@mathjax/mathjax-newcm-font/mjs/chtml/dynamic/sans-serif-ex.js"),
  "sans-serif-i": () => import("@mathjax/mathjax-newcm-font/mjs/chtml/dynamic/sans-serif-i.js"),
  "sans-serif-r": () => import("@mathjax/mathjax-newcm-font/mjs/chtml/dynamic/sans-serif-r.js"),
  "sans-serif": () => import("@mathjax/mathjax-newcm-font/mjs/chtml/dynamic/sans-serif.js"),
  "script": () => import("@mathjax/mathjax-newcm-font/mjs/chtml/dynamic/script.js"),
  "shapes": () => import("@mathjax/mathjax-newcm-font/mjs/chtml/dynamic/shapes.js"),
  "symbols-b-i": () => import("@mathjax/mathjax-newcm-font/mjs/chtml/dynamic/symbols-b-i.js"),
  "symbols": () => import("@mathjax/mathjax-newcm-font/mjs/chtml/dynamic/symbols.js"),
  "variants": () => import("@mathjax/mathjax-newcm-font/mjs/chtml/dynamic/variants.js"),
};
export const allDynamicFonts = Object.keys(importDynamicFonts) as (keyof typeof importDynamicFonts)[];

export class InitFont extends MathJaxNewcmFont {

  static initExtensions(fontCLASS: IChtmlFontDataClass, fontURL?: string | ((name: string) => string)) {
    for (const [_name, fontExt] of Object.entries(enabledFontExtensions)) {
      InitFont.setURL(fontExt, fontURL);
      // Add extension to the FontData class. This operation is global and cannot be reverted.
      // For some reason this is not enough, thus we need to initialize the output jax instance,
      // so that they know which extensions are enabled
      fontCLASS.addExtension(fontExt);
    }
  }

  static preload(font: Font) {
    allDynamicFonts.forEach(name => {
      MathJaxNewcmFont.dynamicFiles[name]
        ? MathJaxNewcmFont.dynamicFiles[name].setup(font)
        : console.warn(`setup failed: no dynamic file found for ${name}`);
    });

    for (const [_name, fontExt] of Object.entries(enabledFontExtensions)) {
      font.addExtension(fontExt);
    }
  }

  static setURL(fontExt: IChtmlFontExtensionData, fontURL?: string | ((name: string) => string)) {
    if (fontURL === undefined) {
      fontExt.fontURL = defaultFontExtURL(`${fontExt.name}-font-extension` as FontExtensionName);
    } else {
      fontExt.fontURL = resolveFontURL(fontExt.name, fontURL);
    }
  }
}

// The base part of default fontURL. (path: {base}/*.woff2)
export function mathjaxFontCDN(pkgname: string) {
  return `https://cdn.jsdelivr.net/npm/@mathjax/${pkgname}/chtml/woff2`;
}
export function defaultFontURL(name: FontName) {
  return mathjaxFontCDN(`${name}-font@4`);
}
export function defaultFontExtURL(name: FontExtensionName) {
  return mathjaxFontCDN(`${name}@4`);
}

export function resolveFontURL(name: string, fontURL: string | ((name: string) => string)) {
  if (fontURL instanceof Function) {
    return fontURL(name);
  } else {
    return fontURL;
  }
}


export function enableFontExtension(name: FontExtensionName): void {
  switch (name) {
    case "mathjax-bbm-font-extension":
      enabledFontExtensions[name] = MathJaxBbmFontExtension;
      break;
    case "mathjax-bboldx-font-extension":
      enabledFontExtensions[name] = MathJaxBboldxFontExtension;
      break;
    case "mathjax-dsfont-font-extension":
      enabledFontExtensions[name] = MathJaxDsfontFontExtension;
      break;
    case "mathjax-mhchem-font-extension":
      enabledFontExtensions[name] = MathJaxMhchemFontExtension;
      break;
    default:
      break;
  }
}


export async function preloadDynamicFonts(): Promise<void> {
  await Promise.all(Object.values(importDynamicFonts).map(font => font()));
}