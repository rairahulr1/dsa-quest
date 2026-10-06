<?php
require_once __DIR__ . '/_helpers.php';
require_once __DIR__ . '/valid-parentheses.php';

function test_valid_parentheses() {
    $fail = 0;
    $cases = [
    ['args' => ['()'], 'expected' => true],
    ['args' => ['()[]{}'], 'expected' => true],
    ['args' => ['(]'], 'expected' => false],
    ];
    foreach ($cases as $i => $c) {
        try {
            $got = isValid(...$c['args']);
            if (!($got == $c['expected'])) { fwrite(STDERR, "case $i failed\n"); $fail++; }
        } catch (\Throwable $e) { fwrite(STDERR, "case $i threw: {$e->getMessage()}\n"); $fail++; }
    }
    return $fail;
}
