# Binary Search

Halve the search space each step. Works on sorted data and on monotonic answer spaces.

**Recognise the pattern when you see:** sorted array + lookup · minimise maximum / maximise minimum · answer space is monotonic

**PHP SPL mapping:** —

## Quests

| Problem | Difficulty | Link | XP |
|---|---|---|---|
| Binary Search | easy | [link](https://leetcode.com/problems/binary-search/) | 50 |
| Search in Rotated Sorted Array | medium | [link](https://leetcode.com/problems/search-in-rotated-sorted-array/) | 50 |
| Koko Eating Bananas | medium | [link](https://leetcode.com/problems/koko-eating-bananas/) | 50 |

## Definition of done
explain · implement independently · test green (`npm test`) · measure · document trade-offs

## Cadence
1. `npm run draw` (gacha) or pick a quest above.
2. Solve in `quests/binary-search/<problem>.mjs` — 25 min easy / 40 min medium, timed.
3. `node --test quests/binary-search/` green → commit → `npm run xp -- award <problem-id>`.
4. Re-implement the day's *structure* in `php/binary-search/` (+150 XP).
5. Record a 3-min explain-back (+100 XP). Review due at day 1 / 7 / 30 (`npm run review`).
