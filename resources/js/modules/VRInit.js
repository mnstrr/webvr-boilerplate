import App from '../app';
import Helpers from '../helpers/helpers';
'use strict';

let vrDisplay,
	effect,
	controls;

/**
 * This class determines whether the client is able to show VR-content (VR-displays or mobile) and cares about the right
 * effect and controls initialization.
 *
 * Constructor expects an options object with the renderer, camera and a dom object for fullscreen button (optional)
 *
 */
class VRInit {

	constructor(options = {}) {
		this.options = options;
		this.initialize();
	}

	/**
	 * Check for type of device and call according init method
	 *
	 */
	initialize() {

		if (navigator.getVRDisplays) {
			navigator.getVRDisplays().then(function (displays) {
				if (displays.length > 0) {
					vrDisplay = displays[0];
					this.webVRInitialized('native');
				} else {
					console.log("WebVR supported, but no VRDisplays found.");
				}
			});
		} else if (navigator.getVRDevices) {
			console.warn("Your device does not support the latest version of WebVR");
		} else if (App.isMobile) {
			this.webVRInitialized('mobile');
		} else {
			console.warn("Your device does not support WebVR.");
			this.webVRInitialized();
		}
	}

	/**
	 * Delegate setup methods depending on device type and resize after setup
	 *
	 * @param vrDevice
	 */
	webVRInitialized(vrDevice) {

		switch (vrDevice) {
			case 'native':
				this.setupNativeVR();
				break;
			case 'mobile':
				this.setupMobileVR();
				break;
			default:
				this.setupDesktopFallback();
		}

		// resize after new effect init
		Helpers.resizeCanvas({
			camera: this.options.camera,
			renderer: this.options.renderer
		});
	}

	/**
	 * Setup effect and controller for native VR devices (oculus,vive).
	 *
	 */
	setupNativeVR() {
		// create the VR-effect for oculus/vive
		effect = new THREE.VREffect(this.options.renderer, function (err) {
			if (err) {
				console.log("Error creating VREffect: ", err);
			}
			else {
				console.log("Created VREffect: ", effect);
			}
		});

		// create the VR-controls for oculus/vive
		controls = new THREE.VRControls(camera, function (err) {
			if (err) {
				console.log("Error creating VRControls: ", err);
			}
			else {
				console.log("Created VRControls: ", controls);
			}
		});

		//TODO: handle fullscreen button click
	}

	/**
	 * Setup effect and controller for mobile / carboard VR devices
	 *
	 */
	setupMobileVR() {
		//TODO: start cardboard effect and controls
	}

	/**
	 * Orbitcontrols as desktop fallback. No effect needed
	 *
	 */
	setupDesktopFallback() {
		controls = new THREE.OrbitControls(this.options.camera, this.options.renderer.domElement);
	}


	/**
	 * Getter
	 *
	 * @returns {*}
	 */
	get vrDisplay() {
		return vrDisplay;
	}

	get effect() {
		return effect;
	}

	get controls() {
		return controls;
	}
}
export default VRInit;