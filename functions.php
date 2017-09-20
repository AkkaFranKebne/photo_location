<?php
    //creating thumbnail for the map pins        
        
    function createThumbnail($filename)
    {
        $final_width_of_image = 30;

        $loweredFilename = strtolower($filename);

        //check if img is jpg
        if (substr($loweredFilename, -3) == 'jpg') {
            $im = imagecreatefromjpeg('images/' . $filename);
        } else if (substr($loweredFilename, -3) == 'png') {
            $im = imagecreatefrompng('images/' . $filename);
        } else {
            //unsupported image format
            $im = null;
        }

        if(!$im) {
            echo "<p class='error'>Obrazek nie zostal wygenerowany. Obrazek musi byc w formacie jpg lub png. Sprobuj ponownie.</p>";
            die();
        }

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
        imagecopyresized($nm, $im, 0, 0, 0, 0, $nx, $ny, $ox, $oy);

        if (substr($loweredFilename, -3) == 'jpg') {
            //creates a JPEG file from the given image.; Output image to browser or file
            imagejpeg($nm, 'images/thumbnail_' . $filename);
        }else if (substr($loweredFilename, -3) == 'png') {
            //creates a JPEG file from the given image.; Output image to browser or file
            imagepng($nm, 'images/thumbnail_' . $filename);
        }
        //creates DOM element
        //$tn = '<img src="' . 'images/thumbnail_'. $filename . '" alt="image" />';
        //echo $tn;

    }


       function getCoords($photo){
           //get to data meta data
                        $exif = exif_read_data($photo, 0, true);
                        //coords
                            if(isset($exif["GPS"]["GPSLatitudeRef"])){
                                $LatM = 1; $LongM = 1;
                                if($exif["GPS"]["GPSLatitudeRef"] == 'S'){
                                    $LatM = -1;
                                }
                                if($exif["GPS"]["GPSLongitudeRef"] == 'W'){
                                    $LongM = -1;
                                }
                                //get the GPS data to arrays
                                $gps['LatDegree']=$exif["GPS"]["GPSLatitude"][0];
                                $gps['LatMinute']=$exif["GPS"]["GPSLatitude"][1];
                                $gps['LatgSeconds']=$exif["GPS"]["GPSLatitude"][2];
                                $gps['LongDegree']=$exif["GPS"]["GPSLongitude"][0];
                                $gps['LongMinute']=$exif["GPS"]["GPSLongitude"][1];
                                $gps['LongSeconds']=$exif["GPS"]["GPSLongitude"][2];

                                //convert strings to numbers
                                foreach($gps as $key => $value){
                                    $pos = strpos($value, '/');
                                    if($pos !== false){
                                        $temp = explode('/',$value);
                                        $gps[$key] = $temp[0] / $temp[1];
                                    }
                                }
                            $latitude  = $LatM * ($gps['LatDegree'] + ($gps['LatMinute'] / 60) + ($gps['LatgSeconds'] / 3600));
                            $longitude = $LongM * ($gps['LongDegree'] + ($gps['LongMinute'] / 60) + ($gps['LongSeconds'] / 3600));
                            //date
                            $daytime = $exif["IFD0"]["DateTime"];  //variable we need
                            echo   $daytime."||".$latitude."||".$longitude;                
                            }
                        else {echo "NULL||NULL||NULL";}
       }

                              

?>
    