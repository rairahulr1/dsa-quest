#!/usr/bin/env node
// Dashboard generator — emits docs/index.html, a gamified learning dashboard
// (HeyCoach-style module cards + progress, running the DSA Quest OS game layer
// from the plan: XP, levels, energy, boss battles, streaks) from the real
// quest data and XP ledger. Run: npm run dashboard
import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { patterns } from '../data/quests.mjs';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const LEDGER = join(ROOT, 'xp', 'ledger.json');
const OUT = join(ROOT, 'docs', 'index.html');

const LEVELS = ['Novice', 'Apprentice', 'Adept', 'Engineer', 'Senior', 'Architect'];
const XP_PER_LEVEL = 1000;

const ledger = JSON.parse(readFileSync(LEDGER, 'utf8'));
const awarded = ledger.awarded ?? {};
const log = ledger.log ?? [];

const allProblems = patterns.flatMap((p) => p.problems.map((pr) => ({ ...pr, pattern: p })));

const totalXp = Object.values(awarded).reduce((s, a) => s + a.xp, 0);
const countKind = (k) => Object.values(awarded).filter((a) => a.kind === k).length;
const xpKind = (k) => Object.values(awarded).filter((a) => a.kind === k).reduce((s, a) => s + a.xp, 0);

const dsaSolved = countKind('dsa');
const phpPorts = countKind('php');
const sdWrites = countKind('sd');
const bossWins = countKind('boss');
const explains = countKind('explain');

const levelIdx = Math.min(Math.floor(totalXp / XP_PER_LEVEL), LEVELS.length - 1);
const level = LEVELS[levelIdx];
const intoLevel = totalXp - levelIdx * XP_PER_LEVEL;
const pct = Math.round((intoLevel / XP_PER_LEVEL) * 100);
const maxLevel = levelIdx === LEVELS.length - 1;

// streak: consecutive days ending at the latest logged date
const days = [...new Set(log.map((e) => e.date))].sort();
let streak = 0;
if (days.length) {
  const set = new Set(days);
  const cursor = new Date(days[days.length - 1] + 'T00:00:00Z');
  for (;;) {
    const key = cursor.toISOString().slice(0, 10);
    if (!set.has(key)) break;
    streak++;
    cursor.setUTCDate(cursor.getUTCDate() - 1);
  }
}
const multiplier = Math.min(1 + 0.1 * streak, 2);

// weekly XP: last 7 days ending at the latest logged date
const weekXp = days.length
  ? log
      .filter((e) => e.date > new Date(new Date(days[days.length - 1] + 'T00:00:00Z').getTime() - 7 * 86400000).toISOString().slice(0, 10))
      .reduce((s, e) => s + e.xp, 0)
  : 0;

// growth chart: xp per day
const byDay = new Map();
for (const e of log) byDay.set(e.date, (byDay.get(e.date) ?? 0) + e.xp);
const growth = [...byDay.entries()].sort((a, b) => (a[0] < b[0] ? -1 : 1));
const maxDayXp = Math.max(1, ...growth.map(([, v]) => v));

// next quest: first unsolved problem
const next = allProblems.find((p) => !awarded[p.id]);

const shareText = 'DSA Quest OS — my gamified DSA + system-design sprint: ' + dsaSolved + '/45 problems solved, ' + totalXp + ' XP, Level ' + level + ' (' + streak + 'd streak). XP for evidence, never for consumption.';
const ogTitle = 'My DSA sprint — ' + dsaSolved + '/45 solved · ' + totalXp + ' XP · Level ' + level;

function remoteBase() {
  try {
    const url = execSync('git config --get remote.origin.url', { cwd: ROOT, encoding: 'utf8' }).trim();
    const m = url.match(/github\.com[:/]([^/]+\/[^/.]+)/);
    if (m) return 'https://github.com/' + m[1];
  } catch {}
  return '';
}
const GH = remoteBase();
const gh = (path) => (GH ? GH + '/blob/main/' + path : path);

const SD_TOPICS = [
  'Multi-tenant SaaS architecture',
  'Caching — stampede & penetration',
  'DB scaling ladder',
  'Async queues & idempotency',
  'API design — versioning, rate limiting, webhooks',
  'Zero-downtime deploy (expand-and-contract)',
];
const SD_SCENARIOS = [
  'Charter / flight booking platform — inventory, booking, payments, Redis, queues',
  'Multi-tenant job portal — real shipped work',
  'URL shortener — canonical warm-up',
  'Rate limiter — token bucket, per-client',
  'Notification system — SMS/WhatsApp/email fan-out, retries, DLQ',
  'Chat / messaging — WebSockets, presence, history',
  'Ride / charter dispatch — matching, geolocation, real-time',
  'E-commerce cart + inventory — consistency, oversell prevention',
  'Video transcoding pipeline — async workers, S3, status polling',
  'News feed — fan-out vs fan-in, caching hot reads',
];
const BOSSES = [
  { day: 7, name: 'Boss Battle I', desc: '2 easy/medium problems, timed, interview conditions.' },
  { day: 14, name: 'Boss Battle II', desc: 'Mixed random draw — pattern labels hidden (gacha).' },
  { day: 21, name: 'Boss Battle III', desc: '1 DSA + 1 system-design mock, recorded explain-back.' },
  { day: 28, name: 'Boss Battle IV', desc: 'Full mock under interview conditions. Weak-pattern retries.' },
];

const DIFF = {
  easy: { label: 'EASY', cls: 'text-emerald-300 border-emerald-500/40 bg-emerald-500/10' },
  medium: { label: 'MEDIUM', cls: 'text-amber-300 border-amber-500/40 bg-amber-500/10' },
  hard: { label: 'HARD', cls: 'text-rose-300 border-rose-500/40 bg-rose-500/10' },
};

function bar(pct, color = 'emerald') {
  return (
    '<div class="h-2 w-full rounded-full bg-white/10 overflow-hidden">' +
    '<div class="h-full rounded-full bg-gradient-to-r from-' + color + '-500 to-' + color + '-300 transition-all duration-700" style="width:' + pct + '%"></div>' +
    '</div>'
  );
}

