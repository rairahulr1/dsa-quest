<?php
require_once __DIR__ . '/_helpers.php';
require_once __DIR__ . '/validate-bst.php';

function test_validate_bst() {
    $fail = 0;
    $cases = [
    ['args' => [[[2, 1, 3]]], 'expected' => true],
    ['args' => [[[5, 1, 4, null, null, 3, 6]]], 'expected' => false],
    ['args' => [[[1, 1]]], 'expected' => false],
    ];
    foreach ($cases as $i => $c) {
        try {
            $got = isValidBST(...$c['args']);
            if (!($got == $c['expected'])) { fwrite(STDERR, "case $i failed\n"); $fail++; }
        } catch (\Throwable $e) { fwrite(STDERR, "case $i threw: {$e->getMessage()}\n"); $fail++; }
    }
    return $fail;
}
