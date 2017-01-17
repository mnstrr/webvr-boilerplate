'use strict';

let clock,
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

		//THIS IS A DEMO SCENE. REPLACE THIS WITH YOUR CONTENT!
		//heavily ispired from https://threejs.org/examples/#webvr_cubes
		clock = new THREE.Clock();


		room = new THREE.Mesh(
			new THREE.BoxGeometry(6, 6, 6, 8, 8, 8),
			new THREE.MeshBasicMaterial({color: 0x404040, wireframe: true})
		);
		this.options.scene.add(room);


		this.options.scene.add(new THREE.HemisphereLight(0x606060, 0x404040));
		var light = new THREE.DirectionalLight(0xffffff);
		light.position.set(1, 1, 1).normalize();
		this.options.scene.add(light);

		var geometry = new THREE.BoxGeometry(0.15, 0.15, 0.15);
		for (var i = 0; i < 150; i++) {
			var object = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({color: Math.random() * 0xffffff}));
			object.position.x = Math.random() * 4 - 2;
			object.position.y = Math.random() * 4 - 2;
			object.position.z = Math.random() * 4 - 2;
			object.rotation.x = Math.random() * 2 * Math.PI;
			object.rotation.y = Math.random() * 2 * Math.PI;
			object.rotation.z = Math.random() * 2 * Math.PI;
			object.scale.x = Math.random() + 0.5;
			object.scale.y = Math.random() + 0.5;
			object.scale.z = Math.random() + 0.5;
			object.userData.velocity = new THREE.Vector3();
			object.userData.velocity.x = Math.random() * 0.01 - 0.005;
			object.userData.velocity.y = Math.random() * 0.01 - 0.005;
			object.userData.velocity.z = Math.random() * 0.01 - 0.005;
			room.add(object);
		}
	}

	/**
	 * Called ech frame using requestAnimationFrame or vrDisplay.requestAnimationFrame (if available).
	 * Use this to animate your scene.
	 */
	animateScene() {

		let delta = clock.getDelta() * 60;
		for (var i = 0; i < room.children.length; i++) {
			let cube = room.children[i];
			cube.rotation.x += cube.userData.velocity.x * 2 * delta;
			cube.rotation.y += cube.userData.velocity.y * 2 * delta;
			cube.rotation.z += cube.userData.velocity.z * 2 * delta;
		}
	}

}
export default WebGLContent;