<?php
require_once __DIR__ . '/../_helpers.php';
require_once __DIR__ . '/reverse-linked-list.php';

function test_reverse_linked_list() {
    $fail = 0;
    $cases = [
    ['args' => [[1, 2, 3, 4, 5]], 'expected' => [5, 4, 3, 2, 1]],
    ['args' => [[1, 2]], 'expected' => [2, 1]],
    ['args' => [], 'expected' => []],
    ];
    foreach ($cases as $i => $c) {
        try {
            $got = reverseList(...$c['args']);
            if (!($got == $c['expected'])) { fwrite(STDERR, "case $i failed\n"); $fail++; }
        } catch (\Throwable $e) { fwrite(STDERR, "case $i threw: {$e->getMessage()}\n"); $fail++; }
    }
    return $fail;
}
