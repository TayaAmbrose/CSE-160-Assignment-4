// Taya Ambrose
// Email: tjambros@ucsc.edu
// CSE 160, Assignment 3

// From following Professor Davis' videos
// Looked at Plain ol' Bees for reference on multiple files and textures.
// I had issues with texture before this.

// set global variables
var g_startTime = performance.now() / 1000.0;
var g_seconds = (performance.now() / 1000.0) - g_startTime;
var g_TimeONE = 0;
var g_TimeTWO = g_seconds - g_TimeONE;
var g_tpTime = 0;
var g_wasOn = false;

// set global variables for animation
let g_frontAngle = 0;
let g_bAngle = 0;
let g_fAngle = 0;

let g_wiggleAngle = 0;
let g_moveX = 0;
let g_moveX1 = 0;
let g_moveY = 0;
let g_moveY1 = 0;
let g_moveZ = 0;
let g_mainY = 0;

// Called by browser repeatedly whenever it's time
function tick() {
  // Save the current time
  g_seconds = (performance.now() / 1000.0) - g_startTime;
  // g_seconds_bubbles = performance.now()/1000.0 - g_startTime;
  // g_seconds_bubbles %= repeatInterval;
  
  if (g_animation == ON) {
    // count seconds on
    g_TimeONE = g_seconds - g_TimeTWO;
  }
  else if (g_animation == OFF) {
    // count seconds off
    g_TimeTWO = g_seconds - g_TimeONE;
  }
  else if (g_animation == tap) {
    // seconds for animation tap counting
    g_tpTime = g_seconds - (g_TimeONE + g_TimeTWO);

    if (g_tpTime > 2) {
      g_TimeTWO += g_tpTime;
      g_tpTime = 0;
      
      if (g_wasOn) {
        g_animation = ON;
      }
      else {
        g_animation = OFF;
      }
    }
  }
  
  // update animations
  updateAnimation();
  updateAnimationAngles();
  updateLightPos();

  // Draw Everything
  renderAllShapes();

  //stats.end();
  // Tell the browser to update again when it has time
  requestAnimationFrame(tick);
}

function updateLightPos() {
  g_lightPos[0] = Math.cos(g_seconds);
}

// function to update the animation of X and Y axes
function updateAnimation() { 
  if (g_animation == ON) {
    g_moveX = 0.8 * 0.1 * Math.sin(g_TimeONE * g_animationSpeed);
    g_moveY = 0.8 * 0.05 * Math.sin(g_TimeONE * g_animationSpeed + Math.PI / 2);
    
    g_moveX1 = 0.8 * 0.1 * Math.sin(g_TimeONE * g_animationSpeed - Math.PI / 2);
    g_moveY1 = 0.8 * 0.05 * Math.sin(g_TimeONE * g_animationSpeed);
    
    g_mainY = 0.05 * Math.sin(g_TimeONE * g_animationSpeed + Math.PI / 2);
  }
  else if (g_animation == tap) {
    let count = (-0.5 * (g_tpTime - 1) * (g_tpTime - 1)) + 0.5;

    if (count < 0.34) {
      g_moveY = 0.61 * count;
      g_moveY1 = 0.61 * count;
      g_moveZ = 0.41 * count;
      g_mainY = -0.4 * count;
    }
  }
}

// update the animation angles
function updateAnimationAngles() { 
  if (g_animation == ON) {
    // g_yellowAngle = (45*Math.sin(g_seconds));
    // g_magentaAngle = (45*Math.sin(g_seconds));
    // g_leftFinAngle = (45*Math.sin(g_seconds));    }
    // //g_eyePosition = Math.sin(g_seconds) * 280;  }
    g_frontAngle = 40 * Math.sin(g_TimeONE * g_animationSpeed);
    g_bAngle = 40 * Math.sin(g_TimeONE * g_animationSpeed - Math.PI / 2);
    g_fAngle = 40 * Math.sin(g_TimeONE * g_animationSpeed + Math.PI / 2);
    g_wiggleAngle = 40 * Math.sin(g_TimeONE * g_animationSpeed + Math.PI);

    // g_lightPos[0] = Math.cos(g_seconds);
  }
}