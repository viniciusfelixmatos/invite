<?php

header('Access-Control-Allow-Origin: *');

header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');

require_once 'utils.php';

// Simulação de um ID de usuário fixo para simplificação
$userId = '66805d4cdcae1'; // Altere este ID conforme necessário

$users = readUsers();
foreach ($users as $user) {
    if ($user['id'] == $userId) {
        echo json_encode(['username' => $user['username']]);
        exit();
    }
}

echo json_encode(['message' => 'Usuário não encontrado']);
http_response_code(404);
?>