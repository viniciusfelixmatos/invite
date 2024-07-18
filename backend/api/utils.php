<?php
// backend/api/utils.php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");


function readUsers() {
    $filename = 'users.json';
    if (!file_exists($filename)) {
        file_put_contents($filename, json_encode([]));
    }
    $json = file_get_contents($filename);
    return json_decode($json, true);
}

function writeUsers($users) {
    $filename = 'users.json';
    file_put_contents($filename, json_encode($users, JSON_PRETTY_PRINT));
}
?>

