// Taya Ambrose
// Email: tjambros@ucsc.edu
// CSE 160, Assignment 3

// From following Professor Davis' videos

// set globals for UI elements
let g_globalAngle_y = 0;    // rotate around y axis
let g_globalAngle_x = 0;  // rotate around x axis
let g_animationSpeed = 4;
let g_animation = OFF;

// create constants for animation
const OFF = 0;
const ON = 1;
const POKE = 2;

// Set up actions for the HTML UI elements
function addActionsForHtmlUI() {
  document.getElementById('stoneButton').onclick = function() {
    g_blockType = darkRock;
  };
}

// function for slider
function fixSlider(id, val) {
  // create a slider variable
  var slider = document.getElementById(id);

  // set position of the slider
  slider.value = val;
}

// ----- sendTextToHTML -----
// Set the text of an HTML element
function sendTextToHTML(text, htmlID) {
  var htmlElm = document.getElementById(htmlID);
  if (!htmlElm) {
    console.log("Failed to get " + htmlID + " from HTML");
    return;
  }
  htmlElm.innerHTML = text;
}
// ----- end sendTextToHTML -----