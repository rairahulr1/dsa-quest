<?php
require_once __DIR__ . '/../_helpers.php';
require_once __DIR__ . '/min-stack.php';

function test_min_stack() {
    $fail = 0;
    $ops = ['MinStack', 'push', 'push', 'push', 'getMin', 'pop', 'top', 'getMin'];
    $args = [[], [-2], [0], [-3], [], [], [], []];
    $expected = [null, null, null, null, -3, null, 0, -2];
    $results = [];
    $instance = null;
    foreach ($ops as $i => $op) {
        if ($op === 'MinStack') { $instance = new MinStack(); $results[] = null; }
        else { $results[] = $instance->{$op}(...$args[$i]); }
    }
    if ($results !== $expected) { fwrite(STDERR, "case sequence failed\n"); $fail++; }
    return $fail;
}
