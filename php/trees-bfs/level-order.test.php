<?php
require_once __DIR__ . '/_helpers.php';
require_once __DIR__ . '/level-order.php';

function test_level_order() {
    $fail = 0;
    $cases = [
    ['args' => [[[3, 9, 20, null, null, 15, 7]]], 'expected' => [[3], [9, 20], [15, 7]]],
    ['args' => [[[1]]], 'expected' => [[1]]],
    ['args' => [[]], 'expected' => []],
    ];
    foreach ($cases as $i => $c) {
        try {
            $got = levelOrder(...$c['args']);
            if (!($got == $c['expected'])) { fwrite(STDERR, "case $i failed\n"); $fail++; }
        } catch (\Throwable $e) { fwrite(STDERR, "case $i threw: {$e->getMessage()}\n"); $fail++; }
    }
    return $fail;
}
