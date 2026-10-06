import { test } from 'node:test';
import assert from 'node:assert/strict';
import { MinStack } from './min-stack.mjs';
test('Min Stack', () => {
  const ops = ["MinStack","push","push","push","getMin","pop","top","getMin"];
  const args = [[],[-2],[0],[-3],[],[],[],[]];
  const expected = [null,null,null,null,-3,null,0,-2];
  const results = [];
  let instance = null;
  for (let i = 0; i < ops.length; i++) {
    if (ops[i] === 'MinStack') { instance = new MinStack(); results.push(null); }
    else results.push(instance[ops[i]](...args[i]));
  }
  assert.deepEqual(results, expected);
});
