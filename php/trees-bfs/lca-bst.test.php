<?php
require_once __DIR__ . '/../_helpers.php';
require_once __DIR__ . '/lca-bst.php';

function test_lca_bst() {
    $fail = 0;
    $cases = [
    ['args' => [[6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], 2, 8], 'expected' => 6],
    ['args' => [[6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], 2, 4], 'expected' => 2],
    ['args' => [[2, 1], 2, 1], 'expected' => 2],
    ];
    foreach ($cases as $i => $c) {
        try {
            $got = lowestCommonAncestor(...$c['args']);
            if (!($got == $c['expected'])) { fwrite(STDERR, "case $i failed\n"); $fail++; }
        } catch (\Throwable $e) { fwrite(STDERR, "case $i threw: {$e->getMessage()}\n"); $fail++; }
    }
    return $fail;
}
