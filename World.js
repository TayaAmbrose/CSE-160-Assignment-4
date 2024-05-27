// Taya Ambrose
// Email: tjambros@ucsc.edu
// CSE 160, Assignment 4

// From following Professor Davis' videos

// Vertex shader program
var VSHADER_SOURCE = `
  precision mediump float;
  attribute vec4 a_Position;
  attribute vec2 a_UV;
  attribute vec3 a_Normal;
  varying vec2 v_UV;
  varying vec3 v_Normal;
  varying vec4 v_VertPos;
  uniform mat4 u_ModelMatrix;
  uniform mat4 u_NormalMatrix; // flag
  uniform mat4 u_GlobalRotateMatrix;
  uniform mat4 u_ViewMatrix;
  uniform mat4 u_ProjectionMatrix;
  void main() {
    gl_Position = u_ProjectionMatrix * u_ViewMatrix * u_GlobalRotateMatrix * u_ModelMatrix * a_Position;
    v_UV = a_UV;
    v_Normal = normalize(vec3(u_NormalMatrix * vec4(a_Normal, 1))); // flag
    // v_Normal = a_Normal;
    v_VertPos = u_ModelMatrix * a_Position;
  }`


// Fragment shader program
var FSHADER_SOURCE = `
  precision mediump float;
  varying vec2 v_UV;
  varying vec3 v_Normal;
  uniform vec4 u_FragColor;
  uniform sampler2D u_Sampler0;
  uniform sampler2D u_Sampler1;
  uniform sampler2D u_Sampler2;
  uniform sampler2D u_Sampler3;
  uniform sampler2D u_Sampler4;
  uniform sampler2D u_Sampler5;
  uniform sampler2D u_Sampler6;
  uniform sampler2D u_Sampler7;
  uniform sampler2D u_Sampler8;
  uniform sampler2D u_Sampler9;
  uniform sampler2D u_Sampler10;
  uniform sampler2D u_Sampler11;
  uniform sampler2D u_Sampler12;
  uniform sampler2D u_Sampler13;
  uniform int u_WhichTexture;
  uniform vec3 u_lightPos;
  uniform vec3 u_cameraPos;
  varying vec4 v_VertPos;
  uniform bool u_lightOn;

  void main() {
    vec4 baseColor;
    if (u_WhichTexture == -3) {                     // Use Normal
      baseColor = vec4((v_Normal + 1.0) / 2.0, 1.0);
    } else if (u_WhichTexture == -2) {              // Use color
      baseColor = u_FragColor;
    } else if (u_WhichTexture == -1) {              // Use UV debug color
      baseColor = vec4(v_UV, 1.0, 1.0);
    } else if (u_WhichTexture == 0) {               // Use texture 0
      baseColor = texture2D(u_Sampler0, v_UV);
    } else if (u_WhichTexture == 1) {               // Use texture 1
      baseColor = texture2D(u_Sampler1, v_UV);
    } else if (u_WhichTexture == 2) {               // Use texture 2
      baseColor = texture2D(u_Sampler2, v_UV);
    } else if (u_WhichTexture == 3) {               // Use texture 3
      baseColor = texture2D(u_Sampler3, v_UV);
    } else if (u_WhichTexture == 4) {               // Use texture 4
      baseColor = texture2D(u_Sampler4, v_UV);
    } else if (u_WhichTexture == 5) {               // Use texture 5
      baseColor = texture2D(u_Sampler5, v_UV);
    } else if (u_WhichTexture == 6) {               // Use texture 6
      baseColor = texture2D(u_Sampler6, v_UV);
    } else if (u_WhichTexture == 7) {               // Use texture 7
      baseColor = texture2D(u_Sampler7, v_UV);
    } else if (u_WhichTexture == 8) {               // Use texture 8
      baseColor = texture2D(u_Sampler8, v_UV);
    } else if (u_WhichTexture == 9) {               // Use texture 9
      baseColor = texture2D(u_Sampler9, v_UV);
    } else if (u_WhichTexture == 10) {               // Use texture 10
      baseColor = texture2D(u_Sampler10, v_UV);
    } else if (u_WhichTexture == 11) {               // Use texture 11
      baseColor = texture2D(u_Sampler11, v_UV);
    } else if (u_WhichTexture == 12) {               // Use texture 12
      baseColor = texture2D(u_Sampler12, v_UV);
    } else if (u_WhichTexture == 13) {               // Use texture 13
      baseColor = texture2D(u_Sampler13, v_UV);
    } else {                                        // Error: use red
      baseColor = vec4(1, 0.2, 0.2, 1);
    }

    if (u_lightOn) {
      vec3 lightVector = u_lightPos - vec3(v_VertPos);
      float r = length(lightVector);

      // N dot L
      vec3 L = normalize(lightVector);
      vec3 N = normalize(v_Normal);
      float nDotL = max(dot(N, L), 0.0);

      // Reflection
      vec3 R = reflect(-L, N);

      // Eye
      vec3 E = normalize(u_cameraPos - vec3(v_VertPos));

      // Specular
      float specular = pow(max(dot(E, R), 0.0), 64.0) * 0.8;

      vec3 diffuse = vec3(baseColor) * nDotL * 0.7;
      vec3 ambient = vec3(baseColor) * 0.2;
      vec3 specularColor = vec3(1.0, 1.0, 1.0) * specular;

      gl_FragColor = vec4(specularColor + diffuse + ambient, baseColor.a);
    } else {
      gl_FragColor = baseColor;
    }
  }`

  // // Fragment shader program
