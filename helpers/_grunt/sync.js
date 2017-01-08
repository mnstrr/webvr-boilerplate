module.exports = {
	html: {
		files: [
			// includes files within path and its sub-directories
			{
				cwd: '<%= paths.src %>',
				src: '**/*.html',
				dest: '<%= paths.dev %>/'
			}
		]
	},
	assets: {
		files: [
			// includes files within path and its sub-directories
			{
				cwd: '<%= paths.src %>/assets',
				src: [
					'**/{,*/}*',
					'!img/**/icons/**'
				],
				dest: '<%= paths.dev %>'
			}
		]
	},
	libs: {
		files: [
			{
				cwd: '<%= paths.packages %>',
				src: [
					'three/build/three.min.js',
					'three/examples/js/effects/VREffect.js',
					'three/examples/js/effects/StereoEffect.js',
					'three/examples/js/controls/OrbitControls.js',
					'three/examples/js/controls/DeviceOrientationControls.js'
				],
				dest: '<%= paths.dev %>/js/'
			}

		]
	}
};