import { test } from 'node:test';
import assert from 'node:assert/strict';
import { lengthOfLongestSubstring } from './longest-substring.mjs';

test('Longest Substring Without Repeating Characters — case 1', () => {
  assert.deepEqual(lengthOfLongestSubstring(["abcabcbb"]), 3);
});
test('Longest Substring Without Repeating Characters — case 2', () => {
  assert.deepEqual(lengthOfLongestSubstring(["bbbbb"]), 1);
});
test('Longest Substring Without Repeating Characters — case 3', () => {
  assert.deepEqual(lengthOfLongestSubstring(["pwwkew"]), 3);
});
