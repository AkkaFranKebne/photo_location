<?php
include 'elements_db_connection.php';
include 'functions.php';
        
      if ($_SERVER['REQUEST_METHOD'] === 'POST'  )  {
          if (  preg_match('/[.](jpg)$/', $_FILES['image']['name']) || preg_match('/[.](JPG)$/', $_FILES['image']['name']) || preg_match('/[.](png)$/', $_FILES['image']['name']) || preg_match('/[.](PNG)$/', $_FILES['image']['name']) ) {
          
            //submitted data
            $fileData = pathinfo(basename($_FILES["image"]["name"]));
            $image = uniqid() . '.' . $fileData['extension'];
            $filename = $image;
            $alt = $_POST[$table_var_alt];
            $title = $_POST[$table_var_title];
            $lat = $_POST[$table_var_lat];
            $lng = $_POST[$table_var_lng];
            //source and target to save at the server
            $source = $_FILES['image']['tmp_name'];
            $target = "images/".$image; 
              
            //ADDED: send data to sql
            
            $sql = "INSERT INTO ". $table_name ." (".$table_var_photo.", ".$table_var_title.", ".$table_var_alt.", ".$table_var_lat.", ".$table_var_lng.") VALUES ('$image', '$title', '$alt', '$lat', '$lng')";          
            if ($conn->query($sql) === TRUE) {
                    echo "<p>Nowy wpis dodany</p>";
            } else {
                    echo "<p>Error: " . $sql . "<br>" . $conn->error."</p>";
            }
              
            
                        
          //move uploaded image into the folder
          if (move_uploaded_file($source, $target)) {
              echo "$target||";  //this is the return we want to achieve
              echo getCoords($target);
          }
          else {
              echo "<p class='error'>problem z uploadowaniem obrazka</p>";
          }
               
              
          //create thumbnail  for map
          createThumbnail($filename); 
          }
          else {echo "<p class='error'>Obrazek musi byc w formacie jpg lub png. Sprobuj ponownie.</p>";}
    } else 
      {
          echo "<p class='error'>Obrazek nie zostal zalaczony.</p>";
      //echo var_dump($_POST);
      //echo var_dump($_FILES);
       }



?>



    