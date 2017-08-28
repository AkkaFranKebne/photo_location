$(function() {

    // variables for DOM
    var lats = $('.lat');
    var lngs = $('.lng');
    var images  = $('.gallery-image');
    
    
    //array from coords
    /*
    var locations = [];
    for (var i = 0; i < lats.length; i ++){
        var loc = [];
        var lat = parseFloat(lats[i].innerHTML.trim());
        var lng = parseFloat(lngs[i].innerHTML.trim());
        //console.log(lat);
        //console.log(lng);
        loc.push(lat);
        loc.push(lng);
        //console.log(loc);
        locations.push(loc);
        
    }
    
    
    */
    
    //image object
    var imgObjectsArray = [];
    
    function Image(imgSrc, thumbnailSrc, lat, lng){
        this.imgSrc = imgSrc;
        this.thumbnailSrc = thumbnailSrc;
        this.lat = lat;
        this.lng = lng;
    }
    
    
    for (var i = 0; i < images.length; i ++){
        var src = images[i].getAttribute('src');
        var srcThumb = src.replace("/", "/thumbnail_");
        var lat = images.eq(i).parent().parent().find('.lat');
        lat = parseFloat(lat.text());
        var lng = images.eq(i).parent().parent().find('.lng');
        lng = parseFloat(lng.text());
        var obj = new Image(src, srcThumb, lat, lng);
        imgObjectsArray.push(obj);
    }
    
   //console.log(imgObjectsArray);
     
        
    
    //getting the addres from geocode api
    //url  
    //var coordUrl = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=51.114238888889,17.048241666667&key=AIzaSyDkf3ZQGhxG3bpejJMqRRO3DkeVMUY5adk';
    
    
    function buildUrl(lat,lng){
        var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lng+'&key=AIzaSyDkf3ZQGhxG3bpejJMqRRO3DkeVMUY5adk';
        return url;
    };
    
    //load data
    
    function loadData(lat,lng){
        $.ajax({
            //url: coordUrl  
            url: buildUrl(lat,lng)
        }).done(function(response){
            //console.log(response.results[1]);
            renderData((response.results[1]),lat,lng); 
        }).fail(function(error){
            console.log(error);
        })
        
    }  
    //loadData(51.114238888889,17.048241666667);
    
    //show map and adress
    function renderData(result,lat,lng){ 
        var index = 0;
        //get address data from api
        //$.each(result, function(index, value) {//can be only one response
            //console.log(response.formatted_address); 
            //var address = value.formatted_address;
        //put it to variable
            var address = result.formatted_address;
        //put it to dom element
            var addressDom = $('<p>',{class: 'address'}).text(address);
        //attach it to the specific place in dom
            lngs.each(function(index,value){
                if ($(this).text() == lng  &&  $(this).prev().prev().text() == lat  ){
                    addressDom.insertAfter($(this));
                    //map dom element
                    var mapDiv = $('<div>',{class: 'map'}).attr('id', index);
                    mapDiv.insertAfter(addressDom);
                    //renderMap;
                    //console.log(parseFloat(lat.trim()));
                    //console.log(parseFloat(lng.trim()));
                    var uluru = {lat: parseFloat(lat.trim()), lng: parseFloat(lng.trim())};
                    var map = new google.maps.Map(document.getElementById(index), {
                        zoom: 18,
                        center: uluru
                    });
                    var marker = new google.maps.Marker({
                    position: uluru,
                    map: map
                    });
            };
            
        
          });
        }
        
    //find map and address for each image
    function showLocationForImages(){
         lats.each(function(index, value){
            var lat = $(this).text();
            var latIndex = index;
            lngs.each(function(index, value){
                if (index ==latIndex){
                 var lng = $(this).text();
                loadData(lat,lng);  
                }
            });

        });       
    }

    
    showLocationForImages();
    
    
    
    //general map
            var uluru = {lat: parseFloat(imgObjectsArray[0].lat), lng: parseFloat(imgObjectsArray[0].lng)};  
            var generalMap = new google.maps.Map(document.getElementById('general-map'), {
                zoom: 13, 
                center: uluru, 

            });
    
    //markers on general map
    
     //pins
                // setting the  custom area for map
                var bounds = new google.maps.LatLngBounds();
        
                //for pins generating
                for (var i = 0; i < imgObjectsArray.length; i++) { 
                    if ($.isNumeric(imgObjectsArray[i].lat) ){
                             var uluru = {lat: parseFloat(imgObjectsArray[i].lat), lng: parseFloat(imgObjectsArray[i].lng)};
                            //console.log(uluru);
                            var marker = new google.maps.Marker({
                                position: uluru,
                                map: generalMap,
                                icon: imgObjectsArray[i].thumbnailSrc
                          });
                            // setting the  custom area for map
                           bounds.extend(marker.getPosition());                       
                    }
            }
    
    
            // setting the  custom area for map
            generalMap.fitBounds(bounds); 
    
    
    //end---------------------
}); 



 