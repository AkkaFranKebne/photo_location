$(function() {


  //reading data from json---------------------------------------
  //variables for main ul list
  var imagesDiv = $('#images-div');
  var form = $('form');
    
   //image object
    var imgObjectsArray = [];
    
    function Image(id, imgSrc, thumbnailSrc, lat, lng, title, desc, date, address){
        this.id = id;
        this.imgSrc = imgSrc;
        this.thumbnailSrc = thumbnailSrc;
        this.lat = lat;
        this.lng = lng;
        this.title = title;
        this.desc = desc;
        this.date = date;
        this.address = address
    }
        

  //variables for url
  //var apiUrl = 'http://192.168.1.193:3000/images/';  //for json-server test, try with localhost if it does not work
  var apiUrl = 'http://localhost:3000/images/';  


  //Insert elements to DOM  
  function insertContent(images) {
      //console.log(images);
      //clear what was there before - to avoid duplicates
      imagesDiv.empty();
      //add updated content
    $.each(images, function(index, element) {
        var galleryBox = $('<div>', {class: "gallery-box"});
        var h3 = $('<h3>', {class: "title"}).text(element.title);
        var p1 = $('<p>', {class: "time"}).text(element.date);
        var p2 = $('<p>', {class: "desc"}).text(element.alt);
        galleryBox.append(h3).append(p1).append(p2);
        imagesDiv.append(galleryBox);
        var imageBox = $('<div>', {class: "image-box"});
        var picture = $('<picture>', {class: "gallery"});
        var img = $('<img>', {class: "gallery-image"}).attr('src', element.photo);
        galleryBox.append(imageBox);
        imageBox.append(picture);
        picture.append(img);
        
        var addressBox = $('<div>', {class: "address-box"});
        /*
        var p3 = $('<p>', {class: "coord"}).text("lat: ");
        var p4 = $('<p>', {class: "coord"}).text(element.lat);
        var p5 = $('<p>', {class: "coord"}).text("lng: ");
        var p6 = $('<p>', {class: "coord"}).text(element.lng);
        addressBox.append(p3).append(p4).append(p5).append(p6);
        galleryBox.append(addressBox);
        */
        //add addresses 
        loadData(element.lat,element.lng, addressBox, element.id);
        //put object to objects array
        var srcThumb =  element.photo;
        var srcThumb =  srcThumb.replace("images/", "images/thumbnail_");
        var obj =new Image(element.id, element.photo, srcThumb, element.lat, element.lng, element.title, element.alt, element.date);
        imgObjectsArray.push(obj);
    });
  }
    

  //Load images and insert them into the DOM
  
  function loadImages() {
        $.ajax({
            	url: apiUrl
        }).done(function(response){
                  //console.log(response);
     		    insertContent(response);
                //console.log(imgObjectsArray);
                //showGeneralMap();
    	 }).fail(function(error) {
           console.log(error);
       })
  }

  loadImages();
    
    
  //adding data to json---------------------------------------
    
    
    function addImage(){
        form.on('submit', function(event){
            //prevent default
            event.preventDefault();
            
            // save image via PHP
            var photoUrl = '#';
            var lat = '';
            var lng = '';
            var date = '';
            
             $.ajax({
                url: "upload-for-ajax.php", 
                type: "POST",             
                //dataType: 'text',
                data: new FormData(this), // Data sent to server, a set of key/value pairs (i.e. form fields and values)
                contentType: false,       // The content type used when sending data to the server.
                cache: false,             // To unable request pages to be cached
                processData:false,        // To send DOMDocument or non processed data file it is set to false
                success: function(response) {  
                        //console.log(response);
                        photoUrl = response.split("||")[0];
                        photoUrl = photoUrl.trim();
                        lat = response.split("||")[2];
                        lng = response.split("||")[3];
                        date = response.split("||")[1];
                        if  (date.indexOf("Warning") >= 0 ||date.indexOf("Notice") >= 0) { 
                            //console.log(date); 
                            date = "NULL";
                        }; //temporary fix for "Illegal IFD size" bug
                     
                        //retrieve post data
                        var title = $('input[name="title"]').val();
                        var desc = $('textarea').val();
                        //console.log(title);
                        //console.log(desc);
                    
                        //prepare json
                        var jsonData = {
                            title: title,
                            alt: desc,
                            photo: photoUrl,
                            lat: lat,
                            lng: lng,
                            date: date
                        };
                        //console.log(jsonData);
                
                        //send json
                        $.ajax({
                                url: apiUrl,
                                type: "POST",
                                dataType: "json",
                                data: jsonData
                        }).done(function(response){
                                //show images on the site
                                loadImages();
                                $('#info').text("obrazek dodany");
                                //clear form
                                $("form")[0].reset();
                         }).fail(function(error) {
                           console.log(error);
                        });
                
                
                }
                }); 
        });
    }
    
    addImage();
    

         
    //getting the addres from geocode api
    
    
    function buildUrl(lat,lng){
        var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lng+'&key=AIzaSyDkf3ZQGhxG3bpejJMqRRO3DkeVMUY5adk';
        return url;
    };
    
    //load data
    
    function loadData(lat,lng, divToAppend, id){
        $.ajax({
            url: buildUrl(lat,lng)
        }).done(function(response){
            renderData((response.results[1]),lat,lng, id, divToAppend);
        }).fail(function(error){
            console.log(error);
        })
        
    }  
    //  individual maps - not used
    //show adress and add it to object
    function renderData(result,lat,lng, id, divToAppend){
        /*
            var addressDom = $('<p>',{class: 'address'}).text(result.formatted_address);
            divToAppend.append(addressDom);*/
            for (var i = 0; i < imgObjectsArray.length; i++) { 
             if (imgObjectsArray[i].id == id) {
                 imgObjectsArray[i].address = result.formatted_address;
             }
            //console.log(imgObjectsArray[i]);
            }
            showGeneralMap();

        /*
            var mapDiv = $('<div>',{class: 'map'}).attr('id', id);
            mapDiv.insertAfter(addressDom);
            var uluru = {lat: parseFloat(lat), lng: parseFloat(lng)};
            var map = new google.maps.Map(document.getElementById(id), {
                        zoom: 18,
                        center: uluru
            });
            var marker = new google.maps.Marker({
                    position: uluru,
                    map: map
                });
        
            */
            };
            

    //general map rendering 
    function showGeneralMap(){
        //collect all markers that are not null
        
        /*
             var markers = []
             
             
            for (var i = 0; i < imgObjectsArray.length; i++) {
              if (imgObjectsArray[i].lat != "NULL"){
                 var lat = imgObjectsArray[i].lat;
                var lng = imgObjectsArray[i].lng;
                var coords = [];
                coords.push(lat);
                coords.push(lng);
                markers.push(coords);                 
              }

            }
            //console.log(markers);
            
            */
        
            //map
            var uluru = {lat: parseFloat(imgObjectsArray[0].lat), lng: parseFloat(imgObjectsArray[0].lng)};  
            var generalMap = new google.maps.Map(document.getElementById('general-map'), {
                zoom: 13, 
                center: uluru, 

            });
                
            //pins
                // setting the  custom area for map
                var bounds = new google.maps.LatLngBounds();
        
            //infowindow
            var infowindow = new google.maps.InfoWindow({
                    //content: imgObjectsArray[i].infoWindowContent
              });
        
                //for pins generating
                for (var i = 0; i < imgObjectsArray.length; i++) { 
                    if (imgObjectsArray[i].lat !=="NULL"){
                             var uluru = {lat: parseFloat(imgObjectsArray[i].lat), lng: parseFloat(imgObjectsArray[i].lng)};
                            //console.log(imgObjectsArray[i]);
                            var marker = new google.maps.Marker({
                                position: uluru,
                                map: generalMap,
                                icon: imgObjectsArray[i].thumbnailSrc,
                                content: '<div id="content">'+
                                        '<div id="siteNotice">'+
                                        '</div>'+
                                        '<h3  class="title">'+
                                        imgObjectsArray[i].title +
                                        '</h3>'+
                                        '<div id="bodyContent">'+
                                        '<p class="time">'+
                                        imgObjectsArray[i].date +
                                        '</p>'+
                                        '<p class="address">'+
                                        imgObjectsArray[i].address +
                                        '</p>'+
                                        '<p class="desc">'+
                                        imgObjectsArray[i].desc +
                                        '</p>'+
                                        '</div>'+
                                        '</div>'
                          });
                            //infowindow 
                            marker.addListener('click', function() {
                                    infowindow.setContent(this.content); 
                                    infowindow.open(generalMap, this);
                            });
                            
                            // setting the  custom area for map
                           bounds.extend(marker.getPosition());                       
                    }
            }
            // setting the  custom area for map
            generalMap.fitBounds(bounds);
                
    };
    
    //geolocator
    
    // check for Geolocation support
            if (navigator.geolocation) {
              console.log('Geolocation is supported!');
            var startPos;
                var geoSuccess = function(position) {
                    startPos = position;
                    var positionLat = startPos.coords.latitude;
                    var positionLng = startPos.coords.longitude;
                    console.log(positionLat);
                    console.log(positionLng);
                };
                navigator.geolocation.getCurrentPosition(geoSuccess);
            }
            else {
              console.log('Geolocation is not supported for this Browser/OS.');
            }
     
    //end---------------------------------

});



 