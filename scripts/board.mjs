#!/usr/bin/env node
// Creates the GitHub Projects board and one Issue per quest.
// Usage: node scripts/board.mjs
import { execFileSync } from 'node:child_process';
import { patterns } from '../data/quests.mjs';

const REPO = 'rairahulr1/dsa-quest';
const BOARD_NAME = 'DSA Quest Board';

function gh(args, opts = {}) {
  try {
    return { ok: true, out: execFileSync('gh', args, { encoding: 'utf8', ...opts }) };
  } catch (e) {
    return { ok: false, out: (e.stdout || '') + (e.stderr || '') };
  }
}

// ---------------------------------------------------------------- labels
const labels = [
  ['quest', 'a single quest from data/quests.mjs', '7057FC'],
  ['dsa', 'DSA pattern quest', '1D76DB'],
  ['php', 'PHP SPL re-implementation quest', '0E8A16'],
  ['sd', 'system design quest', 'A2EEEF'],
  ['boss-battle', 'timed mock interview', 'B60205'],
  ['setup', 'day-0 setup', 'D73A4A'],
  ['easy', 'easy quest', '0E8A16'],
  ['medium', 'medium quest', 'FBBC09'],
  ['hard', 'hard quest', 'B60205'],
];
for (const [name, desc, color] of labels) {
  const r = gh(['label', 'create', name, '--repo', REPO, '--description', desc, '--color', color]);
  if (!r.ok && !r.out.includes('already exist')) console.log(`label ${name}: ${r.out.trim()}`);
}

// ---------------------------------------------------------------- board
let board = null;
let noProjectScope = false;
const list = gh(['project', 'list', '--owner', '@me', '--format', 'json']);
if (list.ok) {
  try {
    const projects = JSON.parse(list.out);
    board = projects.find((p) => p.title === BOARD_NAME);
  } catch { /* parse error */ }
} else if (list.out.includes('missing required scopes')) {
  noProjectScope = true;
}
if (!board && !noProjectScope) {
  const r = gh(['project', 'create', '--title', BOARD_NAME, '--owner', '@me', '--format', 'json']);
  if (!r.ok) {
    console.error('Failed to create board:', r.out);
    process.exit(1);
  }
  board = JSON.parse(r.out);
}
if (board) console.log(`Board: ${board.title} — ${board.url}`);
else console.log('Board: SKIPPED (token missing read:project scope) — run `gh auth refresh -s read:project -s project`, then re-run this script.');

// ---------------------------------------------------------------- issues
// Idempotent: match existing open issues by exact title before creating.
let existingIssues = [];
{
  const r = gh(['issue', 'list', '--repo', REPO, '--state', 'open', '--limit', '100', '--json', 'number,url,title']);
  if (r.ok) {
    try { existingIssues = JSON.parse(r.out); } catch { /* ignore */ }
  }
}

function createIssue(title, body, labelList) {
  let issue = existingIssues.find((i) => i.title === title);
  if (!issue) {
    // gh 2.102: issue create prints the new issue URL on stdout (no --json).
    const r = gh(['issue', 'create', '--repo', REPO, '--title', title, '--body', body,
      '--label', labelList.join(',')]);
    if (!r.ok) {
      console.log(`  ✗ issue failed: ${title}\n    ${r.out.trim().split('\n')[0]}`);
      return null;
    }
    const url = r.out.trim().split('\n').pop().trim();
    const number = Number(url.split('/').pop());
    issue = { number, url, title };
  }
  if (board) {
    const add = gh(['project', 'item-add', String(board.number), '--owner', '@me', '--url', issue.url]);
    if (!add.ok) console.log(`  ✗ board add failed for #${issue.number}: ${add.out.trim().split('\n')[0]}`);
  }
  return issue;
}

const link = (p) => (p.leetcode ? `https://leetcode.com/problems/${p.slug}/` : 'https://neetcode.io/practice/practice/neetcode150');
let created = 0;
const failures = [];

// Setup quest
const setup = createIssue(
  '[Setup] Day 0 — quest board, baseline, rewards',
  `**Day 0 (90 min)** — from the approved plan (~\/.commandcode/plans/dsa-gamified-30day-sprint.md)

- [ ] Rewards chosen (self-set, per level)
- [ ] Baseline: 1 timed medium problem (calibration)
- [ ] Write all 6 system-design stories from memory (WAMA doc), then compare
- [ ] Verify quest board + CI oracle are green

XP: completion is its own reward. Streak starts tomorrow.`,
  ['setup']);
if (setup) created++; else failures.push('setup');

