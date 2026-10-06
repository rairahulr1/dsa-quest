<?php
require_once __DIR__ . '/_helpers.php';
require_once __DIR__ . '/next-greater-element.php';

function test_next_greater_element() {
    $fail = 0;
    $cases = [
    ['args' => [[4, 1, 2], [1, 3, 4, 2]], 'expected' => [-1, 3, -1]],
    ['args' => [[2, 4], [1, 2, 3, 4]], 'expected' => [3, -1]],
    ['args' => [[1], [1, 2, 3]], 'expected' => [2]],
    ];
    foreach ($cases as $i => $c) {
        try {
            $got = nextGreaterElement(...$c['args']);
            if (!($got == $c['expected'])) { fwrite(STDERR, "case $i failed\n"); $fail++; }
        } catch (\Throwable $e) { fwrite(STDERR, "case $i threw: {$e->getMessage()}\n"); $fail++; }
    }
    return $fail;
}
