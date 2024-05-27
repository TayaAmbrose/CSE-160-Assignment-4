// Taya Ambrose
// Email: tjambros@ucsc.edu
// CSE 160, Assignment 3

// From following Professor Davis' videos
// Looked at Plain ol' Bees in the hall of fame for reference on multiple files and textures.
// I had issues with texture before this.

var g_map = [];
var g_mapInitialized = false;

var g_rocks = true;
var g_cave = true;

function createMap(map, size) {
  for (r = 0; r < size; r++) {
    map.push([]);        // rows
    for (c = 0; c < size; c++) {
      map[r].push({});   // columns
    }
  }
}

// function to reset map - didn't use, might later
function clearMap() {
  g_map = [];
  createMap(g_map, 64);  // 32 x 32 matrix filled with empty dictionaries {} used to store 3rd dimension
}

// function that creates tall rocks
function addRocks(x, z) {
  g_map[z][x][0] = darkRock;
  g_map[z][x][1] = darkRock;
  g_map[z][x][2] = darkRock;
}

// function that creates small rocks
function addShortRocks(x, z) {
  g_map[z][x][0] = darkRock;
}

// function that makes the cave home
function makeCave(x, z) {
  // layer one
  g_map[z][x][0] = darkRock;
  g_map[z][x+1][0] = darkRock;
  g_map[z][x+2][0] = darkRock;
  g_map[z][x+3][0] = darkRock;
  g_map[z][x+4][0] = darkRock;

  g_map[z+1][x][0] = darkRock;
  g_map[z+2][x][0] = darkRock;
  g_map[z+3][x][0] = darkRock;
  g_map[z+4][x][0] = darkRock;

  g_map[z+1][x+4][0] = darkRock;
  g_map[z+2][x+4][0] = darkRock;
  g_map[z+3][x+4][0] = darkRock;
  g_map[z+4][x+4][0] = darkRock;

  // layer two
  g_map[z][x][1] = darkRock;
  g_map[z][x+1][1] = darkRock;
  g_map[z][x+2][1] = darkRock;
  g_map[z][x+3][1] = darkRock;
  g_map[z][x+4][1] = darkRock;

  g_map[z+1][x][1] = darkRock;
  g_map[z+2][x][1] = darkRock;
  g_map[z+3][x][1] = darkRock;
  g_map[z+4][x][1] = darkRock;

  g_map[z+1][x+4][1] = darkRock;
  g_map[z+2][x+4][1] = darkRock;
  g_map[z+3][x+4][1] = darkRock;
  g_map[z+4][x+4][1] = darkRock;

  // top
  g_map[z+1][x+1][2] = darkRock;
  g_map[z+2][x+1][2] = darkRock;
  g_map[z+3][x+1][2] = darkRock;
  g_map[z+4][x+1][2] = darkRock;

  g_map[z+1][x+2][2] = darkRock;
  g_map[z+2][x+2][2] = darkRock;
  g_map[z+3][x+2][2] = darkRock;
  g_map[z+4][x+2][2] = darkRock;

  g_map[z+1][x+3][2] = darkRock;
  g_map[z+2][x+3][2] = darkRock;
  g_map[z+3][x+3][2] = darkRock;
  g_map[z+4][x+3][2] = darkRock;
}

function initMap() {
  clearMap();

  // out in rocks
  if (g_rocks) {
    addRocks(4, 12);
    addRocks(21, 3);
    addRocks(7, 2);
    addRocks(25, 28);
    addShortRocks(20,20);
    addShortRocks(17,23);
    addShortRocks(23,29);
    addShortRocks(1,4);
    addShortRocks(6,5);
    addShortRocks(25,4);
    addShortRocks(27,2);
    addShortRocks(18,16);
    addShortRocks(3,19);
    addShortRocks(5,23);
    addShortRocks(2,29);
    addShortRocks(27,8);    
  }

  // and a cave
  if (g_cave) {
    makeCave(20, 7);
  }
}

function toCoordinates(num) {
  if (num < -8) {
    return 0;
  }
  else {
    return Math.round((num + 8) * 2);
  }
}

function drawMap() {
  if (!g_mapInitialized) {
    initMap();
    g_mapInitialized = true;
  }

  var block = new Cube();

  for (var z = 0; z < 32; z++) {
    for (var x = 0; x < 32; x++) {
      // loop over keys in y dict
      for (var y in g_map[z][x]) {
        if (g_map[z][x].hasOwnProperty(y)){
          if (g_selected != null && g_selected[0] === z && g_selected[1] === x && g_selected[2] == y) {
            block.textureNum = g_map[z][x][y] + 1;
          }
          else {
            block.textureNum = g_map[z][x][y];
          }

          block.matrix.setIdentity();
          block.matrix.translate(0, -0.75, 0);
          block.matrix.scale(0.5, 0.5, 0.5);
          block.matrix.translate(x - 16, y, z - 16);
          block.render();
        }
      }

      // if column selected but there are no blocks in column
      if (g_selected != null && g_selected[0] === z && g_selected[1] === x && g_selected[2] == -1) {

        block.textureNum = -2;
        block.color = [70/255, 50/255, 40/255, 1];
        block.matrix.setIdentity();
        block.matrix.translate(0, -0.75, 0);
        block.matrix.scale(0.5, 0.01, 0.5);
        block.matrix.translate(x - 16, -0.55, z - 16);
        block.render();
      }
    }
  }
}