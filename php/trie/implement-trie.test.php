<?php
require_once __DIR__ . '/../_helpers.php';
require_once __DIR__ . '/implement-trie.php';

function test_implement_trie() {
    $fail = 0;
    $ops = ['Trie', 'insert', 'search', 'search', 'startsWith'];
    $args = [['apple'], ['apple'], ['app'], ['app']];
    $expected = [null, true, false, true];
    $results = [];
    $instance = null;
    foreach ($ops as $i => $op) {
        if ($op === 'Trie') { $instance = new Trie(); $results[] = null; }
        else { $results[] = $instance->{$op}(...$args[$i]); }
    }
    if ($results !== $expected) { fwrite(STDERR, "case sequence failed\n"); $fail++; }
    return $fail;
}
