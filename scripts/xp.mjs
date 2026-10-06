#!/usr/bin/env node
// XP oracle — awards XP only for evidence: green tests + a real commit.
// Usage:
//   npm run xp -- award <problem-id>            (DSA quest, +50)
//   npm run xp -- award <problem-id> --hinted   (+25)
//   npm run xp -- award <problem-id> --kind php (+150, runs the PHP test)
//   npm run xp -- award <ref> --kind explain|sd|boss [--note "..."]  (manual evidence)
//   npm run xp -- status
//   npm run xp -- review        (spaced repetition: day 1 / 7 / 30)
import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { patterns } from '../data/quests.mjs';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const LEDGER = join(ROOT, 'xp', 'ledger.json');
const LEVELS = ['Novice', 'Apprentice', 'Adept', 'Engineer', 'Senior', 'Architect'];

const allProblems = patterns.flatMap((p) => p.problems.map((pr) => ({ ...pr, pattern: p })));

function load() {
  if (!existsSync(LEDGER)) return { awarded: {}, log: [] };
  return JSON.parse(readFileSync(LEDGER, 'utf8'));
}
function save(data) {
  mkdirSync(dirname(LEDGER), { recursive: true });
  writeFileSync(LEDGER, JSON.stringify(data, null, 2));
}
function run(cmd) {
  try {
    return { ok: true, out: execSync(cmd, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }) };
  } catch (e) {
    return { ok: false, out: (e.stdout || '') + (e.stderr || '') };
  }
}
function findProblem(id) {
  return allProblems.find((p) => p.id === id);
}
function rootCommit() {
  return run('git rev-list --max-parents=0 HEAD').out.trim();
}
function isStillStub(problem) {
  const rel = `quests/${problem.pattern.id}/${problem.id}.mjs`;
  const root = rootCommit();
  if (!root) return true;
  const orig = run(`git show ${root}:${rel}`);
  const cur = run(`cat ${rel}`);
  return orig.ok && cur.ok && orig.out === cur.out;
}
function committedSinceScaffold(problem) {
  const rel = `quests/${problem.pattern.id}/${problem.id}.mjs`;
  const root = rootCommit();
  if (!root) return true;
  return run(`git log --oneline ${root}..HEAD -- ${rel}`).ok && run(`git log --oneline ${root}..HEAD -- ${rel}`).out.trim().length > 0;
}

function award(id, flags) {
  const problem = findProblem(id);
  if (!problem) {
    console.error(`Unknown quest: ${id}. Try one of: ${allProblems.map((p) => p.id).join(' ')}`);
    process.exit(1);
  }
  const kind = flags.kind || 'dsa';
  const data = load();
  if (data.awarded[id]) {
    console.log(`Already awarded: ${id} (${data.awarded[id].xp} XP on ${data.awarded[id].date}).`);
    return;
  }

  if (kind === 'dsa') {
    const testFile = `quests/${problem.pattern.id}/${problem.id}.test.mjs`;
    const t = run(`node --test ${testFile}`);
    if (!t.ok) {
      console.error(`Tests not green yet for ${id}:\n${t.out.split('\n').slice(-12).join('\n')}`);
      process.exit(1);
    }
    if (isStillStub(problem)) {
      console.error(`${id} is still the scaffold stub. Implement it first.`);
      process.exit(1);
    }
    if (!committedSinceScaffold(problem)) {
      console.error(`Commit ${id} before awarding XP (git add + git commit).`);
      process.exit(1);
    }
    const xp = flags.hinted ? 25 : 50;
    data.awarded[id] = { xp, date: today(), kind: 'dsa', pattern: problem.pattern.id };
    data.log.push({ date: today(), id, xp, kind: 'dsa' });
    save(data);
    console.log(`+${xp} XP — ${problem.title} (${problem.pattern.name}). Total: ${totalXP(data)} XP`);
  } else if (kind === 'php') {
    const t = run(`php php/${problem.pattern.id}/${problem.id}.test.php && echo PHP_OK`);
    if (!t.ok || !t.out.includes('PHP_OK')) {
      console.error(`PHP test not green for ${id}:\n${t.out.split('\n').slice(-12).join('\n')}`);
      process.exit(1);
    }
    if (!committedSinceScaffold(problem)) {
      console.error(`Commit the PHP port before awarding XP.`);
      process.exit(1);
    }
    data.awarded[id] = { xp: 150, date: today(), kind: 'php', pattern: problem.pattern.id };
    data.log.push({ date: today(), id, xp: 150, kind: 'php' });
    save(data);
    console.log(`+150 XP — PHP SPL port of ${problem.title}. Total: ${totalXP(data)} XP`);
  } else if (['explain', 'sd', 'boss'].includes(kind)) {
    const xp = kind === 'explain' ? 100 : kind === 'sd' ? 200 : 300;
    const note = flags.note || '(no note)';
    const ref = id;
    data.log.push({ date: today(), id: ref, xp, kind, note });
    if (kind === 'sd') data.awarded[ref] = { xp, date: today(), kind: 'sd' };
    save(data);
    console.log(`+${xp} XP — ${kind} quest: ${ref} (${note}). Total: ${totalXP(data)} XP`);
  } else {
    console.error(`Unknown kind: ${kind}`);
    process.exit(1);
  }
}

