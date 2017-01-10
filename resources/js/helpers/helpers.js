let Helpers = {};

Helpers.resizeCanvas = function (options = {}) {
	options.camera.aspect = window.innerWidth / window.innerHeight;
	options.camera.updateProjectionMatrix();

	options.renderer.setSize(window.innerWidth, window.innerHeight);
};

Helpers.addClass = function (selector, classname) {
	let container = document.querySelector(selector);
	if (container) {
		container.classList.add(classname);
	}
};

Helpers.toggleFullScreen = function (elem) {
	if ((document.fullScreenElement !== undefined && document.fullScreenElement === null)
		|| (document.msFullscreenElement !== undefined && document.msFullscreenElement === null)
		|| (document.mozFullScreen !== undefined && !document.mozFullScreen)
		|| (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen)) {
		if (elem.requestFullScreen) {
			elem.requestFullScreen();
		} else if (elem.mozRequestFullScreen) {
			elem.mozRequestFullScreen();
		} else if (elem.webkitRequestFullScreen) {
			elem.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
		} else if (elem.msRequestFullscreen) {
			elem.msRequestFullscreen();
		}
	} else {
		if (document.cancelFullScreen) {
			document.cancelFullScreen();
		} else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		} else if (document.webkitCancelFullScreen) {
			document.webkitCancelFullScreen();
		} else if (document.msExitFullscreen) {
			document.msExitFullscreen();
		}
	}
};

export default Helpers;