const { readFileSync } = require("node:fs");

const f = readFileSync("input", "utf8");

const g = f.split("\n").map((s) => s.split("").map(Number));
g.pop();

const tr = ([row, max], [v, vis]) => [
  [...row, [v, vis || v > max]],
  v > max ? v : max,
];

const tc = (acc, r) => [...acc, r.reduce(tr, [[], -1])];
const rot = (acc, r, i, l) => [...acc, r.map((_, j) => l[l.length - j - 1][i])];

const A = [0, 0, 0, 0]
  .reduce(
    (acc) =>
      acc
        .reduce(tc, [])
        .map(([l]) => l)
        .reduce(rot, []),
    g.map((r) => r.map((v) => [v, false]))
  )
  .reduce((sum, r) => r.filter(([, b]) => b).length + sum, 0);

const w = (l, i, j, di, dj, max) =>
  l?.[j]?.[i] === undefined
    ? 0
    : l[j][i] < max
    ? 1 + w(l, i + di, j + dj, di, dj, max)
    : 1;
const wa = (l, j) => (max, i) =>
  [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ].reduce((m, [di, dj]) => m * w(l, i + di, j + dj, di, dj, max), 1);

const B = g.reduce(
  (b, r, j, l) => r.map(wa(l, j)).reduce((c, v) => (c > v ? c : v), b),
  0
);

console.log({ A, B });
