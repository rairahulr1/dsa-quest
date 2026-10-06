# Trie

Prefix tree: O(L) insert/search. The wildcard variant adds DFS at the dot node.

**Recognise the pattern when you see:** prefix search · autocomplete · dictionary with wildcards · word search II

**PHP SPL mapping:** nested PHP arrays

## Quests

| Problem | Difficulty | Link | XP |
|---|---|---|---|
| Implement Trie (Prefix Tree) | medium | [link](https://leetcode.com/problems/implement-trie-prefix-tree/) | 50 |
| Word Search II | hard | [link](https://leetcode.com/problems/word-search-ii/) | 50 |
| Design Add and Search Words | medium | [link](https://leetcode.com/problems/design-add-and-search-words-data-structure/) | 50 |

## Definition of done
explain · implement independently · test green (`npm test`) · measure · document trade-offs

## Cadence
1. `npm run draw` (gacha) or pick a quest above.
2. Solve in `quests/trie/<problem>.mjs` — 25 min easy / 40 min medium, timed.
3. `node --test quests/trie/` green → commit → `npm run xp -- award <problem-id>`.
4. Re-implement the day's *structure* in `php/trie/` (+150 XP).
5. Record a 3-min explain-back (+100 XP). Review due at day 1 / 7 / 30 (`npm run review`).
