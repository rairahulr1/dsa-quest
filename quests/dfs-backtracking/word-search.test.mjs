import { test } from 'node:test';
import assert from 'node:assert/strict';
import { exist } from './word-search.mjs';

test('Word Search — case 1', () => {
  assert.deepEqual(exist(["A","B","C","E"], ["S","F","C","S"], ["A","D","E","E"]), true);
});
test('Word Search — case 2', () => {
  assert.deepEqual(exist(["A","B","C","E"], ["S","F","C","S"], ["A","D","E","E"]), true);
});
test('Word Search — case 3', () => {
  assert.deepEqual(exist(["A","B","C","E"], ["S","F","C","S"], ["A","D","E","E"]), false);
});
