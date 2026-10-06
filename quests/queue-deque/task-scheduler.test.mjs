import { test } from 'node:test';
import assert from 'node:assert/strict';
import { leastInterval } from './task-scheduler.mjs';

test('Task Scheduler — case 1', () => {
  assert.deepEqual(leastInterval(["A","A","A","B","B","B"], 2), 8);
});
test('Task Scheduler — case 2', () => {
  assert.deepEqual(leastInterval(["A","C","A","B","D","B"], 1), 6);
});
test('Task Scheduler — case 3', () => {
  assert.deepEqual(leastInterval(["A","A","A","B","B","B"], 3), 10);
});
