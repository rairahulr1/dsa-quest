import { test } from 'node:test';
import assert from 'node:assert/strict';
import { climbStairs } from './climbing-stairs.mjs';

test('Climbing Stairs — case 1', () => {
  assert.deepEqual(climbStairs([2]), 2);
});
test('Climbing Stairs — case 2', () => {
  assert.deepEqual(climbStairs([3]), 3);
});
test('Climbing Stairs — case 3', () => {
  assert.deepEqual(climbStairs([10]), 89);
});
