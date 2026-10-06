<?php
require_once __DIR__ . '/_helpers.php';
require_once __DIR__ . '/task-scheduler.php';

function test_task_scheduler() {
    $fail = 0;
    $cases = [
    ['args' => [[['A', 'A', 'A', 'B', 'B', 'B'], 2]], 'expected' => 8],
    ['args' => [[['A', 'C', 'A', 'B', 'D', 'B'], 1]], 'expected' => 6],
    ['args' => [[['A', 'A', 'A', 'B', 'B', 'B'], 3]], 'expected' => 10],
    ];
    foreach ($cases as $i => $c) {
        try {
            $got = leastInterval(...$c['args']);
            if (!($got == $c['expected'])) { fwrite(STDERR, "case $i failed\n"); $fail++; }
        } catch (\Throwable $e) { fwrite(STDERR, "case $i threw: {$e->getMessage()}\n"); $fail++; }
    }
    return $fail;
}
