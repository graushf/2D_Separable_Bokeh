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
var diagonalBlurBuffer;
var textureDiagonalBlurBuffer;
var rhombiBlurBuffer;
var textureRhombiBlurBuffer;
var invViewDimensions_x;
var invViewDimensions_y;

var CoC = 1.0;
var Angle = 0.0;

window.onload = window.onresize = function() {
    var canvas = document.getElementById('WebGLCanvas');
    //canvas.width = window.innerWidth * 0.8;
    //canvas.height = window.innerHeight * 0.2;
}

function initGL(canvas) {
    try {
        gl = canvas.getContext("experimental-webgl");
        gl.viewportWidth = canvas.width;
        gl.viewportHeight = canvas.height;

        invViewDimensions_x = (1.0/gl.viewportWidth)*1.0;
        invViewDimensions_y = (1.0/gl.viewportHeight)*1.0;

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

    handleKeys();
    handleStatistics();
    draw2DBokehEffect();
}

function webGLStart() {
    var canvas = document.getElementById("WebGLCanvas");
    initGL(canvas);
    
    createFramebuffers();

    initSceneTexture();

    setupShaders2DSeparableBokeh();

    initScreenFillingBuffers();

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    //gl.enable(gl.DEPTH_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    document.onkeydown = handleKeyDown;
    document.onkeyup = handleKeyUp;

    initStatistics();
    
    tick();
}