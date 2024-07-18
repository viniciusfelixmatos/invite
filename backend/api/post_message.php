<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');

// Verifica se a requisição é do tipo POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); // Método não permitido
    echo json_encode(['error' => 'Método não permitido']);
    exit;
}

// Recebe os dados JSON da requisição
$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, true);

// Verifica se os dados foram recebidos corretamente
if (!$input || !isset($input['username']) || !isset($input['text'])) {
    http_response_code(400); // Requisição inválida
    echo json_encode(['error' => 'Dados inválidos']);
    exit;
}

$username = htmlspecialchars($input['username']);
$text = htmlspecialchars($input['text']);

// Cria um novo objeto de mensagem
$newMessage = [
    'username' => $username,
    'text' => $text,
    'timestamp' => time()
];

// Caminho do arquivo de mensagens
$messagesFile = '../api/messages.json'; // Caminho atualizado

// Lê mensagens existentes do arquivo, se existir
$messages = [];
if (file_exists($messagesFile)) {
    $messages = json_decode(file_get_contents($messagesFile), true);
}

// Adiciona a nova mensagem ao array de mensagens
$messages[] = $newMessage;

// Salva o array atualizado de mensagens de volta no arquivo
file_put_contents($messagesFile, json_encode($messages, JSON_PRETTY_PRINT));

// Retorna a nova mensagem como resposta
echo json_encode($newMessage);
?>
