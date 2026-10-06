import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Trie } from './implement-trie.mjs';
test('Implement Trie (Prefix Tree)', () => {
  const ops = ["Trie","insert","search","search","startsWith"];
  const args = [["apple"],["apple"],["app"],["app"]];
  const expected = [null,true,false,true];
  const results = [];
  let instance = null;
  for (let i = 0; i < ops.length; i++) {
    if (ops[i] === 'Trie') { instance = new Trie(); results.push(null); }
    else results.push(instance[ops[i]](...args[i]));
  }
  assert.deepEqual(results, expected);
});
