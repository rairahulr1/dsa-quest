# Intervals

Sort by start, then merge or sweep. Overlap logic lives in the sort order.

**Recognise the pattern when you see:** meeting rooms · merge ranges · non-overlapping removals · timeline sweeps

**PHP SPL mapping:** —

## Quests

| Problem | Difficulty | Link | XP |
|---|---|---|---|
| Merge Intervals | medium | [link](https://leetcode.com/problems/merge-intervals/) | 50 |
| Non-overlapping Intervals | medium | [link](https://leetcode.com/problems/non-overlapping-intervals/) | 50 |
| Meeting Rooms II | medium | [link](https://leetcode.com/problems/meeting-rooms-ii/) | 50 |

## Definition of done
explain · implement independently · test green (`npm test`) · measure · document trade-offs

## Cadence
1. `npm run draw` (gacha) or pick a quest above.
2. Solve in `quests/intervals/<problem>.mjs` — 25 min easy / 40 min medium, timed.
3. `node --test quests/intervals/` green → commit → `npm run xp -- award <problem-id>`.
4. Re-implement the day's *structure* in `php/intervals/` (+150 XP).
5. Record a 3-min explain-back (+100 XP). Review due at day 1 / 7 / 30 (`npm run review`).
