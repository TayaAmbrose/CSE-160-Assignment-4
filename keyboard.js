// Taya Ambrose
// Email: tjambros@ucsc.edu
// CSE 160, Assignment 3

// From following Professor Davis' videos
// Looked at Plain ol' Bees in the hall of fame for reference on multiple files and textures.
// I had issues with texture before this.

// set globals for direction and movement
var north = 3;
var east = 0;
var south = 1;
var west = 2;

// set globals for moving mouse
g_prevX = 0;
g_prevY = 0;
g_mouse = false;

var g_facing = south;
var g_sootRotation = -90;
var g_sootX = 0.5;
var g_sootZ = -3.5;

// initialize building globals
var nope = 0;
var T = 4;
var B = 5;
var build = 1;
var destroy = 2;
var g_buildMode = nope;
var darkRock = 10;
var g_blockType = darkRock;
var g_selected = null;
var g_buildHeight = 45;

// function that returns the WebGL coordinates of a click
function convertCoordinatesEventToGL(ev) {
  var x = ev.clientX; // x coordinate
  var y = ev.clientY; // y coordinate
  var rect = ev.target.getBoundingClientRect();

  x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
  y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);

  return([x, y]);
}


// for keyCodes
var intervals = {};

// for keyCodes
var keyChosen = {
  87: function() { // w
    g_camera.moveForward();
    selectBlocks();
  },
  65: function() { //a
    g_camera.moveLeft();
    selectBlocks();
  },
  83: function() { //s
    g_camera.moveBackward();
    selectBlocks();
  },
  68: function() { //d
    g_camera.moveRight();
    selectBlocks();
  },
  32: function() { // space
    g_camera.moveUp();
    selectBlocks();
  },
  16: function() { // shift
    g_camera.moveDown();
    selectBlocks();
  },
  81: function() { // q
    g_camera.rotateLeft(-5);
    selectBlocks();
  },
  69: function() { //e
    g_camera.rotateRight(5);
    selectBlocks();
  },
  37: function() { // left arrow
    switch(g_facing) {
      case north:
        g_facing = west;
        g_sootRotation = 180;
        break;
      case east:
        g_facing = north;
        g_sootRotation = 90;
        break;
      case south:
        g_facing = east;
        g_sootRotation = 0;
        break;
      case west:
        g_facing = south;
        g_sootRotation = 270;
        break;
    }
  },
  38: function() { // up arrow
    g_animation = ON;
    
    let mapZ = toCoordinates(g_sootZ);
    let mapX = toCoordinates(g_sootX);
    
    switch(g_facing) {
      case north:
        if (!g_map[mapZ - 1][mapX][0] && !g_map[mapZ - 1][mapX][1]) {  // soot takes up 2 blocks
          g_sootZ -= 0.1;
        }
        break;
      case east:
        if (!g_map[mapZ][mapX + 1][0] && !g_map[mapZ][mapX + 1][1]) {
          g_sootX += 0.1;
        }
        break;
      case south:
        if (!g_map[mapZ + 1][mapX][0] && !g_map[mapZ + 1][mapX][1]) {
          g_sootZ += 0.1;
        }
        break;
      case west:
        if (!g_map[mapZ][mapX - 1][0] && !g_map[mapZ][mapX - 1][1]) {
          g_sootX -= 0.1;
        }
        break;
    }
  },
  39: function() { // right arrow
    switch(g_facing) {
      case south:
        g_facing = west;
        g_sootRotation = 180;
        break;
      case west:
        g_facing = north;
        g_sootRotation = 90;
        break;
      case north:
        g_facing = east;
        g_sootRotation = 0;
        break;
      case east:
        g_facing = south;
        g_sootRotation = 270;
        break;
    }
  },
  40: function() { // down arrow
    g_animation = ON

    let mapZ = toCoordinates(g_sootZ);
    let mapX = toCoordinates(g_sootX);

    switch(g_facing) {
      case north:
        if (!g_map[mapZ + 1][mapX][0] && !g_map[mapZ + 1][mapX][1]) {
          g_sootZ += 0.1;
        }
        break;
      case east:
        if (!g_map[mapZ][mapX - 1][0] && !g_map[mapZ][mapX - 1][1]) {
          g_sootX -= 0.1;
        }
        break;
      case south:
        if (!g_map[mapZ - 1][mapX][0] && !g_map[mapZ - 1][mapX][1]) {
          g_sootZ -= 0.1;
        }
        break;
      case west:
        if (!g_map[mapZ][mapX + 1][0] && !g_map[mapZ][mapX + 1][1]) {
          g_sootX += 0.1;
        }
        break;
    }
  }
};

// keys list
var keysList = [87, 65, 83, 68,  32,    16,  38, 40, 81, 69];

// run these once after clicked
var clickedKeys = [37, 39];

// function key down
function keydown(ev) {
  if (keysList.includes(ev.keyCode) && !intervals[ev.keyCode]) {
    intervals[ev.keyCode] = setInterval(keyChosen[ev.keyCode], 50);
  } else if (clickedKeys.includes(ev.keyCode)) {
    keyChosen[ev.keyCode]();
  } else if (ev.keyCode == 77) {  // m
    g_mouse = !g_mouse;

    if (g_mouse) {
      [x, y] = convertCoordinatesEventToGL(ev);
      g_prevX = x;
      g_prevY = y;
    }
  } else if (ev.keyCode == 9) {  // tab for speed
    g_camera.speed = 0.4;
  } else if (ev.keyCode == 84) {  // t
    g_buildMode = nope;
  } else if (ev.keyCode == 70) {  // f
    g_buildMode = build;
  } else if (ev.keyCode == 86) {  // v
    g_buildMode = destroy;
  } else if (ev.keyCode == 53) {
    g_blockType = darkRock;
  } else if (ev.keyCode == 54) {
    g_blockType = darkRock;
  }
  
}

