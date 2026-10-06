# Linked List

Pointer manipulation: reverse, merge, detect cycles. Fast/slow pointers find middles and cycles.

**Recognise the pattern when you see:** reversal · merge sorted sequences · cycle detection · middle node

**PHP SPL mapping:** SplDoublyLinkedList

## Quests

| Problem | Difficulty | Link | XP |
|---|---|---|---|
| Reverse Linked List | easy | [link](https://leetcode.com/problems/reverse-linked-list/) | 50 |
| Merge Two Sorted Lists | easy | [link](https://leetcode.com/problems/merge-two-sorted-lists/) | 50 |
| Linked List Cycle | easy | [link](https://leetcode.com/problems/linked-list-cycle/) | 50 |

## Definition of done
explain · implement independently · test green (`npm test`) · measure · document trade-offs

## Cadence
1. `npm run draw` (gacha) or pick a quest above.
2. Solve in `quests/linked-list/<problem>.mjs` — 25 min easy / 40 min medium, timed.
3. `node --test quests/linked-list/` green → commit → `npm run xp -- award <problem-id>`.
4. Re-implement the day's *structure* in `php/linked-list/` (+150 XP).
5. Record a 3-min explain-back (+100 XP). Review due at day 1 / 7 / 30 (`npm run review`).
