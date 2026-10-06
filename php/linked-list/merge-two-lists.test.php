<?php
require_once __DIR__ . '/_helpers.php';
require_once __DIR__ . '/merge-two-lists.php';

function test_merge_two_lists() {
    $fail = 0;
    $cases = [
    ['args' => [[1, 2, 4], [1, 3, 4]], 'expected' => [1, 1, 2, 3, 4, 4]],
    ['args' => [[], []], 'expected' => []],
    ['args' => [[], [0]], 'expected' => [0]],
    ];
    foreach ($cases as $i => $c) {
        try {
            $got = mergeTwoLists(...$c['args']);
            if (!($got == $c['expected'])) { fwrite(STDERR, "case $i failed\n"); $fail++; }
        } catch (\Throwable $e) { fwrite(STDERR, "case $i threw: {$e->getMessage()}\n"); $fail++; }
    }
    return $fail;
}
