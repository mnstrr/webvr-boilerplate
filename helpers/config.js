/**
 * Configuration file
 */
var helperPath = 'helpers';
var srcPath = 'resources';

var config = module.exports;

config.options = {
	config: {
		// in this directory you can find your grunt config tasks
		src: helperPath + '/_grunt/*.js'
	},
	paths: {
		// tasks folder with gulp tasks
		// helpers folder with tasks
		helpers: helperPath,
		// resources folder with working files
		src: srcPath,
		// dev/working folder
		dev: '_output',
		// dist folder with minified and optimized files
		dist: '_dist/',
	},

	// define your ports for livereload
	ports: {
		app: 1337,
		livereload: 35729
	}
};
