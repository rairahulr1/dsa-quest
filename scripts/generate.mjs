#!/usr/bin/env node
// Generates quests/ and php/ from data/quests.mjs.
// Usage: npm run generate
import { execSync } from 'node:child_process';
import { mkdirSync, rmSync, writeFileSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { patterns } from '../data/quests.mjs';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));

const rm = (p) => rmSync(join(ROOT, p), { recursive: true, force: true });
const mkdir = (p) => mkdirSync(join(ROOT, p), { recursive: true });
const write = (p, content) => writeFileSync(join(ROOT, p), content);

// Snapshot implemented solutions before the wipe — generate never clobbers work.
function snapshotSolutions(dir) {
  const saved = new Map();
  const walk = (d) => {
    let entries;
    try { entries = readdirSync(join(ROOT, d)); } catch { return; }
    for (const e of entries) {
      const rel = d ? `${d}/${e}` : e;
      const full = join(ROOT, rel);
      if (statSync(full).isDirectory()) walk(rel);
      else if (/\.(mjs|php)$/.test(rel)) {
        const content = readFileSync(full, 'utf8');
        if (!content.includes('NOT IMPLEMENTED')) saved.set(rel, content);
      }
    }
  };
  walk(dir);
  return saved;
}
const saved = new Map([...snapshotSolutions('quests'), ...snapshotSolutions('php')]);

rm('quests');
rm('php');
mkdir('quests');
mkdir('php');

const link = (p) =>
  p.leetcode ? `https://leetcode.com/problems/${p.slug}/` : 'https://neetcode.io/practice/practice/neetcode150';

const cmpName = (p) =>
  p.comparator === 'intervals' ? 'intervals' : p.unordered === 'flat' ? 'unorderedFlat' : p.unordered === 'deep' ? 'unorderedDeep' : 'default';

