'use strict';

let crosshair,
	room;

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


		room = new THREE.Mesh(
			new THREE.BoxGeometry( 6, 6, 6, 8, 8, 8 ),
			new THREE.MeshBasicMaterial( { color: 0x404040, wireframe: true } )
		);
		this.options.scene.add( room );
	}

	/**
	 * Called ech frame using requestAnimationFrame or vrDisplay.requestAnimationFrame (if available).
	 * Use this to animate your scene.
	 *
	 * @param time
	 */
	animateScene (time) {
		//mesh.rotation.x += 0.01;
		//mesh.rotation.y += 0.02;
	}

}
export default WebGLContent;