# photo_location
## the tasks:
1. photo download from the phone (win, andr, ios) with the description and coords;
2. photo send to the server;
3. photo shown on the page with description  and coordinates
4. photo shown on the map;

http://test.lokori.atthouse.pl/photo_location/register-img.php  sql version

### ad 1 + 2 
Done via POST form.
Then: 
 - version 1: sent to SQL database via PHP (see: register-img.php and app.js, screen of sql table attached - XAMPP used for test); 
 - version 2: sent to JSON via PHP (see: register-img-ajax.php,  app-ajax.js and images.json - json-server used for test)
 
 Information about coords and date of photoshoot taken from exif  data.
 
#### issues:
- not all mobile phones provides exif GPS data;;
- noticed at ios, safari: no coords for photos taken in Safari directly: error  "Illegal IFD size" known issue, see:  https://bugs.php.net/bug.php?id=50660;
- is it acceptable or the other solution should be introduced (eg GEO Location API https://developers.google.com/web/fundamentals/native-hardware/user-location/, however it would be location in the moment of adding the photo, not in the moment of taking the photo... ) 
 

### ad 3.
Done in a form of one-page web app, styled for rwd with CSS (see style.css)

#### issues:
- mobile browsers recognizes orientation of the photo ($exif["IFD0"]["Orientation"]) but some desktop browsers - not. Should it be handled?


### ad 4.
Done via Google Maps JS. Every photo that has coordinates has it's own map, one general map is provided for all images with coords.


### Tested:

#### Directly:

- iphone 5c (ios), Safari up to date for 28.08.2017  - provides coords for photos from Gallery, issue for photos taken directly via Safari - described above, images rotated properly, application works properly; 
- Karbonn android one - not provides coords, images rotated properly, application works properly)

#### Virtually:
via https://www.browserstack.com/
os=android&os_version=4.4&device=Samsung+Galaxy+Tab+4&device_browser=chrome
os=android&os_version=4.4&device=Samsung+Galaxy+Note+4&device_browser=chrome
os=android&os_version=5.0&device=Motorola+Moto+G+2nd+Gen&device_browser=chrome
os=iOS&os_version=9.0&device=iPhone+6S&device_browser=safari
os=winphone&device=Nokia+Lumia+930&device_browser=edge


http://localhost:3000/images

