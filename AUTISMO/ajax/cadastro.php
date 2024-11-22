<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "autismo";

$newURL = "../tela-de-login.html";

$nome = $_POST['nome'];
$email = $_POST['email'];
$senha = $_POST['senha'];
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "INSERT INTO usuario (nome, email, senha)
VALUES ('".$nome."', '".$email."', '".$senha."')";

if ($conn->query($sql) === TRUE) {
  echo "Usuário adicionado com sucesso";
  header('Location: '.$newURL);
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}


$conn->close();
?>