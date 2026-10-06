import { test } from 'node:test';
import assert from 'node:assert/strict';
import { canJump } from './jump-game.mjs';

test('Jump Game — case 1', () => {
  assert.deepEqual(canJump([[2,3,1,1,4]]), true);
});
test('Jump Game — case 2', () => {
  assert.deepEqual(canJump([[3,2,1,0,4]]), false);
});
test('Jump Game — case 3', () => {
  assert.deepEqual(canJump([[0]]), true);
});
