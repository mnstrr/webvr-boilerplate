import App from '../app';
import Helpers from '../helpers/helpers';
import Device from '../helpers/enums';
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
				} else {
					console.warn("WebVR supported, but no VRDisplays found.");
				}
			});
			App.device = Device.NATIVE;
		} else if (App.isMobile) {
			App.device = Device.MOBILE;
		} else {
			console.warn("Your device does not support WebVR. See <a href='http://webvr.info'>webvr.info</a> for assistance.");
			App.device = Device.DESKTOP;
		}

		this.webVRInitialized();
	}

	/**
	 * Delegate setup methods depending on device type and resize after setup
	 *
	 */
	webVRInitialized() {
		switch (App.device) {
			case Device.NATIVE:
				this.setupNativeVR();
				break;
			case Device.MOBILE:
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
		effect = new THREE.StereoEffect(this.options.renderer);
		effect.setSize(window.innerWidth, window.innerHeight);

		// Cardboards eye seperation is 2.5 inch. Divide by 2 for per-eye view.
		effect.separation = 2.5 * 0.0254 / 2;

		// create device orientation controls for use with cardboard
		controls = new THREE.DeviceOrientationControls(this.options.camera);
	}

	/**
	 * Orbitcontrols as desktop fallback.
	 *
	 */
	setupDesktopFallback() {
		// show warn message if a queryselector is provided
		if(typeof App.config.WARN_MESSAGE == 'string') {
			let container = document.querySelector(App.config.WARN_MESSAGE);
			if(container) {
				container.classList.add("is-active");
			}
		}

		// create stereo effect as fake-vr
		if(App.config.FAKE_VR_EFFECT) {
			this.setupMobileVR();
		}

		// create orbitcontrols
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