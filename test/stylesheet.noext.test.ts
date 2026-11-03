import { describe, expect, test } from "vitest";
import { MathJaxEngine } from "../src/mathjax.js";

describe("MathJax stylesheet (noext)", () => {
  test("No font extensions", () => {
    const engine = new MathJaxEngine();
    engine.convert("x + y = z");
    const css = engine.stylesheet();
    expect(css.includes("mathjax-bbm-font-extension")).toBe(false);
    expect(css.includes("mathjax-bboldx-font-extension")).toBe(false);
    expect(css.includes("mathjax-dsfont-font-extension")).toBe(false);
    expect(css.includes("mathjax-mhchem-font-extension")).toBe(false);
  });

  test("No extensions", () => {
    const engine = new MathJaxEngine();
    const simpleHtml = engine.convert("x + y");
    expect(simpleHtml).toBeTruthy();
    
    const css = engine.stylesheet();
    expect(css.length).toBeGreaterThan(0);
    expect(css.includes("mathjax-bbm")).toBe(false);
    expect(css.includes("mathjax-dsfont")).toBe(false);
  });
});