function patternCard(p, i) {
  const solved = p.problems.filter((pr) => awarded[pr.id]).length;
  const phpDone = Object.values(awarded).some((a) => a.kind === 'php' && a.pattern === p.id);
  const open = i === 0 ? '' : ' hidden';
  const chev = i === 0 ? 'rotate(180deg)' : '';
  const rows = p.problems
    .map((pr) => {
      const d = DIFF[pr.difficulty];
      const a = awarded[pr.id];
      const lc = pr.slug ? 'https://leetcode.com/problems/' + pr.slug + '/' : null;
      const status = a
        ? '<span class="inline-flex items-center gap-1 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-300">SOLVED +' + a.xp + ' XP</span>'
        : '<span class="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] font-semibold text-slate-400">LOCKED</span>';
      const link = lc ? '<a class="text-cyan-300 hover:text-cyan-100 hover:underline" href="' + lc + '" target="_blank" rel="noopener">LeetCode ' + (pr.leetcode ? '#' + pr.leetcode : '') + ' ↗</a>' : '<span class="text-slate-500 text-xs">' + (pr.source ?? 'NeetCode') + '</span>';
      return (
        '<li class="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 ' + (a ? 'border-emerald-500/20' : '') + '">' +
        '<span class="font-mono text-xs text-slate-500 w-6">' + (p.problems.indexOf(pr) + 1) + '.</span>' +
        '<div class="min-w-0 flex-1"><div class="font-semibold text-slate-100">' + pr.title + '</div>' +
        '<div class="text-xs text-slate-400 mt-0.5">' + pr.description + '</div></div>' +
        '<span class="rounded-full border px-2.5 py-0.5 text-[11px] font-bold tracking-wider ' + d.cls + '">' + d.label + '</span>' +
        link + status + '</li>'
      );
    })
    .join('');
  return (
    '<div class="rounded-2xl border border-white/10 bg-[#0d1424]/80 backdrop-blur overflow-hidden">' +
    '<button type="button" class="acc-btn group flex w-full flex-wrap items-center gap-x-5 gap-y-2 px-5 py-4 text-left hover:bg-white/[0.03] transition">' +
    '<span class="font-mono text-xs text-slate-500">P' + String(i + 1).padStart(2, '0') + '</span>' +
    '<div class="min-w-0 flex-1"><div class="font-bold text-slate-100 group-hover:text-cyan-200 transition">' + p.name + '</div>' +
    '<div class="text-xs text-slate-400 mt-0.5">' + p.summary + '</div></div>' +
    (phpDone ? '<span class="rounded-full border border-cyan-500/40 bg-cyan-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-cyan-300">PHP SPL ✓</span>' : '') +
    '<span class="text-xs font-mono text-slate-400">' + solved + '/3</span>' +
    '<svg class="acc-chev h-4 w-4 text-slate-400 transition-transform" style="transform:' + chev + '" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd"/></svg>' +
    '</button>' +
    '<div class="acc-body' + open + ' border-t border-white/5 px-5 py-4">' +
    '<div class="mb-4 flex flex-wrap items-center gap-2">' +
    p.triggers.map((t) => '<span class="rounded-full bg-violet-500/10 border border-violet-500/30 px-2.5 py-1 text-[11px] text-violet-200">' + t + '</span>').join('') +
    '<span class="rounded-full bg-slate-500/10 border border-slate-500/30 px-2.5 py-1 text-[11px] text-slate-300">PHP 8: ' + p.php + '</span>' +
    '</div>' +
    '<ul class="space-y-2">' + rows + '</ul>' +
    '</div></div>'
  );
}

function moduleCard(icon, tint, title, sub, done, total, link) {
  const pct = total ? Math.round((done / total) * 100) : 0;
  return (
    '<a href="' + link + '" class="group block rounded-2xl border border-white/10 bg-[#0d1424]/80 p-5 hover:border-' + tint + '-400/40 hover:bg-[#101a2e] transition-all hover:-translate-y-0.5">' +
    '<div class="flex items-start justify-between">' +
    '<div class="flex h-11 w-11 items-center justify-center rounded-xl bg-' + tint + '-500/10 border border-' + tint + '-500/30 text-' + tint + '-300">' + icon + '</div>' +
    '<span class="font-mono text-xs text-slate-400">' + done + '<span class="text-slate-600">/</span>' + total + '</span>' +
    '</div>' +
    '<h3 class="mt-4 font-bold text-slate-100 group-hover:text-' + tint + '-200 transition">' + title + '</h3>' +
    '<p class="mt-1 text-xs text-slate-400">' + sub + '</p>' +
    '<div class="mt-4">' + bar(pct, tint) + '</div>' +
    '<div class="mt-2 flex justify-between text-[11px] font-mono text-slate-500"><span>' + pct + '% complete</span><span class="opacity-0 group-hover:opacity-100 transition text-' + tint + '-300">OPEN →</span></div>' +
    '</a>'
  );
}

const iconBook = '<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>';
const iconLayers = '<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>';
const iconCode = '<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 18l6-6-6-6"/><path d="M8 6l-6 6 6 6"/></svg>';
const iconSword = '<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.5 17.5L3 6V3h3l11.5 11.5"/><path d="M13 19l6-6"/><path d="M16 16l4 4"/><path d="M19 21l2-2"/></svg>';
const iconMic = '<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10a7 7 0 0014 0"/><path d="M12 19v3"/></svg>';
const iconShield = '<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>';

const RING_C = 2 * Math.PI * 52;

const growthBars = growth
  .map(
    ([d, v]) =>
      '<div class="flex-1 h-full flex flex-col justify-end items-center gap-1 group">' +
      '<div class="w-full max-w-[42px] rounded-t-md bg-gradient-to-t from-emerald-600 to-cyan-400 transition-all hover:from-emerald-400 hover:to-cyan-300" style="height:' + Math.max(4, Math.round((v / maxDayXp) * 100)) + '%" title="' + d + ': +' + v + ' XP"></div>' +
      '<div class="text-[10px] font-mono text-slate-500">' + d.slice(5) + '</div>' +
      '</div>'
  )
  .join('');

