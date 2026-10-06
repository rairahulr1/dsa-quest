import { test } from 'node:test';
import assert from 'node:assert/strict';
import { reverseList } from './reverse-linked-list.mjs';

function toList(arr) {
  if (!arr || !arr.length) return null;
  const head = { val: arr[0], next: null };
  let cur = head;
  for (let i = 1; i < arr.length; i++) { cur.next = { val: arr[i], next: null }; cur = cur.next; }
  return head;
}
function toLists(arrs) { return (arrs || []).map(toList); }
function toArray(head) { const out = []; while (head) { out.push(head.val); head = head.next; } return out; }

test('Reverse Linked List — case 1', () => {
  assert.deepEqual(toArray(reverseList(toList([1,2,3,4,5]))), [5,4,3,2,1]);
});
test('Reverse Linked List — case 2', () => {
  assert.deepEqual(toArray(reverseList(toList([1,2]))), [2,1]);
});
test('Reverse Linked List — case 3', () => {
  assert.deepEqual(toArray(reverseList()), []);
});
