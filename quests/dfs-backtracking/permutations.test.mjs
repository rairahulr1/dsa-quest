import { test } from 'node:test';
import assert from 'node:assert/strict';
import { permute } from './permutations.mjs';

test('Permutations — case 1', () => {
  const norm = (a) => a.map((x) => [...x].sort((p2, q2) => p2 - q2)).map((x) => JSON.stringify(x)).sort();
  assert.deepEqual(norm(permute([1,2,3])), norm([[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]));
});
test('Permutations — case 2', () => {
  const norm = (a) => a.map((x) => [...x].sort((p2, q2) => p2 - q2)).map((x) => JSON.stringify(x)).sort();
  assert.deepEqual(norm(permute([0,1])), norm([[0,1],[1,0]]));
});
test('Permutations — case 3', () => {
  const norm = (a) => a.map((x) => [...x].sort((p2, q2) => p2 - q2)).map((x) => JSON.stringify(x)).sort();
  assert.deepEqual(norm(permute([1])), norm([[1]]));
});
