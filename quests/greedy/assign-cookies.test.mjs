import { test } from 'node:test';
import assert from 'node:assert/strict';
import { findContentChildren } from './assign-cookies.mjs';

test('Assign Cookies — case 1', () => {
  assert.deepEqual(findContentChildren([[1,2,3],[1,1]]), 1);
});
test('Assign Cookies — case 2', () => {
  assert.deepEqual(findContentChildren([[1,2],[1,2,3]]), 2);
});
test('Assign Cookies — case 3', () => {
  assert.deepEqual(findContentChildren([[1,2,3],[3]]), 1);
});
