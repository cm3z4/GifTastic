// Verify that index.html can read main.js file.
console.log("Houston, we have code!");
// Global varibales/arrays.
// --------------------------------------------
actors = ["Jim Carrey", "Robin Willims", "Michael Keaton", "Christopher Walken", "Samuel L. Jackson", "Morgan Freeman", "Leonardo DiCaprio", "Michael Caine", "Christian Bale", "Ben Affleck", "James Franco", "Paul Newman", "Gary Oldman", "Liam Neeson", "Robert Duvall"];
var imgArray = [];
var imgStillArray = [];
var rateArray = [];
// --------------------------------------------
// Create a loop to add static buttons from actors array.
for (i = 0; i < actors.length; i++) {
    // console.log(actors[i]);
    $('#btnCol').append('<button type="button" class="btn btn-info searchBtn">' + actors[i] + '</button>');
}
// Add the gifs to the document.
function insertImgs() {
    for (i = 0; i < imgArray.length; i++) {
        var giphy = imgArray[i];
        var actorImage = $("<img>");
        actorImage.addClass("gifs");
        actorImage.attr("data-state", "still");
        actorImage.attr("data-still", imgStillArray[i]);
        actorImage.attr("data-animate", giphy);
        actorImage.attr("src", imgStillArray[i]);
        var actorRating = $("<p>");
        actorRating.addClass("gifs");
        actorRating.text("Rating: " + rateArray[i]);
        var divy = $("<div>");
        divy.append(actorRating);
        divy.append(actorImage);
        $("#gifsCol").append(divy);
    }
}
// Checks to see if there are any gifs already on the document, it will remove them if so.
function checkImgs() {
    if ($('.gifs').length) {
        $('.gifs').remove();
        insertImgs();
    } else {
        insertImgs();
    }
}
// Pushes data into imgArray and rateArray and then calls checkImgs.
function createArray(res) {
    for (i = 0; i < 10; i++) {
        imgArray.push(res.data[i].images.fixed_height.url);
        imgStillArray.push(res.data[i].images.fixed_height_still.url);
        rateArray.push(res.data[i].rating);
        //console.log(rateArray);
    }
    checkImgs();
}
// Grabs (10) gifs from GIPHY and passes the 'res' to createArray.
function getGifs(selected) {
    var actor = selected;
    var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + actor + "&api_key=0rNrM1zxFhStrwRl0604QFWRw2cTphyc&limit=10"
    $.ajax({
        url: queryUrl,
        meathod: "GET"
    }).then(function (res) {
        //console.log(res);
        createArray(res);
    });
}
// Press any button with the .searchBtn and it passes the 'selected' text to getGifs.
$(document).on("click", ".searchBtn", function () {
    var selected = $(this).text();
    console.log(selected);
    imgArray = [];
    imgStillArray = [];
    rateArray = [];
    getGifs(selected);
});
// Animates the gifs on click.
$(document).on("click", ".gifs", function () {
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).data("animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).data("still"));
        $(this).attr("data-state", "still");
    };
});
// Click the #add-btn button to add a new button with the #usrInput's value.
$('#clearBtns').on("click", function () {
    $('.searchBtn').remove();
    console.log("Removing");
});
// Click the #add-btn button to add a new button with the #usrInput's value.
$('#add-btn').on("click", function () {
    var inputData = $('#usrInput').val();
    if (inputData === "") {
        // Placeholder.
    } else {
        console.log("Add button clicked.");
        console.log(inputData);
        var newBtn = $('<button type="button">');
        newBtn.addClass('btn btn-info searchBtn');
        newBtn.text(inputData);
        $('#btnCol').append(newBtn);
        $('#usrInput').val('');
    }
});