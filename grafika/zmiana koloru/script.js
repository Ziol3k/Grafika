const canvas = document.getElementById('myCanvas');
      const gl = canvas.getContext('webgl');

      const vertices = [
        // pierwszy trójkąt
        -0.5, 0.5, 0.0,
        -0.5, -0.5, 0.0,
        0.5, -0.5, 0.0,

        // drugi trójkąt
        0.5, -0.5, 0.0,
        0.5, 0.5, 0.0,
        -0.5, 0.5, 0.0
      ];

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
        precision mediump float;
        uniform vec4 u_color;
        void main() {
          gl_FragColor = u_color;
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

      const colorUniformLocation = gl.getUniformLocation(program, 'u_color');
      gl.uniform4f(colorUniformLocation, 1.0, 0.0, 0.0, 1.0);

      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      const button = document.getElementById('colorButton');
      button.addEventListener('click', () => {
        const r = Math.random();
        const g = Math.random();
        const b = Math.random();
        const a = 1.0;
        gl.uniform4f(colorUniformLocation, r, g, b, a);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      });