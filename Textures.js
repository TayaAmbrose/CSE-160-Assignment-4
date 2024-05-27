// Taya Ambrose
// Email: tjambros@ucsc.edu
// CSE 160, Assignment 3

// From following Professor Davis' videos
// Looked at Plain ol' Bees in the hall of fame for reference on multiple files and textures.
// I had issues with texture before this.

// initialize textures
function initTextures() {
  createAndLoadTexture(0, 'caveFloor.png');
  createAndLoadTexture(1, 'caveWalls.png');
  createAndLoadTexture(10, 'stone2.jpg');
  // I want to add more later, I have 10 extra spaces for them
  return true;
}


// function to create and load texture
function createAndLoadTexture(index, path) {
  var image = new Image();  // Create the image object
  if (!image) {
    console.log('Failed to create the image object');
    return false;
  }

  // Register the event handler to be called on loading an image
  image.onload = function(){ sendImageToTEXTURE(image, index); console.log("loaded texture", index);};

  // Tell the browser to load an image
  image.src = path;

  return true;
}

// function to send image to texture
function sendImageToTEXTURE(image, index) {
  var texture = gl.createTexture();   // Create a texture object
  if (!texture) {
    console.log('Failed to create the texture object');
    return false;
  }

  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); // Flip the image's y axis

  // Enable texture unit index
  gl.activeTexture(getTexture(index));
  // Bind the texture object to the target
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // Set the texture parameters
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  // Set the texture image
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
  
  // Set the texture unit i (index) to the sampler
  gl.uniform1i(getSampler(index), index);

  //gl.clear(gl.COLOR_BUFFER_BIT);      // Clear canvas

  // Render
  renderAllShapes();
}

// function that chooses the texture
// again, only added 3 textures, room for 10 extra
function getTexture(index) {
  switch(index) {
    case 0:
      return gl.TEXTURE0;
    case 1:
      return gl.TEXTURE1;
    case 2:
      return gl.TEXTURE2;
    case 3:
      return gl.TEXTURE3;
    case 4:
      return gl.TEXTURE4;
    case 5:
      return gl.TEXTURE5;
    case 6:
      return gl.TEXTURE6;
    case 7:
      return gl.TEXTURE7;
    case 8:
      return gl.TEXTURE8;
    case 9:
      return gl.TEXTURE9;
    case 10:
      return gl.TEXTURE10;
    case 11:
      return gl.TEXTURE11;
    case 12:
      return gl.TEXTURE12;
    case 13:
      return gl.TEXTURE13;
    default:
      return null;
  }
}

// function to choose the sampler
function getSampler(index) {
  switch(index) {
    case 0:
      return u_Sampler0;
    case 1:
      return u_Sampler1;
    case 2:
      return u_Sampler2;
    case 3:
      return u_Sampler3;
    case 4:
      return u_Sampler4;
    case 5:
      return u_Sampler5;
    case 6:
      return u_Sampler6;
    case 7:
      return u_Sampler7;
    case 8:
      return u_Sampler8;
    case 9:
      return u_Sampler9;
    case 10:
      return u_Sampler10;
    case 11:
      return u_Sampler11;
    case 12:
      return u_Sampler12;
    case 13:
      return u_Sampler13;
    default:
      return null;
  }
}
