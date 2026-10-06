import { test } from 'node:test';
import assert from 'node:assert/strict';
import { nextGreaterElement } from './next-greater-element.mjs';

test('Next Greater Element I — case 1', () => {
  assert.deepEqual(nextGreaterElement([[4,1,2],[1,3,4,2]]), [-1,3,-1]);
});
test('Next Greater Element I — case 2', () => {
  assert.deepEqual(nextGreaterElement([[2,4],[1,2,3,4]]), [3,-1]);
});
test('Next Greater Element I — case 3', () => {
  assert.deepEqual(nextGreaterElement([[1],[1,2,3]]), [2]);
});
