<?php
require_once __DIR__ . '/_helpers.php';
require_once __DIR__ . '/top-k-frequent.php';

function test_top_k_frequent() {
    $fail = 0;
    $cases = [
    ['args' => [[[1, 1, 1, 2, 2, 3], 2]], 'expected' => [1, 2]],
    ['args' => [[[1], 1]], 'expected' => [1]],
    ['args' => [[[4, 4, 4, 1, 1, 2, 2, 2, 3], 2]], 'expected' => [4, 2]],
    ];
    foreach ($cases as $i => $c) {
        try {
            $got = topKFrequent(...$c['args']);
            if (!(sameUnordered($got, $c['expected']))) { fwrite(STDERR, "case $i failed\n"); $fail++; }
        } catch (\Throwable $e) { fwrite(STDERR, "case $i threw: {$e->getMessage()}\n"); $fail++; }
    }
    return $fail;
}
