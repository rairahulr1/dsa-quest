import { test } from 'node:test';
import assert from 'node:assert/strict';
import { threeSum } from './three-sum.mjs';

test('3Sum — case 1', () => {
  const norm = (a) => a.map((x) => [...x].sort((p2, q2) => p2 - q2)).map((x) => JSON.stringify(x)).sort();
  assert.deepEqual(norm(threeSum([[-1,0,1,2,-1,-4]])), norm([[-1,-1,2],[-1,0,1]]));
});
test('3Sum — case 2', () => {
  const norm = (a) => a.map((x) => [...x].sort((p2, q2) => p2 - q2)).map((x) => JSON.stringify(x)).sort();
  assert.deepEqual(norm(threeSum([[0,1,1]])), norm([]));
});
test('3Sum — case 3', () => {
  const norm = (a) => a.map((x) => [...x].sort((p2, q2) => p2 - q2)).map((x) => JSON.stringify(x)).sort();
  assert.deepEqual(norm(threeSum([[0,0,0]])), norm([[0,0,0]]));
});
