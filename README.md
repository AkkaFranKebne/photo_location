# photo_location
## the tasks:
1. photo download from the phone (win, andr, ios) with the description and coords;
2. photo send to the server;
3. photo shown on the page with description  and coordinates
4. photo shown on the map;

### ad 1 + 2 
Done via POST form.
Then: 
 - version 1: sent to SQL database via PHP (see: register-img.php and app.js, screen of sql table attached - XAMPP used for test);
 - version 2: sent to JSON via PHP (see: register-img-ajax.php,  app-ajax.js and images.json - json-server used for test)
 
 Information about coords and date of photoshoot taken from exif  data.
 
#### issues:
- not all mobile phones provides exif GPS data;
- noticed at ios, safari: no coords for photos taken in Safari directly: error  "Illegal IFD size" known issue, see:  https://bugs.php.net/bug.php?id=50660
 

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
https://www.browserstack.com/start#os=android&os_version=4.4&device=Samsung+Galaxy+Tab+4&device_browser=chrome&zoom_to_fit=true&full_screen=true&url=www.browserstack.com%2Fwelcome&speed=1&host_ports=google.com%2C80%2C0

https://www.browserstack.com/start#os=android&os_version=4.4&device=Samsung+Galaxy+Note+4&device_browser=chrome&zoom_to_fit=true&full_screen=true&url=http%3A%2F%2Flocalhost%2Fphoto_location%2Fregister-img.php%23&speed=1&host_ports=google.com%2C80%2C0

https://www.browserstack.com/start#os=android&os_version=5.0&device=Motorola+Moto+G+2nd+Gen&device_browser=chrome&zoom_to_fit=true&full_screen=true&url=http%3A%2F%2Flocalhost%2Fphoto_location%2Fregister-img.php%23&speed=1&host_ports=google.com%2C80%2C0

https://www.browserstack.com/start#os=iOS&os_version=9.0&device=iPhone+6S&device_browser=safari&zoom_to_fit=true&full_screen=true&url=http%3A%2F%2Flocalhost%2Fphoto_location%2Fregister-img.php%23&speed=1&host_ports=google.com%2C80%2C0

https://www.browserstack.com/start#os=winphone&device=Nokia+Lumia+930&zoom_to_fit=true&full_screen=true&url=http%3A%2F%2Flocalhost%2Fphoto_location%2Fregister-img.php%23&speed=1&host_ports=google.com%2C80%2C0

