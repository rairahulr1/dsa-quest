# Sliding Window

A contiguous subarray window that expands/contracts in O(n). Replaces nested subarray loops.

**Recognise the pattern when you see:** contiguous subarray · longest/shortest substring with a property · fixed-size window aggregates

**PHP SPL mapping:** SplDoublyLinkedList as the window

## Quests

| Problem | Difficulty | Link | XP |
|---|---|---|---|
| Longest Substring Without Repeating Characters | medium | [link](https://leetcode.com/problems/longest-substring-without-repeating-characters/) | 50 |
| Maximum Sum Subarray of Size K | easy | [link](https://neetcode.io/practice/practice/neetcode150) | 50 |
| Minimum Window Substring | hard | [link](https://leetcode.com/problems/minimum-window-substring/) | 50 |

## Definition of done
explain · implement independently · test green (`npm test`) · measure · document trade-offs

## Cadence
1. `npm run draw` (gacha) or pick a quest above.
2. Solve in `quests/sliding-window/<problem>.mjs` — 25 min easy / 40 min medium, timed.
3. `node --test quests/sliding-window/` green → commit → `npm run xp -- award <problem-id>`.
4. Re-implement the day's *structure* in `php/sliding-window/` (+150 XP).
5. Record a 3-min explain-back (+100 XP). Review due at day 1 / 7 / 30 (`npm run review`).
