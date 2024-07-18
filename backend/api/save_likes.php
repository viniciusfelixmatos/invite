<?php
header('Access-Control-Allow-Origin: *');

header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');

$likesFile = 'likes.json';
$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['likes'])) {
    file_put_contents($likesFile, $data['likes']);
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid data']);
}
?>
