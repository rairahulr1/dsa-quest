# Trees & BFS

Level-order via queue; BST invariants via bounds. Recursion with returned state beats globals.

**Recognise the pattern when you see:** level-order output · BST validation · ancestor queries · shortest path in a tree

**PHP SPL mapping:** PHP classes + SplQueue for BFS

## Quests

| Problem | Difficulty | Link | XP |
|---|---|---|---|
| Binary Tree Level Order Traversal | medium | [link](https://leetcode.com/problems/binary-tree-level-order-traversal/) | 50 |
| Validate Binary Search Tree | medium | [link](https://leetcode.com/problems/validate-binary-search-tree/) | 50 |
| Lowest Common Ancestor of a BST | medium | [link](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/) | 50 |

## Definition of done
explain · implement independently · test green (`npm test`) · measure · document trade-offs

## Cadence
1. `npm run draw` (gacha) or pick a quest above.
2. Solve in `quests/trees-bfs/<problem>.mjs` — 25 min easy / 40 min medium, timed.
3. `node --test quests/trees-bfs/` green → commit → `npm run xp -- award <problem-id>`.
4. Re-implement the day's *structure* in `php/trees-bfs/` (+150 XP).
5. Record a 3-min explain-back (+100 XP). Review due at day 1 / 7 / 30 (`npm run review`).
