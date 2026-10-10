# DSA Quest OS

> Gamified DSA + system-design sprint. **XP for evidence, never for consumption.**
> Plan: `~/.commandcode/plans/dsa-gamified-30day-sprint.md` · As of 2026-10-06

## How to play

```bash
npm run draw          # gacha: today's quest (prefers unsolved, 50/50 with due reviews)
npm test              # run every quest test (stubs fail until you solve them)
npm run xp -- award <problem-id>     # award 50 XP: green test + committed + not a stub
npm run xp -- award <problem-id> --hinted   # 25 XP
npm run xp -- award <problem-id> --kind php   # 150 XP: PHP SPL port
npm run xp -- award <ref> --kind explain|sd|boss [--note "..."]  # 100/200/300 XP
npm run xp -- status  # level, pace, per-pattern breakdown
npm run xp -- review  # spaced repetition: due at day 1 / 7 / 30
npm run generate      # regenerate quests/ and php/ from data/quests.mjs
npm run dashboard     # regenerate docs/index.html (gamified learning dashboard)
node scripts/board.mjs  # (re)create the Projects board + one Issue per quest
```

## Dashboard

`docs/index.html` is a gamified learning dashboard (HeyCoach-style module cards,
progress bars and growth graph — running the game layer above). It is generated
from the real quest data and XP ledger:

```bash
npm run dashboard
php -S 127.0.0.1:8000 -t docs   # serve it locally
```

Host it free on GitHub Pages: Settings → Pages → Source: **Deploy from a branch → docs/**.
It recomputes XP, level, streak, growth and per-problem status from `xp/ledger.json`
every time it is generated — re-run after any `xp award`.

## The game

| Action | XP |
|---|---|
| Problem solved (no hints) | 50 |
| Problem solved (hint-assisted) | 25 |
| Explain-back: 3-min recorded solution | 100 |
| PHP SPL re-implementation | 150 |
| System-design write-up (WAMA format) | 200 |
| Boss battle (timed mock) | 300 |
| Streak multiplier | ×1.1 per consecutive day, capped ×2 |

**Levels** (every 1,000 XP): Novice → Apprentice → Adept → Engineer → Senior → **Architect**

**Energy** — 100/day: problem −20, review −10, mock −40. Zero energy → reviews only.

**Quest types**: Learn (capped at 20% of weekly XP — anti-procrastination guardrail) · Build · Explain · Ship.

**Boss battles**: Days 7 / 14 / 21 / 28 — timed mocks under interview conditions.

## The CI oracle

`npm run xp -- award` only succeeds when the quest's test is green, the file is
implemented, and it is **committed**. Awarded quests are recorded in `xp/ledger.json`,
and GitHub Actions re-runs exactly those on every push — CI green means nothing you
claimed has regressed. Unsolved stubs are never run, so CI stays green while you work.

## Quest board

`node scripts/board.mjs` creates the GitHub Projects board and one Issue per quest
(45 DSA + 6 SD topics + 10 SD scenarios + 4 boss battles + day-0 setup = 66 quests
on the board). It is idempotent — safe to re-run.

First run needs the project scope once (interactive):
```bash
gh auth refresh -s read:project -s project
node scripts/board.mjs
```

## Structure

```
data/quests.mjs        the quest data — 15 patterns × 3 problems (edit + npm run generate)
quests/<pattern>/      JS quests: <problem>.mjs (yours to solve) + <problem>.test.mjs
php/<pattern>/         PHP SPL re-implementation quests + php/run.php runner
docs/system-design/    WAMA-format templates + 10 practice scenarios
scripts/               generate · xp (award/status/review) · draw (gacha) · ci
xp/ledger.json         the XP ledger (created on first award)
```

## Definition of done

**explain · implement independently · test green · measure · document trade-offs**

## Kill rules

- **Day 14 gate**: <5 applications that week → maintenance mode (1 problem/day).
- **Day 21**: no offer and <₹50k freelance → take any ₹70k+ local role immediately.
- **Interview booked** → Intensive tier (2–3 hrs/day), target that company's pattern mix.
- **Offer lands** → stop everything except maintenance.
- **Weekly XP audit**: Learn-quests >20% of XP = drift. Cut.
