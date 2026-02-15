
import { performance } from "node:perf_hooks";
import { test } from "vitest";

const TEST_TIMEOUT_MS = 25000;

test("Performance Check", async () => {
  const t1 = performance.now();
  const module = await import("../src/index.js");
  const t2 = performance.now();
  await module.enableMathJaxExtensions();
  const t3 = performance.now();

  const dt1 = t2 - t1;
  const dt2 = t3 - t2;

  console.log(`Initial import: ${dt1.toFixed(3)}ms`);
  console.log(`Dynamic import: ${dt2.toFixed(3)}ms`);
}, TEST_TIMEOUT_MS);
