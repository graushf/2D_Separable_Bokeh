var gl;

var screenFillingVertexPositionBuffer;
var screenFillingTextureCoordBuffer;
var screenFillingIndexBuffer;

var downsampleCoefficient = 2.0;

var backBuffer;
var textureBackBuffer;
var backBufferHalf;
var textureBackBufferHalf;
var verticalBlurBuffer;
var textureVerticalBlurBuffer;

function initGL(canvas) {
    try {
        gl = canvas.getContext("experimental-webgl");
        gl.viewportWidth = canvas.width;
        gl.viewportHeight = canvas.height;
    } catch (e) {
    }
    if (!gl) {
        alert("Could not initialise WebGL, sorry :-(");
    }
}

function tick() {
    requestAnimFrame(tick);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    draw2DBokehEffect();
}

function webGLStart() {
    var canvas = document.getElementById("3D_scene-canvas");
    initGL(canvas);

    createFramebuffers();

    initSceneTexture();

    setupShaders2DSeparableBokeh();

    initScreenFillingBuffers();

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    //gl.enable(gl.DEPTH_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
    tick();
}