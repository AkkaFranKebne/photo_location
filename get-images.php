<?php
error_reporting(E_ERROR);

include 'elements_db_connection.php';
      
    //variable for json building
    $json = array();

    //get the uploaded files form sql table
    $sql = "SELECT id, ".$table_var_title.", ".$table_var_photo.", ".$table_var_alt." FROM ". $table_name;

            $result = $conn->query($sql);
            //echo "rezultat". $result;
                if ($result->num_rows > 0) {
                    while($row = $result->fetch_assoc()) {
                // variables for JSON
                            $photoForJSON = "images/".$row['photo'];
                            $descForJSON = $row['alt'];
                            $titleForJSON = $row['title'];
                            $idForJSON = $row['id'];
                            $daytimeForJSON= '';
                            $latitudeForJSON = '';
                            $longitudeForJSON = '';
                             
                        //get to data meta data
                            $exif = exif_read_data($photoForJSON, 0, true);
                            //echo $exif===false ? "<br>TECH INFO: No header data found.<br />\n" : "<br>TECH INFO: Image contains headers<br />";
                            
                        // date
                            if ($exif["IFD0"]["DateTime"] != null) {
                                $daytimeForJSON = $exif["IFD0"]["DateTime"];
                            }
                            

                        //getting longitude and latitude
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

                            //calculate the decimal degree to variables
                            $latitudeForJSON  = $LatM * ($gps['LatDegree'] + ($gps['LatMinute'] / 60) + ($gps['LatgSeconds'] / 3600));
                            $longitudeForJSON = $LongM * ($gps['LongDegree'] + ($gps['LongMinute'] / 60) + ($gps['LongSeconds'] / 3600));
                             }   
                  //building JSON  
                        
                            $jsonElement = array(
                                'title' => $titleForJSON,
                                'alt' => $descForJSON,
                                'photo' => $photoForJSON,
                                'lat' => $latitudeForJSON,
                                'lng' => $longitudeForJSON,
                                'date' => $daytimeForJSON,
                                'id' => $idForJSON
                            );
                             array_push($json, $jsonElement);
                }
                }
                    
                //encoding JSON
                $jsonstring = json_encode($json);
                echo $jsonstring;
?>





