

<!DOCTYPE html>
<html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Photos location</title>
    <!-- jquery-->
    <script src="js/jquery-3.2.1.min.js"> </script>
    <!--google maps api -->
    <script  defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAxM6O5--X2cBLxhNlqgG6ViC-fR2VspFE"> </script>
    <!-- javascript -->
    <script src="js/app-ajax.js"> </script>
    <!-- css -->
    <link rel="stylesheet" href="css/style.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0 user-scalable=no" />
</head>
<body id ="register_form">
    <header>
        <div class="title"><h1>Zarejestruj nowe zdjęcie:</h1></div>
    </header>
    <form action='#' method = post enctype="multipart/form-data">
        <p>Wybierz zdjęcie</p>
        <input type=hidden name=size value='1000000'>
        <input type=file  name=image id='file' required >
        <p>Nadaj tytuł: </p><input type=text name=title >
        <p>Dodaj opis:</p> <textarea type=text name=alt col=40 row = 4></textarea><br>
        <input type=submit name='upload' value='upload'>   
    </form>
    <p id='info'></p>
     <div class="title"><h1>Mapa zdjęć:</h1></div>
        <div class="map" id="general-map"></div>
        <div class="title"><h1>Galeria zdjęć:</h1></div>
        <div id="images-div"></div>
</body>
</html>
    
    
    
     
    