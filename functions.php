<?php
    //creating thumbnail for the map pins        
        
    function createThumbnail($filename) {
        $final_width_of_image = 30;
        
            //check if img is jpg
            if( preg_match('/[.](jpg)$/', $filename) || preg_match('/[.](JPG)$/', $filename) || preg_match('/[.](png)$/', $filename) || preg_match('/[.](PNG)$/', $filename)) {
                //create image from file
                $im = imagecreatefromjpeg('images/'. $filename);
                //save to variables orginal height and width of the image
                $ox = imagesx($im);
                $oy = imagesy($im);
                //saves to variable a final width of a thumbnail
                $nx = $final_width_of_image;
                //calculates the final height of a thumbnail
                $ny = floor($oy * ($final_width_of_image / $ox));
                //creates new image with the given height and width
                $nm = imagecreatetruecolor($nx, $ny);
                //copy the downloaded image to the new created image, with the resize, you can add a possition here. The coordinates refer to the upper left corner.  http://php.net/manual/en/function.imagecopyresized.php
                //bool imagecopyresized ( resource $dst_image , resource $src_image , int $dst_x , int $dst_y , int $src_x , int $src_y , int $dst_w , int $dst_h , int $src_w , int $src_h )
                imagecopyresized($nm, $im, 0,0,0,0,$nx,$ny,$ox,$oy);
                //change orientation
                //creates a JPEG file from the given image.; Output image to browser or file
                if (preg_match('/[.](jpg)$/', $filename) || preg_match('/[.](JPG)$/', $filename)) {
                    imagejpeg($nm, 'images/thumbnail_'. $filename);
                }
                //creates a JPEG file from the given image.; Output image to browser or file
                if (preg_match('/[.](png)$/', $filename) || preg_match('/[.](PNG)$/', $filename)) {
                    imagepng($nm, 'images/thumbnail_'. $filename);
                }
                //creates DOM element
                //$tn = '<img src="' . 'images/thumbnail_'. $filename . '" alt="image" />';
            //echo $tn;
                }
        else { echo "<p class='error'>Obrazek nie zostal wygenerowany. Obrazek musi byc w formacie jpg lub jpg.Sprobuj ponownie.</p>";}
    }

?>
    