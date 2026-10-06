import { test } from 'node:test';
import assert from 'node:assert/strict';
import { rob } from './house-robber.mjs';

test('House Robber — case 1', () => {
  assert.deepEqual(rob([1,2,3,1]), 4);
});
test('House Robber — case 2', () => {
  assert.deepEqual(rob([2,7,9,3,1]), 12);
});
test('House Robber — case 3', () => {
  assert.deepEqual(rob([2,1,1,2]), 4);
});
