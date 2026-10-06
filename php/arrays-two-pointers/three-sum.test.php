<?php
require_once __DIR__ . '/../_helpers.php';
require_once __DIR__ . '/three-sum.php';

function test_three_sum() {
    $fail = 0;
    $cases = [
    ['args' => [[-1, 0, 1, 2, -1, -4]], 'expected' => [[-1, -1, 2], [-1, 0, 1]]],
    ['args' => [[0, 1, 1]], 'expected' => []],
    ['args' => [[0, 0, 0]], 'expected' => [[0, 0, 0]]],
    ];
    foreach ($cases as $i => $c) {
        try {
            $got = threeSum(...$c['args']);
            if (!(sameUnorderedDeep($got, $c['expected']))) { fwrite(STDERR, "case $i failed\n"); $fail++; }
        } catch (\Throwable $e) { fwrite(STDERR, "case $i threw: {$e->getMessage()}\n"); $fail++; }
    }
    return $fail;
}
