<?php
require_once __DIR__ . '/_helpers.php';
require_once __DIR__ . '/kth-largest.php';

function test_kth_largest() {
    $fail = 0;
    $cases = [
    ['args' => [[[3, 2, 1, 5, 6, 4], 2]], 'expected' => 5],
    ['args' => [[[3, 2, 3, 1, 2, 4, 5, 5, 6], 4]], 'expected' => 4],
    ['args' => [[[1], 1]], 'expected' => 1],
    ];
    foreach ($cases as $i => $c) {
        try {
            $got = findKthLargest(...$c['args']);
            if (!($got == $c['expected'])) { fwrite(STDERR, "case $i failed\n"); $fail++; }
        } catch (\Throwable $e) { fwrite(STDERR, "case $i threw: {$e->getMessage()}\n"); $fail++; }
    }
    return $fail;
}
