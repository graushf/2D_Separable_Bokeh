
function draw2DBokehEffect() {
    gl.bindFramebuffer(gl.FRAMEBUFFER, backBuffer);
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);

    renderScenePass();

    gl.bindFramebuffer(gl.FRAMEBUFFER, backBufferHalf);
    gl.viewport(0, 0, gl.viewportWidth/downsampleCoefficient, gl.viewportHeight/downsampleCoefficient);

    renderDownsamplePass();

    gl.bindFramebuffer(gl.FRAMEBUFFER, verticalBlurBuffer);
    gl.viewport(0, 0, gl.viewportWidth/downsampleCoefficient, gl.viewportHeight/downsampleCoefficient);

    renderVerticalBlurPass();

    gl.bindFramebuffer(gl.FRAMEBUFFER, diagonalBlurBuffer);
    gl.viewport(0, 0, gl.viewportWidth/downsampleCoefficient, gl.viewportHeight/downsampleCoefficient);

    renderDiagonalBlurPass();

    gl.bindFramebuffer(gl.FRAMEBUFFER, rhombiBlurBuffer);
    gl.viewport(0, 0, gl.viewportWidth/1.0, gl.viewportHeight/1.0);

    renderRhombiBlurPass();

    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    renderScrFillTexture(textureRhombiBlurBuffer);
}

