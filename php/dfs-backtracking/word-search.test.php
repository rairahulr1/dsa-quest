<?php
require_once __DIR__ . '/_helpers.php';
require_once __DIR__ . '/word-search.php';

function test_word_search() {
    $fail = 0;
    $cases = [
    ['args' => [[['A', 'B', 'C', 'E'], ['S', 'F', 'C', 'S'], ['A', 'D', 'E', 'E']], 'ABCCED'], 'expected' => true],
    ['args' => [[['A', 'B', 'C', 'E'], ['S', 'F', 'C', 'S'], ['A', 'D', 'E', 'E']], 'SEE'], 'expected' => true],
    ['args' => [[['A', 'B', 'C', 'E'], ['S', 'F', 'C', 'S'], ['A', 'D', 'E', 'E']], 'ABCB'], 'expected' => false],
    ];
    foreach ($cases as $i => $c) {
        try {
            $got = exist(...$c['args']);
            if (!($got == $c['expected'])) { fwrite(STDERR, "case $i failed\n"); $fail++; }
        } catch (\Throwable $e) { fwrite(STDERR, "case $i threw: {$e->getMessage()}\n"); $fail++; }
    }
    return $fail;
}