// function to check key up
function keyup(ev) {
  if (keysList.includes(ev.keyCode)) {
    clearInterval(intervals[ev.keyCode]);
    delete intervals[ev.keyCode];

    if (ev.keyCode == 38 || ev.keyCode == 40) {
      g_animation = OFF;
    }
  } else
  if (ev.keyCode == 9) {  // tab
    // speed is normal
    g_camera.speed = 0.1;
  }
}

// function to click
function click() {
  let atX = toCoordinates(g_camera.at.elements[0]);
  let atY = toCoordinates(g_camera.at.elements[1]) - 16;
  let atZ = toCoordinates(g_camera.at.elements[2]);

  // find closest Y select
  let closestY = keyClose(g_map[atZ][atX], atY);

  if (atZ < 32 && atX < 32) {
    if (g_buildMode === build) {
      //g_map[atZ][atX][closestY + 1] = g_blockType;  // build 1 above selected

      var side = sideChosen();
      if (closestY === -1) {
        side = T;
      }

      if (side === north) {
        if (atZ > 0 && closestY >= 0) {
          g_map[atZ - 1][atX][closestY] = g_blockType;
        }
      } else if (side === east && closestY >= 0) {
        if (atX < 31) {
          g_map[atZ][atX + 1][closestY] = g_blockType;
        }
      } else if (side === south && closestY >= 0) {
        if (atZ < 31) {
          g_map[atZ + 1][atX][closestY] = g_blockType;
        }
      } else if (side === west && closestY >= 0) {
        if (atX > 0) {
          g_map[atZ][atX - 1][closestY] = g_blockType;
        }
      } else if (side === T) {  // top of block
        if (closestY < g_buildHeight - 1) {
          g_map[atZ][atX][closestY + 1] = g_blockType;
        }
      } else if (side === B) {  // bottom of block
        if (closestY >= 0) {
          g_map[atZ][atX][closestY - 1] = g_blockType;
        }
      }

    } else
    if (g_buildMode === destroy) {
      delete g_map[atZ][atX][closestY];
    } 
  }
}

// function to check whether or not mouse movement
function mousemove(ev) {
  if (g_mouse) {
    // Extract the event click coords
    var x = ev.clientX; // x coordinate
    var y = ev.clientY; // y coordinate
    x = ((x) - canvas.width/2)/(canvas.width/2);
    y = (canvas.height/2 - (y))/(canvas.height/2);

    // find difference
    let diffX = x - g_prevX;
    let diffY = y - g_prevY;

    let rotateX = diffX * 90;
    let rotateY = diffY * 90;

    g_prevX = x;
    g_prevY = y;

    if (diffX < 0) {
      g_camera.rotateLeft(rotateX);
    } else
    if (diffX > 0) {
      g_camera.rotateRight(rotateX);
    }

    if (diffY < 0) {
      g_camera.rotateDown(rotateY);
    } else
    if (diffY > 0) {
      g_camera.rotateUp(rotateY);
    }
    // change selected block texture
    selectBlocks();
  }
}

// function
function keyClose(object, x) {
  var keys = Object.keys(object);

  // if there are no keys, fail
  if (keys.length === 0) {
    return -1;
  }

  // get number of the keys
  var keyNumber = keys.map(key => parseInt(key));

  // go through and find closest key
  let closest = -1;
  keyNumber.forEach(key => {
    if (key <= x && key > closest) {
      closest = key;
    }
  });

  return closest === undefined ? -1 : closest;
}

// function to choose block to look at
function selectBlocks() {
  if (g_buildMode != nope) {

    let atX = toCoordinates(g_camera.at.elements[0]);
    let atY = toCoordinates(g_camera.at.elements[1]) - 16;
    let atZ = toCoordinates(g_camera.at.elements[2]);

    // find closest Y to looked at
    let closestY = keyClose(g_map[atZ][atX], atY);

    if (atZ < 32 && atX < 32) {   // if in range
      // select current block
      g_selected = [atZ, atX, closestY];  // South/North, East/West, Up/Down
    }
  }
  else {
    // deselect
    g_selected = null;
  }
}

// function to select a side of a block
function sideChosen() {
  sideX = g_camera.at.elements[0] - g_camera.eye.elements[0];
  sideY = g_camera.at.elements[1] - g_camera.eye.elements[1];
  sideZ = g_camera.at.elements[2] - g_camera.eye.elements[2];

  let tendTop = sideY < 0 ? 0.2 : 0;

  d = [Math.abs(sideX), Math.abs(sideY) + tendTop, Math.abs(sideZ)];
  let maxIndex = d.indexOf(Math.max(...d));

  if (maxIndex === 0) {
    return sideX > 0 ? west : east;
  } else
  if (maxIndex === 1) {
    return sideY > 0 ? B : T;
  } else
  if (maxIndex === 2) {
    return sideZ > 0 ? north : south;
  }
}
