import { test } from 'node:test';
import assert from 'node:assert/strict';
import { eraseOverlapIntervals } from './non-overlapping.mjs';

test('Non-overlapping Intervals — case 1', () => {
  assert.deepEqual(eraseOverlapIntervals([[[1,2],[2,3],[3,4],[1,3]]]), 1);
});
test('Non-overlapping Intervals — case 2', () => {
  assert.deepEqual(eraseOverlapIntervals([[[1,2],[1,2],[1,2]]]), 2);
});
test('Non-overlapping Intervals — case 3', () => {
  assert.deepEqual(eraseOverlapIntervals([[[1,2],[2,3]]]), 0);
});
