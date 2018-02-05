function initScreenFillingBuffers() {
	screenFillingVertexPositionBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, screenFillingVertexPositionBuffer);
	vertices = [
         1.0,  1.0,  0.0,
        -1.0,  1.0,  0.0,
         1.0, -1.0,  0.0,
        -1.0, -1.0,  0.0
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    screenFillingVertexPositionBuffer.itemSize = 3;
    screenFillingVertexPositionBuffer.numItems = 4;

    screenFillingTextureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, screenFillingTextureCoordBuffer);
    var textureCoords = [
        1.0, 1.0,
        0.0, 1.0,
        1.0, 0.0,
        0.0, 0.0
    ];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
    screenFillingTextureCoordBuffer.itemSize = 2;
    screenFillingTextureCoordBuffer.numItems = 4;

    screenFillingIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, screenFillingIndexBuffer);
    var squareVertexIndices = [
        0, 1, 3,    0, 3, 2
    ];
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(squareVertexIndices), gl.STATIC_DRAW);
    screenFillingIndexBuffer.itemSize = 1;
    screenFillingIndexBuffer.numItems = 6;
}