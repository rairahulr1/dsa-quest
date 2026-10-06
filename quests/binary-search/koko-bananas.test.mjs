import { test } from 'node:test';
import assert from 'node:assert/strict';
import { minEatingSpeed } from './koko-bananas.mjs';

test('Koko Eating Bananas — case 1', () => {
  assert.deepEqual(minEatingSpeed([[3,6,7,11],8]), 4);
});
test('Koko Eating Bananas — case 2', () => {
  assert.deepEqual(minEatingSpeed([[30,11,23,4,20],5]), 30);
});
test('Koko Eating Bananas — case 3', () => {
  assert.deepEqual(minEatingSpeed([[30,11,23,4,20],6]), 23);
});
