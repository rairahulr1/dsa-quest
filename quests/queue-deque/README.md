# Queue & Deque

FIFO for BFS and scheduling; deque for sliding-window maxima and double-ended scans.

**Recognise the pattern when you see:** level-order processing · task scheduling with cooldown · sliding max/min · first-in-first-out

**PHP SPL mapping:** SplQueue, SplDoublyLinkedList

## Quests

| Problem | Difficulty | Link | XP |
|---|---|---|---|
| Implement Queue using Stacks | easy | [link](https://leetcode.com/problems/implement-queue-using-stacks/) | 50 |
| Sliding Window Maximum | hard | [link](https://leetcode.com/problems/sliding-window-maximum/) | 50 |
| Task Scheduler | medium | [link](https://leetcode.com/problems/task-scheduler/) | 50 |

## Definition of done
explain · implement independently · test green (`npm test`) · measure · document trade-offs

## Cadence
1. `npm run draw` (gacha) or pick a quest above.
2. Solve in `quests/queue-deque/<problem>.mjs` — 25 min easy / 40 min medium, timed.
3. `node --test quests/queue-deque/` green → commit → `npm run xp -- award <problem-id>`.
4. Re-implement the day's *structure* in `php/queue-deque/` (+150 XP).
5. Record a 3-min explain-back (+100 XP). Review due at day 1 / 7 / 30 (`npm run review`).
