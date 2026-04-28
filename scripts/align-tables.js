#!/usr/bin/env node
// Reformat markdown tables with aligned columns to satisfy MD060.
// Usage: node scripts/align-tables.js <file> [<file> ...]
// Rewrites files in-place.

const fs = require("fs");

// Returns display width of a string (wide chars like emoji count as 2).
function displayWidth(str) {
  let width = 0;
  for (const char of str) {
    const cp = char.codePointAt(0);
    // Wide: fullwidth/CJK blocks and emoji/symbol ranges
    if (
      (cp >= 0x1100 && cp <= 0x115f) ||
      (cp >= 0x2e80 && cp <= 0x303e) ||
      (cp >= 0x3040 && cp <= 0xa4cf) ||
      (cp >= 0xac00 && cp <= 0xd7af) ||
      (cp >= 0xf900 && cp <= 0xfaff) ||
      (cp >= 0xfe10 && cp <= 0xfe19) ||
      (cp >= 0xfe30 && cp <= 0xfe6f) ||
      (cp >= 0xff01 && cp <= 0xff60) ||
      (cp >= 0xffe0 && cp <= 0xffe6) ||
      (cp >= 0x1f000 && cp <= 0x1ffff) ||
      (cp >= 0x20000 && cp <= 0x2fffd) ||
      (cp >= 0x2600 && cp <= 0x27bf)
    ) {
      width += 2;
    } else {
      width += 1;
    }
  }
  return width;
}

function isTableRow(line) {
  return line.trim().startsWith("|") && line.trim().endsWith("|");
}

function isSeparatorRow(line) {
  return isTableRow(line) && /^\|[\s\-:|]+\|$/.test(line.trim());
}

function parseRow(line) {
  return line
    .trim()
    .slice(1, -1)
    .split("|")
    .map((c) => c.trim());
}

function alignTable(lines) {
  const rows = lines.map(parseRow);
  const colCount = Math.max(...rows.map((r) => r.length));
  const widths = Array(colCount).fill(0);

  for (const row of rows) {
    for (let i = 0; i < row.length; i++) {
      widths[i] = Math.max(widths[i], displayWidth(row[i]));
    }
  }

  return lines.map((line, idx) => {
    const cells = parseRow(line);
    if (isSeparatorRow(line)) {
      const formatted = cells.map((c, i) => {
        const w = widths[i];
        if (c.startsWith(":") && c.endsWith(":")) return ":" + "-".repeat(w - 2) + ":";
        if (c.endsWith(":")) return "-".repeat(w - 1) + ":";
        if (c.startsWith(":")) return ":" + "-".repeat(w - 1);
        return "-".repeat(w);
      });
      return "| " + formatted.join(" | ") + " |";
    }
    const formatted = cells.map((c, i) => {
      const pad = widths[i] - displayWidth(c);
      return c + " ".repeat(Math.max(0, pad));
    });
    return "| " + formatted.join(" | ") + " |";
  });
}

function processFile(path) {
  const content = fs.readFileSync(path, "utf8");
  const lines = content.split("\n");
  const out = [];
  let tableStart = -1;
  let tableLines = [];

  for (let i = 0; i < lines.length; i++) {
    if (isTableRow(lines[i])) {
      if (tableStart === -1) tableStart = i;
      tableLines.push(lines[i]);
    } else {
      if (tableLines.length > 0) {
        out.push(...alignTable(tableLines));
        tableLines = [];
        tableStart = -1;
      }
      out.push(lines[i]);
    }
  }
  if (tableLines.length > 0) out.push(...alignTable(tableLines));

  const result = out.join("\n");
  if (result !== content) {
    fs.writeFileSync(path, result);
    console.log(`fixed: ${path}`);
  } else {
    console.log(`ok: ${path}`);
  }
}

const files = process.argv.slice(2);
if (files.length === 0) {
  console.error("Usage: node scripts/align-tables.js <file> [<file> ...]");
  process.exit(1);
}
files.forEach(processFile);
