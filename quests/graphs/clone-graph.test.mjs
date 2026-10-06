import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cloneGraph } from './clone-graph.mjs';

function toGraph(adj) {
  if (!adj || !adj.length) return null;
  const nodes = adj.map((_, i) => ({ val: i + 1, neighbors: [] }));
  adj.forEach((nb, i) => { nodes[i].neighbors = nb.map((j) => nodes[j - 1]); });
  return nodes[0];
}
function toAdj(node) {
  if (!node) return [];
  const map = new Map();
  const q = [node];
  while (q.length) {
    const n = q.shift();
    if (map.has(n.val)) continue;
    map.set(n.val, n);
    n.neighbors.forEach((nb) => q.push(nb));
  }
  return [...map.keys()].sort((a, b) => a - b).map((v) => map.get(v).neighbors.map((nb) => nb.val).sort((a, b) => a - b));
}

test('Clone Graph — case 1', () => {
  const original = toGraph([2,4]);
  const got = cloneGraph(original);
  assert.deepEqual(toAdj(got), [[2,4],[1,3],[2,4],[1,3]]);
  assert.notEqual(got, original); // deep clone, not the same node
});
test('Clone Graph — case 2', () => {
  const original = undefined;
  const got = cloneGraph(original);
  assert.deepEqual(toAdj(got), []);
});
test('Clone Graph — case 3', () => {
  const original = toGraph([]);
  const got = cloneGraph(original);
  assert.deepEqual(toAdj(got), [[]]);
  assert.notEqual(got, original); // deep clone, not the same node
});
