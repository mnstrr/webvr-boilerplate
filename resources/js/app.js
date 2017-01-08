export default (function () {
	'use strict';

	// reference to main App object
	let App = {};

	// Version
	App.version = "0.0.1";

	if (document.location.search.indexOf('devmode') > -1) {
		App.devmode = true;
	}

	// hide all warnings and logs if not in devmode
	if (!App.devmode) {
		console.log = console.warn = function () {
		};
	}


	/**
	 *
	 * POLYFILLS
	 *
	 */


	/**
	 * Provides requestAnimationFrame in a cross browser way.
	 * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
	 */
	if (!window.requestAnimationFrame) {

		window.requestAnimationFrame = (function () {

			return window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				window.oRequestAnimationFrame ||
				window.msRequestAnimationFrame ||
				function (/* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {

					window.setTimeout(callback, 1000 / 60);

				};

		})();

	}

	App.isMobile = /Android/i.test(navigator.userAgent) || /iPhone|iPad|iPod/i.test(navigator.userAgent);


	return App;
}).call(this);