// ---------------------------------------------------------------- JS tests
function jsTest(p) {
  const cases = p.tests || [];
  const imports = `import { test } from 'node:test';\nimport assert from 'node:assert/strict';\nimport { ${p.cls || p.fn} } from './${p.id}.mjs';`;
  let helpers = '';
  if (p.kind === 'll') {
    helpers = `
function toList(arr) {
  if (!arr || !arr.length) return null;
  const head = { val: arr[0], next: null };
  let cur = head;
  for (let i = 1; i < arr.length; i++) { cur.next = { val: arr[i], next: null }; cur = cur.next; }
  return head;
}
function toLists(arrs) { return (arrs || []).map(toList); }
function toArray(head) { const out = []; while (head) { out.push(head.val); head = head.next; } return out; }
`;
  }
  if (p.kind === 'cycle') {
    helpers = `
function toCycleList(list, pos) {
  if (!list || !list.length) return null;
  const head = { val: list[0], next: null };
  let cur = head; const nodes = [head];
  for (let i = 1; i < list.length; i++) { cur.next = { val: list[i], next: null }; cur = cur.next; nodes.push(cur); }
  if (pos >= 0 && pos < nodes.length) cur.next = nodes[pos];
  return head;
}
`;
  }
  if (p.kind === 'tree') {
    helpers = `
function toTree(arr) {
  if (!arr || !arr.length || arr[0] == null) return null;
  const root = { val: arr[0], left: null, right: null };
  const q = [root];
  let i = 1;
  while (i < arr.length) {
    const node = q.shift();
    if (arr[i] != null) { node.left = { val: arr[i], left: null, right: null }; q.push(node.left); }
    i++;
    if (i < arr.length && arr[i] != null) { node.right = { val: arr[i], left: null, right: null }; q.push(node.right); }
    i++;
  }
  return root;
}
`;
  }
  if (p.kind === 'graph') {
    helpers = `
function toGraph(adj) {
  if (!adj || !adj.length) return null;
  const nodes = adj.map((_, i) => ({ val: i + 1, neighbors: [] }));
  adj.forEach((nb, i) => { nodes[i].neighbors = nb.map((j) => nodes[j - 1]); });
  return nodes[0];
}
function toAdj(node) {
  if (!node) return [];
  const map = new Map();
  const q = [node];
  while (q.length) {
    const n = q.shift();
    if (map.has(n.val)) continue;
    map.set(n.val, n);
    n.neighbors.forEach((nb) => q.push(nb));
  }
  return [...map.keys()].sort((a, b) => a - b).map((v) => map.get(v).neighbors.map((nb) => nb.val).sort((a, b) => a - b));
}
`;
  }

  const bodies = cases.map((c, i) => {
    // Data convention: c.args = [argList] for every non-class quest
    // (cycle quests: c.args = [{list, pos}]).
    let argExprs;
    if (p.kind === 'cycle') {
      const cyc = c.args[0];
      argExprs = [`toCycleList(${JSON.stringify(cyc.list)}, ${cyc.pos})`];
    } else {
      const argList = c.args[0];
      const treeArgs = p.treeArgs || [];
      argExprs = argList.map((a, ai) => {
        if (p.kind === 'tree' && treeArgs.includes(ai)) return `toTree(${JSON.stringify(a)})`;
        if (p.kind === 'graph') return `toGraph(${JSON.stringify(a)})`;
        if (p.kind === 'll' && p.multiList) return `toLists(${JSON.stringify(a)})`;
        if (p.kind === 'll') return `toList(${JSON.stringify(a)})`;
        return JSON.stringify(a);
      });
    }
    const call = p.kind === 'll' || p.kind === 'cycle' || p.kind === 'graph' || (p.kind === 'tree' && !p.expectedIsValue)
      ? `${p.fn}(${argExprs.join(', ')})`
      : `${p.fn}(${argExprs.join(', ')})`;

    if (p.kind === 'll') {
      return `test('${p.title} — case ${i + 1}', () => {
  assert.deepEqual(toArray(${call}), ${JSON.stringify(c.expected)});
});`;
    }
    if (p.kind === 'graph') {
      const nonEmpty = Array.isArray(c.args[0]) && c.args[0].length > 0;
      return `test('${p.title} — case ${i + 1}', () => {
  const original = ${argExprs[0]};
  const got = ${p.fn}(original);
  assert.deepEqual(toAdj(got), ${JSON.stringify(c.expected)});${nonEmpty ? '\n  assert.notEqual(got, original); // deep clone, not the same node' : ''}
});`;
    }
    if (p.kind === 'tree' && p.expectedIsValue) {
      return `test('${p.title} — case ${i + 1}', () => {
  assert.equal(${call}.val, ${JSON.stringify(c.expected)});
});`;
    }
    const cmp = cmpName(p);
    if (cmp === 'unorderedFlat') {
      return `test('${p.title} — case ${i + 1}', () => {
  const norm = (a) => [...a].sort((x, y) => (typeof x === 'string' ? x.localeCompare(y) : x - y));
  assert.deepEqual(norm(${call}), norm(${JSON.stringify(c.expected)}));
});`;
    }
    if (cmp === 'unorderedDeep') {
      return `test('${p.title} — case ${i + 1}', () => {
  const norm = (a) => a.map((x) => [...x].sort((p2, q2) => p2 - q2)).map((x) => JSON.stringify(x)).sort();
  assert.deepEqual(norm(${call}), norm(${JSON.stringify(c.expected)}));
});`;
    }
    if (cmp === 'intervals') {
      return `test('${p.title} — case ${i + 1}', () => {
  const norm = (a) => [...a].map((x) => [...x]).sort((p2, q2) => p2[0] - q2[0]);
  assert.deepEqual(norm(${call}), norm(${JSON.stringify(c.expected)}));
});`;
    }
    return `test('${p.title} — case ${i + 1}', () => {
  assert.deepEqual(${call}, ${JSON.stringify(c.expected)});
});`;
  });

  if (p.kind === 'class') {
    const body = `test('${p.title}', () => {
  const ops = ${JSON.stringify(p.ops)};
  const args = ${JSON.stringify(p.args)};
  const expected = ${JSON.stringify(p.expected)};
  const results = [];
  let instance = null;
  for (let i = 0; i < ops.length; i++) {
    if (ops[i] === '${p.cls}') { instance = new ${p.cls}(); results.push(null); }
    else results.push(instance[ops[i]](...args[i]));
  }
  assert.deepEqual(results, expected);
});`;
    return `${imports}\n${body}\n`;
  }
  return `${imports}\n${helpers}\n${bodies.join('\n')}\n`;
}

