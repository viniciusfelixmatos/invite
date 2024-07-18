<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Origin: http://localhost:5173");


include 'utils.php';

$data = json_decode(file_get_contents('php://input'), true);

if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(['status' => 'error', 'message' => 'Erro ao decodificar JSON']);
    exit;
}

$email = $data['email'] ?? null;
$username = $data['username'] ?? null; // Adiciona a variável $username
$password = $data['password'] ?? null;

if (!$email || !$username || !$password) { // Verifica se todos os campos necessários foram fornecidos
    echo json_encode(['status' => 'error', 'message' => 'Campos obrigatórios faltando']);
    exit;
}

$hashedPassword = password_hash($password, PASSWORD_BCRYPT);
$users = readUsers();

foreach ($users as $user) {
    if ($user['email'] === $email) {
        echo json_encode(['status' => 'error', 'message' => 'Email já registrado']);
        exit;
    }
}

$users[] = ['id' => uniqid(), 'email' => $email, 'username' => $username, 'password' => $hashedPassword]; // Inclui o username no array
writeUsers($users);

echo json_encode(['status' => 'success', 'message' => 'Usuário registrado com sucesso']);
?>
