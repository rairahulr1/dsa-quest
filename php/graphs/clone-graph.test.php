<?php
require_once __DIR__ . '/_helpers.php';
require_once __DIR__ . '/clone-graph.php';

function test_clone_graph() {
    $fail = 0;
    $cases = [
    ['args' => [[[2, 4], [1, 3], [2, 4], [1, 3]]], 'expected' => [[2, 4], [1, 3], [2, 4], [1, 3]]],
    ['args' => [[]], 'expected' => []],
    ['args' => [[[]]], 'expected' => [[]]],
    ];
    foreach ($cases as $i => $c) {
        try {
            $got = cloneGraph(...$c['args']);
            if (!($got == $c['expected'])) { fwrite(STDERR, "case $i failed\n"); $fail++; }
        } catch (\Throwable $e) { fwrite(STDERR, "case $i threw: {$e->getMessage()}\n"); $fail++; }
    }
    return $fail;
}