// ---------------------------------------------------------------- JS stub
function jsStub(p) {
  const header = `// Quest: ${p.title} — ${p.leekPatternName} (${p.difficulty})
// ${p.leetcode ? `LeetCode ${p.leetcode}: ${link(p)}` : 'Source: NeetCode 150 (free account)'}
// Definition of done: explain · implement · test green (npm test) · measure · document trade-offs
// XP: 50 solved · 25 hinted · +100 recorded explain-back · +150 PHP SPL port
`;
  if (p.kind === 'class') {
    const methods = [...new Set(p.ops.filter((o) => o !== p.cls))]
      .map((m) => `  ${m}(...args) {\n    throw new Error('NOT IMPLEMENTED');\n  }`)
      .join('\n\n');
    return `${header}export class ${p.cls} {\n${methods}\n}\n`;
  }
  return `${header}export function ${p.fn}() {\n  throw new Error('NOT IMPLEMENTED');\n}\n`;
}

// ---------------------------------------------------------------- PHP
function phpStub(p) {
  const header = `<?php
// Quest: ${p.title} — ${p.leekPatternName} (${p.difficulty})
// PHP SPL re-implementation. Solve the JS quest first, then port here (+150 XP).
// Pattern mapping: ${p.phpMapping}
// Definition of done: explain · implement · php/run.php green · committed

`;
  if (p.kind === 'class') {
    const methods = [...new Set(p.ops.filter((o) => o !== p.cls))]
      .map((m) => `    public function ${m}(...$args) {\n        // TODO: implement\n        throw new \\RuntimeException('NOT IMPLEMENTED');\n    }`)
      .join("\n\n");
    return `${header}class ${p.cls} {\n${methods}\n}\n`;
  }
  const sig = p.signature || p.fn;
  return `${header}/**\n * ${p.description}\n * Signature: ${sig}(...) — match the JS quest's parameters.\n */\nfunction ${p.fn}(...$args) {\n    // TODO: implement\n    throw new \\RuntimeException('NOT IMPLEMENTED');\n}\n`;
}

function phpTest(p) {
  const fnName = 'test_' + p.id.replace(/-/g, '_');
  const cmp = cmpName(p);
  let cmpExpr;
  if (cmp === 'unorderedFlat') cmpExpr = 'sameUnordered($got, $c[\'expected\'])';
  else if (cmp === 'unorderedDeep') cmpExpr = 'sameUnorderedDeep($got, $c[\'expected\'])';
  else if (cmp === 'intervals') cmpExpr = 'sameIntervals($got, $c[\'expected\'])';
  else cmpExpr = '$got == $c[\'expected\']';

  // Data convention: c.args = [argList] for every non-class quest
  // (cycle quests: c.args = [{list, pos}] -> PHP takes (list, pos)).
  const cases = (p.tests || []).map((c) => {
    const caseArgs = p.kind === 'cycle' ? [c.args[0].list, c.args[0].pos] : c.args[0];
    return `    ['args' => ${phpLiteral(caseArgs)}, 'expected' => ${phpLiteral(c.expected)}],`;
  }).join('\n');

  let body;
  if (p.kind === 'class') {
    const ops = phpLiteral(p.ops);
    const args = phpLiteral(p.args);
    const expected = phpLiteral(p.expected);
    body = `    $ops = ${ops};\n    $args = ${args};\n    $expected = ${expected};\n    $results = [];\n    $instance = null;\n    foreach ($ops as $i => $op) {\n        if ($op === '${p.cls}') { $instance = new ${p.cls}(); $results[] = null; }\n        else { $results[] = $instance->{$op}(...$args[$i]); }\n    }\n    if ($results !== $expected) { fwrite(STDERR, "case sequence failed\\n"); $fail++; }`;
  } else {
    body = `    $cases = [\n${cases}\n    ];\n    foreach ($cases as $i => $c) {\n        try {\n            $got = ${p.fn}(...$c['args']);\n            if (!(${cmpExpr})) { fwrite(STDERR, "case $i failed\\n"); $fail++; }\n        } catch (\\Throwable $e) { fwrite(STDERR, "case $i threw: {$e->getMessage()}\\n"); $fail++; }\n    }`;
  }
  return `<?php\nrequire_once __DIR__ . '/_helpers.php';\nrequire_once __DIR__ . '/${p.id}.php';\n\nfunction ${fnName}() {\n    $fail = 0;\n${body}\n    return $fail;\n}\n`;
}

