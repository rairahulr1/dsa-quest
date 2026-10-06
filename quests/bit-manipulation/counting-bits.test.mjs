import { test } from 'node:test';
import assert from 'node:assert/strict';
import { countBits } from './counting-bits.mjs';

test('Counting Bits — case 1', () => {
  assert.deepEqual(countBits([2]), [0,1,1]);
});
test('Counting Bits — case 2', () => {
  assert.deepEqual(countBits([5]), [0,1,1,2,1,2]);
});
test('Counting Bits — case 3', () => {
  assert.deepEqual(countBits([0]), [0]);
});
