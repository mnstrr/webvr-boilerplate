export default (function () {
	'use strict';


	//Helpers
	let extend = function extend(obj) {
		[].slice.call(arguments, 1).forEach((item) => {
			for (let key in item) obj[key] = item[key];
		});
		return obj;
	};


	// Save a reference to the global object
	let root = window;

	// @borrow objects
	let App = root.App = extend(window.App || {});

	// Versioning
	App.version = "0.0.1";


	return App;

}).call(this);