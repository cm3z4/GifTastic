// Log index.html can read main.js file.
console.log("Houston, we have code!");

// Create a global array.
actors = ["Jim Carrey", "Robin Willims", "Michael Keaton", "Christopher Walken", "Samuel L. Jackson", "Morgan Freeman", "Leonardo DiCaprio", "Michael Caine", "Christian Bale", "Ben Affleck", "James Franco", "Paul Newman", "Gary Oldman", "Liam Neeson", "Robert Duvall"];

// Create a loop to add buttons from actors array.
for (i = 0; i < actors.length; i++) {
    // console.log(actors[i]);
    $('#btnCol').append('<button type="button" class="btn btn-info">' + actors[i] + '</button>');
}

$('#add-btn').on("click", function () {
    var newActor = $('#usrInput').val();
    console.log("Add button clicked.");
    $('#btnCol').append('<button type="button" class="btn btn-info">' + newActor + '</button>');
    $('#usrInput').val('');
});