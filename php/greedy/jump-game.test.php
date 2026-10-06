<?php
require_once __DIR__ . '/../_helpers.php';
require_once __DIR__ . '/jump-game.php';

function test_jump_game() {
    $fail = 0;
    $cases = [
    ['args' => [[2, 3, 1, 1, 4]], 'expected' => true],
    ['args' => [[3, 2, 1, 0, 4]], 'expected' => false],
    ['args' => [[0]], 'expected' => true],
    ];
    foreach ($cases as $i => $c) {
        try {
            $got = canJump(...$c['args']);
            if (!($got == $c['expected'])) { fwrite(STDERR, "case $i failed\n"); $fail++; }
        } catch (\Throwable $e) { fwrite(STDERR, "case $i threw: {$e->getMessage()}\n"); $fail++; }
    }
    return $fail;
}
