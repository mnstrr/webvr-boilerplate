import App from './app';
import Helpers from './helpers/helpers';
import ThreeInit from './modules/ThreeInit';
import VRInit from './modules/VRInit';
import WebGLContent from './modules/WebGLContent';
'use strict';

let renderer,
	effect,
	controls,
	scene,
	camera,
	vrDisplay,
	webGlContent;

/**
 * The Core class will handle the ThreeJS- and VR-Initialisation and save references to its created variables like renderer, scene, camera, ...
 * Further it handles the render-loop and calls the animateScene function in WebGLContent.js for you.
 *
 */
class Core {

	initialize(context) {

		console.log('App initialized with version ' + App.version);

		let threeInit = new ThreeInit({
			antialias: true,
			container: context.getElementById('canvasContainer')
		});

		renderer = threeInit.renderer;
		scene = threeInit.scene;
		camera = threeInit.camera;

		let vrInit = new VRInit({
			renderer: renderer,
			camera: camera,
		});

		vrDisplay = vrInit.vrDisplay;
		controls = vrInit.controls;
		effect = vrInit.effect;

		webGlContent = new WebGLContent({
			scene: scene,
			camera: camera
		});

		// listen to resize event and use reziseCanvas helper
		window.addEventListener('resize', function () {
			Helpers.resizeCanvas({
				camera: camera,
				renderer: renderer
			});
		}, false);

		// run animation loop
		this.renderWebGLApp();
	}

	/**
	 * Runs the render loop by using RAF: render function the render function either of the effect or the renderer and
	 * calling the animateScene function.
	 */
	renderWebGLApp() {

		// check for vrDisplay and use its RAF if available
		if (vrDisplay) {
			vrDisplay.requestAnimationFrame(this.renderWebGLApp.bind(this));
		}
		else {
			requestAnimationFrame(this.renderWebGLApp.bind(this));
		}

		// call the animation function of WebGlContent.js
		webGlContent.animateScene();

		// render the scene, either VReffect or renderer
		if (effect) {
			effect.render(scene, camera);
		}
		else {
			renderer.render(scene, camera);
		}

		// update the controls
		controls.update();
	}
}

// init the app after DOMContentLoaded event has fired
document.addEventListener("DOMContentLoaded", function () {
	console.log('DOMContentLoaded');
	let core = new Core();
	core.initialize(document);
});




