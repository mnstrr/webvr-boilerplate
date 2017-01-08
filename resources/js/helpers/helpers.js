let Helpers = {};

Helpers.resizeCanvas = function (options = {}) {
	options.camera.aspect = window.innerWidth / window.innerHeight;
	options.camera.updateProjectionMatrix();

	options.renderer.setSize(window.innerWidth, window.innerHeight);
};

export default Helpers;