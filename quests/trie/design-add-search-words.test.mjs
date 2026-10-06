import { test } from 'node:test';
import assert from 'node:assert/strict';
import { WordDictionary } from './design-add-search-words.mjs';
test('Design Add and Search Words', () => {
  const ops = ["WordDictionary","addWord","addWord","addWord","search","search","search","search"];
  const args = [["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]];
  const expected = [null,null,null,null,false,true,true,true];
  const results = [];
  let instance = null;
  for (let i = 0; i < ops.length; i++) {
    if (ops[i] === 'WordDictionary') { instance = new WordDictionary(); results.push(null); }
    else results.push(instance[ops[i]](...args[i]));
  }
  assert.deepEqual(results, expected);
});
