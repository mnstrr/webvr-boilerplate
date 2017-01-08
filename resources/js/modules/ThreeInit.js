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
		renderer = new THREE.WebGLRenderer({antialias: this.options.antialias});

		// append the canvas either to the provided container, or document body
		if (this.options.container) {
			this.options.container.appendChild(renderer.domElement);
		} else {
			document.body.appendChild(renderer.domElement);
		}

		// create a new three scene
		scene = new THREE.Scene();

		// create and add camera to the scene
		camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.01, 4000);
		scene.add(camera);

		// default camera position. will be overwritten/ignored if there are valid VRDevices. Use this as desktop fallback
		camera.position.z = .001;
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