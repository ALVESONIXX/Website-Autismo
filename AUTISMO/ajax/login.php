<?php
error_reporting(E_ERROR ^ E_WARNING);
dbconn();

$email = $_POST['email'];
$senha = md5($_POST['senha']); // Use hash mais seguro se possível

// Verifica se o e-mail e a senha foram enviados
if (!isset($email) || !isset($senha)) {
    echo json_encode(['msg_status' => 'erro_senha_email']);
    exit();
}

// Cria uma conexão com o banco de dados
try {
    $pdo = new PDO('mysql:host=localhost;dbname=autismo', 'root', '');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Prepara a consulta para verificar as credenciais
    $stmt = $pdo->prepare('SELECT `id`, `nome`, `email`, `senha`, `adm` FROM `usuario` WHERE email = :email AND senha = :senha');
    $stmt->execute([
        'email' => $email,
        'senha' => $senha
    ]);

    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        // Armazena o ID do usuário na sessã

        // Retorna resposta JSON indicando sucesso
        echo json_encode(['msg_status' => 'logar', 'message' => 'Logado']);
    } else {
        // Retorna resposta JSON indicando erro
        echo json_encode(['msg_status' => 'erro_senha_email', 'message' => 'Email ou senha incorretos']);
    }
} catch (PDOException $e) {
    // Retorna resposta JSON indicando erro do servidor
    echo json_encode(['msg_status' => 'erro', 'message' => 'Erro no servidor: ' . $e->getMessage()]);
}
?>