function totalXP(data) {
  return Object.values(data.awarded).reduce((s, a) => s + a.xp, 0) + data.log.filter((l) => !data.awarded[l.id] || data.awarded[l.id].xp !== l.xp || l.kind !== 'dsa').reduce((s, l) => (['explain', 'boss'].includes(l.kind) ? s + l.xp : s), 0);
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function status() {
  const data = load();
  const xp = totalXP(data);
  const level = Math.min(Math.floor(xp / 1000), LEVELS.length - 1);
  const solved = Object.keys(data.awarded).length;
  const weekAgo = new Date(Date.now() - 7 * 864e5).toISOString().slice(0, 10);
  const weekXP = data.log.filter((l) => l.date >= weekAgo).reduce((s, l) => s + l.xp, 0);
  console.log(`Level: ${LEVELS[level]} · Total: ${xp} XP · Quests solved: ${solved}/45`);
  console.log(`This week: ${weekXP} XP (target ≥800 on Standard tier)`);
  const byPattern = {};
  for (const id of Object.keys(data.awarded)) {
    const p = findProblem(id);
    if (p) byPattern[p.pattern.name] = (byPattern[p.pattern.name] || 0) + 1;
  }
  if (Object.keys(byPattern).length) console.log('By pattern:', byPattern);
}

function review() {
  const data = load();
  const now = new Date();
  const due = [];
  for (const [id, a] of Object.entries(data.awarded)) {
    if (a.kind !== 'dsa') continue;
    const solved = new Date(a.date);
    for (const offset of [1, 7, 30]) {
      const d = new Date(solved);
      d.setDate(d.getDate() + offset);
      if (d <= now && d > new Date(now.getTime() - 864e5 * 2)) {
        due.push({ id, offset, due: d.toISOString().slice(0, 10) });
        break;
      }
    }
  }
  if (!due.length) {
    console.log('No reviews due. Spaced repetition checks at day 1 / 7 / 30 after each solve.');
    return;
  }
  console.log('Reviews due (spaced repetition — day 1 / 7 / 30):');
  for (const d of due) {
    const p = findProblem(d.id);
    console.log(`  - ${d.id}: ${p ? p.title : d.id} (solved ${d.due}, +${d.offset}d)`);
  }
}

const [cmd, ...rest] = process.argv.slice(2);
const flags = {};
const positional = [];
for (const a of rest) {
  if (a.startsWith('--')) {
    const [k, v] = a.slice(2).split('=');
    flags[k] = v === undefined ? true : v;
  } else positional.push(a);
}
if (cmd === 'award') award(positional[0], flags);
else if (cmd === 'status') status();
else if (cmd === 'review') review();
else console.log('Usage: npm run xp -- [award <id> | status | review]');
