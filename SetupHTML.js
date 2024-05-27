// Taya Ambrose
// Email: tjambros@ucsc.edu
// CSE 160, Assignment 4

// From following Professor Davis' videos

// create constants for animation
const ON = 1;
const OFF = 0;
const tap = 2;

// set globals for UI elements
let g_animationSpeed = 4;
let g_globalAngle_y = 0;  // y axis rotation
let g_globalAngle_x = 0;  // x axis rotation
let g_animation = OFF;
let g_normalOn = false;
let g_lightPos = [0,1,-2]; // flag, should it be 2, not -2?...
let g_lightOn = true;

// Set up actions for the HTML UI elements
function addActionsForHtmlUI() {
  document.getElementById('stoneButton').onclick = function() {
    g_blockType = darkRock;
  };
  document.getElementById('normalOn').onclick = function() {g_normalOn = true;};
  document.getElementById('normalOff').onclick = function() {g_normalOn = false;};
  document.getElementById('lightSlideX').addEventListener('mousemove', function(ev) {if(ev.buttons == 1) { g_lightPos[0] = this.value/100; renderAllShapes();}});
  document.getElementById('lightSlideY').addEventListener('mousemove', function(ev) {if(ev.buttons == 1) { g_lightPos[1] = this.value/100; renderAllShapes();}});
  document.getElementById('lightSlideZ').addEventListener('mousemove', function(ev) {if(ev.buttons == 1) { g_lightPos[2] = this.value/100; renderAllShapes();}});

  document.getElementById('lightOn').onclick = function() {g_lightOn = true;};
  document.getElementById('lightOff').onclick = function() {g_lightOn = false;};

}

// Set the text of an HTML element
function sendTextToHTML(text, htmlID) {
  var htmlElm = document.getElementById(htmlID);
  if (!htmlElm) {
    console.log("Failed to get " + htmlID + " from HTML");
    return;
  }
  htmlElm.innerHTML = text;
}
