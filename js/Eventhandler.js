var currentlyPressedKeys = {};

function handleKeyDown(event) {
	console.log(event.keyCode);
	currentlyPressedKeys[event.keyCode] = true;
}

function handleKeyUp(event) {
	currentlyPressedKeys[event.keyCode] = false;
}

function handleKeys() {
	if (currentlyPressedKeys[81]) {
		if (CoC < 1.0) {
			CoC += 0.01;
		}
	}
	if (currentlyPressedKeys[65]) {
		if (CoC > 0.01) {
			CoC -= 0.01;
		}
	}

	if (currentlyPressedKeys[87]) {
		if (Angle < 6.2800) {
			Angle += 0.01;
		}
	}
	if (currentlyPressedKeys[83]) {
		if (Angle > 0.05) {
			Angle -= 0.01;
		}
	}
}