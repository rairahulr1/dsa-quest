<?php
require_once __DIR__ . '/../_helpers.php';
require_once __DIR__ . '/house-robber.php';

function test_house_robber() {
    $fail = 0;
    $cases = [
    ['args' => [[1, 2, 3, 1]], 'expected' => 4],
    ['args' => [[2, 7, 9, 3, 1]], 'expected' => 12],
    ['args' => [[2, 1, 1, 2]], 'expected' => 4],
    ];
    foreach ($cases as $i => $c) {
        try {
            $got = rob(...$c['args']);
            if (!($got == $c['expected'])) { fwrite(STDERR, "case $i failed\n"); $fail++; }
        } catch (\Throwable $e) { fwrite(STDERR, "case $i threw: {$e->getMessage()}\n"); $fail++; }
    }
    return $fail;
}
