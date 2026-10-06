import { test } from 'node:test';
import assert from 'node:assert/strict';
import { isValid } from './valid-parentheses.mjs';

test('Valid Parentheses — case 1', () => {
  assert.deepEqual(isValid(["()"]), true);
});
test('Valid Parentheses — case 2', () => {
  assert.deepEqual(isValid(["()[]{}"]), true);
});
test('Valid Parentheses — case 3', () => {
  assert.deepEqual(isValid(["(]"]), false);
});
