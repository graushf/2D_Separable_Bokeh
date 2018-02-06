var shaderProgramScrFillTexturePass;
var shaderProgramScenePass;
var shaderProgramDownsamplePass;
var shaderProgramVerticalBlurPass;
var shaderProgramDiagonalBlurPass;

function getShader(gl, id) {
	var shaderScript = document.getElementById(id);
	if (!shaderScript) {
		return null;
	}

	var str = "";
	var k = shaderScript.firstChild;
	while (k) {
		if (k.nodeType == 3) {
			str += k.textContent;
		}
		k = k.nextSibling;
	}

	var shader;
	if (shaderScript.type == "x-shader/x-fragment") {
		shader = gl.createShader(gl.FRAGMENT_SHADER);
	} else if (shaderScript.type = "x-shader/x-vertex") {
		shader = gl.createShader(gl.VERTEX_SHADER);
	} else {
		return null;
	}

	gl.shaderSource(shader, str);
	gl.compileShader(shader);

	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		alert(gl.getShaderInfoLog(shader));
		return null;
	}

	return shader;
}

function setupShaders2DSeparableBokeh() {
    initShadersScreenFillingTexturePass();
    initShadersScenePass();
    initShadersDownsamplePass();
    initShadersVerticalBlurPass();
    initShadersDiagonalBlurPass();
}

function initShadersScreenFillingTexturePass() {
    var fragmentShader = getShader(gl, "screenFillingTexture-fs");
    var vertexShader = getShader(gl, "screenFillingTexture-vs");

    shaderProgramScrFillTexturePass = gl.createProgram();
    gl.attachShader(shaderProgramScrFillTexturePass, vertexShader);
    gl.attachShader(shaderProgramScrFillTexturePass, fragmentShader);
    gl.linkProgram(shaderProgramScrFillTexturePass);

    if (!gl.getProgramParameter(shaderProgramScrFillTexturePass, gl.LINK_STATUS)) {
        alert("Could not initialise shaders");
    }
}

function initShadersScenePass() {
    var fragmentShader = getShader(gl, "scenePass-fs");
    var vertexShader = getShader(gl, "screenFillingTexture-vs");

    shaderProgramScenePass = gl.createProgram();
    gl.attachShader(shaderProgramScenePass, vertexShader);
    gl.attachShader(shaderProgramScenePass, fragmentShader);
    gl.linkProgram(shaderProgramScenePass);

    if (!gl.getProgramParameter(shaderProgramScenePass, gl.LINK_STATUS)) {
        alert("Could not initialise shaders");
    }

}

function initShadersDownsamplePass() {
    var fragmentShader = getShader(gl, "downsamplePass-fs");
    var vertexShader = getShader(gl, "screenFillingTexture-vs");

    shaderProgramDownsamplePass = gl.createProgram();
    gl.attachShader(shaderProgramDownsamplePass, vertexShader);
    gl.attachShader(shaderProgramDownsamplePass, fragmentShader);
    gl.linkProgram(shaderProgramDownsamplePass);

    if (!gl.getProgramParameter(shaderProgramDownsamplePass, gl.LINK_STATUS)) {
        alert("Could not initialise shaders");
    }
}

function initShadersVerticalBlurPass() {
    var fragmentShader = getShader(gl, "verticalBlurPass-fs");
    var vertexShader = getShader(gl, "screenFillingTexture-vs");

    shaderProgramVerticalBlurPass = gl.createProgram();
    gl.attachShader(shaderProgramVerticalBlurPass, vertexShader);
    gl.attachShader(shaderProgramVerticalBlurPass, fragmentShader);
    gl.linkProgram(shaderProgramVerticalBlurPass);

    if (!gl.getProgramParameter(shaderProgramVerticalBlurPass, gl.LINK_STATUS)) {
        alert("Could not initialise shaders");
    }
}

function initShadersDiagonalBlurPass() {
    var fragmentShader = getShader(gl, "diagonalBlurPass-fs") ;
    var vertexShader = getShader(gl, "screenFillingTexture-vs");

    shaderProgramDiagonalBlurPass = gl.createProgram();
    gl.attachShader(shaderProgramDiagonalBlurPass, vertexShader);
    gl.attachShader(shaderProgramDiagonalBlurPass, fragmentShader);
    gl.linkProgram(shaderProgramDiagonalBlurPass);

    if (!gl.getProgramParameter(shaderProgramDiagonalBlurPass, gl.LINK_STATUS)) {
        alert("Could not inialise shaders");
    }
}