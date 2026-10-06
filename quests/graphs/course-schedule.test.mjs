import { test } from 'node:test';
import assert from 'node:assert/strict';
import { canFinish } from './course-schedule.mjs';

test('Course Schedule — case 1', () => {
  assert.deepEqual(canFinish([2,[[1,0]]]), true);
});
test('Course Schedule — case 2', () => {
  assert.deepEqual(canFinish([2,[[1,0],[0,1]]]), false);
});
test('Course Schedule — case 3', () => {
  assert.deepEqual(canFinish([3,[[1,0],[2,0],[2,1]]]), true);
});
