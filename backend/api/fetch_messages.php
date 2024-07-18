<?php
header('Access-Control-Allow-Origin: *');

header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');
header('Content-Type: application/json');

$messagesFile = 'messages.json';

if (!file_exists($messagesFile)) {
    file_put_contents($messagesFile, json_encode([]));
}

$messages = json_decode(file_get_contents($messagesFile), true);

echo json_encode($messages);
?>
