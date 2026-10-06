<?php
require_once __DIR__ . '/_helpers.php';
require_once __DIR__ . '/merge-intervals.php';

function test_merge_intervals() {
    $fail = 0;
    $cases = [
    ['args' => [[[1, 3], [2, 6], [8, 10], [15, 18]]], 'expected' => [[1, 6], [8, 10], [15, 18]]],
    ['args' => [[[1, 4], [4, 5]]], 'expected' => [[1, 5]]],
    ['args' => [[[1, 4], [0, 4]]], 'expected' => [[0, 4]]],
    ];
    foreach ($cases as $i => $c) {
        try {
            $got = merge(...$c['args']);
            if (!(sameIntervals($got, $c['expected']))) { fwrite(STDERR, "case $i failed\n"); $fail++; }
        } catch (\Throwable $e) { fwrite(STDERR, "case $i threw: {$e->getMessage()}\n"); $fail++; }
    }
    return $fail;
}
