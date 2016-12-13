var gl;

function start() {
  console.log("start() called.");

  var canvas = document.getElementById("glcanvas");
  gl = initWebGL(canvas);

  if (gl) {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  }
}

function initWebGL(canvas) {
  console.log("initWebGL() called.")
  gl = null;

  try {
    gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
  } catch (e) {
    cosole.log(e);
  }
  if (!gl) {
    alert("WebGLを初期化できません。ブラウザはサポートしていないようです");
    gl = null;
  }
  return gl;
}
