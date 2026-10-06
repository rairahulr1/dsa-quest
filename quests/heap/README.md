# Heap / Priority Queue

O(log n) insert/extract for top-K and k-way merge problems. Min-heap by default.

**Recognise the pattern when you see:** top k · kth largest/smallest · merge k sorted streams · running median

**PHP SPL mapping:** SplHeap / SplPriorityQueue

## Quests

| Problem | Difficulty | Link | XP |
|---|---|---|---|
| Top K Frequent Elements | medium | [link](https://leetcode.com/problems/top-k-frequent-elements/) | 50 |
| Kth Largest Element in an Array | medium | [link](https://leetcode.com/problems/kth-largest-element-in-an-array/) | 50 |
| Merge K Sorted Lists | hard | [link](https://leetcode.com/problems/merge-k-sorted-lists/) | 50 |

## Definition of done
explain · implement independently · test green (`npm test`) · measure · document trade-offs

## Cadence
1. `npm run draw` (gacha) or pick a quest above.
2. Solve in `quests/heap/<problem>.mjs` — 25 min easy / 40 min medium, timed.
3. `node --test quests/heap/` green → commit → `npm run xp -- award <problem-id>`.
4. Re-implement the day's *structure* in `php/heap/` (+150 XP).
5. Record a 3-min explain-back (+100 XP). Review due at day 1 / 7 / 30 (`npm run review`).
