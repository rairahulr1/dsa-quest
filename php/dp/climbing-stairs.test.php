<?php
require_once __DIR__ . '/_helpers.php';
require_once __DIR__ . '/climbing-stairs.php';

function test_climbing_stairs() {
    $fail = 0;
    $cases = [
    ['args' => [[2]], 'expected' => 2],
    ['args' => [[3]], 'expected' => 3],
    ['args' => [[10]], 'expected' => 89],
    ];
    foreach ($cases as $i => $c) {
        try {
            $got = climbStairs(...$c['args']);
            if (!($got == $c['expected'])) { fwrite(STDERR, "case $i failed\n"); $fail++; }
        } catch (\Throwable $e) { fwrite(STDERR, "case $i threw: {$e->getMessage()}\n"); $fail++; }
    }
    return $fail;
}
