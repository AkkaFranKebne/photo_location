# photo_location
## the tasks:
1. photo download from the phone (win, andr, ios) with the description and coords;
2. photo send to the server;
3. photo shown on the page with description  and coordinates
4. photo shown on the map;

https://bugs.codingmice.com/register-img-ajax.php

### ad 1 + 2 
- For jpg and png files
- uploades via POST form, sent via AJAX and PHP to SQL database, collecting coords from the browser on the  way (https provided)
- f no coords were sent by the browser PHP tries to takes coords from exif data

### ad 3.
- info about photos collected in JSON prepared via PHP  https://bugs.codingmice.com/get-images.php and in Images object

### ad 4.
- Done via Google Maps JS, used Geolocation API for transforming coords to addressess

### Tested:

#### Directly:

- iphone 5c (ios), Safari up to date for 28.08.2017  
- Karbonn android one 

#### Virtually:
- via https://www.browserstack.com/
os=android&os_version=4.4&device=Samsung+Galaxy+Tab+4&device_browser=chrome
os=android&os_version=4.4&device=Samsung+Galaxy+Note+4&device_browser=chrome
os=android&os_version=5.0&device=Motorola+Moto+G+2nd+Gen&device_browser=chrome
os=iOS&os_version=9.0&device=iPhone+6S&device_browser=safari
os=winphone&device=Nokia+Lumia+930&device_browser=edge





