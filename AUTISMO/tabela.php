<?php
session_start();
require './ajax/conexao.php';

// Handle delete request
if (isset($_GET['delete']) && isset($_GET['id'])) {
    $id = intval($_GET['id']);
    $delete_sql = "DELETE FROM formulario WHERE id = $id";
    if (mysqli_query($conexao, $delete_sql)) {
        header("Location: ".$_SERVER['PHP_SELF']."?deleted=true");
        exit();
    } else {
        $error = "Erro ao excluir registro: " . mysqli_error($conexao);
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TABELA ADMINISTRATIVA</title>
    <link rel="stylesheet" href="./assets/css/tabela.css">
    <link href='https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css' rel='stylesheet'>
    <style>
        .delete-btn {
            background-color: red;
            color: white;
            border: none;
            padding: 5px 10px;
            cursor: pointer;
            border-radius: 3px;
        }
        .delete-btn:hover {
            background-color: darkred;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <span>Tabela Administrativa</span>
            <a href="./indexcopy.html"><img class="logoTable" src="./images/main/logo-autismo.png" alt=""></a>
        </div>

        <?php if(isset($_GET['deleted']) && $_GET['deleted'] == 'true'): ?>
            <div style="color: green; margin-bottom: 10px;">Registro excluído com sucesso!</div>
        <?php endif; ?>

        <?php if(isset($error)): ?>
            <div style="color: red; margin-bottom: 10px;"><?php echo $error; ?></div>
        <?php endif; ?>

        <div class="divTable">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Mensagem</th>
                        <th>Excluir</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    $sql = 'SELECT * FROM formulario';
                    $formulario = mysqli_query($conexao, $sql);
                    if (mysqli_num_rows($formulario) > 0) {
                        foreach($formulario as $registro) {  
                    ?>
                    <tr>
                        <td><?= htmlspecialchars($registro['id']) ?></td>
                        <td><?= htmlspecialchars($registro['nome']) ?></td>
                        <td><?= htmlspecialchars($registro['email']) ?></td>
                        <td><?= htmlspecialchars($registro['mensagem']) ?></td>
                        <td>
                            <a href="?delete=1&id=<?= $registro['id'] ?>" 
                               class="delete-btn" 
                               onclick="return confirm('Tem certeza que deseja excluir este registro?');">
                                Excluir
                            </a>
                        </td>
                    </tr>
                    <?php
                        }
                    } else {
                        echo '<tr><td colspan="5">Nenhum usuário encontrado</td></tr>';
                    }
                    ?>
                </tbody>
            </table>
        </div>
    </div>
</body>
</html>