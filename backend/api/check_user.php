<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");


include 'utils.php';

$email = $_GET['email'] ?? null;

if (!$email) {
    echo json_encode(['status' => 'error', 'message' => 'Email não fornecido']);
    exit;
}

$users = readUsers();

foreach ($users as $user) {
    if ($user['email'] === $email) {
        echo json_encode(['status' => 'success', 'message' => 'Usuário registrado']);
        exit;
    }
}

echo json_encode(['status' => 'error', 'message' => 'Usuário não registrado']);
?>