const KIND_META = {
  dsa: { label: 'DSA problems', color: 'emerald', xp: xpKind('dsa'), n: countKind('dsa') },
  php: { label: 'PHP SPL ports', color: 'cyan', xp: xpKind('php'), n: countKind('php') },
  explain: { label: 'Explain-backs', color: 'sky', xp: xpKind('explain'), n: countKind('explain') },
  sd: { label: 'System design', color: 'violet', xp: xpKind('sd'), n: countKind('sd') },
  boss: { label: 'Boss battles', color: 'fuchsia', xp: xpKind('boss'), n: countKind('boss') },
};
const breakdown = Object.values(KIND_META)
  .map(
    (k) =>
      '<div class="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3">' +
      '<span class="h-2.5 w-2.5 rounded-full bg-' + k.color + '-400"></span>' +
      '<div class="flex-1"><div class="text-sm font-semibold text-slate-200">' + k.label + '</div>' +
      '<div class="text-[11px] font-mono text-slate-500">' + k.n + ' evidence entries</div></div>' +
      '<div class="font-mono text-sm font-bold text-' + k.color + '-300">' + k.xp + ' XP</div></div>'
  )
  .join('');

const sdTopicCards = SD_TOPICS.map((t, i) => {
  const a = Object.values(awarded).find((x) => x.kind === 'sd' && x.id === 'sd-topic-' + (i + 1));
  return (
    '<div class="rounded-2xl border border-white/10 bg-[#0d1424]/80 p-5 ' + (a ? 'border-violet-500/30' : '') + '">' +
    '<div class="flex items-start justify-between gap-3">' +
    '<div><div class="font-mono text-[11px] text-violet-400">TOPIC ' + (i + 1) + '</div>' +
    '<h3 class="mt-1 font-bold text-slate-100">' + t + '</h3></div>' +
    (a ? '<span class="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-300">WRITTEN</span>' : '<span class="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] font-semibold text-slate-400">WAMA FORMAT</span>') +
    '</div>' +
    '<p class="mt-3 text-xs leading-relaxed text-slate-400">Problem → Options → Choice + why → What I would do at 10×.</p>' +
    '<a class="mt-3 inline-block text-xs font-semibold text-cyan-300 hover:text-cyan-100 hover:underline" href="' + gh('docs/system-design/QUESTS.md') + '" target="_blank" rel="noopener">Open template ↗</a>' +
    '</div>'
  );
}).join('');

const sdScenarioCards = SD_SCENARIOS.map((s, i) => {
  const a = Object.values(awarded).find((x) => x.kind === 'sd' && x.id === 'sd-scenario-' + (i + 1));
  return (
    '<li class="rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 flex items-center gap-3 ' + (a ? 'border-violet-500/20' : '') + '">' +
    '<span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 border border-violet-500/30 font-mono text-[11px] font-bold text-violet-300">' + (i + 1) + '</span>' +
    '<div class="flex-1 text-sm text-slate-300">' + s + '</div>' +
    (a ? '<span class="text-emerald-300 text-xs font-semibold">✓</span>' : '<span class="text-slate-600 text-xs font-mono">200 XP</span>') +
    '</li>'
  );
}).join('');

const bossCards = BOSSES.map((b, i) => {
  const a = Object.values(awarded).find((x) => x.kind === 'boss' && (x.id === 'boss-' + (i + 1) || x.id === 'boss-day-' + b.day));
  return (
    '<div class="rounded-2xl border p-5 ' + (a ? 'border-fuchsia-500/40 bg-fuchsia-500/[0.06]' : 'border-white/10 bg-[#0d1424]/80') + '">' +
    '<div class="flex items-center justify-between">' +
    '<span class="rounded-full bg-fuchsia-500/10 border border-fuchsia-500/30 px-2.5 py-0.5 font-mono text-[11px] font-bold text-fuchsia-300">DAY ' + b.day + '</span>' +
    (a ? '<span class="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-300">VICTORY +300</span>' : '<span class="text-[11px] font-mono text-slate-500">+300 XP</span>') +
    '</div>' +
    '<h3 class="mt-3 font-bold text-lg text-slate-100">' + b.name + '</h3>' +
    '<p class="mt-1 text-xs text-slate-400">' + b.desc + '</p>' +
    '<div class="mt-3">' + bar(a ? 100 : 0, 'fuchsia') + '</div>' +
    '</div>'
  );
}).join('');

const patternAccordions = patterns.map(patternCard).join('');

const questRows = allProblems
  .map((p, i) => {
    const d = DIFF[p.difficulty];
    const a = awarded[p.id];
    return (
      '<tr class="' + (a ? 'bg-emerald-500/[0.04]' : '') + ' border-t border-white/5">' +
      '<td class="px-4 py-2.5 font-mono text-xs text-slate-500">' + String(i + 1).padStart(2, '0') + '</td>' +
      '<td class="px-4 py-2.5 font-semibold text-slate-200">' + p.title + '</td>' +
      '<td class="px-4 py-2.5 text-xs text-slate-400">' + p.pattern.name + '</td>' +
      '<td class="px-4 py-2.5"><span class="rounded-full border px-2 py-0.5 text-[10px] font-bold tracking-wider ' + d.cls + '">' + d.label + '</span></td>' +
      '<td class="px-4 py-2.5 text-xs font-mono text-slate-400">' + (a ? '+50' : '—') + '</td>' +
      '<td class="px-4 py-2.5">' + (a ? '<span class="text-emerald-300 text-xs font-semibold">SOLVED</span>' : '<span class="text-slate-600 text-xs">LOCKED</span>') + '</td>' +
      '</tr>'
    );
  })
  .join('');

