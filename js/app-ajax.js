$(function() {


  //reading data from json---------------------------------------
  //variables for main ul list
  var imagesDiv = $('#images-div');
  var button = $('input[type="submit"]');
  var form = $('form');
  console.log(form);
    


  //variables for url
  var apiUrl = 'http://localhost:3000/images/';


  //Insert elements to DOM  
  function insertContent(images) {
      //console.log(images);
      //clear what was there before - to avoid duplicates
      imagesDiv.empty();
      //add updated content
    $.each(images, function(index, element) {
        var div = $('<div>', {class: "gallery-box"});
        var h3 = $('<h3>', {class: "title"}).text(element.title);
        var p = $('<p>', {class: "desc"}).text(element.alt);
        div.append(h3).append(p);
        imagesDiv.append(div);
        var div2 = $('<div>', {class: "image-box"});
        var picture = $('<picture>', {class: "gallery"});
        var img = $('<img>', {class: "gallery-image"}).attr('src', element.photo);
        div.append(div2);
        div2.append(picture);
        picture.append(img);
        
    });
  }
    

  //Load movies and insert them into the DOM
  
  function loadImages() {
        $.ajax({
            	url: apiUrl
        }).done(function(response){
                  //console.log(response);
     		    insertContent(response);
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
                        photoUrl = response;
                        console.log(photoUrl);
                     
                        //retrieve post data
                        var title = $('input[name="title"]').val();
                        var desc = $('textarea').val();
                        //console.log(title);
                        //console.log(desc);
                    
                        //prepare json
                        var jsonData = {
                            title: title,
                            alt: desc,
                            photo: photoUrl
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
                         }).fail(function(error) {
                           console.log(error);
                        });
                
                
                }
                }); 
   
        });
    }
    
    addImage();
    

    
    //end---------------------------------

});



 