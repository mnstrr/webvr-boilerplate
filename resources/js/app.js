export default (function () {
	'use strict';

	// reference to main App object
	let App = {};

	// Version
	App.version = "0.0.1";

	// Configuration
	App.config = {

		SHOW_STATS: false, // show performance stats (0: fps, 1: ms, 2: mb,  default: false)
		ANTIALIAS: true, // use antialias for rendering (default: false)
		FULLSCREEN_OPTION: '#vr-fullscreen', // provide queryselector to show fullscreen button. click is handled from internal js (default: undefined)
		WARN_MESSAGE: '#vr-warning', // provide dom queryselector to show warnmessage for unsupported devices (default: undefined)
		FAKE_VR_CONTROLS: false, // fakes vr-controls as click&drag to move (default: false)
		FAKE_VR_EFFECT: true, // fakes vr-effect as three stereo-effect (default: false)

	};




	/**
	 *
	 * POLYFILLS
	 *
	 */

	// Provides requestAnimationFrame in a cross browser way.
	// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
	if (!window.requestAnimationFrame) {
		window.requestAnimationFrame = (function () {
			return window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				window.oRequestAnimationFrame ||
				window.msRequestAnimationFrame ||
				function (callback,element) {
					window.setTimeout(callback, 1000 / 60);
				};
		})();
	}

	// detect mobile device
	App.isMobile = /Android/i.test(navigator.userAgent) || /iPhone|iPad|iPod/i.test(navigator.userAgent);

	if (document.location.search.indexOf('devmode') > -1) {
		App.devmode = true;
	}

	// hide all warnings and logs if not in devmode
	if (!App.devmode) {
		console.log = console.warn = function () {
		};
	}


	return App;
}).call(this);