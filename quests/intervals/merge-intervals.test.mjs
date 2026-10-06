import { test } from 'node:test';
import assert from 'node:assert/strict';
import { merge } from './merge-intervals.mjs';

test('Merge Intervals — case 1', () => {
  const norm = (a) => [...a].map((x) => [...x]).sort((p2, q2) => p2[0] - q2[0]);
  assert.deepEqual(norm(merge([[1,3],[2,6],[8,10],[15,18]])), norm([[1,6],[8,10],[15,18]]));
});
test('Merge Intervals — case 2', () => {
  const norm = (a) => [...a].map((x) => [...x]).sort((p2, q2) => p2[0] - q2[0]);
  assert.deepEqual(norm(merge([[1,4],[4,5]])), norm([[1,5]]));
});
test('Merge Intervals — case 3', () => {
  const norm = (a) => [...a].map((x) => [...x]).sort((p2, q2) => p2[0] - q2[0]);
  assert.deepEqual(norm(merge([[1,4],[0,4]])), norm([[0,4]]));
});
