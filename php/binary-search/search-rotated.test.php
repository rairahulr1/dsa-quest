<?php
require_once __DIR__ . '/_helpers.php';
require_once __DIR__ . '/search-rotated.php';

function test_search_rotated() {
    $fail = 0;
    $cases = [
    ['args' => [[4, 5, 6, 7, 0, 1, 2], 0], 'expected' => 4],
    ['args' => [[4, 5, 6, 7, 0, 1, 2], 3], 'expected' => -1],
    ['args' => [[1], 0], 'expected' => -1],
    ];
    foreach ($cases as $i => $c) {
        try {
            $got = search(...$c['args']);
            if (!($got == $c['expected'])) { fwrite(STDERR, "case $i failed\n"); $fail++; }
        } catch (\Throwable $e) { fwrite(STDERR, "case $i threw: {$e->getMessage()}\n"); $fail++; }
    }
    return $fail;
}
