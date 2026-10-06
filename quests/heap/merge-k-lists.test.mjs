import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mergeKLists } from './merge-k-lists.mjs';

function toList(arr) {
  if (!arr || !arr.length) return null;
  const head = { val: arr[0], next: null };
  let cur = head;
  for (let i = 1; i < arr.length; i++) { cur.next = { val: arr[i], next: null }; cur = cur.next; }
  return head;
}
function toLists(arrs) { return (arrs || []).map(toList); }
function toArray(head) { const out = []; while (head) { out.push(head.val); head = head.next; } return out; }

test('Merge K Sorted Lists — case 1', () => {
  assert.deepEqual(toArray(mergeKLists(toLists([[1,4,5],[1,3,4],[2,6]]))), [1,1,2,3,4,4,5,6]);
});
test('Merge K Sorted Lists — case 2', () => {
  assert.deepEqual(toArray(mergeKLists()), []);
});
test('Merge K Sorted Lists — case 3', () => {
  assert.deepEqual(toArray(mergeKLists(toLists([]))), []);
});
