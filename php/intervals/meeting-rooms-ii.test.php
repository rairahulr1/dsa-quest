<?php
require_once __DIR__ . '/../_helpers.php';
require_once __DIR__ . '/meeting-rooms-ii.php';

function test_meeting_rooms_ii() {
    $fail = 0;
    $cases = [
    ['args' => [[[0, 30], [5, 10], [15, 20]]], 'expected' => 2],
    ['args' => [[[7, 10], [2, 4]]], 'expected' => 1],
    ['args' => [[[1, 5], [8, 9], [8, 9]]], 'expected' => 2],
    ];
    foreach ($cases as $i => $c) {
        try {
            $got = minMeetingRooms(...$c['args']);
            if (!($got == $c['expected'])) { fwrite(STDERR, "case $i failed\n"); $fail++; }
        } catch (\Throwable $e) { fwrite(STDERR, "case $i threw: {$e->getMessage()}\n"); $fail++; }
    }
    return $fail;
}
