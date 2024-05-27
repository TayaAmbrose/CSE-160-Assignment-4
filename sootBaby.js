// Taya Ambrose
// Email: tjambros@ucsc.edu
// CSE 160, Assignment 3

// From following Professor Davis' videos
// Looked at Plain ol' Bees in the hall of fame for reference on multiple files and textures.
// I had issues with texture before this.

// create the soot baby
function renderSootBaby(scale, location, rotation) {
  // soot's body
  var center = new Cube();
  center.color = [0,0,0,1];
  center.matrix.translate(location[0], -0.45 + g_mainY * 0.7 + location[1], location[2]);
  center.matrix.rotate(rotation, 0, 1, 0);
  center.matrix.rotate(g_wiggleAngle * 0.05, 1, 0, 0);
  center.matrix.scale(scale, scale, scale);
  var centerCoords = new Matrix4(center.matrix);
  center.matrix.scale(0.2, 0.2, 0.2);
  center.normalMatrix.setInverseOf(center.matrix).transpose(); // flag last vid
  center.render();

  // soot baby left eye
  var soot_left = new Cube();
  soot_left.color = [1,1,1,1];
  soot_left.matrix = new Matrix4(centerCoords);
  soot_left.matrix.translate(-0.5, 0, -0.47);
  soot_left.matrix.translate(0.65, 0.1, 0.58); // forward backward, up down, side side
  soot_left.matrix.scale(0.07, 0.07, 0.07);
  soot_left.render();

  // soot baby left pupil
  var soot_left_pupil = new Cube();
  soot_left_pupil.color = [0,0,0,1];
  soot_left_pupil.matrix = new Matrix4(centerCoords);
  soot_left_pupil.matrix.translate(-0.5, 0, -0.47);
  soot_left_pupil.matrix.translate(0.7, 0.11, 0.59); // forward backward, up down, side side
  soot_left_pupil.matrix.scale(0.03, 0.03, 0.03);
  soot_left_pupil.render();

  // soot baby right eye
  var soot_right = new Cube();
  soot_right.color = [1,1,1,1];
  soot_right.matrix = new Matrix4(centerCoords);
  soot_right.matrix.translate(-0.5, 0, -0.47);
  soot_right.matrix.translate(0.65, 0.1, 0.49);
  soot_right.matrix.scale(0.07, 0.07, 0.07);
  soot_right.render();

  // soot baby right pupil
  var soot_right_pupil = new Cube();
  soot_right_pupil.color = [0,0,0,1];
  soot_right_pupil.matrix = new Matrix4(centerCoords);
  soot_right_pupil.matrix.translate(-0.5, 0, -0.47);
  soot_right_pupil.matrix.translate(0.7, 0.11, 0.525); // forward backward, up down, side side
  soot_right_pupil.matrix.scale(0.03, 0.03, 0.03);
  soot_right_pupil.render();
}
