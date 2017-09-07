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
 
 Information about coords and date of photoshoot taken from exif  data, if not avaliable - from geolocation.
 
#### issues:
- Safari: [blocked] Access to geolocation was blocked over insecure connection to http://localhost. >> https needed https://stackoverflow.com/questions/39633313/got-an-error-when-trying-to-get-the-geolocation-in-safari-on-ios-10
 

### ad 3.
Done in a form of one-page web app, styled for rwd with CSS (see style.css)

#### issues:
- mobile browsers recognizes orientation of the photo ($exif["IFD0"]["Orientation"]) but some desktop browsers - not. Should it be handled?


### ad 4.
Done via Google Maps JS. O general map is provided for all images with coords, infowindow after click.


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



