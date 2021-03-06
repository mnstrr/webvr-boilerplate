import App from '../app';
'use strict';

let renderer,
	scene,
	camera;

/**
 * This class will initialize ThreeJS with a renderer, scene and a camera.
 * These values can later be accessed within the WebGLContent.
 *
 */
class ThreeInit {

	constructor(options = {}) {
		this.options = options;
		this.initialize();
	}

	/**
	 *  Create renderer, scene and camera
	 */
	initialize() {
		//create new renderer used throughout the app
		renderer = new THREE.WebGLRenderer({antialias: App.config.ANTIALIAS});
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(window.innerWidth, window.innerHeight);

		// append the canvas either to the provided container, or document body
		if (this.options.container) {
			this.options.container.appendChild(renderer.domElement);
		} else {
			document.body.appendChild(renderer.domElement);
		}

		// create a new three scene
		scene = new THREE.Scene();

		// create and add camera to the scene
		camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 10);
		scene.add(camera);

		// default camera position. will be overwritten/ignored if there are valid VRDevices. Use this as desktop fallback
		camera.position.z = .001;

		//show crosshair if selected
		if (App.config.SHOW_CROSSHAIR) {
			this.showChrosshair();
		}
	}

	/**
	 * Adds a simple crosshair to the scene
	 */
	showChrosshair() {
		let crosshair = new THREE.Mesh(
			new THREE.RingGeometry(0.001, 0.002, 32),
			new THREE.MeshBasicMaterial({
				color: 0xffffff,
				opacity: 0.5,
				transparent: true
			})
		);
		crosshair.position.z = -0.15;
		camera.add(crosshair);
	}


	/**
	 * Getter
	 *
	 * @returns {*}
	 */
	get renderer() {
		return renderer;
	}

	get scene() {
		return scene;
	}

	get camera() {
		return camera;
	}
}
export default ThreeInit;