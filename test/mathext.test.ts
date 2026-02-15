import fs from "node:fs";
import path from "node:path";
import { expect, test } from "vitest";
import { enableMathJaxExtensions, MathJaxEngine } from "../src/mathjax.js";

await enableMathJaxExtensions();
const rawFilePath = path.resolve(__dirname, "./ext/mathext.txt");
const htmlPath = path.resolve(__dirname, "./ext/mathext.html");
const cssPath = path.resolve(__dirname, "./ext/mathext.css");

fs.mkdirSync(path.dirname(htmlPath), { recursive: true });

function parseRawMathBlocks(raw: string): Array<{ title: string; tex: string }> {
  const lines = raw.split(/\r?\n/);

  const chunks: string[][] = [];
  let current: string[] = [];
  for (const line of lines) {
    if (line.trim() === "---") {
      chunks.push(current);
      current = [];
    } else {
      current.push(line);
    }
  }
  if (current.length > 0) {
    chunks.push(current);
  }

  const blocks: Array<{ title: string; tex: string }> = [];

  for (const chunk of chunks) {
    const titleLine = chunk.find((l) => l.trim().startsWith("#")) ?? "";
    const title = titleLine.replace(/^\s*#+\s*/, "").trim();

    const start = chunk.findIndex((l) => l.trim() === "$$");
    if (start < 0) 
      continue;
    const endRel = chunk.slice(start + 1).findIndex((l) => l.trim() === "$$");
    if (endRel < 0)
      throw new Error(`Unclosed $$ block in: ${title || "(untitled)"}`);
    const texLines = chunk.slice(start + 1, start + 1 + endRel);
    const tex = texLines.join("\n").trimEnd() + "\n";
    blocks.push({ title, tex });
  }

  return blocks;
}

test("Convert blocks via MathJax engine", async () => {
  const text = fs.readFileSync(rawFilePath, "utf-8");
  const blocks = parseRawMathBlocks(text);
  expect(blocks.length).toBeGreaterThan(0);

  const mathjax = new MathJaxEngine();

  const htmlParts = [] as string[];
  for (const block of blocks) {
    const html = mathjax.convert(block.tex);
    htmlParts.push(`<div class="math-block">\n  <h3>${block.title}</h3>\n  ${html}\n</div>\n`);
  }

  // Wrap the result, combine them all and generate a HTML.
  // - filename is mathext.html
  // - css name is mathext.css
  const css = mathjax.stylesheet();
  const fullHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Math Examples</title>
  <link rel="stylesheet" href="mathext.css">
</head>
<body>
  <h1>Math Examples</h1>
  ${htmlParts.join("\n")}
</body>
</html>`;

  fs.writeFileSync(htmlPath, fullHtml, "utf-8");
  fs.writeFileSync(cssPath, css, "utf-8");
});
