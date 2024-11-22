<?php
session_start();

// Database connection parameters
$host = 'localhost';
$dbname = 'autismo';
$username = 'root'; // Update with your database username
$password = ''; // Update with your database password

$error_message = ''; // Initialize error message variable

try {
    // Create PDO connection
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    die("Erro de conexão: " . $e->getMessage());
}

// Check if login form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $senha = $_POST['senha'];

    // Check for fixed admin credentials
    if ($email === 'teste@gmail.com' && $senha === '1234') {
        $_SESSION['user_id'] = 0;
        $_SESSION['nome'] = 'Administrador';
        $_SESSION['is_admin'] = true;
        header("Location: tabela.php");
        exit();
    }

    // Prepare SQL statement to prevent SQL injection
    $stmt = $pdo->prepare("SELECT * FROM usuario WHERE email = :email AND senha = :senha");
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':senha', $senha);
    $stmt->execute();

    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        // Login successful
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['nome'] = $user['nome'];
        $_SESSION['is_admin'] = $user['adm'] == 1;

        // Redirect based on user role
        if ($user['adm'] == 1) {
            header("Location: tabela.php");
        } else {
            header("Location: indexcopy.html");
        }
        exit();
    } else {
        // Login failed
        $error_message = "Email ou senha inválidos";
    }
}
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body {
            background: linear-gradient(135deg, #51C5FF 0%, #51C5FF 100%);
        }
        .bg-blue-900{
            background-color: #000 !important;
        }
    </style>
</head>
<body class="flex items-center justify-center min-h-screen">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div class="bg-blue-900 text-white text-center py-6">
            <h1 class="text-3xl font-bold">Bem-vindo</h1>
            <p class="text-blue-200">Faça login para continuar</p>
        </div>
        
        <form method="POST" action="" class="p-8 space-y-6">
            <?php if (!empty($error_message)): ?>
                <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <?php echo htmlspecialchars($error_message); ?>
                </div>
            <?php endif; ?>

            <div>
                <label class="block text-gray-700 mb-2 font-medium">Email</label>
                <div class="relative">
                    <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                        <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                    </span>
                    <input 
                        type="email" 
                        name="email"
                        required 
                        class="w-full pl-10 pr-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-900 transition"
                        placeholder="seu@email.com"
                    >
                </div>
            </div>
            
            <div>
                <label class="block text-gray-700 mb-2 font-medium">Senha</label>
                <div class="relative">
                    <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                        <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                        </svg>
                    </span>
                    <input 
                        type="password" 
                        name="senha"
                        required 
                        class="w-full pl-10 pr-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-900 transition"
                        placeholder="********"
                    >
                </div>
            </div>
            
            <button 
                type="submit" 
                class="w-full bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-800 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
                Entrar
            </button>
        </form>
    </div>
</body>
</html>