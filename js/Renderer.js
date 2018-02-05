
function renderScrFillTexture() {
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
    gl.bindTexture(gl.TEXTURE_2D, bokeh2DTexture);
    gl.uniform1i(shaderProgramScrFillTexturePass.samplerUniform, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, screenFillingIndexBuffer);
    gl.drawElements(gl.TRIANGLES, screenFillingIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
}