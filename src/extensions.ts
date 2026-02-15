// A set of import functions for the extensions. 

import { enableFontExtension } from "./fonts.js";

// Extensions enabled by default or explicitly disabled, are commented out. 
const importExtensions = {
  // @ts-ignore: no d.ts file
  action: () => import("@mathjax/src/components/mjs/input/tex/extensions/action/action.js"),
  // @ts-ignore: no d.ts file
  ams: () => import("@mathjax/src/components/mjs/input/tex/extensions/ams/ams.js"),
  // @ts-ignore: no d.ts file
  amscd: () => import("@mathjax/src/components/mjs/input/tex/extensions/amscd/amscd.js"),
  // @ts-ignore: no d.ts file
  // autoload: () => import("@mathjax/src/components/mjs/input/tex/extensions/autoload/autoload.js"),
  // @ts-ignore: no d.ts file
  bbm: () => import("@mathjax/src/components/mjs/input/tex/extensions/bbm/bbm.js"),
  // @ts-ignore: no d.ts file
  bboldx: () => import("@mathjax/src/components/mjs/input/tex/extensions/bboldx/bboldx.js"),
  // @ts-ignore: no d.ts file
  bbox: () => import("@mathjax/src/components/mjs/input/tex/extensions/bbox/bbox.js"),
  // @ts-ignore: no d.ts file
  begingroup: () => import("@mathjax/src/components/mjs/input/tex/extensions/begingroup/begingroup.js"),
  // @ts-ignore: no d.ts file
  boldsymbol: () => import("@mathjax/src/components/mjs/input/tex/extensions/boldsymbol/boldsymbol.js"),
  // @ts-ignore: no d.ts file
  braket: () => import("@mathjax/src/components/mjs/input/tex/extensions/braket/braket.js"),
  // @ts-ignore: no d.ts file
  bussproofs: () => import("@mathjax/src/components/mjs/input/tex/extensions/bussproofs/bussproofs.js"),
  // @ts-ignore: no d.ts file
  cancel: () => import("@mathjax/src/components/mjs/input/tex/extensions/cancel/cancel.js"),
  // @ts-ignore: no d.ts file
  cases: () => import("@mathjax/src/components/mjs/input/tex/extensions/cases/cases.js"),
  // @ts-ignore: no d.ts file
  centernot: () => import("@mathjax/src/components/mjs/input/tex/extensions/centernot/centernot.js"),
  // @ts-ignore: no d.ts file
  color: () => import("@mathjax/src/components/mjs/input/tex/extensions/color/color.js"),
  // @ts-ignore: no d.ts file
  colortbl: () => import("@mathjax/src/components/mjs/input/tex/extensions/colortbl/colortbl.js"),
  // @ts-ignore: no d.ts file
  // colorv2: () => import("@mathjax/src/components/mjs/input/tex/extensions/colorv2/colorv2.js"),
  // @ts-ignore: no d.ts file
  configmacros: () => import("@mathjax/src/components/mjs/input/tex/extensions/configmacros/configmacros.js"),
  // @ts-ignore: no d.ts file
  dsfont: () => import("@mathjax/src/components/mjs/input/tex/extensions/dsfont/dsfont.js"),
  // @ts-ignore: no d.ts file
  empheq: () => import("@mathjax/src/components/mjs/input/tex/extensions/empheq/empheq.js"),
  // @ts-ignore: no d.ts file
  enclose: () => import("@mathjax/src/components/mjs/input/tex/extensions/enclose/enclose.js"),
  // @ts-ignore: no d.ts file
  extpfeil: () => import("@mathjax/src/components/mjs/input/tex/extensions/extpfeil/extpfeil.js"),
  // @ts-ignore: no d.ts file
  gensymb: () => import("@mathjax/src/components/mjs/input/tex/extensions/gensymb/gensymb.js"),
  // @ts-ignore: no d.ts file
  html: () => import("@mathjax/src/components/mjs/input/tex/extensions/html/html.js"),
  // @ts-ignore: no d.ts file
  mathtools: () => import("@mathjax/src/components/mjs/input/tex/extensions/mathtools/mathtools.js"),
  // @ts-ignore: no d.ts file
  mhchem: () => import("@mathjax/src/components/mjs/input/tex/extensions/mhchem/mhchem.js"),
  // @ts-ignore: no d.ts file
  newcommand: () => import("@mathjax/src/components/mjs/input/tex/extensions/newcommand/newcommand.js"),
  // @ts-ignore: no d.ts file
  noerrors: () => import("@mathjax/src/components/mjs/input/tex/extensions/noerrors/noerrors.js"),
  // @ts-ignore: no d.ts file
  noundefined: () => import("@mathjax/src/components/mjs/input/tex/extensions/noundefined/noundefined.js"),
  // @ts-ignore: no d.ts file
  physics: () => import("@mathjax/src/components/mjs/input/tex/extensions/physics/physics.js"),
  // @ts-ignore: no d.ts file
  // require: () => import("@mathjax/src/components/mjs/input/tex/extensions/require/require.js"),
  // @ts-ignore: no d.ts file
  setoptions: () => import("@mathjax/src/components/mjs/input/tex/extensions/setoptions/setoptions.js"),
  // @ts-ignore: no d.ts file
  tagformat: () => import("@mathjax/src/components/mjs/input/tex/extensions/tagformat/tagformat.js"),
  // @ts-ignore: no d.ts file
  texhtml: () => import("@mathjax/src/components/mjs/input/tex/extensions/texhtml/texhtml.js"),
  // @ts-ignore: no d.ts file
  textcomp: () => import("@mathjax/src/components/mjs/input/tex/extensions/textcomp/textcomp.js"),
  // @ts-ignore: no d.ts file
  textmacros: () => import("@mathjax/src/components/mjs/input/tex/extensions/textmacros/textmacros.js"),
  // @ts-ignore: no d.ts file
  unicode: () => import("@mathjax/src/components/mjs/input/tex/extensions/unicode/unicode.js"),
  // @ts-ignore: no d.ts file
  units: () => import("@mathjax/src/components/mjs/input/tex/extensions/units/units.js"),
  // @ts-ignore: no d.ts file
  upgreek: () => import("@mathjax/src/components/mjs/input/tex/extensions/upgreek/upgreek.js"),
  // @ts-ignore: no d.ts file
  verb: () => import("@mathjax/src/components/mjs/input/tex/extensions/verb/verb.js"),
};
export type ExtensionName = keyof typeof importExtensions;

export const enabledExtensions = new Set<ExtensionName>();

export async function enableExtension(name: keyof typeof importExtensions): Promise<unknown> {
  switch (name) {
    case "bbm":
      enableFontExtension("mathjax-bbm-font-extension"); break;
    case "bboldx":
      enableFontExtension("mathjax-bboldx-font-extension"); break;
    case "dsfont":
      enableFontExtension("mathjax-dsfont-font-extension"); break;
    case "mhchem":
      enableFontExtension("mathjax-mhchem-font-extension"); break;
    default:
      break;
  }
  enabledExtensions.add(name);
  await importExtensions[name]();
  return "";
  // return importExtensions[name].call(null);
}

export const packageNames = {
  all: Object.keys(importExtensions) as ExtensionName[],

} satisfies Record<string, ExtensionName[]>;


export async function enableExtensions(list: ExtensionName[]) {
  await Promise.all(
    list.map(name => enableExtension(name)) 
  );
}

export async function enableAllExtensions(): Promise<void> {
  return enableExtensions(packageNames.all);
}

