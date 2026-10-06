import { test } from 'node:test';
import assert from 'node:assert/strict';
import { maxSumSubarray } from './max-sum-subarray-k.mjs';

test('Maximum Sum Subarray of Size K — case 1', () => {
  assert.deepEqual(maxSumSubarray([2,1,5,1,3,2], 3), 9);
});
test('Maximum Sum Subarray of Size K — case 2', () => {
  assert.deepEqual(maxSumSubarray([2,3,4,1,5], 2), 7);
});
test('Maximum Sum Subarray of Size K — case 3', () => {
  assert.deepEqual(maxSumSubarray([1,1,1,1], 4), 4);
});
