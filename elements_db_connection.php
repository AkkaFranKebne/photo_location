<?php
//connect with database: https://www.w3schools.com/php/php_mysql_insert.asp
$user = 'root';
$pass ='';
$db = 'lemoniada_test'; //made at w http://localhost/phpmyadmin/server_databases.php?db=
$conn = new mysqli('localhost', $user, $pass, $db) or die("Unable to connect".$conn->connect_error);
?>