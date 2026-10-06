<?php
require_once __DIR__ . '/_helpers.php';
require_once __DIR__ . '/max-sum-subarray-k.php';

function test_max_sum_subarray_k() {
    $fail = 0;
    $cases = [
    ['args' => [[[2, 1, 5, 1, 3, 2], 3]], 'expected' => 9],
    ['args' => [[[2, 3, 4, 1, 5], 2]], 'expected' => 7],
    ['args' => [[[1, 1, 1, 1], 4]], 'expected' => 4],
    ];
    foreach ($cases as $i => $c) {
        try {
            $got = maxSumSubarray(...$c['args']);
            if (!($got == $c['expected'])) { fwrite(STDERR, "case $i failed\n"); $fail++; }
        } catch (\Throwable $e) { fwrite(STDERR, "case $i threw: {$e->getMessage()}\n"); $fail++; }
    }
    return $fail;
}
