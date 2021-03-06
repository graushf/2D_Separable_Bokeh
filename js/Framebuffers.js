
function createFramebuffers() {
    var ext = gl.getExtension('OES_texture_float');
    var ext2 = gl.getExtension('OES_texture_float_linear');

    createBackBuffer();
    createBackBufferHalf();

    createVerticalBlurBuffer();
    createDiagonalBlurBuffer();

    createRhombiBlurBuffer();

}

function createBackBuffer() {
    backBuffer = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, backBuffer);

    var texture = createAndSetupTexture();
    textureBackBuffer = texture;

    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.viewportWidth, gl.viewportHeight, 0, gl.RGBA, gl.FLOAT, null);

    var renderbuffer = gl.createRenderbuffer();
    gl.bindRenderbuffer(gl.RENDERBUFFER, renderbuffer);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, gl.viewportWidth, gl.viewportHeight);

    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, renderbuffer);
}

function createBackBufferHalf() {
    backBufferHalf = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, backBufferHalf);

    var texture = createAndSetupTexture();
    textureBackBufferHalf = texture;

    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.viewportWidth/downsampleCoefficient, gl.viewportHeight/downsampleCoefficient, 0, gl.RGBA, gl.FLOAT, null);

    var renderbuffer = gl.createRenderbuffer();
    gl.bindRenderbuffer(gl.RENDERBUFFER, renderbuffer);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, gl.viewportWidth/downsampleCoefficient, gl.viewportHeight/downsampleCoefficient);

    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, renderbuffer);
}

function createVerticalBlurBuffer() {
    verticalBlurBuffer = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, verticalBlurBuffer);

    var texture = createAndSetupTexture();
    textureVerticalBlurBuffer = texture;

    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.viewportWidth/downsampleCoefficient, gl.viewportHeight/downsampleCoefficient, 0, gl.RGBA, gl.FLOAT, null);

    var renderbuffer = gl.createRenderbuffer();
    gl.bindRenderbuffer(gl.RENDERBUFFER, renderbuffer);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, gl.viewportWidth/downsampleCoefficient, gl.viewportHeight/downsampleCoefficient);

    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, renderbuffer);
}

function createDiagonalBlurBuffer() {
    diagonalBlurBuffer = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, diagonalBlurBuffer);

    var texture = createAndSetupTexture();
    textureDiagonalBlurBuffer = texture;

    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.viewportWidth/downsampleCoefficient, gl.viewportHeight/downsampleCoefficient, 0, gl.RGBA, gl.FLOAT, null);

    var renderbuffer = gl.createRenderbuffer();
    gl.bindRenderbuffer(gl.RENDERBUFFER, renderbuffer);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, gl.viewportWidth/downsampleCoefficient, gl.viewportHeight/downsampleCoefficient);

    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, renderbuffer);
}

function createRhombiBlurBuffer() {
    rhombiBlurBuffer = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, rhombiBlurBuffer);

    var texture = createAndSetupTexture();
    textureRhombiBlurBuffer = texture;

    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.viewportWidth/1.0, gl.viewportHeight/1.0, 0, gl.RGBA, gl.FLOAT, null);

    var renderbuffer = gl.createRenderbuffer();
    gl.bindRenderbuffer(gl.RENDERBUFFER, renderbuffer);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, gl.viewportWidth/1.0, gl.viewportHeight/1.0);

    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, renderbuffer);
}