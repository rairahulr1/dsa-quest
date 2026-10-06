<?php
require_once __DIR__ . '/../_helpers.php';
require_once __DIR__ . '/word-search-ii.php';

function test_word_search_ii() {
    $fail = 0;
    $cases = [
    ['args' => [['o', 'a', 'a', 'n'], ['e', 't', 'a', 'e'], ['i', 'h', 'k', 'r'], ['i', 'f', 'l', 'v']], 'expected' => ['eat', 'oath']],
    ['args' => [['a', 'b'], ['c', 'd']], 'expected' => []],
    ];
    foreach ($cases as $i => $c) {
        try {
            $got = findWords(...$c['args']);
            if (!(sameUnordered($got, $c['expected']))) { fwrite(STDERR, "case $i failed\n"); $fail++; }
        } catch (\Throwable $e) { fwrite(STDERR, "case $i threw: {$e->getMessage()}\n"); $fail++; }
    }
    return $fail;
}
