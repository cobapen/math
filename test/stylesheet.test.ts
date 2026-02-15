import { describe, expect, test, vi } from "vitest";
import { allFontExtensions } from "../src/fonts";
import { enableMathJaxExtensions, MathJaxEngine } from "../src/mathjax";

await enableMathJaxExtensions();

describe("Mathjax stylesheet", () => {

  test("check idempotency", async () => {
    const engine = new MathJaxEngine();
    engine.convert("\\int_{-\\infty}^{\\infty} e^{-x^2} dx");
    const css1 = engine.stylesheet();
    const css2 = engine.stylesheet();
    expect(css1).toEqual(css2);
  });

  test("Two engines are independent", async () => {

    const engine1 = new MathJaxEngine();
    engine1.convert("\\int_{-\\infty}^{\\infty} e^{-x^2} dx");
    const css1 = engine1.stylesheet();

    const engine2 = new MathJaxEngine();
    engine2.convert("x + y");
    const css2 = engine2.stylesheet();

    // Both should have CSS content
    expect(css1.length).toBeGreaterThan(0);
    expect(css2.length).toBeGreaterThan(0);
    expect(css1.length).toBeGreaterThan(css2.length); // css1 is more complex

    expect(css1).not.toEqual(css2);
  });
  
  test("adaptive CSS", async () => {

    const engine1 = new MathJaxEngine({ chtml: { adaptiveCSS: false }});
    const css1 = engine1.stylesheet();

    const engine2 = new MathJaxEngine({ chtml: { adaptiveCSS: false }});
    const css2 = engine2.stylesheet();

    // Both should have CSS content
    expect(css1.length).toBeGreaterThan(0);
    expect(css2.length).toBeGreaterThan(0);
    expect(css1.length).toBe(css2.length);

    expect(css1).toEqual(css2);
  });

  test("font extension is enabled per-process level", async () => {
    const engine = new MathJaxEngine();
    const stylesheet = engine.stylesheet();
    expect(stylesheet.includes("mathjax-bbm-font-extension")).toBe(true);
  });

  test("fontURL is customizable", () => {
    const mockFn = vi.fn((name: string) => `DUMMY/${name}`);
    const engine = new MathJaxEngine({
      fontURL: mockFn
    });
    const stylesheet = engine.stylesheet();

    expect(mockFn).toHaveBeenCalled();
    expect(mockFn).toHaveBeenCalledWith("mathjax-bbm");
    expect(mockFn).toBeCalledTimes(Object.keys(allFontExtensions).length + 1); // Font(1) + FontExtensions
    expect(stylesheet.includes("https://")).toBe(false);
    expect(stylesheet.includes("cdnjs")).toBe(false);
    expect(stylesheet.includes("DUMMY/")).toBe(true);
  });
});

