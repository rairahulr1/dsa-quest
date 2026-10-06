<?php
require_once __DIR__ . '/_helpers.php';
require_once __DIR__ . '/container-most-water.php';

function test_container_most_water() {
    $fail = 0;
    $cases = [
    ['args' => [[[1, 8, 6, 2, 5, 4, 8, 3, 7]]], 'expected' => 49],
    ['args' => [[[1, 1]]], 'expected' => 1],
    ['args' => [[[4, 3, 2, 1, 4]]], 'expected' => 16],
    ];
    foreach ($cases as $i => $c) {
        try {
            $got = maxArea(...$c['args']);
            if (!($got == $c['expected'])) { fwrite(STDERR, "case $i failed\n"); $fail++; }
        } catch (\Throwable $e) { fwrite(STDERR, "case $i threw: {$e->getMessage()}\n"); $fail++; }
    }
    return $fail;
}
