<?php
//this is a configuration file for app's database and google maps  key for rendering the map
//after editing save the copy of this file  as default.php
// see js/default_sample.js for configuring JSON url and key for google map geolocation api

//database 
$db_user = 'bugs';  //login to the database
$db_pass ='aAvT7GShVyF1'; //password to the database
$db_name = 'bugs';  //name of the database
$db_host = 'localhost';  //host of the database

//table
$table_name = $db_name.'.'.'zdjecia';  //table name
$table_var_photo = 'photo';  //variable that keeps the jpg/png image
$table_var_title = 'title'; //variable that keeps the title of the image
$table_var_alt = 'alt'; //variable that keeps the description of the image
$table_var_id = 'id';  //variable that keeps the image in the table
$table_var_lat = 'lat';  //variable that keeps the lat coord of an image
$table_var_lng = 'lng';  //variable that keeps the lng coord of an image

//google map key
$google_maps_api_key = "AIzaSyAxM6O5--X2cBLxhNlqgG6ViC-fR2VspFE"
?>

