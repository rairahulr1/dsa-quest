import { test } from 'node:test';
import assert from 'node:assert/strict';
import { maxSlidingWindow } from './sliding-window-maximum.mjs';

test('Sliding Window Maximum — case 1', () => {
  assert.deepEqual(maxSlidingWindow([[1,3,-1,-3,5,3,6,7],3]), [3,3,5,5,6,7]);
});
test('Sliding Window Maximum — case 2', () => {
  assert.deepEqual(maxSlidingWindow([[1],1]), [1]);
});
test('Sliding Window Maximum — case 3', () => {
  assert.deepEqual(maxSlidingWindow([[1,-1],1]), [1,-1]);
});
