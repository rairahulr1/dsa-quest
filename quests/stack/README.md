# Stack

LIFO for nesting, matching, and "next greater" problems. O(1) push/pop with monotone variants.

**Recognise the pattern when you see:** bracket/parenthesis matching · nested structure · next greater/smaller element · undo history

**PHP SPL mapping:** SplStack

## Quests

| Problem | Difficulty | Link | XP |
|---|---|---|---|
| Valid Parentheses | easy | [link](https://leetcode.com/problems/valid-parentheses/) | 50 |
| Min Stack | medium | [link](https://leetcode.com/problems/min-stack/) | 50 |
| Next Greater Element I | easy | [link](https://leetcode.com/problems/next-greater-element-i/) | 50 |

## Definition of done
explain · implement independently · test green (`npm test`) · measure · document trade-offs

## Cadence
1. `npm run draw` (gacha) or pick a quest above.
2. Solve in `quests/stack/<problem>.mjs` — 25 min easy / 40 min medium, timed.
3. `node --test quests/stack/` green → commit → `npm run xp -- award <problem-id>`.
4. Re-implement the day's *structure* in `php/stack/` (+150 XP).
5. Record a 3-min explain-back (+100 XP). Review due at day 1 / 7 / 30 (`npm run review`).
