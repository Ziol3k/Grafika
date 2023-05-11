const canvas = document.getElementById('myCanvas');

const gl = canvas.getContext('webgl');

const vertices = [ 

-0.5, 0.5, 0.0,  
-0.5, -0.5, 0.0,  
0.5, -0.5, 0.0,  

0.5, -0.5, 0.0,  
0.5, 0.5, 0.0,  
-0.5, 0.5, 0.0];


const vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);


const vertexShaderSource = `
  attribute vec3 position;
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`;
const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vertexShaderSource);
gl.compileShader(vertexShader);


const fragmentShaderSource = `
  void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
  }
`;
const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fragmentShaderSource);
gl.compileShader(fragmentShader);


const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);


gl.useProgram(program);


const positionAttributeLocation = gl.getAttribLocation(program, 'position');


gl.enableVertexAttribArray(positionAttributeLocation);


gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);


gl.clearColor(0.0, 0.0, 0.0, 1.0);


gl.clear(gl.COLOR_BUFFER_BIT);

gl.drawArrays(gl.TRIANGLES, 0, 6);
