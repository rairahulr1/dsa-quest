<?php
require_once __DIR__ . '/_helpers.php';
require_once __DIR__ . '/koko-bananas.php';

function test_koko_bananas() {
    $fail = 0;
    $cases = [
    ['args' => [[3, 6, 7, 11], 8], 'expected' => 4],
    ['args' => [[30, 11, 23, 4, 20], 5], 'expected' => 30],
    ['args' => [[30, 11, 23, 4, 20], 6], 'expected' => 23],
    ];
    foreach ($cases as $i => $c) {
        try {
            $got = minEatingSpeed(...$c['args']);
            if (!($got == $c['expected'])) { fwrite(STDERR, "case $i failed\n"); $fail++; }
        } catch (\Throwable $e) { fwrite(STDERR, "case $i threw: {$e->getMessage()}\n"); $fail++; }
    }
    return $fail;
}
