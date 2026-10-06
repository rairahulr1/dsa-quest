<?php
require_once __DIR__ . '/_helpers.php';
require_once __DIR__ . '/binary-search.php';

function test_binary_search() {
    $fail = 0;
    $cases = [
    ['args' => [[[-1, 0, 3, 5, 9, 12], 9]], 'expected' => 4],
    ['args' => [[[-1, 0, 3, 5, 9, 12], 2]], 'expected' => -1],
    ['args' => [[[5], 5]], 'expected' => 0],
    ];
    foreach ($cases as $i => $c) {
        try {
            $got = search(...$c['args']);
            if (!($got == $c['expected'])) { fwrite(STDERR, "case $i failed\n"); $fail++; }
        } catch (\Throwable $e) { fwrite(STDERR, "case $i threw: {$e->getMessage()}\n"); $fail++; }
    }
    return $fail;
}
