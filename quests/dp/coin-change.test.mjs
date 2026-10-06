import { test } from 'node:test';
import assert from 'node:assert/strict';
import { coinChange } from './coin-change.mjs';

test('Coin Change — case 1', () => {
  assert.deepEqual(coinChange([[1,2,5],11]), 3);
});
test('Coin Change — case 2', () => {
  assert.deepEqual(coinChange([[2],3]), -1);
});
test('Coin Change — case 3', () => {
  assert.deepEqual(coinChange([[1],0]), 0);
});
