<?php
require_once __DIR__ . '/_helpers.php';
require_once __DIR__ . '/counting-bits.php';

function test_counting_bits() {
    $fail = 0;
    $cases = [
    ['args' => [[2]], 'expected' => [0, 1, 1]],
    ['args' => [[5]], 'expected' => [0, 1, 1, 2, 1, 2]],
    ['args' => [[0]], 'expected' => [0]],
    ];
    foreach ($cases as $i => $c) {
        try {
            $got = countBits(...$c['args']);
            if (!($got == $c['expected'])) { fwrite(STDERR, "case $i failed\n"); $fail++; }
        } catch (\Throwable $e) { fwrite(STDERR, "case $i threw: {$e->getMessage()}\n"); $fail++; }
    }
    return $fail;
}
