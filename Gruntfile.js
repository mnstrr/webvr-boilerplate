'use strict';

var config = require('./helpers/config');

module.exports = function (grunt) {

	// load only used tasks
	require('jit-grunt')(grunt);

	// measures the time each task takes
	require('time-grunt')(grunt);

	// Load grunt configurations automatically
	var configs = require('load-grunt-configs')(grunt, config.options);

	// Define the configuration for all the tasks
	grunt.initConfig(configs);

	/*
	 *	ADVANCED TASKS
	 */
	grunt.registerTask('server', [
		'browserify:dev',
		'sync:html',
		'sync:assets',
		'sass:dev',
		'postcss:dev',
		'connect:livereload',
		'watch'
	]);

	grunt.registerTask('build', [
		'clean:dev',
		'browserify:dist',
		'uglify',
		'sync:html',
		'sync:assets',
		'htmlmin',
		'sass:dev',
		'postcss:dist',
		'cssmin'
	]);

	grunt.registerTask('default', [
		'server'
	]);

	// alias serve by grunt convention
	grunt.registerTask('serve', [
		'server'
	]);
};