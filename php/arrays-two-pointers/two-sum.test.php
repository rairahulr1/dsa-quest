<?php
require_once __DIR__ . '/../_helpers.php';
require_once __DIR__ . '/two-sum.php';

function test_two_sum() {
    $fail = 0;
    $cases = [
    ['args' => [[2, 7, 11, 15], 9], 'expected' => [0, 1]],
    ['args' => [[3, 2, 4], 6], 'expected' => [1, 2]],
    ['args' => [[3, 3], 6], 'expected' => [0, 1]],
    ];
    foreach ($cases as $i => $c) {
        try {
            $got = twoSum(...$c['args']);
            if (!($got == $c['expected'])) { fwrite(STDERR, "case $i failed\n"); $fail++; }
        } catch (\Throwable $e) { fwrite(STDERR, "case $i threw: {$e->getMessage()}\n"); $fail++; }
    }
    return $fail;
}
