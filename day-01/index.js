const { readFileSync } = require("node:fs")

const f = readFileSync('input', 'utf8')

const e = f.split('\n').reduce(([head, ...tail], v) => v === '' ? [[], head, ...tail] : [[parseInt(v, 10), ...head], ...tail], [[]])

const sum = (a, v) => a + v

const s = e.map(v => v.reduce(sum, 0))

const A = s.reduce((max, v) => max > v ? max : v)
const B = s.sort((a, b) => b - a).slice(0,3).reduce(sum,0)

console.log({A, B})
