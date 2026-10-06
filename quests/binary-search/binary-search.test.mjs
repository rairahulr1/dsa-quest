import { test } from 'node:test';
import assert from 'node:assert/strict';
import { search } from './binary-search.mjs';

test('Binary Search — case 1', () => {
  assert.deepEqual(search([[-1,0,3,5,9,12],9]), 4);
});
test('Binary Search — case 2', () => {
  assert.deepEqual(search([[-1,0,3,5,9,12],2]), -1);
});
test('Binary Search — case 3', () => {
  assert.deepEqual(search([[5],5]), 0);
});
