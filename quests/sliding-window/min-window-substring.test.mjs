import { test } from 'node:test';
import assert from 'node:assert/strict';
import { minWindow } from './min-window-substring.mjs';

test('Minimum Window Substring — case 1', () => {
  assert.deepEqual(minWindow(["ADOBECODEBANC","ABC"]), "BANC");
});
test('Minimum Window Substring — case 2', () => {
  assert.deepEqual(minWindow(["a","a"]), "a");
});
test('Minimum Window Substring — case 3', () => {
  assert.deepEqual(minWindow(["a","aa"]), "");
});
