let topics = [
  "unicorn",
  "dragon",
  "fairies",
  "centaur",
  "nymph",
  "gnome",
  "elf",
  "cyclops",
  "big foot",
  "lochness monster",
  "griffin",
  "ogre",
  "mermaid"
];

// create buttons---------
//   for each value in the array
function showButtons() {
  $(".topicBtn").empty();

  topics.forEach(element => {
    //   create a button element with and add the topic info into the button

    let creatureBtn = $("<button>");
    creatureBtn
      .addClass("creature btn btn-primary")
      .attr("type", "button")
      .attr("value", element)
      .text(element);

    //   append the button to the DOM
    $(".topicBtn").append(creatureBtn);
  });
}
// show initial button layout
showButtons();

// Add creature button --------------
$("#go").on("click", event => {
  // prevent form from submitting so that the page does not refresh
  console.log("pressed go");
  event.preventDefault();
  // get user input
  let userCreature = $("#userCreature")
    .val()
    .trim();
  // add to topics array
  topics.push(userCreature);
  //   create button(s)
  showButtons();

  //  HELP reset input text field
});

function showGIFs() {
  // empty so we do not keep adding gifs
  $(".gifViewport").empty();

  // get the creature name from the button clicked

  let userTopic = $(this).attr("value");
  const key = "1LgMHGkkBCDbCxwxWHMlcp58dcWdv0DA";
  let queryURL = `http://api.giphy.com/v1/gifs/search?q=${userTopic}&api_key=${
    key
  }&limit=10;`;
  // https://api.giphy.com/v1/

  // get the GIPHY API info

  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
    console.log(response);
    console.log(userTopic);
    // create a div and add GIPHY info

    let gifUrl = response.data;
    for (let i = 0; i < gifUrl.length; i++) {
      $(".gifViewport").append(
        `<div class="card" style="width: 20rem;">
  <img class="card-img-top" src="${
    gifUrl[i].images.original_still.url
  }" alt="creature gif" playGIF="${gifUrl[i].images.original.url}" pauseGIF="${
          gifUrl[i].images.original_still.url
        }" gifStatus="paused" image cap">
  <div class="card-body">
    <p class="card-text">Rating: ${gifUrl[i].rating}</p>
  </div>
</div>`
      );
    }
  });

  // append gifs to DOM
}

function playPause() {
  // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
  let status = $(this).attr("gifStatus");
  // If the clicked image's state is still, update its src attribute to what its data-animate value is.
  // Then, set the image's data-state to animate
  // Else set src to the data-still value
  if (status === "paused") {
    $(this).attr("src", $(this).attr("playGIF"));
    $(this).attr("gifstatus", "playing");
  } else {
    $(this).attr("src", $(this).attr("pauseGIF"));
    $(this).attr("gifStatus", "paused");
  }
}

// when a creature button is pressed show the GIFS
$(document).on("click", ".creature", showGIFs);
$(document).on("click", ".gif", playPause);
