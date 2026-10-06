import { test } from 'node:test';
import assert from 'node:assert/strict';
import { findWords } from './word-search-ii.mjs';

test('Word Search II — case 1', () => {
  const norm = (a) => [...a].sort((x, y) => (typeof x === 'string' ? x.localeCompare(y) : x - y));
  assert.deepEqual(norm(findWords([["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], ["oath","pea","eat","rain"])), norm(["eat","oath"]));
});
test('Word Search II — case 2', () => {
  const norm = (a) => [...a].sort((x, y) => (typeof x === 'string' ? x.localeCompare(y) : x - y));
  assert.deepEqual(norm(findWords([["a","b"],["c","d"]], ["abcb"])), norm([]));
});
