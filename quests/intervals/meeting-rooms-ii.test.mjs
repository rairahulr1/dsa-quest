import { test } from 'node:test';
import assert from 'node:assert/strict';
import { minMeetingRooms } from './meeting-rooms-ii.mjs';

test('Meeting Rooms II — case 1', () => {
  assert.deepEqual(minMeetingRooms([[0,30],[5,10],[15,20]]), 2);
});
test('Meeting Rooms II — case 2', () => {
  assert.deepEqual(minMeetingRooms([[7,10],[2,4]]), 1);
});
test('Meeting Rooms II — case 3', () => {
  assert.deepEqual(minMeetingRooms([[1,5],[8,9],[8,9]]), 2);
});
