<?php
require_once __DIR__ . '/_helpers.php';
require_once __DIR__ . '/coin-change.php';

function test_coin_change() {
    $fail = 0;
    $cases = [
    ['args' => [[1, 2, 5], 11], 'expected' => 3],
    ['args' => [[2], 3], 'expected' => -1],
    ['args' => [[1], 0], 'expected' => 0],
    ];
    foreach ($cases as $i => $c) {
        try {
            $got = coinChange(...$c['args']);
            if (!($got == $c['expected'])) { fwrite(STDERR, "case $i failed\n"); $fail++; }
        } catch (\Throwable $e) { fwrite(STDERR, "case $i threw: {$e->getMessage()}\n"); $fail++; }
    }
    return $fail;
}
