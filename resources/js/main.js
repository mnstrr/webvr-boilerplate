import App from "./app";
import Helpers from "./helpers/helpers";
import ThreeInit from "./modules/ThreeInit";
import VRInit from "./modules/VRInit";
import WebGLContent from "./modules/WebGLContent";
import Stats from "stats.js";
import {Device, Mode} from "./helpers/enums";

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

	//TODO: include gamepad api

	initialize(context) {
		console.log('App initialized with version ' + App.version);
		App.Mode = Mode.NORMAL;

		// show stats for performance monitoring
		if (typeof App.config.SHOW_STATS != 'undefined') {
			stats.showPanel(App.config.SHOW_STATS); // 0: fps, 1: ms, 2: mb, 3+: custom
			document.body.appendChild(stats.dom);
		}

		// init threeJS
		let threeInit = new ThreeInit({
			container: context.getElementById('canvasContainer') //TODO: move this to config
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
			camera: camera,
			vrDisplay: vrDisplay
		});

		// listen to resize event and use reziseCanvas helper
		window.addEventListener('resize', function () {
			Helpers.resizeCanvas({
				camera: camera,
				renderer: renderer,
				effect: effect
			});
		}, false);

		//set eventlisteners for buttons
		this.handleButtons();

		// run animation loop
		this.renderLoop();
	}

	/**
	 * Runs the render loop by using RAF: updates controls, calls animateScene from WebGLContent class and renders the scene
	 * @param time
	 */
	renderLoop(time) {

		// check for vrDisplay and use its RAF if available
		if (vrDisplay) {
			vrDisplay.requestAnimationFrame(this.renderLoop.bind(this));
		}
		else {
			window.requestAnimationFrame(this.renderLoop.bind(this));
		}

		// stats call before rendering
		stats.begin();

		// call the animation function of WebGlContent.js
		webGlContent.animateScene(time);

		// update the controls
		if (controls) {
			controls.update();
		}

		// render the scene, either with VReffect or renderer
		if (effect) {
			effect.render(scene, camera);
		}
		else {
			renderer.render(scene, camera);
		}

		// stats call after rendering
		stats.end();

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
			// decide which mode should be started depending on device and actual mode;
			switch (App.device) {
				case Device.NATIVE:
					if (App.Mode === Mode.NORMAL) {
						//this handles requestPresent() of the HMD
						effect.setFullScreen(true);
						App.Mode = Mode.VRMODE;
					} else {
						//this handles exitPresent() of HMD
						effect.setFullScreen(false);
						App.Mode = Mode.NORMAL;
					}
					break;
				case Device.MOBILE:
					if (App.Mode === Mode.NORMAL) {
						effect = new THREE.StereoEffect(renderer);
						effect.setSize(window.innerWidth, window.innerHeight);
						// Cardboards eye seperation is 2.5 inch. Divide by 2 for per-eye view.
						effect.separation = 2.5 * 0.0254 / 2;
						Helpers.toggleFullScreen(document.body);
					} else {
						Helpers.toggleFullScreen(document.body);
						effect = undefined;
					}
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

		// listen to escape key in native vr mode
		window.addEventListener("keyup", function (event) {
			if (event.keyCode === 27 && App.device === Device.NATIVE && App.Mode === Mode.VRMODE) {
				effect.setFullScreen(false);
				App.Mode = Mode.NORMAL;

				Helpers.resizeCanvas({
					camera: camera,
					renderer: renderer,
					effect: effect
				});
			}
		});

		// listen to fullscreenchange and change App mode accordingly
		//TODO: Polyfill for fullscreenchange
		document.onwebkitfullscreenchange = function () {
			App.Mode = (App.Mode === Mode.NORMAL) ? Mode.FULLSCREEN : Mode.NORMAL;

			if (App.Mode === Mode.NORMAL && App.device === Device.MOBILE) {
				effect = undefined;
			}
		}
	}
}

// init the app after DOMContentLoaded event has fired
document.addEventListener("DOMContentLoaded", function () {
	console.log('DOMContentLoaded');
	let core = new Core();
	core.initialize(document);
});




