$(function() {


  //reading data from json---------------------------------------
  //variables for main ul list
  var imagesDiv = $('#images-div');
  var button = $('input[type="submit"]');

  //variables for url
  var apiUrl = 'http://localhost:3000/images/';


  //Insert images to DOM  
  function insertContent(images) {
      //console.log(images);
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
        button.on('click', function(event){
            event.preventDefault();
            //retrieve post data
            var title = $('input[name="title"]').val();
            var desc = $('textarea').val();
            //console.log(title);
            //console.log(desc);
            //prepare json
            var jsonData = {
                title: title,
                alt: desc,
                photo: "emptyfornow"
            };
            //console.log(jsonData);
            //send json
            $.ajax({
                    url: apiUrl,
                    type: "POST",
                    dataType: "json",
                    data: jsonData
            }).done(function(response){
                    console.log(response);
                    var div = $('<div>', {class: "gallery-box"});
                    var h3 = $('<h3>', {class: "title"}).text(title);
                    var p = $('<p>', {class: "desc"}).text(desc);
                    div.append(h3).append(p);
                    imagesDiv.append(div);
             }).fail(function(error) {
               console.log(error);
       });
            
        });
    }
    
    addImage();
    

 
    
    //end---------------------------------

});



 