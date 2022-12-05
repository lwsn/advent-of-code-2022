const { readFileSync } = require("node:fs");

const f = readFileSync("input", "utf8");

const a = [
  ...new Array(26).fill(0).map((_, i) => String.fromCharCode(i + 97)),
  ...new Array(26).fill(0).map((_, i) => String.fromCharCode(i + 65)),
];

const A = f
  .split("\n")
  .map((s) => [s.slice(0, s.length / 2), s.slice(s.length / 2)])
  .map(([s1, s2]) => s1.split("").find((c) => s2.includes(c)))
  .reduce((acc, v) => a.indexOf(v) + 1 + acc, 0);

const B = f
  .split("\n")
  .reduce(
    ([g, ...r], v) => (g.length > 2 ? [[v], g, ...r] : [[...g, v], ...r]),
    [[]]
  )
  .slice(1)
  .map(([i, j, k]) => i.split("").find((c) => j.includes(c) && k.includes(c)))
  .reduce((sum, v) => a.indexOf(v) + 1 + sum, 0);

console.log({ A, B });
