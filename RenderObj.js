// Taya Ambrose
// Email: tjambros@ucsc.edu
// CSE 160, Assignment 4

// From following Professor Davis' videos

// Draw every shape
function renderAllShapes() {
  // Check time at start of function
  var startTime = performance.now();

  // Pass the Projection matrix
  gl.uniformMatrix4fv(u_ProjectionMatrix, false, g_camera.projMat.elements);

  // Pass the View matrix
  gl.uniformMatrix4fv(u_ViewMatrix, false, g_camera.viewMat.elements);

  // Pass the light position to GLSL
  gl.uniform3f(u_lightPos, g_lightPos[0], g_lightPos[1], g_lightPos[2]); // flag 4.3 check

  // Pass the camera position to GLSL
  gl.uniform3f(u_cameraPos, g_camera.eye.x, g_camera.eye.y, g_camera.eye.z); // flag 4.6

  // Pass the light status
  gl.uniform1i(u_lightOn, g_lightOn);

  // Pass a matrix to u_GlobalRotateMatrix attribute
  var globalRotMat = new Matrix4().rotate(g_globalAngle_y, 0, 1, 0);
  globalRotMat.rotate(g_globalAngle_x, 1, 0, 0);
  gl.uniformMatrix4fv(u_GlobalRotateMatrix, false, globalRotMat.elements);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.clear(gl.COLOR_BUFFER_BIT);



  // world

  // initial colors
  var caveFloor = [150/255, 100/255, 70/255, 1]; // light brown
  var caveWalls_color = [135/255.0, 206/255.0, 235/255.0, 1.0]; //[127/255, 194/255, 231/255, 1]; // brown

  // Draw the light
  var light = new Cube();
  light.color = [2,2,0,1];
  light.matrix.translate(g_lightPos[0], g_lightPos[1], g_lightPos[2]);
  light.matrix.scale(-.1,-.1,-.1);
  light.matrix.translate(-0.5, -0.5, -0.5);
  light.render();

  // create ground
  var ground = new Cube();
  ground.textureNum = -2; //0
  ground.color = caveFloor;
  // if (g_normalOn) ground.textureNum = -3;
  ground.matrix.translate(0, -0.75, 0);
  ground.matrix.scale(16, 0.1, 16);
  ground.matrix.translate(-0.5, 0, -0.5);
  ground.render();

  // create cave box
  var caveWalls = new Cube();
  caveWalls.textureNum = -2; //1
  caveWalls.color = caveWalls_color;
  if (g_normalOn) caveWalls.textureNum = -3;
  caveWalls.matrix.scale(-50, -50, -50);
  caveWalls.matrix.translate(-0.5, -0.5, -0.5);
  caveWalls.render();

  var sphere = new Sphere();
  // sphere.textureNum = 1; // for texture, end of 4.2
  if (g_normalOn) sphere.textureNum = -3;
  sphere.matrix.translate(-1,0.3,-3);
  sphere.render();


  // draw map
  drawMap();

  // soot!
  var sootLoc = [g_sootX, 0, g_sootZ];
  var bodyCoordinates = renderSootBaby(0.8, sootLoc, g_sootRotation);

  // Check the time at end of the function
  var duration = performance.now() - startTime;
  sendTextToHTML(" ms: " + Math.floor(duration) + "&nbsp;&nbsp;  fps: " + Math.floor(10000/duration)/10, "numdot");
}
