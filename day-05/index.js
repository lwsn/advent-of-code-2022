const { readFileSync } = require("node:fs");

const f = readFileSync("input", "utf8");

const [s, t] = f.split("\n\n");
const g = s
  .split("\n")
  .reverse()
  .slice(1)
  .map((s) => s.match(/.(.).\s?/g).map(([, c]) => (c === " " ? null : c)));

const h = g[0].reduce(
  (a, _, i) => [
    ...a,
    g
      .map((b) => b[i])
      .filter(Boolean)
      .join(""),
  ],
  []
);

const m = t
  .split("\n")
  .filter((s) => s !== "")
  .map((s) => s.split(" "))
  .map(([, c, , i, , j]) => [c, i, j].map(Number))
  .map(([c, i, j]) => [c, i - 1, j - 1]);

console.log(h);

const A = m
  .reduce(
    (acc, [c, i, j]) => {
      const v = acc[i].slice(acc[i].length - c);
      acc[i] = acc[i].slice(0, acc[i].length - c);

      acc[j] += v.split("").reverse().join("");

      return acc;
    },
    [...h]
  )
  .reduce((acc, v) => acc + v[v.length - 1], "");

const B = m
  .reduce(
    (acc, [c, i, j]) => {
      const v = acc[i].slice(acc[i].length - c);
      acc[i] = acc[i].slice(0, acc[i].length - c);

      acc[j] += v;

      return acc;
    },
    [...h]
  )
  .reduce((acc, v) => acc + v[v.length - 1], "");

console.log({ A, B });
