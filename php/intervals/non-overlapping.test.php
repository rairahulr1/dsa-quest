<?php
require_once __DIR__ . '/_helpers.php';
require_once __DIR__ . '/non-overlapping.php';

function test_non_overlapping() {
    $fail = 0;
    $cases = [
    ['args' => [[[[1, 2], [2, 3], [3, 4], [1, 3]]]], 'expected' => 1],
    ['args' => [[[[1, 2], [1, 2], [1, 2]]]], 'expected' => 2],
    ['args' => [[[[1, 2], [2, 3]]]], 'expected' => 0],
    ];
    foreach ($cases as $i => $c) {
        try {
            $got = eraseOverlapIntervals(...$c['args']);
            if (!($got == $c['expected'])) { fwrite(STDERR, "case $i failed\n"); $fail++; }
        } catch (\Throwable $e) { fwrite(STDERR, "case $i threw: {$e->getMessage()}\n"); $fail++; }
    }
    return $fail;
}
