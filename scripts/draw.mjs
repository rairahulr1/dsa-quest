#!/usr/bin/env node
// Gacha draw — picks today's quest. Prefers unsolved; 50/50 with due reviews.
// Usage: npm run draw [--pattern <pattern-id>] [--due]
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { patterns } from '../data/quests.mjs';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const LEDGER = join(ROOT, 'xp', 'ledger.json');

const flags = {};
const positional = [];
for (const a of process.argv.slice(2)) {
  if (a.startsWith('--')) {
    const [k, v] = a.slice(2).split('=');
    flags[k] = v === undefined ? true : v;
  } else positional.push(a);
}

const awarded = existsSync(LEDGER) ? JSON.parse(readFileSync(LEDGER, 'utf8')).awarded : {};

const all = patterns
  .filter((p) => !flags.pattern || p.id === flags.pattern)
  .flatMap((p) => p.problems.map((pr) => ({ ...pr, patternName: p.name, patternId: p.id })));

if (flags.pattern && all.length === 0) {
  console.error(`Unknown pattern: ${flags.pattern}. Try: ${patterns.map((p) => p.id).join(' ')}`);
  process.exit(1);
}

const due = Object.entries(awarded)
  .filter(([, a]) => a.kind === 'dsa')
  .map(([id, a]) => {
    const solved = new Date(a.date);
    const d = new Date(solved);
    d.setDate(d.getDate() + 1);
    const d7 = new Date(solved);
    d7.setDate(d7.getDate() + 7);
    const d30 = new Date(solved);
    d30.setDate(d30.getDate() + 30);
    const now = new Date();
    return d <= now || d7 <= now || d30 <= now ? id : null;
  })
  .filter(Boolean);

const unsolved = all.filter((p) => !awarded[p.id]);
const pool = flags.due ? due.map((id) => all.find((p) => p.id === id)).filter(Boolean)
  : due.length && Math.random() < 0.5 ? due.map((id) => all.find((p) => p.id === id)).filter(Boolean)
  : unsolved;

if (!pool.length) {
  console.log('All 45 quests solved. Switch to maintenance mode: one random review per day (npm run review).');
  process.exit(0);
}

const pick = pool[Math.floor(Math.random() * pool.length)];
const link = pick.leetcode ? `https://leetcode.com/problems/${pick.slug}/` : 'https://neetcode.io/practice/practice/neetcode150';

console.log('─'.repeat(56));
console.log(`🎲 QUEST DRAW — ${pick.patternName}`);
console.log('─'.repeat(56));
console.log(`Title:     ${pick.title} (${pick.difficulty})`);
console.log(`Quest:     quests/${pick.patternId}/${pick.id}.mjs`);
console.log(`Link:      ${link}`);
console.log(`Task:      ${pick.description}`);
console.log(`Time-box:  ${pick.difficulty === 'easy' ? '25' : '40'} minutes, timed`);
console.log(`XP:        50 (25 hinted) · +100 explain-back · +150 PHP port`);
console.log(`Energy:    −20 · Review due at day 1 / 7 / 30`);
console.log('─'.repeat(56));
console.log('Definition of done: explain · implement · test green · measure · document trade-offs');
