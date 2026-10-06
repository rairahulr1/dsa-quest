import { test } from 'node:test';
import assert from 'node:assert/strict';
import { maxArea } from './container-most-water.mjs';

test('Container With Most Water — case 1', () => {
  assert.deepEqual(maxArea([[1,8,6,2,5,4,8,3,7]]), 49);
});
test('Container With Most Water — case 2', () => {
  assert.deepEqual(maxArea([[1,1]]), 1);
});
test('Container With Most Water — case 3', () => {
  assert.deepEqual(maxArea([[4,3,2,1,4]]), 16);
});
