const { readFileSync } = require("node:fs");

const f = readFileSync("input", "utf8");

const root = { "/": {} };

let stack = [root];

for (const s of f.split("\n")) {
  const cur = stack[stack.length - 1];
  if (s.startsWith("$ cd ..")) stack.pop();
  else if (s.startsWith("$ cd")) stack.push(cur[s.split(" ")[2]]);
  else if (s.startsWith("dir")) cur[s.split(" ")[1]] = {};
  else if (!s.startsWith("$ ls"))
    cur[s.split(" ")[1]] = Number(s.split(" ")[0]);
}

const calcSize = (o) => {
  let size = 0;
  for (const v of Object.values(o))
    size += typeof v === "number" ? v : calcSize(v);
  o.__size = size;
  return size;
};

calcSize(root);

const sumSize = (o, max) => {
  let sum = o.__size <= max ? o.__size : 0;
  for (const v of Object.values(o))
    sum += typeof v === "number" ? 0 : sumSize(v, max);
  return sum;
};

const A = sumSize(root, 100000);

const findSmGt = (o, min, max) => {
  if (o.__size < min) return max;

  let best = max > o.__size ? o.__size : max;
  for (const v of Object.values(o).filter((b) => typeof b !== "number"))
    best = findSmGt(v, min, best);

  return best;
};

const MAX = 70000000;
const MIN = 30000000;

const B = findSmGt(root, MIN - (MAX - root.__size), root.__size);

console.log({ A, B });
