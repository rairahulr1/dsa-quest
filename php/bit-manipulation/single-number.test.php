<?php
require_once __DIR__ . '/_helpers.php';
require_once __DIR__ . '/single-number.php';

function test_single_number() {
    $fail = 0;
    $cases = [
    ['args' => [[[2, 2, 1]]], 'expected' => 1],
    ['args' => [[[4, 1, 2, 1, 2]]], 'expected' => 4],
    ['args' => [[[1]]], 'expected' => 1],
    ];
    foreach ($cases as $i => $c) {
        try {
            $got = singleNumber(...$c['args']);
            if (!($got == $c['expected'])) { fwrite(STDERR, "case $i failed\n"); $fail++; }
        } catch (\Throwable $e) { fwrite(STDERR, "case $i threw: {$e->getMessage()}\n"); $fail++; }
    }
    return $fail;
}