const html = '<!doctype html>' +
  '<html lang="en">' +
  '<head>' +
  '<meta charset="utf-8"/>' +
  '<meta name="viewport" content="width=device-width, initial-scale=1"/>' +
  '<title>DSA Quest OS — Gamified Learning Dashboard</title>' +
  '<meta name="description" content="Gamified DSA + system-design sprint. XP for evidence, never for consumption."/>' +
  '<link rel="canonical" href="https://dsa-quest.rairahulr1.com/"/>' +
  '<meta property="og:site_name" content="DSA Quest OS"/>' +
  '<meta property="og:title" content="DSA Quest OS — ' + ogTitle + '"/>' +
  '<meta property="og:description" content="' + shareText + '"/>' +
  '<meta property="og:type" content="website"/>' +
  '<meta property="og:url" content="https://dsa-quest.rairahulr1.com/"/>' +
  '<meta property="og:image" content="https://dsa-quest.rairahulr1.com/og.png"/>' +
  '<meta name="twitter:card" content="summary_large_image"/>' +
  '<script src="https://cdn.tailwindcss.com"></script>' +
  '<link rel="preconnect" href="https://fonts.googleapis.com"/><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>' +
  '<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet"/>' +
  '<script>tailwind.config = { theme: { extend: { fontFamily: { display: ["Space Grotesk", "sans-serif"], mono: ["JetBrains Mono", "monospace"] } } } }</script>' +
  '<style>' +
  'body { font-family: "Space Grotesk", ui-sans-serif, system-ui, sans-serif; }' +
  '.bg-grid { background-image: linear-gradient(rgba(148,163,184,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.05) 1px, transparent 1px); background-size: 44px 44px; }' +
  '.glow { box-shadow: 0 0 40px -8px rgba(16,185,129,0.35); }' +
  '::-webkit-scrollbar { width: 10px; height: 10px; }' +
  '::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 8px; }' +
  '.acc-body { transition: opacity .25s ease; }' +
  '@keyframes floaty { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }' +
  '.floaty { animation: floaty 5s ease-in-out infinite; }' +
  '</style>' +
  '</head>' +
  '<body class="bg-[#070b14] text-slate-200 antialiased">' +
  '<div class="fixed inset-0 bg-grid pointer-events-none"></div>' +

  // ---------- sidebar ----------
  '<aside class="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-white/10 bg-[#0a101d]/95 backdrop-blur lg:flex">' +
  '<div class="flex items-center gap-3 px-5 py-5 border-b border-white/10">' +
  '<div class="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 font-mono font-bold text-[#070b14]">DQ</div>' +
  '<div><div class="font-bold tracking-tight text-slate-100">DSA QUEST OS</div>' +
  '<div class="text-[10px] font-mono text-emerald-400">30-DAY SPRINT · RUNWAY MODE</div></div>' +
  '</div>' +
  '<nav class="flex-1 space-y-1 px-3 py-4 overflow-y-auto">' +
  navItem('#overview', 'Overview', true) +
  navItem('#quest-bank', 'Quest Bank', false) +
  navItem('#system-design', 'System Design', false) +
  navItem('#boss-battles', 'Boss Battles', false) +
  navItem('#performance', 'Performance', false) +
  '<div class="px-3 pt-6 pb-2 text-[10px] font-mono tracking-widest text-slate-500">NPC DELEGATION</div>' +
  '<div class="mx-1 rounded-xl border border-white/10 bg-white/[0.02] p-3 text-xs text-slate-400">' +
  '<div class="flex items-center gap-2 text-slate-200 font-semibold"><span class="h-2 w-2 rounded-full bg-cyan-400"></span>Claude Code</div>' +
  '<div class="mt-1">quest-giver · daily gacha draw · solution review · spaced-repetition scheduler (day 1 / 7 / 30)</div>' +
  '</div>' +
  '<div class="px-3 pt-6 pb-2 text-[10px] font-mono tracking-widest text-slate-500">ENERGY — 100/DAY</div>' +
  '<div class="mx-1 rounded-xl border border-white/10 bg-white/[0.02] p-3">' +
  bar(100, 'amber') +
  '<div class="mt-2 space-y-1 text-[11px] font-mono text-slate-500">' +
  '<div>problem <span class="text-amber-300">−20</span></div>' +
  '<div>spaced review <span class="text-amber-300">−10</span></div>' +
  '<div>mock <span class="text-amber-300">−40</span></div>' +
  '<div class="pt-1 text-slate-600">0 energy → reviews only</div>' +
  '</div></div>' +
  '</nav>' +
  '<div class="border-t border-white/10 p-4 text-[10px] font-mono leading-relaxed text-slate-600">' +
  'GAME DNA — tasks → quests · API budget → energy · productivity → XP · performance → rewards · managers → delegation' +
  '</div>' +
  '</aside>' +

  // ---------- main column ----------
  '<div class="lg:pl-64 relative">' +
  '<header class="sticky top-0 z-30 border-b border-white/10 bg-[#070b14]/85 backdrop-blur">' +
  '<div class="flex flex-wrap items-center gap-x-4 gap-y-2 px-5 py-3.5">' +
  '<div class="lg:hidden flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 font-mono font-bold text-[#070b14] text-sm">DQ</div>' +
  '<div class="min-w-0 flex-1"><div class="text-[11px] font-mono text-slate-500">HEYCOACH-STYLE LEARNING DASHBOARD</div>' +
  '<h1 class="font-bold tracking-tight text-slate-100">Overview · Learning Dashboard</h1></div>' +
  (next
    ? '<a href="' + gh('quests/' + next.pattern.id + '/' + next.id + '.mjs') + '" class="glow floaty inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-5 py-2.5 text-sm font-bold text-[#04120b] hover:brightness-110 transition">' +
      'RESUME QUEST — ' + next.title.toUpperCase() + ' ↗</a>'
    : '<span class="glow inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-5 py-2.5 text-sm font-bold text-[#04120b]">ALL QUESTS COMPLETE — MAINTENANCE MODE</span>') +
  '<div class="flex items-center gap-2">' +
  '<span class="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-mono"><span class="text-slate-500">LVL</span> <span class="font-bold text-emerald-300">' + level.toUpperCase() + '</span></span>' +
  '<span class="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-mono"><span class="text-slate-500">XP</span> <span class="font-bold text-cyan-300" data-count="' + totalXp + '">' + totalXp + '</span></span>' +
  '<span class="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-mono"><span class="text-slate-500">STREAK</span> <span class="font-bold text-amber-300">' + streak + 'd ×' + multiplier.toFixed(1) + '</span></span>' +
  '</div>' +
  '<div class="flex items-center gap-1.5">' +
  '<button type="button" onclick="share(\'linkedin\')" title="Share on LinkedIn" aria-label="Share on LinkedIn" class="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] hover:border-sky-400/50 hover:bg-sky-500/10 transition"><svg viewBox="0 0 24 24" class="h-5 w-5"><rect width="24" height="24" rx="5" fill="#0A66C2"/><text x="12" y="17.2" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="13.5" font-weight="700" fill="#fff">in</text></svg></button>' +
  '<button type="button" onclick="share(\'reddit\')" title="Share on Reddit" aria-label="Share on Reddit" class="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] hover:border-orange-400/50 hover:bg-orange-500/10 transition"><svg viewBox="0 0 24 24" class="h-5 w-5"><circle cx="12" cy="13.6" r="6.4" fill="#FF4500"/><circle cx="9.7" cy="13" r="1.05" fill="#fff"/><circle cx="14.3" cy="13" r="1.05" fill="#fff"/><path d="M8.2 9.4 6.3 5.7M15.8 9.4l1.9-3.7" stroke="#FF4500" stroke-width="1.5" stroke-linecap="round"/><circle cx="5.9" cy="5" r="1.25" fill="#FF4500"/><circle cx="18.1" cy="5" r="1.25" fill="#FF4500"/><circle cx="7" cy="14.6" r="1.35" fill="#FF4500"/><circle cx="17" cy="14.6" r="1.35" fill="#FF4500"/><path d="M9.6 16.9q2.4 1.5 4.8 0" stroke="#fff" stroke-width="1.1" fill="none" stroke-linecap="round"/></svg></button>' +
  '</div>' +
  '</div>' +
  '</header>' +

  '<main class="px-5 py-6 space-y-10 max-w-[1400px]">' +

  // ---------- overview ----------
  '<section id="overview">' +
  '<div class="grid gap-5 xl:grid-cols-[320px_1fr]">' +
  // level ring card
  '<div class="rounded-2xl border border-white/10 bg-[#0d1424]/80 p-6 flex flex-col items-center text-center">' +
  '<div class="relative">' +
  '<svg width="140" height="140" viewBox="0 0 120 120" class="-rotate-90">' +
  '<circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="9"/>' +
  '<circle cx="60" cy="60" r="52" fill="none" stroke="url(#lvlgrad)" stroke-width="9" stroke-linecap="round" stroke-dasharray="' + RING_C + '" stroke-dashoffset="' + (RING_C * (1 - pct / 100)).toFixed(1) + '"/>' +
  '<defs><linearGradient id="lvlgrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#34d399"/><stop offset="100%" stop-color="#22d3ee"/></linearGradient></defs>' +
  '</svg>' +
  '<div class="absolute inset-0 flex flex-col items-center justify-center">' +
  '<div class="font-mono text-[10px] tracking-widest text-slate-500">LEVEL</div>' +
  '<div class="font-bold text-2xl text-slate-100 -mt-0.5">' + level + '</div>' +
  '<div class="font-mono text-[10px] text-emerald-400">' + (maxLevel ? 'MAX LEVEL' : pct + '% → ' + LEVELS[levelIdx + 1]) + '</div>' +
  '</div></div>' +
  '<div class="mt-4 text-sm text-slate-400"><span class="font-mono font-bold text-slate-100">' + intoLevel + '</span> / ' + XP_PER_LEVEL + ' XP to ' + (maxLevel ? 'max' : LEVELS[levelIdx + 1]) + '</div>' +
  '<div class="mt-1 text-[11px] font-mono text-slate-500">every 1,000 XP · ' + LEVELS.join(' → ') + '</div>' +
  '</div>' +
  // stat cards
  '<div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 content-start">' +
  statCard('TOTAL XP', totalXp, 'emerald', 'evidence only — consumption pays 0') +
  statCard('QUESTS SOLVED', dsaSolved + ' / 45', 'cyan', '15 patterns · 3 problems each') +
  statCard('WEEKLY XP', weekXp, 'amber', 'target ≥ 800 XP on Standard tier') +
  statCard('DAY STREAK', streak, 'rose', '×' + multiplier.toFixed(1) + ' XP multiplier (cap ×2)') +
  statCard('PHP SPL PORTS', phpPorts + ' / 15', 'violet', 'structure re-implementation · +150 each') +
  statCard('EXPLAIN-BACKS', explains, 'sky', '3-min recorded Feynman · +100 each') +
  '</div>' +
  '</div>' +

  '<h2 class="mt-8 mb-4 font-mono text-[11px] tracking-widest text-slate-500">LEARNING MODULES</h2>' +
  '<div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">' +
  moduleCard(iconBook, 'emerald', 'DSA Quest Bank', '15 patterns · 45 problems · Blind 75 spine', dsaSolved, 45, '#quest-bank') +
  moduleCard(iconLayers, 'violet', 'System Design', '6 WAMA topics · 10 practice scenarios', sdWrites, 16, '#system-design') +
  moduleCard(iconCode, 'cyan', 'PHP SPL Transfer', 're-implement the day\'s structure in PHP 8', phpPorts, 15, '#quest-bank') +
  moduleCard(iconSword, 'fuchsia', 'Boss Battles', 'timed mocks under interview conditions', bossWins, 4, '#boss-battles') +
  moduleCard(iconMic, 'sky', 'Explain-back Lab', 'recorded 3-min solutions — the interview skill', explains, Math.max(explains, 1), '#boss-battles') +
  moduleCard(iconShield, 'amber', 'CI Oracle', 'GitHub Actions re-runs every awarded quest', 1, 1, gh('.github/workflows')) +
  '</div>' +

  // growth preview + dna engine
  '<div class="mt-5 grid gap-5 xl:grid-cols-2">' +
  '<div class="rounded-2xl border border-white/10 bg-[#0d1424]/80 p-6">' +
  '<div class="flex items-center justify-between"><h3 class="font-bold text-slate-100">Growth Graph</h3><span class="font-mono text-[11px] text-slate-500">XP PER DAY</span></div>' +
  '<div class="mt-5 flex items-stretch gap-2 h-40">' + (growthBars || '<div class="text-sm text-slate-500">No XP logged yet — solve a quest to start the graph.</div>') + '</div>' +
  '</div>' +
  '<div class="rounded-2xl border border-white/10 bg-gradient-to-br from-violet-500/[0.08] to-cyan-500/[0.05] p-6">' +
  '<h3 class="font-bold text-slate-100">The DNA Engine</h3>' +
  '<p class="mt-1 text-xs text-slate-400">Why this dashboard gamifies — the Rahul-DNA mapping that makes the engagement engine work:</p>' +
  '<div class="mt-4 grid gap-2 text-xs">' +
  dnaRow('Tasks', 'Quests', 'one GitHub Issue per quest, drawn by gacha') +
  dnaRow('API budget', 'Energy', '100/day — forces spaced repetition, zero → reviews only') +
  dnaRow('Productivity', 'XP', 'awarded for evidence only: green test + commit') +
  dnaRow('Performance', 'Rewards', 'self-set treats at each level — set them Day 0') +
  dnaRow('Managers', 'Delegation', 'Claude Code NPC draws, reviews, schedules reviews') +
  '</div>' +
  '<div class="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/[0.06] px-4 py-3 text-xs text-emerald-200"><span class="font-bold">CORE RULE:</span> XP for evidence, never for consumption. Watching a video = 0 XP. Committed, tested, documented solution = XP.</div>' +
  '</div>' +
  '</div>' +
  '</section>' +

  // ---------- quest bank ----------
  '<section id="quest-bank">' +
  '<div class="mb-4 flex flex-wrap items-end justify-between gap-3">' +
  '<div><h2 class="text-xl font-bold tracking-tight text-slate-100">Quest Bank — 15 Patterns</h2>' +
  '<p class="mt-1 text-sm text-slate-400">Memorize the pattern trigger, not the problem. JS/TS first, then PHP 8 SPL re-implementation of the day\'s structure (+150 XP, top 20).</p></div>' +
  '<span class="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-xs text-slate-400">' + dsaSolved + ' / 45 solved · ' + Math.round((dsaSolved / 45) * 100) + '%</span>' +
  '</div>' +
  '<div class="space-y-3">' + patternAccordions + '</div>' +
  '</section>' +

  // ---------- system design ----------
  '<section id="system-design">' +
  '<div class="mb-4"><h2 class="text-xl font-bold tracking-tight text-slate-100">System Design — WAMA Format</h2>' +
  '<p class="mt-1 text-sm text-slate-400">Problem → Options → Choice + why → What I\'d do at 10×. Day 0: rewrite all six from memory. Each write-up = <span class="text-violet-300 font-semibold">200 XP</span>.</p></div>' +
  '<div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">' + sdTopicCards + '</div>' +
  '<h3 class="mt-8 mb-3 font-mono text-[11px] tracking-widest text-slate-500">PRACTICE SCENARIOS — TALK THROUGH ALL, WRITE 2 FULL (WEEK 3)</h3>' +
  '<ul class="space-y-2">' + sdScenarioCards + '</ul>' +
  '</section>' +

  // ---------- boss battles ----------
  '<section id="boss-battles">' +
  '<div class="mb-4"><h2 class="text-xl font-bold tracking-tight text-slate-100">Boss Battles</h2>' +
  '<p class="mt-1 text-sm text-slate-400">Timed mocks under interview conditions. Pattern labels hidden from Week 4 — the AI NPC runs the gacha draw. Victory = <span class="text-fuchsia-300 font-semibold">300 XP</span>.</p></div>' +
  '<div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">' + bossCards + '</div>' +
  '<div class="mt-8 grid gap-5 xl:grid-cols-2">' +
  '<div class="rounded-2xl border border-white/10 bg-[#0d1424]/80 p-6">' +
  '<h3 class="font-bold text-slate-100">XP Table — evidence only</h3>' +
  '<table class="mt-4 w-full text-sm"><thead><tr class="text-left font-mono text-[10px] tracking-widest text-slate-500"><th class="pb-2">ACTION</th><th class="pb-2 text-right">XP</th></tr></thead>' +
  '<tbody class="font-mono text-xs">' +
  xpRow('Problem solved (no hints)', '50', 'text-emerald-300') +
  xpRow('Problem solved (hint-assisted)', '25', 'text-emerald-300/70') +
  xpRow('Explain-back: 3-min recorded (Feynman)', '100', 'text-sky-300') +
  xpRow('PHP SPL re-implementation of the day\'s structure', '150', 'text-cyan-300') +
  xpRow('System-design write-up (WAMA format)', '200', 'text-violet-300') +
  xpRow('Boss battle (timed mock)', '300', 'text-fuchsia-300') +
  xpRow('Streak multiplier', '×1.1 / day, cap ×2', 'text-amber-300') +
  '</tbody></table>' +
  '<div class="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/[0.06] px-4 py-3 text-xs text-amber-200"><span class="font-bold">GUARDRAIL:</span> Learn-type quests are capped at 20% of weekly XP. Above that = procrastination drift — cut.</div>' +
  '</div>' +
  '<div class="rounded-2xl border border-white/10 bg-[#0d1424]/80 p-6">' +
  '<h3 class="font-bold text-slate-100">Quest Types</h3>' +
  '<div class="mt-4 space-y-3 text-sm">' +
  questType('LEARN', 'sky', 'watch / read — capped at 20% of weekly XP') +
  questType('BUILD', 'emerald', 'implement the solution independently') +
  questType('EXPLAIN', 'violet', 'record the 3-min Feynman walkthrough') +
  questType('SHIP', 'cyan', 'commit + test green + document trade-offs — the CI oracle is the XP source of truth') +
  '</div>' +
  '<h3 class="mt-6 mb-3 font-bold text-slate-100">Definition of Done</h3>' +
  '<div class="rounded-xl border border-emerald-500/30 bg-emerald-500/[0.06] px-4 py-3 font-mono text-sm font-bold text-emerald-200">explain · implement independently · test green · measure · document trade-offs</div>' +
  '<h3 class="mt-6 mb-3 font-bold text-slate-100">Tiers</h3>' +
  '<div class="space-y-2 text-xs font-mono text-slate-400">' +
  '<div><span class="text-rose-300">SURVIVAL</span> 6 hrs/wk — runway-critical</div>' +
  '<div><span class="text-emerald-300">STANDARD</span> 8–10 hrs/wk — default</div>' +
  '<div><span class="text-cyan-300">INTENSIVE</span> 2–3 hrs/day — only when an interview is booked within 14 days</div>' +
  '</div>' +
  '</div>' +
  '</div>' +
  '</section>' +

  // ---------- performance ----------
  '<section id="performance">' +
  '<div class="mb-4 flex flex-wrap items-end justify-between gap-3">' +
  '<div><h2 class="text-xl font-bold tracking-tight text-slate-100">Performance</h2>' +
  '<p class="mt-1 text-sm text-slate-400">The recruiter-checkable artefact: public repo, green CI, quest board, documented trade-offs.</p></div>' +
  '<div class="flex items-center gap-2 pb-0.5">' +
  '<span class="text-xs text-slate-500">Share progress — no URL to copy</span>' +
  '<button type="button" onclick="share(\'linkedin\')" title="Share on LinkedIn" aria-label="Share on LinkedIn" class="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] hover:border-sky-400/50 hover:bg-sky-500/10 transition"><svg viewBox="0 0 24 24" class="h-4 w-4"><rect width="24" height="24" rx="5" fill="#0A66C2"/><text x="12" y="17.2" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="13.5" font-weight="700" fill="#fff">in</text></svg></button>' +
  '<button type="button" onclick="share(\'reddit\')" title="Share on Reddit" aria-label="Share on Reddit" class="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] hover:border-orange-400/50 hover:bg-orange-500/10 transition"><svg viewBox="0 0 24 24" class="h-4 w-4"><circle cx="12" cy="13.6" r="6.4" fill="#FF4500"/><circle cx="9.7" cy="13" r="1.05" fill="#fff"/><circle cx="14.3" cy="13" r="1.05" fill="#fff"/><path d="M8.2 9.4 6.3 5.7M15.8 9.4l1.9-3.7" stroke="#FF4500" stroke-width="1.5" stroke-linecap="round"/><circle cx="5.9" cy="5" r="1.25" fill="#FF4500"/><circle cx="18.1" cy="5" r="1.25" fill="#FF4500"/><circle cx="7" cy="14.6" r="1.35" fill="#FF4500"/><circle cx="17" cy="14.6" r="1.35" fill="#FF4500"/><path d="M9.6 16.9q2.4 1.5 4.8 0" stroke="#fff" stroke-width="1.1" fill="none" stroke-linecap="round"/></svg></button>' +
  '</div></div>' +
  '<div class="grid gap-5 xl:grid-cols-[1.2fr_1fr]">' +
  '<div class="rounded-2xl border border-white/10 bg-[#0d1424]/80 p-6">' +
  '<div class="flex items-center justify-between"><h3 class="font-bold text-slate-100">Growth Graph — XP per day</h3><span class="font-mono text-[11px] text-slate-500">weekly target ≥ 800 XP</span></div>' +
  '<div class="mt-5 flex items-stretch gap-2 h-44">' + (growthBars || '<div class="text-sm text-slate-500">No XP logged yet.</div>') + '</div>' +
  '<div class="mt-4"><h4 class="mb-2 text-xs font-mono tracking-widest text-slate-500">XP BY KIND</h4>' +
  '<div class="space-y-2">' + breakdown + '</div></div>' +
  '</div>' +
  '<div class="space-y-5">' +
  '<div class="rounded-2xl border border-white/10 bg-[#0d1424]/80 p-6">' +
  '<h3 class="font-bold text-slate-100">Kill Rules & Gates</h3>' +
  '<ul class="mt-4 space-y-3 text-xs text-slate-300">' +
  killRule('Day 14 gate', '<5 applications sent that week → DSA drops to maintenance (1 problem/day); hours return to job search.') +
  killRule('Day 21 rule', 'No offer and <₹50k freelance → take any ₹70k+ local role immediately.') +
  killRule('Interview booked', 'Switch to Intensive tier; target that company\'s pattern mix.') +
  killRule('Offer lands', 'Stop everything except maintenance.') +
  killRule('Weekly XP audit', 'Learn-quests >20% of XP = drift. Cut.') +
  '</ul>' +
  '</div>' +
  '<div class="rounded-2xl border border-white/10 bg-[#0d1424]/80 p-6">' +
  '<h3 class="font-bold text-slate-100">Day-30 Exit Criteria</h3>' +
  '<ul class="mt-4 space-y-2 text-xs text-slate-300">' +
  exitItem('40+ problems committed with tests in the public repo') +
  exitItem('6 system-design stories written in WAMA format') +
  exitItem('2 mocks recorded') +
  exitItem('Maintenance cadence running — learning never blocks the job search again') +
  '</ul>' +
  '</div>' +
  '<div class="rounded-2xl border border-white/10 bg-[#0d1424]/80 p-6">' +
  '<h3 class="font-bold text-slate-100">Full Quest Ledger</h3>' +
  '<div class="mt-3 overflow-x-auto"><table class="w-full text-left"><thead><tr class="font-mono text-[10px] tracking-widest text-slate-500"><th class="pb-2">#</th><th class="pb-2">PROBLEM</th><th class="pb-2">PATTERN</th><th class="pb-2">DIFF</th><th class="pb-2">XP</th><th class="pb-2">STATUS</th></tr></thead>' +
  '<tbody>' + questRows + '</tbody></table></div>' +
  '</div>' +
  '</div>' +
  '</div>' +
  '</section>' +
  '</main>' +

  '<footer class="border-t border-white/10 px-5 py-6">' +
  '<div class="max-w-[1400px] flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-slate-500">' +
  '<div>DSA QUEST OS — <span class="text-emerald-400">XP for evidence, never for consumption</span> · 1 hr effort → 10 hrs output → repeatable system</div>' +
  '<div>regenerate with <span class="text-cyan-300">npm run dashboard</span> · hosted via GitHub Pages (docs/)</div>' +
  '</div>' +
  '</footer>' +
  '</div>' +

  '<script>' +
  'function share(to) {' +
  '  var u = encodeURIComponent(location.href);' +
  '  var t = encodeURIComponent(' + JSON.stringify(shareText) + ');' +
  '  var url = to === "linkedin"' +
  '    ? "https://www.linkedin.com/sharing/share-offsite/?url=" + u' +
  '    : "https://www.reddit.com/submit?url=" + u + "&title=" + t;' +
  '  window.open(url, "dsa-quest-share", "width=600,height=560,menubar=no,toolbar=no");' +
  '}' +
  'var btns = document.querySelectorAll(".acc-btn");' +
  'for (var i = 0; i < btns.length; i++) {' +
  '  btns[i].addEventListener("click", function () {' +
  '    var body = this.nextElementSibling;' +
  '    var hidden = body.classList.toggle("hidden");' +
  '    var chev = this.querySelector(".acc-chev");' +
  '    if (chev) chev.style.transform = hidden ? "" : "rotate(180deg)";' +
  '  });' +
  '}' +
  'var nums = document.querySelectorAll("[data-count]");' +
  'for (var j = 0; j < nums.length; j++) {' +
  '  (function (el) {' +
  '    var target = parseInt(el.getAttribute("data-count"), 10);' +
  '    if (isNaN(target)) return;' +
  '    var start = null;' +
  '    function step(ts) {' +
  '      if (!start) start = ts;' +
  '      var p = Math.min((ts - start) / 900, 1);' +
  '      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));' +
  '      if (p < 1) requestAnimationFrame(step);' +
  '    }' +
  '    requestAnimationFrame(step);' +
  '  })(nums[j]);' +
  '}' +
  '</script>' +
  '</body></html>';

