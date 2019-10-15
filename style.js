var topics = ["Business","Movies","Travels","Technology","Chilaquiles"];
var newtopic;


function displayTopicInfo() {
    var title = newtopic;
    console.log(title);
    // var queryURL = 

};

function renderButtons() {

    $("#buttons-view").empty();

    for (var i = 0; i < topics.length; i++) {
        var a = $("<button>");
        a.addClass("topic");
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        $("#buttons-view").append(a);


    }
    $(".topic").on("click", function() {
        var person = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
          person + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";
          console.log(queryURL);
    
        $.ajax({
          url: queryURL,
          method: "GET"
        })
          .then(function(response) {

            var results = response.data;
    
            for (var i = 0; i < results.length; i++) {
              var gifDiv = $("<div>");
    
              var rating = results[i].rating;
    
              var p = $("<p>").text("Rating: " + rating);
    
              var personImage = $("<img>").addClass("GIF");
            //   var datastill = results[i].images.fixed_height_still.url
            //   var datanimate = results[i].images.fixed_height.url
            //   var state = datastill
              personImage.attr("src",results[i].images.fixed_height.url);
              personImage.attr("id","animated");
              personImage.attr("data-still",results[i].images.fixed_height_still.url);
              personImage.attr("data-animate",results[i].images.fixed_height.url);

            
              
    
              gifDiv.prepend(p);
              gifDiv.prepend(personImage);
    
              $("#gifs-appear-here").prepend(gifDiv);

                $(".GIF").on("click", function () {

                    if ("#animated") {
                        $(this).attr("src", $(this).attr("data-still"));
                        $("#animated").attr("id","still");

                
                    } else if ("#still") {
                        $(this).attr("src", $(this).attr("data-animate"));
                        $("#still").attr("id","animated");

                        
                    }
                    

                    

                });
        
            }
          });
      });
}
$("#add-topic").on("click", function(event){
    event.preventDefault();

    newtopic = $("#topic-imput").val().trim();

    topics.push(newtopic);

    renderButtons();

    $("#topic-imput").val("");

});

// $(document).on("click", ".topic", displayTopicInfo);

renderButtons();


