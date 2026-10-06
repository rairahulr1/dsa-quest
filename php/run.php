<?php
// PHP quest runner — the CI oracle's PHP half.
// Only runs PHP-ported quests (xp/ledger.json, kind=php),
// so unimplemented stubs never break CI.
$ledger = __DIR__ . '/../xp/ledger.json';
$awarded = [];
if (is_file($ledger)) {
    $data = json_decode(file_get_contents($ledger), true);
    // Only PHP-ported quests (kind=php) run here — a DSA award (kind=dsa)
    // covers the JS test, not the PHP port.
    foreach (($data['awarded'] ?? []) as $id => $entry) {
        if (($entry['kind'] ?? 'dsa') === 'php') $awarded[] = $id;
    }
}

$files = glob(__DIR__ . '/*/*.test.php');
$ran = 0;
$failed = 0;
foreach ($files as $f) {
    $id = basename($f, '.test.php');
    if (!in_array($id, $awarded, true)) continue;
    require_once $f;
    $fn = 'test_' . str_replace('-', '_', $id);
    if (!function_exists($fn)) continue;
    $ran++;
    $fail = $fn();
    if ($fail > 0) {
        $failed++;
        echo "FAIL $id ($fail cases)\n";
    }
}
if ($ran === 0) {
    echo "PHP: no awarded PHP quests yet — award one with: npm run xp -- award <id> --kind php\n";
    exit(0);
}
echo $failed ? "PHP: $failed/$ran awarded quests failing\n" : "PHP: all $ran awarded quests green\n";
exit($failed ? 1 : 0);
