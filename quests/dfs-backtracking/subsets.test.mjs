import { test } from 'node:test';
import assert from 'node:assert/strict';
import { subsets } from './subsets.mjs';

test('Subsets — case 1', () => {
  const norm = (a) => a.map((x) => [...x].sort((p2, q2) => p2 - q2)).map((x) => JSON.stringify(x)).sort();
  assert.deepEqual(norm(subsets([[1,2,3]])), norm([[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]));
});
test('Subsets — case 2', () => {
  const norm = (a) => a.map((x) => [...x].sort((p2, q2) => p2 - q2)).map((x) => JSON.stringify(x)).sort();
  assert.deepEqual(norm(subsets([[0]])), norm([[],[0]]));
});
