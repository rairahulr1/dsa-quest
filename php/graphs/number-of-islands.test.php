<?php
require_once __DIR__ . '/../_helpers.php';
require_once __DIR__ . '/number-of-islands.php';

function test_number_of_islands() {
    $fail = 0;
    $cases = [
    ['args' => [['1', '1', '1', '1', '0'], ['1', '1', '0', '1', '0'], ['1', '1', '0', '0', '0'], ['0', '0', '0', '0', '0']], 'expected' => 1],
    ['args' => [['1', '1', '0', '0', '0'], ['1', '1', '0', '0', '0'], ['0', '0', '1', '0', '0'], ['0', '0', '0', '1', '1']], 'expected' => 3],
    ['args' => [['0']], 'expected' => 0],
    ];
    foreach ($cases as $i => $c) {
        try {
            $got = numIslands(...$c['args']);
            if (!($got == $c['expected'])) { fwrite(STDERR, "case $i failed\n"); $fail++; }
        } catch (\Throwable $e) { fwrite(STDERR, "case $i threw: {$e->getMessage()}\n"); $fail++; }
    }
    return $fail;
}