// var FSHADER_SOURCE = `
//   precision mediump float;
//   varying vec2 v_UV;
//   varying vec3 v_Normal;
//   uniform vec4 u_FragColor;
//   uniform sampler2D u_Sampler0;
//   uniform sampler2D u_Sampler1;
//   uniform sampler2D u_Sampler2;
//   uniform sampler2D u_Sampler3;
//   uniform sampler2D u_Sampler4;
//   uniform sampler2D u_Sampler5;
//   uniform sampler2D u_Sampler6;
//   uniform sampler2D u_Sampler7;
//   uniform sampler2D u_Sampler8;
//   uniform sampler2D u_Sampler9;
//   uniform sampler2D u_Sampler10;
//   uniform sampler2D u_Sampler11;
//   uniform sampler2D u_Sampler12;
//   uniform sampler2D u_Sampler13;
//   uniform int u_WhichTexture;
//   uniform vec3 u_lightPos;
//   uniform vec3 u_cameraPos;
//   varying vec4 v_VertPos;
//   uniform bool u_lightOn;

//   void main() {
//     if (u_WhichTexture == -3) {                     // Use Normal
//       gl_FragColor = vec4((v_Normal + 1.0) / 2.0, 1.0);
//     } else if (u_WhichTexture == -2) {              // Use color
//       gl_FragColor = u_FragColor;
//     } else if (u_WhichTexture == -1) {              // Use UV debug color
//       gl_FragColor = vec4(v_UV, 1.0, 1.0);
//     } else if (u_WhichTexture == 0) {               // Use texture 0
//       gl_FragColor = texture2D(u_Sampler0, v_UV);
//     } else if (u_WhichTexture == 1) {               // Use texture 1
//       gl_FragColor = texture2D(u_Sampler1, v_UV);
//     } else if (u_WhichTexture == 2) {               // Use texture 2
//       gl_FragColor = texture2D(u_Sampler2, v_UV);
//     } else if (u_WhichTexture == 3) {               // Use texture 3
//       gl_FragColor = texture2D(u_Sampler3, v_UV);
//     } else if (u_WhichTexture == 4) {               // Use texture 4
//       gl_FragColor = texture2D(u_Sampler4, v_UV);
//     } else if (u_WhichTexture == 5) {               // Use texture 5
//       gl_FragColor = texture2D(u_Sampler5, v_UV);
//     } else if (u_WhichTexture == 6) {               // Use texture 6
//       gl_FragColor = texture2D(u_Sampler6, v_UV);
//     } else if (u_WhichTexture == 7) {               // Use texture 7
//       gl_FragColor = texture2D(u_Sampler7, v_UV);
//     } else if (u_WhichTexture == 8) {               // Use texture 8
//       gl_FragColor = texture2D(u_Sampler8, v_UV);
//     } else if (u_WhichTexture == 9) {               // Use texture 9
//       gl_FragColor = texture2D(u_Sampler9, v_UV);
//     } else if (u_WhichTexture == 10) {               // Use texture 10
//       gl_FragColor = texture2D(u_Sampler10, v_UV);
//     } else if (u_WhichTexture == 11) {               // Use texture 11
//       gl_FragColor = texture2D(u_Sampler11, v_UV);
//     } else if (u_WhichTexture == 12) {               // Use texture 12
//       gl_FragColor = texture2D(u_Sampler12, v_UV);
//     } else if (u_WhichTexture == 13) {               // Use texture 13
//       gl_FragColor = texture2D(u_Sampler13, v_UV);
//     } else {                                        // Error: use red
//       gl_FragColor = vec4(1, 0.2, 0.2, 1);
//     }

