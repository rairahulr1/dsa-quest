import { test } from 'node:test';
import assert from 'node:assert/strict';
import { findKthLargest } from './kth-largest.mjs';

test('Kth Largest Element in an Array — case 1', () => {
  assert.deepEqual(findKthLargest([3,2,1,5,6,4], 2), 5);
});
test('Kth Largest Element in an Array — case 2', () => {
  assert.deepEqual(findKthLargest([3,2,3,1,2,4,5,5,6], 4), 4);
});
test('Kth Largest Element in an Array — case 3', () => {
  assert.deepEqual(findKthLargest([1], 1), 1);
});
