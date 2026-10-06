<?php
require_once __DIR__ . '/_helpers.php';
require_once __DIR__ . '/course-schedule.php';

function test_course_schedule() {
    $fail = 0;
    $cases = [
    ['args' => [[2, [[1, 0]]]], 'expected' => true],
    ['args' => [[2, [[1, 0], [0, 1]]]], 'expected' => false],
    ['args' => [[3, [[1, 0], [2, 0], [2, 1]]]], 'expected' => true],
    ];
    foreach ($cases as $i => $c) {
        try {
            $got = canFinish(...$c['args']);
            if (!($got == $c['expected'])) { fwrite(STDERR, "case $i failed\n"); $fail++; }
        } catch (\Throwable $e) { fwrite(STDERR, "case $i threw: {$e->getMessage()}\n"); $fail++; }
    }
    return $fail;
}
