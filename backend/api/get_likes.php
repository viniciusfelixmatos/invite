<?php
header('Access-Control-Allow-Origin: *');

header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');

$likesFile = 'likes.json';

if (file_exists($likesFile)) {
    $likes = file_get_contents($likesFile);
    echo json_encode(['likes' => (int)$likes]);
} else {
    echo json_encode(['likes' => 0]);
}
?>
