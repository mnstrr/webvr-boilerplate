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
	}
};