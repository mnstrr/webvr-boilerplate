import App from "./app";
import Helpers from "./helpers/helpers";
import ThreeInit from "./modules/ThreeInit";
import VRInit from "./modules/VRInit";
import WebGLContent from "./modules/WebGLContent";
import Stats from "stats.js";
import Device from "./helpers/enums";
'use strict';

let renderer,
	effect,
	controls,
	scene,
	camera,
	vrDisplay,
	webGlContent;

const stats = new Stats();

/**
 * The Core class will handle the ThreeJS- and VR-Initialisation and save references to its created variables like renderer, scene, camera, ...
 * Further it handles the render-loop and calls the animateScene function in WebGLContent.js for you.
 *
 */
class Core {

	initialize(context) {
		console.log('App initialized with version ' + App.version);

		// show stats for performance monitoring
		if (typeof App.config.SHOW_STATS != 'undefined') {
			stats.showPanel(App.config.SHOW_STATS); // 0: fps, 1: ms, 2: mb, 3+: custom
			document.body.appendChild(stats.dom);
		}

		// init threeJS
		let threeInit = new ThreeInit({
			container: context.getElementById('canvasContainer')
		});

		renderer = threeInit.renderer;
		scene = threeInit.scene;
		camera = threeInit.camera;

		// init VR effects and controls
		let vrInit = new VRInit({
			renderer: renderer,
			camera: camera,
			scene: scene
		});

		vrDisplay = vrInit.vrDisplay;
		controls = vrInit.controls;
		effect = vrInit.effect;

		// init custom webgl content
		webGlContent = new WebGLContent({
			scene: scene,
			camera: camera
		});

		// listen to resize event and use reziseCanvas helper
		window.addEventListener('resize', function () {
			Helpers.resizeCanvas({
				camera: camera,
				renderer: renderer,
				effect: effect
			});
		}, false);

		this.handleButtons();

		// run animation loop
		this.renderWebGLApp();
	}

	/**
	 * Method to set up event listeners to buttons, if provided in config
	 */
	handleButtons() {
		let fullScreenBtn,
			vrModeBtn;

		// activate fullscreen and vrmode button and store reference of dom element
		// add eventlisteners if dom element is found
		if (typeof App.config.FULLSCREEN_OPTION == 'string') {
			fullScreenBtn = Helpers.addClass(App.config.FULLSCREEN_OPTION, 'is-active');
			if (fullScreenBtn) {
				fullScreenBtn.addEventListener('click', handleFullscreen.bind(this));
			}
		}
		if (typeof App.config.VRMODE_OPTION == 'string') {
			vrModeBtn = Helpers.addClass(App.config.VRMODE_OPTION, 'is-active');
			if (vrModeBtn) {
				vrModeBtn.addEventListener('click', handleVrMode.bind(this));
			}
		}

		//handle fullscreen action
		function handleFullscreen() {
			Helpers.toggleFullScreen(document.body);

			Helpers.resizeCanvas({
				camera: camera,
				renderer: renderer,
				effect: effect
			});
		}

		//handle vrmode action
		function handleVrMode() {
			//TODO: handle disable

			switch(App.device) {
				case Device.NATIVE:
					effect.setFullScreen(true);
					break;
				case Device.MOBILE:
					effect = new THREE.StereoEffect(renderer);
					effect.setSize(window.innerWidth, window.innerHeight);
					// Cardboards eye seperation is 2.5 inch. Divide by 2 for per-eye view.
					effect.separation = 2.5 * 0.0254 / 2;
					handleFullscreen();
					break;
				default:
					break;
			}

			Helpers.resizeCanvas({
				camera: camera,
				renderer: renderer,
				effect: effect
			});
		}
	}

	/**
	 * Runs the render loop by using RAF: render function the render function either of the effect or the renderer and
	 * calling the animateScene function.
	 */
	renderWebGLApp() {

		// stats call before rendering
		stats.begin();

		// call the animation function of WebGlContent.js
		webGlContent.animateScene();

		// update the controls
		controls.update();

		// render the scene, either with VReffect or renderer
		if (effect) {
			effect.render(scene, camera);
		}
		else {
			renderer.render(scene, camera);
		}

		// stats call after rendering
		stats.end();

		// check for vrDisplay and use its RAF if available
		if (vrDisplay) {
			vrDisplay.requestAnimationFrame(this.renderWebGLApp.bind(this));
		}
		else {
			requestAnimationFrame(this.renderWebGLApp.bind(this));
		}
	}
}

// init the app after DOMContentLoaded event has fired
document.addEventListener("DOMContentLoaded", function () {
	console.log('DOMContentLoaded');
	let core = new Core();
	core.initialize(document);
});




