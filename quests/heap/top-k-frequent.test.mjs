import { test } from 'node:test';
import assert from 'node:assert/strict';
import { topKFrequent } from './top-k-frequent.mjs';

test('Top K Frequent Elements — case 1', () => {
  const norm = (a) => [...a].sort((x, y) => (typeof x === 'string' ? x.localeCompare(y) : x - y));
  assert.deepEqual(norm(topKFrequent([[1,1,1,2,2,3],2])), norm([1,2]));
});
test('Top K Frequent Elements — case 2', () => {
  const norm = (a) => [...a].sort((x, y) => (typeof x === 'string' ? x.localeCompare(y) : x - y));
  assert.deepEqual(norm(topKFrequent([[1],1])), norm([1]));
});
test('Top K Frequent Elements — case 3', () => {
  const norm = (a) => [...a].sort((x, y) => (typeof x === 'string' ? x.localeCompare(y) : x - y));
  assert.deepEqual(norm(topKFrequent([[4,4,4,1,1,2,2,2,3],2])), norm([4,2]));
});
