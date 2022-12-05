const { readFileSync } = require("node:fs");

const f = readFileSync("input", "utf8").split("\n");

const ab = f
  .filter(Boolean)
  .map((s) => s.split(",").map((t) => t.split("-").map(Number)))
  .map((r) => r.sort((b, a) => a[1] - a[0] - (b[1] - b[0])));

const A = ab.filter(([a, b]) => a[0] <= b[0] && a[1] >= b[1]).length;
const B = ab.filter(([a, b]) => a[1] >= b[0] && a[0] <= b[1]).length;

console.log({ A, B });
