// Verify that index.html can read main.js file.
console.log("Houston, we have code!");
// Global varibales/arrays.
// --------------------------------------------
randArray = ["Jim Carrey", "Cats", "Deadpool", "Eminem", "Anonymous", "Morgan Freeman", "Bananas", "America", "The Voice", "Katy Perry", "JavaScript", "Apple", "Yoda", "Liam Neeson", "SNL"];
var imgArray = [];
var imgStillArray = [];
var rateArray = [];
// --------------------------------------------
// Create a loop to add static buttons from randArray array.
for (i = 0; i < randArray.length; i++) {
    // console.log(randArray[i]);
    $('#btnCol').append('<button type="button" class="btn btn-info searchBtn">' + randArray[i] + '</button>');
}
// Add the gifs to the document.
function insertImgs() {
    for (i = 0; i < imgArray.length; i++) {
        var giphy = imgArray[i];
        var randImage = $("<img>");
        randImage.addClass("gifs");
        randImage.attr("data-state", "still");
        randImage.attr("data-still", imgStillArray[i]);
        randImage.attr("data-animate", giphy);
        randImage.attr("src", imgStillArray[i]);
        var randRating = $("<p>");
        randRating.addClass("gifs");
        randRating.text("Rating: " + rateArray[i]);
        var divy = $("<div>");
        divy.append(randRating);
        divy.append(randImage);
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
        rateArray.push(res.data[i].rating.toUpperCase());
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
$('#add-btn').on("click", function (e) {
    e.preventDefault();
    var inputData = $('#usrInput').val().trim();
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
// Enter (13) key triggers the add-btn function.
$("#usrInput").keyup(function (e) {
    if (e.which == 13) {
        $('#add-btn').click();
    }
});