// DSA quests
for (const pat of patterns) {
  for (const p of pat.problems) {
    const title = `[DSA] ${p.title} — ${pat.name} (${p.difficulty})`;
    const body = `**Quest:** \`quests/${pat.id}/${p.id}.mjs\`
**Link:** ${link(p)}
**Task:** ${p.description}

**Time-box:** ${p.difficulty === 'easy' ? '25' : '40'} minutes, timed.
**XP:** 50 solved · 25 hinted · +100 recorded explain-back · +150 PHP SPL port (\`php/${pat.id}/${p.id}.php\`)
**Energy:** −20 · Review due at day 1 / 7 / 30 (\`npm run review\`)

**Definition of done:** explain · implement independently · test green (\`npm test\`) · measure · document trade-offs

**Cadence:**
1. Solve in \`quests/${pat.id}/${p.id}.mjs\`
2. \`node --test quests/${pat.id}/\` green → commit
3. \`npm run xp -- award ${p.id}\`
4. Port the structure to PHP SPL (+150 XP)
5. Record a 3-min explain-back (+100 XP)`;
    const issue = createIssue(title, body, ['quest', 'dsa', p.difficulty]);
    if (issue) created++; else failures.push(title);
  }
}

// System design topics (WAMA spine)
const sdTopics = [
  ['Multi-tenant SaaS architecture', 'the job portal — shared DB + scoped query layer, hybrid promotion', 'jobsearch/WAMA-SYSTEM-DESIGN-PREP.md §1'],
  ['Caching', 'Redis — TTL as backstop, invalidate on write, stampede/penetration', 'WAMA §2'],
  ['Database scaling', 'the honest ladder: fix query → index → replicas → cache → shard last', 'WAMA §3'],
  ['Async, queues, idempotency', 'LLM/WhatsApp workflows — idempotency keys, backoff + jitter, DLQ', 'WAMA §4'],
  ['API design', 'versioning, Idempotency-Key, token-bucket rate limiting, signed webhooks', 'WAMA §5'],
  ['Zero-downtime deployment', 'expand-and-contract; contract is its own deploy — your strongest story', 'WAMA §6'],
];
sdTopics.forEach(([topic, story, ref], i) => {
  const title = `[SD] Topic ${i + 1}: ${topic}`;
  const body = `**Rewrite this from memory first** (you rated it 0/10 — translation, not learning), then compare against \`${ref}\`.

**Your story:** ${story}

**Format every answer:** Problem → Options considered → Choice + why → What I'd do differently at 10× scale

**XP:** 200 · award with \`npm run xp -- award sd-topic-${i + 1} --kind sd --note "${topic}"\``;
  const issue = createIssue(title, body, ['quest', 'sd']);
  if (issue) created++; else failures.push(title);
});

// System design scenarios
const sdScenarios = [
  ['Charter/flight booking platform', 'inventory, booking, payments, Redis cache, queues — your domain (BookMyCharters-shaped). WRITE THIS ONE FULLY.'],
  ['Multi-tenant job portal', 'tenant isolation, scoped queries — your real shipped work. WRITE THIS ONE FULLY.'],
  ['URL shortener', 'hashing, lookup at scale, analytics'],
  ['Rate limiter', 'token bucket, per-client, 429 + Retry-After'],
  ['Notification system', 'SMS/WhatsApp/email fan-out, retries, DLQ'],
  ['Chat / messaging', 'WebSockets, presence, message history'],
  ['Ride/charter dispatch', 'matching, geolocation, real-time updates'],
  ['E-commerce cart + inventory', 'consistency, oversell prevention'],
  ['Video transcoding pipeline', 'async workers, object storage, status polling'],
  ['News feed', 'fan-out vs fan-in, caching hot reads'],
];
sdScenarios.forEach(([name, focus], i) => {
  const title = `[SD] Scenario ${i + 1}: ${name}`;
  const body = `**Focus:** ${focus}

**Format:** Problem → Options considered → Choice + why → What I'd do differently at 10× scale

Talk through all 10; write 2 full ones in Week 3 (the first two).

**XP:** 200 · award with \`npm run xp -- award sd-scenario-${i + 1} --kind sd --note "${name}"\``;
  const issue = createIssue(title, body, ['quest', 'sd']);
  if (issue) created++; else failures.push(title);
});

// Boss battles
const battles = [
  ['Week 1 (Day 7)', '2 easy/medium timed problems + record 1 explain-back (3 min).'],
  ['Week 2 (Day 14)', 'Mixed gacha draw (\`npm run draw --due\`), 2 problems, pattern labels hidden.'],
  ['Week 3 (Day 21)', '1 DSA mock (45 min) + 1 system-design mock (45 min), both recorded.'],
  ['Week 4 (Day 28)', '2 full mocks under interview conditions: 45 min DSA + 45 min system design, recorded.'],
];
battles.forEach(([when, what], i) => {
  const title = `[Boss Battle] ${when}`;
  const body = `${what}

**XP:** 300 · award with \`npm run xp -- award boss-${i + 1} --kind boss --note "${when}"\`

Simulate interview conditions: timer on, no notes, explain out loud.`;
  const issue = createIssue(title, body, ['quest', 'boss-battle']);
  if (issue) created++; else failures.push(title);
});

console.log(`\nDone: ${created} issues ${board ? 'created/updated and added to the board' : 'created/updated (board wiring pending token refresh)'}.`);
if (failures.length) console.log(`Failures: ${failures.length} — ${failures.slice(0, 5).join(' | ')}`);
if (noProjectScope) console.log('\nNext step: gh auth refresh -s read:project -s project   →   node scripts/board.mjs');
