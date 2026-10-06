<?php
require_once __DIR__ . '/_helpers.php';
require_once __DIR__ . '/sliding-window-maximum.php';

function test_sliding_window_maximum() {
    $fail = 0;
    $cases = [
    ['args' => [[[1, 3, -1, -3, 5, 3, 6, 7], 3]], 'expected' => [3, 3, 5, 5, 6, 7]],
    ['args' => [[[1], 1]], 'expected' => [1]],
    ['args' => [[[1, -1], 1]], 'expected' => [1, -1]],
    ];
    foreach ($cases as $i => $c) {
        try {
            $got = maxSlidingWindow(...$c['args']);
            if (!($got == $c['expected'])) { fwrite(STDERR, "case $i failed\n"); $fail++; }
        } catch (\Throwable $e) { fwrite(STDERR, "case $i threw: {$e->getMessage()}\n"); $fail++; }
    }
    return $fail;
}
