<?php
error_reporting(E_ERROR ^ E_WARNING); 
dbcon();

$id = $_POST['id'];

$salvar = $conexao -> query("DELETE FROM 'formulario' WHERE id= '$id' ");

?>