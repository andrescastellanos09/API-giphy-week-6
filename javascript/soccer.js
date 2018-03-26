$( document ).ready(function() {
    // An array of players, new players will be pushed into this array;
    var soccerPlayers = ["Cristiano Ronaldo", "Messi", "James Rodriguez", "Eden Hazard", "Luca Modric", "Tony Kroos", "Robert Lewandoski", "Manuel Neuer", "Mesut Ozil", "Paulo Dybala","Alexis Sanchez", "Arturo Vidal", "Radamel Falcao"];
    // Creating Functions & Methods
    // Function that displays all gif buttons
    function displayGifButtons(){
        $("#gifButtons").empty(); // erasing anything in this div id so that it doesnt duplicate the results
        for (var i = 0; i < soccerPlayers.length; i++){
            var gifButton = $("<button>");
            gifButton.addClass("action");
            gifButton.addClass("btn btn-primary")
            gifButton.attr("data-name", soccerPlayers[i]);
            gifButton.text(soccerPlayers[i]);
            $("#gifButtons").append(gifButton);
        }
    }
    // Function to add a new action button
    function addNewButton(){
        $("#addGif").on("click", function(){
        var action = $("#action-input").val().trim();
        if (action == ""){
          return false; 
        }
        soccerPlayers.push(action);
    
        displayGifButtons();
        return false;
        });
    }
    // Function to remove last action button
    function removeLastButton(){
        $("removeGif").on("click", function(){
        soccerPlayers.pop(action);
        displayGifButtons();
        return false;
        });
    }
    // Function that displays all of the gifs
    function displayGifs(){
        var action = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=tnaAH8ZZ2fS1scQYUrQTRh7B4cfcDyJy&q="+ action +"&limit=10&offset=0&rating=G&lang=en";
        console.log(queryURL); // displays the constructed url
        $.ajax({
            url: queryURL,
            method: 'GET'
        })
        .done(function(response) {
            console.log(response); // console test 
            $("#gifsView").empty(); // erasing anything in this div id 
            var results = response.data; //shows results of gifs
            if (results == ""){
              alert("There isn't a gif for this selected button");
            }
            for (var i=0; i<results.length; i++){
    
                var gifDiv = $("<div>"); //div for the gifs to go inside
                gifDiv.addClass("gifDiv");
                // pulling rating of gif
                var gifRating = $("<p>").text("Rating: " + results[i].rating);
                gifDiv.append(gifRating);
                // pulling gif
                var gifImage = $("<img>");
                gifImage.addClass('image');
                gifImage.attr("src", results[i].images.fixed_height_small_still.url); // still image stored into src of image
                gifImage.attr("data-still",results[i].images.fixed_height_small_still.url); // still image
                gifImage.attr("data-animate",results[i].images.fixed_height_small.url); // animated image
                gifImage.attr("data-state", "still"); // set the image state
                gifImage.addClass("image");
                gifDiv.append(gifImage);
                // pulling still image of gif
                // adding div of gifs to gifsView div
                $("#gifs").prepend(gifDiv);
            }
        });
    }
    // Calling Functions & Methods
    displayGifButtons(); // displays list of actions already created
    addNewButton();
    removeLastButton();
    // Document Event Listeners
    $(document).on("click", ".action", displayGifs);
    $(document).on("click", ".image", function(){
        var state = $(this).attr('data-state');
        if ( state == 'still'){
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        }
        else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });
    });