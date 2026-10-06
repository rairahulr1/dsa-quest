import { test } from 'node:test';
import assert from 'node:assert/strict';
import { MyQueue } from './implement-queue-stacks.mjs';
test('Implement Queue using Stacks', () => {
  const ops = ["MyQueue","push","push","peek","pop","empty"];
  const args = [[],[1],[2],[],[],[]];
  const expected = [null,null,null,1,1,false];
  const results = [];
  let instance = null;
  for (let i = 0; i < ops.length; i++) {
    if (ops[i] === 'MyQueue') { instance = new MyQueue(); results.push(null); }
    else results.push(instance[ops[i]](...args[i]));
  }
  assert.deepEqual(results, expected);
});
