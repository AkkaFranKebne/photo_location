<?php
include 'default.php';

$user = $db_user;
//echo $user;
$pass = $db_pass;
//echo $pass;
$db = $db_name; 
//echo $db;
//echo $db_host;
$conn = new mysqli($db_host, $user, $pass, $db) or die("Unable to connect".$conn->connect_error);



?>