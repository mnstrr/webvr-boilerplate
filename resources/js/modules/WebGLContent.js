'use strict';

let geometry,
	material,
	mesh;

/**
 * This class is your starting point for WebGL development.
 * All ThreeJS initialisation and WebVR Stuff was handled for you.
 *
 * The animateScene function is called every frame from main.js.
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

	createScene() {
		geometry = new THREE.BoxGeometry(200, 200, 200);
		material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});

		mesh = new THREE.Mesh(geometry, material);

		this.options.scene.add(mesh);

		this.options.camera.position.z = 1000;
	}


	animateScene (time) {
		mesh.rotation.x += 0.01;
		mesh.rotation.y += 0.02;
	}

}
export default WebGLContent;