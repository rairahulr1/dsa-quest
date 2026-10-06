import { test } from 'node:test';
import assert from 'node:assert/strict';
import { isValidBST } from './validate-bst.mjs';

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

test('Validate Binary Search Tree — case 1', () => {
  assert.deepEqual(isValidBST(toTree([[2,1,3]])), true);
});
test('Validate Binary Search Tree — case 2', () => {
  assert.deepEqual(isValidBST(toTree([[5,1,4,null,null,3,6]])), false);
});
test('Validate Binary Search Tree — case 3', () => {
  assert.deepEqual(isValidBST(toTree([[1,1]])), false);
});
