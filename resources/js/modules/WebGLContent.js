'use strict';

let geometry,
	material,
	mesh;

/**
 * This class is your starting point for WebGL development.
 * All ThreeJS initialisation and WebVR Stuff was handled for you.
 *
 * Access the camera and the scene through 'this.options'
 *
 */
class WebGLContent {

	constructor(options = {}) {
		this.options = options;
		this.initialize();
	}

	initialize() {
		this.createScene();
	}

	/**
	 * Called once on app-initialization (DOMContentLoaded).
	 * Use This to set up your scene.
	 */
	createScene() {
		geometry = new THREE.BoxGeometry(200, 200, 200);
		material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});

		mesh = new THREE.Mesh(geometry, material);

		this.options.scene.add(mesh);

		this.options.camera.position.z = 1000;
	}

	/**
	 * Called ech frame using requestAnimationFrame or vrDisplay.requestAnimationFrame (if available).
	 * Use this to animate your scene.
	 *
	 * @param time
	 */
	animateScene (time) {
		mesh.rotation.x += 0.01;
		mesh.rotation.y += 0.02;
	}

}
export default WebGLContent;