function navItem(href, label, active) {
  return (
    '<a href="' + href + '" class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ' +
    (active
      ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-200'
      : 'text-slate-400 hover:text-slate-100 hover:bg-white/[0.04]') +
    '"><span class="h-1.5 w-1.5 rounded-full ' + (active ? 'bg-emerald-400' : 'bg-slate-600') + '"></span>' + label + '</a>'
  );
}

function statCard(label, value, tint, sub) {
  return (
    '<div class="rounded-2xl border border-white/10 bg-[#0d1424]/80 p-5">' +
    '<div class="font-mono text-[10px] tracking-widest text-slate-500">' + label + '</div>' +
    '<div class="mt-1.5 font-mono text-2xl font-bold text-' + tint + '-300" data-count="' + (typeof value === 'number' ? value : '') + '">' + value + '</div>' +
    '<div class="mt-1 text-[11px] text-slate-500">' + sub + '</div>' +
    '</div>'
  );
}

function dnaRow(from, to, note) {
  return (
    '<div class="flex items-center gap-2 rounded-lg bg-white/[0.03] border border-white/5 px-3 py-2">' +
    '<span class="font-mono text-slate-400">' + from + '</span>' +
    '<svg class="h-3.5 w-3.5 text-emerald-400 shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.69l-3.22-3.22a.75.75 0 111.06-1.06l4.5 4.5a.75.75 0 010 1.06l-4.5 4.5a.75.75 0 11-1.06-1.06l3.22-3.22H3.75A.75.75 0 013 10z" clip-rule="evenodd"/></svg>' +
    '<span class="font-mono font-bold text-cyan-300">' + to + '</span>' +
    '<span class="text-slate-500 ml-auto text-right">' + note + '</span>' +
    '</div>'
  );
}

