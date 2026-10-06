<?php
require_once __DIR__ . '/../_helpers.php';
require_once __DIR__ . '/assign-cookies.php';

function test_assign_cookies() {
    $fail = 0;
    $cases = [
    ['args' => [[1, 2, 3], [1, 1]], 'expected' => 1],
    ['args' => [[1, 2], [1, 2, 3]], 'expected' => 2],
    ['args' => [[1, 2, 3], [3]], 'expected' => 1],
    ];
    foreach ($cases as $i => $c) {
        try {
            $got = findContentChildren(...$c['args']);
            if (!($got == $c['expected'])) { fwrite(STDERR, "case $i failed\n"); $fail++; }
        } catch (\Throwable $e) { fwrite(STDERR, "case $i threw: {$e->getMessage()}\n"); $fail++; }
    }
    return $fail;
}
