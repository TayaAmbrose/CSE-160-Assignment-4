// Taya Ambrose
// Email: tjambros@ucsc.edu
// CSE 160, Assignment 4

// From following Professor Davis' videos

// Cube Class
class Cube {
  constructor() {
    this.type='cube';
    this.color = [1.0, 1.0, 1.0, 1.0];
    //this.size = 5.0;
    //this.segments = 10;
    this.matrix = new Matrix4();
    this.normalMatrix = new Matrix4();
    this.textureNum = -2; // default is color
  }

  render() {
    //var xy = this.position;
    var rgba = this.color;
    //var size = this.size;

    // Pass the texture number to u_WhichTexture
    gl.uniform1i(u_WhichTexture, this.textureNum);

    // Pass the color of a point to u_FragColor variable
    gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

    gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

    gl.uniformMatrix4fv(u_NormalMatrix, false, this.normalMatrix.elements);

    // Front side of cube
    drawTriangle3DUVNormal(
      [0,0,0,  1,1,0,  1,0,0],
      [0,0,  1,1,  1,0],
      [0,0,-1, 0,0,-1, 0,0,-1]
    );
    drawTriangle3DUVNormal([0,0,0,  0,1,0,  1,1,0], [0,0,  0,1,  1,1], [0,0,-1, 0,0,-1, 0,0,-1]);

    // Top side of cube
    // gl.uniform4f(u_FragColor, rgba[0]*.9, rgba[1]*.9, rgba[2]*.9, rgba[3]);
    drawTriangle3DUVNormal([0,1,0,  0,1,1,  1,1,1], [1,0,  0,1,  1,1], [0,1,0, 0,1,0, 0,1,0]);
    drawTriangle3DUVNormal([0,1,0,  1,1,1,  1,1,0], [1,0,  0,1,  0,0], [0,1,0, 0,1,0, 0,1,0]);

    // Pass the color of a point to u_FragColor variable
    // gl.uniform4f(u_FragColor, rgba[0] * 0.8, rgba[1] * 0.8, rgba[2] * 0.8, rgba[3]);
   
    // Right side of cube
    // gl.uniform4f(u_FragColor, rgba[0] * 0.8, rgba[1] * 0.8, rgba[2] * 0.8, rgba[3]);
    drawTriangle3DUVNormal([1,1,0,  1,0,1,  1,0,0], [0,1,  1,0,  0,0], [1,0,0, 1,0,0, 1,0,0]);
    drawTriangle3DUVNormal([1,1,0,  1,0,1,  1,1,1], [0,1,  1,0,  1,1], [1,0,0, 1,0,0, 1,0,0]);

    // Left side of cube
    // gl.uniform4f(u_FragColor, rgba[0] * 0.7, rgba[1] * 0.7, rgba[2] * 0.7, rgba[3]);
    drawTriangle3DUVNormal([0,1,0,  0,0,1,  0,0,0], [1,1,  0,0,  1,0], [-1,0,0, -1,0,0, -1,0,0]);
    drawTriangle3DUVNormal([0,1,0,  0,0,1,  0,1,1], [1,1,  0,0,  0,1], [-1,0,0, -1,0,0, -1,0,0]);

    // Bottom side of cube
    // gl.uniform4f(u_FragColor, rgba[0] * 0.6, rgba[1] * 0.6, rgba[2] * 0.6, rgba[3]);
    drawTriangle3DUVNormal([1,0,0,  0,0,1,  1,0,1], [1,1,  0,0,  1,0], [0,-1,0, 0,-1,0, 0,-1,0]);
    drawTriangle3DUVNormal([1,0,0,  0,0,1,  0,0,0], [1,1,  0,0,  0,1], [0,-1,0, 0,-1,0, 0,-1,0]);

    // Back side of cube
    // gl.uniform4f(u_FragColor, rgba[0] * 0.7, rgba[1] * 0.7, rgba[2] * 0.7, rgba[3]);
    drawTriangle3DUVNormal([0,0,1,  1,1,1,  1,0,1], [1,0,  0,1,  0,0], [0,0,1, 0,0,1, 0,0,1]);
    drawTriangle3DUVNormal([0,0,1,  0,1,1,  1,1,1], [1,0,  1,1,  0,1], [0,0,1, 0,0,1, 0,0,1]);

  }
}
