# Bit Manipulation

XOR cancels duplicates; shifts divide by two. Constant-space tricks for interviews.

**Recognise the pattern when you see:** single number · counting bits · power-of-two checks · xor properties

**PHP SPL mapping:** —

## Quests

| Problem | Difficulty | Link | XP |
|---|---|---|---|
| Single Number | easy | [link](https://leetcode.com/problems/single-number/) | 50 |
| Number of 1 Bits | easy | [link](https://leetcode.com/problems/number-of-1-bits/) | 50 |
| Counting Bits | easy | [link](https://leetcode.com/problems/counting-bits/) | 50 |

## Definition of done
explain · implement independently · test green (`npm test`) · measure · document trade-offs

## Cadence
1. `npm run draw` (gacha) or pick a quest above.
2. Solve in `quests/bit-manipulation/<problem>.mjs` — 25 min easy / 40 min medium, timed.
3. `node --test quests/bit-manipulation/` green → commit → `npm run xp -- award <problem-id>`.
4. Re-implement the day's *structure* in `php/bit-manipulation/` (+150 XP).
5. Record a 3-min explain-back (+100 XP). Review due at day 1 / 7 / 30 (`npm run review`).
