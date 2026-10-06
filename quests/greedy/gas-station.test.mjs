import { test } from 'node:test';
import assert from 'node:assert/strict';
import { canCompleteCircuit } from './gas-station.mjs';

test('Gas Station — case 1', () => {
  assert.deepEqual(canCompleteCircuit([[1,2,3,4,5],[3,4,5,1,2]]), 3);
});
test('Gas Station — case 2', () => {
  assert.deepEqual(canCompleteCircuit([[2,3,4],[3,4,3]]), -1);
});
test('Gas Station — case 3', () => {
  assert.deepEqual(canCompleteCircuit([[5,1,2,3,4],[4,4,1,5,1]]), 4);
});
