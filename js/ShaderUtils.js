var shaderProgramScrFillTexturePass;
var shaderProgramScenePass;
var shaderProgramDownsamplePass;
var shaderProgramVerticalBlurPass;
var shaderProgramDiagonalBlurPass;
var shaderProgramRhombiBlurPass;
var shaderProgramVerAndDiagBlurPass;

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
    initShadersRhombiBlurPass();
    initShadersVerAndDiagBlurPass();
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
    var vertexShader = getShader(gl, "verticalBlurPass-vs");

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

function initShadersRhombiBlurPass() {
    var fragmentShader = getShader(gl, "rhombiBlurPass-fs");
    var vertexShader = getShader(gl, "screenFillingTexture-vs");

    shaderProgramRhombiBlurPass = gl.createProgram();
    gl.attachShader(shaderProgramRhombiBlurPass, vertexShader);
    gl.attachShader(shaderProgramRhombiBlurPass, fragmentShader);
    gl.linkProgram(shaderProgramRhombiBlurPass);

    if (!gl.getProgramParameter(shaderProgramRhombiBlurPass, gl.LINK_STATUS)) {
        alert("Could not initialise shaders");
    }
}

function initShadersVerAndDiagBlurPass() {
    var fragmentShader = getShader(gl, "vertAndDiagBlurPass-fs");
    var vertexShader = getShader(gl, "screenFillingTexture-vs");

    shaderProgramVerAndDiagBlurPass = gl.createProgram();
    gl.attachShader(shaderProgramVerAndDiagBlurPass, vertexShader);
    gl.attachShader(shaderProgramVerAndDiagBlurPass, fragmentShader);
    gl.linkProgram(shaderProgramVerAndDiagBlurPass);

    if (!gl.getProgramParameter(shaderProgramVerAndDiagBlurPass, gl.LINK_STATUS)) {
        alert("Couldn not initialise shaders");
    }
}