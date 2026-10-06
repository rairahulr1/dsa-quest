#!/usr/bin/env node
// CI oracle — JS half. Runs only awarded quests (see xp/ledger.json),
// so the scaffold's NOT IMPLEMENTED stubs never break CI.
// A green run means: every quest you claimed XP for still passes.
import { execSync } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { patterns } from '../data/quests.mjs';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const LEDGER = join(ROOT, 'xp', 'ledger.json');

const awarded = existsSync(LEDGER) ? JSON.parse(readFileSync(LEDGER, 'utf8')).awarded : {};
const byPattern = {};
for (const id of Object.keys(awarded)) {
  const p = patterns.flatMap((x) => x.problems).find((y) => y.id === id);
  if (!p) continue;
  const pat = patterns.find((x) => x.problems.some((y) => y.id === id));
  (byPattern[pat.id] = byPattern[pat.id] || []).push(id);
}

const ids = Object.keys(byPattern).flatMap((pat) => byPattern[pat].map((id) => `quests/${pat}/${id}.test.mjs`));
if (!ids.length) {
  console.log('CI oracle: no awarded quests yet — nothing to protect. Award XP with: npm run xp -- award <id>');
  process.exit(0);
}
try {
  execSync(`node --test ${ids.join(' ')}`, { cwd: ROOT, stdio: 'inherit' });
  console.log(`CI oracle: ${ids.length} awarded quests green.`);
} catch {
  console.error('CI oracle: an awarded quest regressed. Fix it before merging.');
  process.exit(1);
}
