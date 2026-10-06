import { test } from 'node:test';
import assert from 'node:assert/strict';
import { twoSum } from './two-sum.mjs';

test('Two Sum — case 1', () => {
  assert.deepEqual(twoSum([[2,7,11,15],9]), [0,1]);
});
test('Two Sum — case 2', () => {
  assert.deepEqual(twoSum([[3,2,4],6]), [1,2]);
});
test('Two Sum — case 3', () => {
  assert.deepEqual(twoSum([[3,3],6]), [0,1]);
});
