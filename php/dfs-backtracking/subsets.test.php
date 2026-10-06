<?php
require_once __DIR__ . '/../_helpers.php';
require_once __DIR__ . '/subsets.php';

function test_subsets() {
    $fail = 0;
    $cases = [
    ['args' => [[1, 2, 3]], 'expected' => [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]]],
    ['args' => [[0]], 'expected' => [[], [0]]],
    ];
    foreach ($cases as $i => $c) {
        try {
            $got = subsets(...$c['args']);
            if (!(sameUnorderedDeep($got, $c['expected']))) { fwrite(STDERR, "case $i failed\n"); $fail++; }
        } catch (\Throwable $e) { fwrite(STDERR, "case $i threw: {$e->getMessage()}\n"); $fail++; }
    }
    return $fail;
}
