<?php
/* incluindo o arquivo com os
dados do banco de dados */
require_once "C:/xampp/htdocs/AUTISMO/ajax/mysql.php";

/* função de conexão com o banco */
function dbcon(){
global $mysql_database, $mysql_host, $mysql_senha, $mysql_usuario, $conexao;

$conexao = new mysqli($mysql_host, $mysql_senha, $mysql_usuario, $mysql_database);
}
?>