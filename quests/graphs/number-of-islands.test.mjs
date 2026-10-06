import { test } from 'node:test';
import assert from 'node:assert/strict';
import { numIslands } from './number-of-islands.mjs';

test('Number of Islands — case 1', () => {
  assert.deepEqual(numIslands([["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]), 1);
});
test('Number of Islands — case 2', () => {
  assert.deepEqual(numIslands([["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]), 3);
});
test('Number of Islands — case 3', () => {
  assert.deepEqual(numIslands([["0"]]), 0);
});
