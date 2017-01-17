'use strict';

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

		let room = new THREE.Mesh(
			new THREE.BoxGeometry( 6, 6, 6, 8, 8, 8 ),
			new THREE.MeshBasicMaterial( { color: 0x404040, wireframe: true } )
		);
		this.options.scene.add( room );

		let cube = new THREE.Mesh(
			new THREE.BoxGeometry( 1, 1,1),
			new THREE.MeshBasicMaterial( { color: 0x00ff00} )
		);
		this.options.scene.add( cube );



	}

	/**
	 * Called ech frame using requestAnimationFrame or vrDisplay.requestAnimationFrame (if available).
	 * Use this to animate your scene.
	 *
	 * @param time
	 */
	animateScene (time) {

	}

}
export default WebGLContent;