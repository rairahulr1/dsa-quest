<?php
require_once __DIR__ . '/_helpers.php';
require_once __DIR__ . '/implement-queue-stacks.php';

function test_implement_queue_stacks() {
    $fail = 0;
    $ops = ['MyQueue', 'push', 'push', 'peek', 'pop', 'empty'];
    $args = [[], [1], [2], [], [], []];
    $expected = [null, null, null, 1, 1, false];
    $results = [];
    $instance = null;
    foreach ($ops as $i => $op) {
        if ($op === 'MyQueue') { $instance = new MyQueue(); $results[] = null; }
        else { $results[] = $instance->{$op}(...$args[$i]); }
    }
    if ($results !== $expected) { fwrite(STDERR, "case sequence failed\n"); $fail++; }
    return $fail;
}
