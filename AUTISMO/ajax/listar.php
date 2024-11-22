<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "autismo";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * from formulario";
$result = $conn -> query($sql);


// Associative array
$result -> fetch_array(MYSQLI_ASSOC);
?>
<table>
<?php
foreach($result as $sql){
?>
<tr>
    <th><?=$sql['id']?></th>
    <th><?=$sql['nome']?></th>
    <th><?=$sql['email']?></th>
    <th><?=$sql['mensagem']?></th>
  </tr>
 <?php
}
?>
</table>
<?php
$conn->close();
?>