function xpRow(action, xp, cls) {
  return '<tr class="border-t border-white/5"><td class="py-2.5 pr-4 text-slate-300 font-sans">' + action + '</td><td class="py-2.5 text-right font-bold ' + cls + '">' + xp + '</td></tr>';
}

function questType(name, tint, note) {
  return (
    '<div class="flex items-center gap-3">' +
    '<span class="w-20 shrink-0 rounded-lg border border-' + tint + '-500/40 bg-' + tint + '-500/10 px-2 py-1 text-center font-mono text-[11px] font-bold text-' + tint + '-300">' + name + '</span>' +
    '<span class="text-xs text-slate-400">' + note + '</span>' +
    '</div>'
  );
}

function killRule(name, note) {
  return '<li class="flex gap-3"><span class="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-400"></span><span><span class="font-semibold text-slate-200">' + name + ':</span> ' + note + '</span></li>';
}
function exitItem(text) {
  return '<li class="flex gap-3"><svg class="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd"/></svg><span>' + text + '</span></li>';
}

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, html);
writeFileSync(join(dirname(OUT), 'CNAME'), 'dsa-quest.rairahulr1.com\n');
console.log('dashboard written → ' + OUT + ' (' + Math.round(html.length / 1024) + ' KB, ' + dsaSolved + '/45 solved, ' + totalXp + ' XP, level ' + level + ') + CNAME dsa-quest.rairahulr1.com');
