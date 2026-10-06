<?php
require_once __DIR__ . '/_helpers.php';
require_once __DIR__ . '/longest-substring.php';

function test_longest_substring() {
    $fail = 0;
    $cases = [
    ['args' => [['abcabcbb']], 'expected' => 3],
    ['args' => [['bbbbb']], 'expected' => 1],
    ['args' => [['pwwkew']], 'expected' => 3],
    ];
    foreach ($cases as $i => $c) {
        try {
            $got = lengthOfLongestSubstring(...$c['args']);
            if (!($got == $c['expected'])) { fwrite(STDERR, "case $i failed\n"); $fail++; }
        } catch (\Throwable $e) { fwrite(STDERR, "case $i threw: {$e->getMessage()}\n"); $fail++; }
    }
    return $fail;
}
