<?php
// backend/index.php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Origin: http://localhost:5173");


$requestMethod = $_SERVER["REQUEST_METHOD"];

if ($requestMethod == 'POST') {
    $uri = $_SERVER['REQUEST_URI'];

    if (strpos($uri, '/register') !== false) {
        include_once 'api/register.php';
    } elseif (strpos($uri, '/login') !== false) {
        include_once 'api/login.php';
    } elseif (strpos($uri, '/upload_profile_picture') !== false) {
        include_once 'api/upload_profile_picture.php';
    } elseif (strpos($uri, '/update_profile') !== false) {
        include_once 'api/update_profile.php';
    } else {
        echo json_encode(array("message" => "Endpoint não encontrado."));
    }
} elseif ($requestMethod == 'GET') {
    $uri = $_SERVER['REQUEST_URI'];

    if (strpos($uri, '/get_user_data') !== false) {
        include_once 'api/get_user_data.php';
    } else {
        echo json_encode(array("message" => "Endpoint não encontrado."));
    }
} else {
    echo json_encode(array("message" => "Método não permitido."));
}
?>
