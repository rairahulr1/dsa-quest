<?php
require_once __DIR__ . '/_helpers.php';
require_once __DIR__ . '/gas-station.php';

function test_gas_station() {
    $fail = 0;
    $cases = [
    ['args' => [[[1, 2, 3, 4, 5], [3, 4, 5, 1, 2]]], 'expected' => 3],
    ['args' => [[[2, 3, 4], [3, 4, 3]]], 'expected' => -1],
    ['args' => [[[5, 1, 2, 3, 4], [4, 4, 1, 5, 1]]], 'expected' => 4],
    ];
    foreach ($cases as $i => $c) {
        try {
            $got = canCompleteCircuit(...$c['args']);
            if (!($got == $c['expected'])) { fwrite(STDERR, "case $i failed\n"); $fail++; }
        } catch (\Throwable $e) { fwrite(STDERR, "case $i threw: {$e->getMessage()}\n"); $fail++; }
    }
    return $fail;
}
