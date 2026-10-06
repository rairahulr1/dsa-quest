import { test } from 'node:test';
import assert from 'node:assert/strict';
import { singleNumber } from './single-number.mjs';

test('Single Number — case 1', () => {
  assert.deepEqual(singleNumber([[2,2,1]]), 1);
});
test('Single Number — case 2', () => {
  assert.deepEqual(singleNumber([[4,1,2,1,2]]), 4);
});
test('Single Number — case 3', () => {
  assert.deepEqual(singleNumber([[1]]), 1);
});
