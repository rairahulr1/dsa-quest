<?php
require_once __DIR__ . '/_helpers.php';
require_once __DIR__ . '/linked-list-cycle.php';

function test_linked_list_cycle() {
    $fail = 0;
    $cases = [
    ['args' => [[3, 2, 0, -4], 1], 'expected' => true],
    ['args' => [[1, 2], 0], 'expected' => true],
    ['args' => [[1], -1], 'expected' => false],
    ];
    foreach ($cases as $i => $c) {
        try {
            $got = hasCycle(...$c['args']);
            if (!($got == $c['expected'])) { fwrite(STDERR, "case $i failed\n"); $fail++; }
        } catch (\Throwable $e) { fwrite(STDERR, "case $i threw: {$e->getMessage()}\n"); $fail++; }
    }
    return $fail;
}
