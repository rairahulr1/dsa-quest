<?php
require_once __DIR__ . '/../_helpers.php';
require_once __DIR__ . '/min-window-substring.php';

function test_min_window_substring() {
    $fail = 0;
    $cases = [
    ['args' => ['ADOBECODEBANC', 'ABC'], 'expected' => 'BANC'],
    ['args' => ['a', 'a'], 'expected' => 'a'],
    ['args' => ['a', 'aa'], 'expected' => ''],
    ];
    foreach ($cases as $i => $c) {
        try {
            $got = minWindow(...$c['args']);
            if (!($got == $c['expected'])) { fwrite(STDERR, "case $i failed\n"); $fail++; }
        } catch (\Throwable $e) { fwrite(STDERR, "case $i threw: {$e->getMessage()}\n"); $fail++; }
    }
    return $fail;
}