function phpLiteral(v) {
  return jsonToPhp(v);
}
function jsonToPhp(v) {
  if (v === null) return 'null';
  if (typeof v === 'boolean') return v ? 'true' : 'false';
  if (typeof v === 'number') return String(v);
  if (typeof v === 'string') return `'${v.replace(/'/g, "\\'")}'`;
  if (Array.isArray(v)) {
    const isAssoc = v.length > 0 && v.every((x) => x !== null && typeof x === 'object' && !Array.isArray(x));
    if (isAssoc) {
      return '[' + v.map((o) => '{' + Object.entries(o).map(([k, val]) => `'${k}' => ${jsonToPhp(val)}`).join(', ') + '}').join(', ') + ']';
    }
    return '[' + v.map(jsonToPhp).join(', ') + ']';
  }
  throw new Error('cannot literal ' + typeof v);
}

// ---------------------------------------------------------------- pattern README
function patternReadme(pat) {
  const rows = pat.problems.map((p) => `| ${p.title} | ${p.difficulty} | [link](${link(p)}) | 50 |`).join('\n');
  return `# ${pat.name}

${pat.summary}

**Recognise the pattern when you see:** ${pat.triggers.join(' · ')}

**PHP SPL mapping:** ${pat.php}

## Quests

| Problem | Difficulty | Link | XP |
|---|---|---|---|
${rows}

## Definition of done
explain · implement independently · test green (\`npm test\`) · measure · document trade-offs

## Cadence
1. \`npm run draw\` (gacha) or pick a quest above.
2. Solve in \`quests/${pat.id}/<problem>.mjs\` — 25 min easy / 40 min medium, timed.
3. \`node --test quests/${pat.id}/\` green → commit → \`npm run xp -- award <problem-id>\`.
4. Re-implement the day's *structure* in \`php/${pat.id}/\` (+150 XP).
5. Record a 3-min explain-back (+100 XP). Review due at day 1 / 7 / 30 (\`npm run review\`).
`;
}

// ---------------------------------------------------------------- emit
for (const pat of patterns) {
  mkdir(`quests/${pat.id}`);
  mkdir(`php/${pat.id}`);
  write(`quests/${pat.id}/README.md`, patternReadme(pat));
  for (const p of pat.problems) {
    p.leekPatternName = pat.name;
    p.phpMapping = pat.php;
    write(`quests/${pat.id}/${p.id}.mjs`, jsStub(p));
    write(`quests/${pat.id}/${p.id}.test.mjs`, jsTest(p));
    write(`php/${pat.id}/${p.id}.php`, phpStub(p));
    write(`php/${pat.id}/${p.id}.test.php`, phpTest(p));
  }
}

// Restore implemented solutions on top of the fresh stubs.
for (const [rel, content] of saved) write(rel, content);

const total = patterns.reduce((n, p) => n + p.problems.length, 0);
console.log(`Generated ${patterns.length} patterns, ${total} quests → quests/ and php/` +
  (saved.size ? ` · preserved ${saved.size} implemented solution(s)` : ''));
