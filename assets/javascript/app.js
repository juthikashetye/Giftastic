var API_KEY = "dceT1kvsVI9XpokSJ8V4sJ7uqhQzCgYY";
var topics = ["donald duck", "scooby doo", "tweety", "shin chan", "family guy", "simpsons", "teenage mutant ninja turtles", "bugs bunny"];

function createButtons() {

  for (var i = 0; i < topics.length; i++) {
    var button = $("<button>");

    button.text(topics[i])
          .attr("class", "z-depth-3 waves-effect waves-light btn-small");

    $("#buttonHolder").append(button);
  }
}

function createUserButtons() {

  $("#addCartoon").on("click", function() {
    event.preventDefault();
    if ($("#cartoon").val() == "") {
      return null;
    } else {
      var newButton = $("<button>");
      var newButtonText = $("#cartoon").val();
      newButton.text(newButtonText)
               .attr("class", "z-depth-3 waves-effect waves-light btn-small");
      if (topics.includes(newButtonText)) {
        return null;
      } else {
        topics.push(newButtonText);
        $("#buttonHolder").append(newButton);
      }

    }
  });

}

function createGif() {

  $(document).on("click", "#buttonHolder button", function() {

    $("#gifHolder").empty();
    var buttonText = $(this).text();
    var qurl = "https://api.giphy.com/v1/gifs/search?api_key=" + API_KEY + "&q=" + buttonText + "&limit=10&offset=0&rating=G&lang=en";

    $.ajax({
      url: qurl,
      method: 'GET'
    }).then(function(response) {
      console.log(response);
      for (var i = 0; i < response.data.length; i++) {

        var figure = $("<figure>");
        figure.attr("class", "card-panel hoverable");

        var heartIcon = $("<i>");
        heartIcon.attr("class", "small material-icons emptyHeart")
                 .html("favorite");

        var figcaption1 = $("<figcaption>");
        var figcaption2 = $("<figcaption>");

        var figRating = response.data[i].rating;
        var figTitle = response.data[i].title;

        figcaption1.html("TITLE" + "<br>" + figTitle);
        figcaption2.html("RATING : " + figRating.toUpperCase());

        var stillImageSrc = response.data[i].images.original_still.url;
        var animateImageSrc = response.data[i].images.original.url;

        var image = $("<img>").attr("src", stillImageSrc)
                              .attr("data-state", "still")
                              .attr("data-still", stillImageSrc)
                              .attr("data-animate", animateImageSrc)
                              .attr("class", "responsive-img");

        figure.append(heartIcon);
        figure.append(figcaption1);
        figure.append(image);
        figure.append(figcaption2);

        $("#gifHolder").append(figure);
      }
      $("img").on("click", function() {
        var state = $(this).attr("data-state");
        if (state == "still") {

          var anim = $(this).attr("data-animate");
          $(this).attr("src", anim)
                 .attr('data-state', 'animate');

        } else {

          var still = $(this).attr('data-still');
          $(this).attr('src', still)
                 .attr('data-state', 'still');

        }
      });

      $("#gifHolder figure i").on("click", function(e){
          var clickedHeart = $(this);
          var clickedGifFigure = clickedHeart.parent();

          if (!clickedHeart.hasClass("clicked")) {
           e.preventDefault();
            clickedHeart.addClass("clicked");
            clickedGifFigure.addClass("favGifFigure redHeartFigure");
            clickedGifFigure.clone().appendTo("#favourites");
            clickedGifFigure.removeClass("favGifFigure");
            
            $("#favourites figure i").html("delete")
                                     .addClass("trashIcon");
          }else{
            // clickedHeart.addClass("emptyHeart")
            //             .removeClass("favHeart");
            // clickedGifFigure.closest(document).find(".favGifFigure").remove();
            return null;
            e.preventDefault();
          }

          $("#favourites figure i").on("click", function(){
            var clickedTrash = $(this);
            var clickedTrashFigure = clickedTrash.parent();
            // clickedTrashFigure.closest(document).find(".redHeartFigure i").removeClass("favHeart")
                                                                          // .addClass("emptyHeart");

            clickedTrashFigure.remove();
            e.preventDefault();
          });
      });

    });
  });
}

function init() {
  createButtons();
  createGif();
  createUserButtons();
}
init();