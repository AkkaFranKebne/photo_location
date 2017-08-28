# photo_location
test for getting location from photo and showing it on the google maps


1. photo download from the phone (win, andr, ios) with the description and coords ;
2. photo send to the server;
3. photo shown on the page with description  and coordinates
4. photo shown on the map;

ad 1. 
issues:
- safari: no coords for photos taken in Safari directly: "Illegal IFD size" known issue  https://bugs.php.net/bug.php?id=50660
 
 to do:
 to test on win  edge and android chrome
 



ad 2. 
done: sql and json version



ad 3.
issues:
- images rotated on computer (but not in mobile) - $exif["IFD0"]["Orientation"]


ad 4.
general map: how to set the zoom to show all the pins?

