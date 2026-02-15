import { describe, expect, test } from "vitest";
import { enableMathJaxExtensions, MathJaxEngine } from "../src/mathjax";

await enableMathJaxExtensions();

describe("MathJax engine convert", () => {
  test("convert succeeds", () => {
    const engine = new MathJaxEngine();
    const result = engine.convert("x + y");
    expect(result).toBeDefined();
    expect(typeof result).toBe("string");
    expect(result).contain("mjx-container");
  });

  test("output html contains mjx-copytext", () => {
    const engine = new MathJaxEngine();
    const html = engine.convert("x + y");
    expect(html).toContain("mjx-copytext");
  });
});
