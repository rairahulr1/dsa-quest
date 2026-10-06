# Arrays & Two Pointers

Scan a linear structure with two indices instead of nested loops. O(n²) → O(n) on sorted input.

**Recognise the pattern when you see:** sorted array + pair/triplet search · in-place reordering · max area / container optimisation

**PHP SPL mapping:** plain arrays; two-index loops

## Quests

| Problem | Difficulty | Link | XP |
|---|---|---|---|
| Two Sum | easy | [link](https://leetcode.com/problems/two-sum/) | 50 |
| 3Sum | medium | [link](https://leetcode.com/problems/3sum/) | 50 |
| Container With Most Water | medium | [link](https://leetcode.com/problems/container-with-most-water/) | 50 |

## Definition of done
explain · implement independently · test green (`npm test`) · measure · document trade-offs

## Cadence
1. `npm run draw` (gacha) or pick a quest above.
2. Solve in `quests/arrays-two-pointers/<problem>.mjs` — 25 min easy / 40 min medium, timed.
3. `node --test quests/arrays-two-pointers/` green → commit → `npm run xp -- award <problem-id>`.
4. Re-implement the day's *structure* in `php/arrays-two-pointers/` (+150 XP).
5. Record a 3-min explain-back (+100 XP). Review due at day 1 / 7 / 30 (`npm run review`).
