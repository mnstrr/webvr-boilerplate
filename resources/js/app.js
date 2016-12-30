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

	return App;
}).call(this);