function renderScrFillTexture(texture) {
    gl.useProgram(shaderProgramScrFillTexturePass);

    shaderProgramScrFillTexturePass.vertexPositionAttribute = gl.getAttribLocation(shaderProgramScrFillTexturePass, "aVertexPosition");
    gl.enableVertexAttribArray(shaderProgramScrFillTexturePass.vertexPositionAttribute);

    shaderProgramScrFillTexturePass.textureCoordAttribute = gl.getAttribLocation(shaderProgramScrFillTexturePass, "aTextureCoord");
    gl.enableVertexAttribArray(shaderProgramScrFillTexturePass.textureCoordAttribute);

    shaderProgramScrFillTexturePass.samplerUniform = gl.getUniformLocation(shaderProgramScrFillTexturePass, "uSampler");

    gl.bindBuffer(gl.ARRAY_BUFFER, screenFillingVertexPositionBuffer);
    gl.vertexAttribPointer(shaderProgramScrFillTexturePass.vertexPositionAttribute, screenFillingVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, screenFillingTextureCoordBuffer);
    gl.vertexAttribPointer(shaderProgramScrFillTexturePass.textureCoordAttribute, screenFillingTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.uniform1i(shaderProgramScrFillTexturePass.samplerUniform, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, screenFillingIndexBuffer);
    gl.drawElements(gl.TRIANGLES, screenFillingIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
}

function renderScenePass() {
    gl.useProgram(shaderProgramScenePass);

    shaderProgramScenePass.vertexPositionAttribute = gl.getAttribLocation(shaderProgramScenePass, "aVertexPosition");
    gl.enableVertexAttribArray(shaderProgramScenePass.vertexPositionAttribute);

    shaderProgramScenePass.textureCoordAttribute = gl.getAttribLocation(shaderProgramScenePass, "aTextureCoord");
    gl.enableVertexAttribArray(shaderProgramScenePass.textureCoordAttribute);

    shaderProgramScenePass.samplerUniform = gl.getUniformLocation(shaderProgramScenePass, "uSampler");

    shaderProgramScenePass.cocUniform = gl.getUniformLocation(shaderProgramScenePass, "uCoc");

    gl.bindBuffer(gl.ARRAY_BUFFER, screenFillingVertexPositionBuffer);
    gl.vertexAttribPointer(shaderProgramScenePass.vertexPositionAttribute, screenFillingVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, screenFillingTextureCoordBuffer);
    gl.vertexAttribPointer(shaderProgramScenePass.textureCoordAttribute, screenFillingTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.uniform1f(shaderProgramScenePass.cocUniform, 1.0);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, bokeh2DTexture);
    gl.uniform1i(shaderProgramScenePass.samplerUniform, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, screenFillingIndexBuffer);
    gl.drawElements(gl.TRIANGLES, screenFillingIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
}

function renderDownsamplePass() {
    gl.useProgram(shaderProgramDownsamplePass);

    shaderProgramDownsamplePass.vertexPositionAttribute = gl.getAttribLocation(shaderProgramDownsamplePass, "aVertexPosition");
    gl.enableVertexAttribArray(shaderProgramDownsamplePass.vertexPositionAttribute);

    shaderProgramDownsamplePass.textureCoordAttribute = gl.getAttribLocation(shaderProgramDownsamplePass, "aTextureCoord");
    gl.enableVertexAttribArray(shaderProgramDownsamplePass.textureCoordAttribute);

    shaderProgramDownsamplePass.samplerUniform = gl.getUniformLocation(shaderProgramDownsamplePass, "uSampler");

    shaderProgramDownsamplePass.invViewCoordinatesUniform = gl.getUniformLocation(shaderProgramDownsamplePass, "uInvViewDimensions");

    gl.bindBuffer(gl.ARRAY_BUFFER, screenFillingVertexPositionBuffer);
    gl.vertexAttribPointer(shaderProgramDownsamplePass.vertexPositionAttribute, screenFillingVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, screenFillingTextureCoordBuffer);
    gl.vertexAttribPointer(shaderProgramDownsamplePass.textureCoordAttribute, screenFillingTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

    var invViewDimensions_x = 1.0 / 789.0;
    var invViewDimensions_y = 1.0 / 643.0;

    gl.uniform2f(shaderProgramDownsamplePass.invViewCoordinatesUniform, invViewDimensions_x, invViewDimensions_y);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, textureBackBuffer);
    gl.uniform1i(shaderProgramDownsamplePass.samplerUniform, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, screenFillingIndexBuffer);
    gl.drawElements(gl.TRIANGLES, screenFillingIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
}

function renderVerticalBlurPass() {
    gl.useProgram(shaderProgramVerticalBlurPass);

    shaderProgramVerticalBlurPass.vertexPositionAttribute = gl.getAttribLocation(shaderProgramVerticalBlurPass, "aVertexPosition");
    gl.enableVertexAttribArray(shaderProgramVerticalBlurPass.vertexPositionAttribute);

    shaderProgramVerticalBlurPass.textureCoordAttribute = gl.getAttribLocation(shaderProgramVerticalBlurPass, "aTextureCoord");
    gl.enableVertexAttribArray(shaderProgramVerticalBlurPass.textureCoordAttribute);

    shaderProgramVerticalBlurPass.samplerUniform = gl.getUniformLocation(shaderProgramVerticalBlurPass, "uSampler");

    shaderProgramVerticalBlurPass.invViewCoordinatesUniform = gl.getUniformLocation(shaderProgramVerticalBlurPass, "uInvViewDimensions");

    shaderProgramVerticalBlurPass.angleUniform = gl.getUniformLocation(shaderProgramVerticalBlurPass, "uAngle");

    gl.bindBuffer(gl.ARRAY_BUFFER, screenFillingVertexPositionBuffer);
    gl.vertexAttribPointer(shaderProgramVerticalBlurPass.vertexPositionAttribute, screenFillingVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, screenFillingTextureCoordBuffer);
    gl.vertexAttribPointer(shaderProgramVerticalBlurPass.textureCoordAttribute, screenFillingTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

    var invViewDimensions_x = 1.0 / 789.0;
    var invViewDimensions_y = 1.0 / 643.0;

    gl.uniform2f(shaderProgramVerticalBlurPass.invViewCoordinatesUniform, invViewDimensions_x, invViewDimensions_y);
    gl.uniform1f(shaderProgramVerticalBlurPass.angleUniform, 0.0);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, textureBackBufferHalf);
    gl.uniform1i(shaderProgramVerticalBlurPass.samplerUniform, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, screenFillingIndexBuffer);
    gl.drawElements(gl.TRIANGLES, screenFillingIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
}

function renderDiagonalBlurPass() {
    gl.useProgram(shaderProgramDiagonalBlurPass);

    shaderProgramDiagonalBlurPass.vertexPositionAttribute = gl.getAttribLocation(shaderProgramDiagonalBlurPass, "aVertexPosition");
    gl.enableVertexAttribArray(shaderProgramDiagonalBlurPass.vertexPositionAttribute);

    shaderProgramDiagonalBlurPass.textureCoordAttribute = gl.getAttribLocation(shaderProgramDiagonalBlurPass, "aTextureCoord");
    gl.enableVertexAttribArray(shaderProgramDiagonalBlurPass.textureCoordAttribute);

    shaderProgramDiagonalBlurPass.samplerUniform = gl.getUniformLocation(shaderProgramDiagonalBlurPass, "uSampler");
    shaderProgramDiagonalBlurPass.samplerVerticalBlurUniform = gl.getUniformLocation(shaderProgramDiagonalBlurPass, "uVerticalBlurTexture");
    shaderProgramDiagonalBlurPass.invViewCoordinatesUniform = gl.getUniformLocation(shaderProgramDiagonalBlurPass, "uInvViewDimensions");
    shaderProgramDiagonalBlurPass.angleUniform = gl.getUniformLocation(shaderProgramDiagonalBlurPass, "uAngle");

    gl.bindBuffer(gl.ARRAY_BUFFER, screenFillingVertexPositionBuffer);
    gl.vertexAttribPointer(shaderProgramDiagonalBlurPass.vertexPositionAttribute, screenFillingVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, screenFillingTextureCoordBuffer);
    gl.vertexAttribPointer(shaderProgramDiagonalBlurPass.textureCoordAttribute, screenFillingTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

    var invViewDimensions_x = 1.0 / 789.0;
    var invViewDimensions_y = 1.0 / 643.0;

    gl.uniform2f(shaderProgramDiagonalBlurPass.invViewCoordinatesUniform, invViewDimensions_x, invViewDimensions_y);
    gl.uniform1f(shaderProgramDiagonalBlurPass.angleUniform, 0.0);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, textureBackBufferHalf);
    gl.uniform1i(shaderProgramDiagonalBlurPass.samplerUniform, 0);

    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, textureVerticalBlurBuffer);
    gl.uniform1i(shaderProgramDiagonalBlurPass.samplerVerticalBlurUniform, 1);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, screenFillingIndexBuffer);
    gl.drawElements(gl.TRIANGLES, screenFillingIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
}

function renderRhombiBlurPass() {
    gl.useProgram(shaderProgramRhombiBlurPass);

    shaderProgramRhombiBlurPass.vertexPositionAttribute = gl.getAttribLocation(shaderProgramRhombiBlurPass, "aVertexPosition");
    gl.enableVertexAttribArray(shaderProgramRhombiBlurPass.vertexPositionAttribute);

    shaderProgramRhombiBlurPass.textureCoordAttribute = gl.getAttribLocation(shaderProgramRhombiBlurPass, "aTextureCoord");
    gl.enableVertexAttribArray(shaderProgramRhombiBlurPass.textureCoordAttribute);

    shaderProgramRhombiBlurPass.samplerVerticalBlurUniform = gl.getUniformLocation(shaderProgramRhombiBlurPass, "uVerticalBlurTexture");
    shaderProgramRhombiBlurPass.samplerDiagonalBlurUniform = gl.getUniformLocation(shaderProgramRhombiBlurPass, "uDiagonalBlurTexture");
    shaderProgramRhombiBlurPass.invViewCoordinatesUniform = gl.getUniformLocation(shaderProgramRhombiBlurPass, "uInvViewDimensions");
    shaderProgramRhombiBlurPass.angleUniform = gl.getUniformLocation(shaderProgramRhombiBlurPass, "uAngle");

    gl.bindBuffer(gl.ARRAY_BUFFER, screenFillingVertexPositionBuffer);
    gl.vertexAttribPointer(shaderProgramRhombiBlurPass.vertexPositionAttribute, screenFillingVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, screenFillingTextureCoordBuffer);
    gl.vertexAttribPointer(shaderProgramRhombiBlurPass.textureCoordAttribute, screenFillingTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

    var invViewDimensions_x = 1.0 / 789.0;
    var invViewDimensions_y = 1.0 / 643.0;

    gl.uniform2f(shaderProgramRhombiBlurPass.invViewCoordinatesUniform, invViewDimensions_x, invViewDimensions_y);
    gl.uniform1f(shaderProgramRhombiBlurPass.angleUniform, 0.0);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, textureVerticalBlurBuffer);
    gl.uniform1i(shaderProgramRhombiBlurPass.samplerVerticalBlurUniform, 0);

    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, textureDiagonalBlurBuffer);
    gl.uniform1i(shaderProgramRhombiBlurPass.samplerDiagonalBlurUniform, 1);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, screenFillingIndexBuffer);
    gl.drawElements(gl.TRIANGLES, screenFillingIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
}