//     // vec3 lightVector = u_lightPos - vec3(v_VertPos);
//     // float r = length(lightVector);

//     // // Light Falloff Visualization 1/r^2
//     // // gl_FragColor = vec4(vec3(gl_FragColor)/(r*r), 1);

//     // // N dot L
//     // vec3 L = normalize(lightVector);
//     // vec3 N = normalize(v_Normal);
//     // float nDotL = max(dot(N,L), 0.0);

//     // // Reflection
//     // vec3 R = reflect(-L, N);

//     // // Eye
//     // vec3 E = normalize(u_cameraPos - vec3(v_VertPos));

//     // // Specular
//     // float specular = pow(max(dot(E, R), 0.0), 64.0) * 0.8;

//     // vec3 diffuse = vec3(1.0,1.0,0.9) * vec3(gl_FragColor) * nDotL * 0.7;
//     // vec3 ambient = vec3(gl_FragColor) * 0.2;
//     // gl_FragColor = vec4(specular + diffuse + ambient, 1.0);

//     if (u_lightOn) {
//       if (u_WhichTexture == 0) {

//         vec3 lightVector = u_lightPos - vec3(v_VertPos);
//         float r = length(lightVector);

//         // Light Falloff Visualization 1/r^2
//         // gl_FragColor = vec4(vec3(gl_FragColor)/(r*r), 1);

//         // N dot L
//         vec3 L = normalize(lightVector);
//         vec3 N = normalize(v_Normal);
//         float nDotL = max(dot(N,L), 0.0);

//         // Reflection
//         vec3 R = reflect(-L, N);

//         // Eye
//         vec3 E = normalize(u_cameraPos - vec3(v_VertPos));

//         // Specular
//         float specular = pow(max(dot(E, R), 0.0), 64.0) * 0.8;

//         vec3 diffuse = vec3(1.0,1.0,0.9) * vec3(gl_FragColor) * nDotL * 0.7;
//         vec3 ambient = vec3(gl_FragColor) * 0.2;
//         gl_FragColor = vec4(specular + diffuse + ambient, 1.0);
// ///////////////////
//         // gl_FragColor = vec4(specular + diffuse + ambient, 1.0);
//       // } else {
//       //   gl_FragColor = vec4(diffuse + ambient, 1.0);
//       }
//     }
//   }`

// create main function
function main() {
  // Set up canvas and gl variables
  setupWebGL();
  
  // Set up GLSL shader programs and connect GLSL variables.
  connectVariablesToGLSL();

  // Set up actions for the HTML UI elements
  addActionsForHtmlUI();

  //Create a new camera
  g_camera = new Camera();

  // Create keydown/keyup functions
  document.onkeydown = keydown;
  document.onkeyup = keyup;

  // Create click function
  canvas.onmousedown = click;

  // Register mousemove function
  document.onmousemove = mousemove;

  // Initialize Textures
  initTextures();

  // Specify the color for clearing <canvas>
  gl.clearColor(30/255.0, 125/255.0, 155/255.0, 1.0);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  
  requestAnimationFrame(tick);
}
