<?php
require_once __DIR__ . '/_helpers.php';
require_once __DIR__ . '/permutations.php';

function test_permutations() {
    $fail = 0;
    $cases = [
    ['args' => [[1, 2, 3]], 'expected' => [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]],
    ['args' => [[0, 1]], 'expected' => [[0, 1], [1, 0]]],
    ['args' => [[1]], 'expected' => [[1]]],
    ];
    foreach ($cases as $i => $c) {
        try {
            $got = permute(...$c['args']);
            if (!(sameUnorderedDeep($got, $c['expected']))) { fwrite(STDERR, "case $i failed\n"); $fail++; }
        } catch (\Throwable $e) { fwrite(STDERR, "case $i threw: {$e->getMessage()}\n"); $fail++; }
    }
    return $fail;
}
