import { test } from 'node:test';
import assert from 'node:assert/strict';
import { search } from './search-rotated.mjs';

test('Search in Rotated Sorted Array — case 1', () => {
  assert.deepEqual(search([[4,5,6,7,0,1,2],0]), 4);
});
test('Search in Rotated Sorted Array — case 2', () => {
  assert.deepEqual(search([[4,5,6,7,0,1,2],3]), -1);
});
test('Search in Rotated Sorted Array — case 3', () => {
  assert.deepEqual(search([[1],0]), -1);
});
