import { test } from 'node:test';
import assert from 'node:assert/strict';
import { lowestCommonAncestor } from './lca-bst.mjs';

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

test('Lowest Common Ancestor of a BST — case 1', () => {
  assert.equal(lowestCommonAncestor(toTree([[6,2,8,0,4,7,9,null,null,3,5],2,8])).val, 6);
});
test('Lowest Common Ancestor of a BST — case 2', () => {
  assert.equal(lowestCommonAncestor(toTree([[6,2,8,0,4,7,9,null,null,3,5],2,4])).val, 2);
});
test('Lowest Common Ancestor of a BST — case 3', () => {
  assert.equal(lowestCommonAncestor(toTree([[2,1],2,1])).val, 2);
});
