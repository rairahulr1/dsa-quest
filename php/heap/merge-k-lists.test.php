<?php
require_once __DIR__ . '/_helpers.php';
require_once __DIR__ . '/merge-k-lists.php';

function test_merge_k_lists() {
    $fail = 0;
    $cases = [
    ['args' => [[[1, 4, 5], [1, 3, 4], [2, 6]]], 'expected' => [1, 1, 2, 3, 4, 4, 5, 6]],
    ['args' => [], 'expected' => []],
    ['args' => [[]], 'expected' => []],
    ];
    foreach ($cases as $i => $c) {
        try {
            $got = mergeKLists(...$c['args']);
            if (!($got == $c['expected'])) { fwrite(STDERR, "case $i failed\n"); $fail++; }
        } catch (\Throwable $e) { fwrite(STDERR, "case $i threw: {$e->getMessage()}\n"); $fail++; }
    }
    return $fail;
}
