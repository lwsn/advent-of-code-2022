const { readFileSync } = require("node:fs");

const f = readFileSync("input", "utf8");

const uniqN = (n) => (_, i, l) =>
  l.slice(i, i + n).filter((t, j, m) => m.indexOf(t) === j).length === n;

const A = f.split("").findIndex(uniqN(4)) + 4;
const B = f.split("").findIndex(uniqN(14)) + 14;

console.log({ A, B });
