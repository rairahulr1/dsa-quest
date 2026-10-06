import { test } from 'node:test';
import assert from 'node:assert/strict';
import { hasCycle } from './linked-list-cycle.mjs';

function toCycleList(list, pos) {
  if (!list || !list.length) return null;
  const head = { val: list[0], next: null };
  let cur = head; const nodes = [head];
  for (let i = 1; i < list.length; i++) { cur.next = { val: list[i], next: null }; cur = cur.next; nodes.push(cur); }
  if (pos >= 0 && pos < nodes.length) cur.next = nodes[pos];
  return head;
}

test('Linked List Cycle — case 1', () => {
  assert.deepEqual(hasCycle(toCycleList([3,2,0,-4], 1)), true);
});
test('Linked List Cycle — case 2', () => {
  assert.deepEqual(hasCycle(toCycleList([1,2], 0)), true);
});
test('Linked List Cycle — case 3', () => {
  assert.deepEqual(hasCycle(toCycleList([1], -1)), false);
});
