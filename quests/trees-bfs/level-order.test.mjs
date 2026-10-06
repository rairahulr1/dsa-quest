import { test } from 'node:test';
import assert from 'node:assert/strict';
import { levelOrder } from './level-order.mjs';

function toTree(arr) {
  if (!arr || !arr.length || arr[0] == null) return null;
  const root = { val: arr[0], left: null, right: null };
  const q = [root];
  let i = 1;
  while (i < arr.length) {
    const node = q.shift();
    if (arr[i] != null) { node.left = { val: arr[i], left: null, right: null }; q.push(node.left); }
    i++;
    if (i < arr.length && arr[i] != null) { node.right = { val: arr[i], left: null, right: null }; q.push(node.right); }
    i++;
  }
  return root;
}

test('Binary Tree Level Order Traversal — case 1', () => {
  assert.deepEqual(levelOrder(toTree([[3,9,20,null,null,15,7]])), [[3],[9,20],[15,7]]);
});
test('Binary Tree Level Order Traversal — case 2', () => {
  assert.deepEqual(levelOrder(toTree([[1]])), [[1]]);
});
test('Binary Tree Level Order Traversal — case 3', () => {
  assert.deepEqual(levelOrder(toTree([])), []);
});
