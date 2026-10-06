<?php
// Shared helpers for PHP SPL re-implementation quests.

// Level-order array (nulls allowed) -> nested ['val','left','right'] tree or null
function toTree(?array $a): ?array {
    if (!$a || $a[0] === null) return null;
    $root = ['val' => $a[0], 'left' => null, 'right' => null];
    $q = [$root];
    $i = 1;
    $n = count($a);
    while ($i < $n) {
        $node = array_shift($q);
        if ($i < $n && $a[$i] !== null) {
            $node['left'] = ['val' => $a[$i], 'left' => null, 'right' => null];
            $q[] = &$node['left'];
        }
        $i++;
        if ($i < $n && $a[$i] !== null) {
            $node['right'] = ['val' => $a[$i], 'left' => null, 'right' => null];
            $q[] = &$node['right'];
        }
        $i++;
    }
    return $root;
}

// Adjacency normalisation for clone-graph comparison (sorted, de-duplicated)
function sameAdj(array $a, array $b): bool {
    $norm = function (array $adj): array {
        $out = $adj;
        foreach ($out as &$nb) { sort($nb); }
        unset($nb);
        usort($out, fn($x, $y) => count($x) - count($y) ?: ($x[0] ?? 0) - ($y[0] ?? 0));
        return $out;
    };
    return $norm($a) == $norm($b);
}

function sameUnordered(array $a, array $b): bool {
    sort($a);
    sort($b);
    return $a == $b;
}

function sameUnorderedDeep(array $a, array $b): bool {
    $norm = function (array $a): array {
        $out = array_map(function ($x) { sort($x); return json_encode($x); }, $a);
        sort($out);
        return $out;
    };
    return $norm($a) == $norm($b);
}

function sameIntervals(array $a, array $b): bool {
    $norm = function (array $a): array {
        $out = $a;
        usort($out, fn($x, $y) => $x[0] - $y[0]);
        return $out;
    };
    return $norm($a) == $norm($b);
}
