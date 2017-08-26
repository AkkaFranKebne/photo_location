$(function() {

    // variables for DOM
    var lats = $('.lat');
    var lngs = $('.lng');
 

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
    
    
    //get address
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
                if ($(this).text() == lng){
                    addressDom.insertAfter($(this));
                    //map dom element
                    var mapDiv = $('<div>',{class: 'map'}).attr('id', index);
                    mapDiv.insertAfter(addressDom);
                    //renderMap;
                    console.log(parseFloat(lat.trim()));
                    console.log(parseFloat(lng.trim()));
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
    
    
    //end---------------------
}); 



 