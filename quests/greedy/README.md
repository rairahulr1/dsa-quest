# Greedy

Make the locally optimal choice with a provable exchange argument. Greedy = DP where one choice dominates.

**Recognise the pattern when you see:** can/can't reach · optimal jump · interval scheduling · fewest refuels/stops

**PHP SPL mapping:** —

## Quests

| Problem | Difficulty | Link | XP |
|---|---|---|---|
| Jump Game | medium | [link](https://leetcode.com/problems/jump-game/) | 50 |
| Gas Station | medium | [link](https://leetcode.com/problems/gas-station/) | 50 |
| Assign Cookies | easy | [link](https://leetcode.com/problems/assign-cookies/) | 50 |

## Definition of done
explain · implement independently · test green (`npm test`) · measure · document trade-offs

## Cadence
1. `npm run draw` (gacha) or pick a quest above.
2. Solve in `quests/greedy/<problem>.mjs` — 25 min easy / 40 min medium, timed.
3. `node --test quests/greedy/` green → commit → `npm run xp -- award <problem-id>`.
4. Re-implement the day's *structure* in `php/greedy/` (+150 XP).
5. Record a 3-min explain-back (+100 XP). Review due at day 1 / 7 / 30 (`npm run review`).
