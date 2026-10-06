<?php
require_once __DIR__ . '/_helpers.php';
require_once __DIR__ . '/number-of-1-bits.php';

function test_number_of_1_bits() {
    $fail = 0;
    $cases = [
    ['args' => [[11]], 'expected' => 3],
    ['args' => [[128]], 'expected' => 1],
    ['args' => [[4294967293]], 'expected' => 31],
    ];
    foreach ($cases as $i => $c) {
        try {
            $got = hammingWeight(...$c['args']);
            if (!($got == $c['expected'])) { fwrite(STDERR, "case $i failed\n"); $fail++; }
        } catch (\Throwable $e) { fwrite(STDERR, "case $i threw: {$e->getMessage()}\n"); $fail++; }
    }
    return $fail;
}
