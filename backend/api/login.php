<?php
header('Access-Control-Allow-Origin: *');

header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');

include 'utils.php';

$data = json_decode(file_get_contents('php://input'), true);

if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(['status' => 'error', 'message' => 'Erro ao decodificar JSON']);
    exit;
}

$emailOrUsername = $data['emailOrUsername'] ?? null; // Alterado para aceitar email ou username
$password = $data['password'] ?? null;

if (!$emailOrUsername || !$password) {
    echo json_encode(['status' => 'error', 'message' => 'Campos obrigatórios faltando']);
    exit;
}

$users = readUsers();

foreach ($users as $user) {
    if ($user['email'] === $emailOrUsername || $user['username'] === $emailOrUsername) { // Verifica tanto email quanto username
        if (password_verify($password, $user['password'])) {
            // Autenticação bem-sucedida
            $_SESSION['user_id'] = $user['id'];
            echo json_encode(['status' => 'success', 'message' => 'Login bem-sucedido']);
            exit;
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Senha inválida']);
            exit;
        }
    }
}

echo json_encode(['status' => 'error', 'message' => 'Usuário não encontrado']);
?>
