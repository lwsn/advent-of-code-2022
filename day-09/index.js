const { readFileSync } = require("node:fs");

const f = readFileSync("input", "utf8").split("\n");
f.pop();

const dirs = { L: [-1, 0], R: [1, 0], U: [0, 1], D: [0, -1] };

const g = (hPos, tPos) => {
  const diff = hPos.map((v, i) => Math.abs(v - tPos[i]));
  if (!diff.includes(2)) return tPos;
  if (diff.includes(0)) return tPos.map((v, i) => (v + hPos[i]) / 2);
  return hPos.map((v, i) => tPos[i] + Math.sign(v - tPos[i]));
};

const moveH =
  (dir) =>
  ([[hPos, ...rest], visited]) => {
    const newPos = dirs[dir].map((v, i) => hPos[i] + v);

    const [, ...tail] = rest.reduce(
      (acc, v) => [...acc, g(acc[acc.length - 1], v)],
      [newPos]
    );

    const last = tail.pop();

    return [
      [newPos, ...tail, last],
      visited.some((v) => v[0] === last[0] && v[1] === last[1])
        ? visited
        : [...visited, last],
    ];
  };

const parseRow = (acc, v) =>
  new Array(Number(v.split(" ")[1]))
    .fill(0)
    .reduce(moveH(v.split(" ")[0]), acc);

const A = f.reduce(parseRow, [new Array(2).fill([0, 0]), [[0, 0]]])[1].length;
const B = f.reduce(parseRow, [new Array(10).fill([0, 0]), [[0, 0]]])[1].length;

console.log({ A, B });
