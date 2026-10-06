<?php
require_once __DIR__ . '/../_helpers.php';
require_once __DIR__ . '/design-add-search-words.php';

function test_design_add_search_words() {
    $fail = 0;
    $ops = ['WordDictionary', 'addWord', 'addWord', 'addWord', 'search', 'search', 'search', 'search'];
    $args = [['bad'], ['dad'], ['mad'], ['pad'], ['bad'], ['.ad'], ['b..']];
    $expected = [null, null, null, null, false, true, true, true];
    $results = [];
    $instance = null;
    foreach ($ops as $i => $op) {
        if ($op === 'WordDictionary') { $instance = new WordDictionary(); $results[] = null; }
        else { $results[] = $instance->{$op}(...$args[$i]); }
    }
    if ($results !== $expected) { fwrite(STDERR, "case sequence failed\n"); $fail++; }
    return $fail;
}
