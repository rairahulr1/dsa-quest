import { test } from 'node:test';
import assert from 'node:assert/strict';
import { hammingWeight } from './number-of-1-bits.mjs';

test('Number of 1 Bits — case 1', () => {
  assert.deepEqual(hammingWeight(11), 3);
});
test('Number of 1 Bits — case 2', () => {
  assert.deepEqual(hammingWeight(128), 1);
});
test('Number of 1 Bits — case 3', () => {
  assert.deepEqual(hammingWeight(4294967293), 31);
});
