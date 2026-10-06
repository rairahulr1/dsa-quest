# Dynamic Programming

Optimal substructure + overlapping subproblems. Define state, recurrence, base; bottom-up beats recursion.

**Recognise the pattern when you see:** counting ways · optimisation with choices · knapsack-like · Fibonacci-like recurrence

**PHP SPL mapping:** —

## Quests

| Problem | Difficulty | Link | XP |
|---|---|---|---|
| Climbing Stairs | easy | [link](https://leetcode.com/problems/climbing-stairs/) | 50 |
| House Robber | medium | [link](https://leetcode.com/problems/house-robber/) | 50 |
| Coin Change | medium | [link](https://leetcode.com/problems/coin-change/) | 50 |

## Definition of done
explain · implement independently · test green (`npm test`) · measure · document trade-offs

## Cadence
1. `npm run draw` (gacha) or pick a quest above.
2. Solve in `quests/dp/<problem>.mjs` — 25 min easy / 40 min medium, timed.
3. `node --test quests/dp/` green → commit → `npm run xp -- award <problem-id>`.
4. Re-implement the day's *structure* in `php/dp/` (+150 XP).
5. Record a 3-min explain-back (+100 XP). Review due at day 1 / 7 / 30 (`npm run review`).
