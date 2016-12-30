module.exports = {
	options: {
		spawn: false
	},
	livereload: {
		options: {
			livereload: '<%= connect.options.livereload %>'
		},
		files: [
			'<%= paths.dev %>/{,*/}*.html',
			'<%= paths.dev %>/css/{,*/}*.css',
			'<%= paths.dev %>/js/{,*/}*.js',
			'<%= paths.dev %>/img/**/*.{jpg,png}'
		]
	},
	scss: {
		files: '<%= paths.src %>/scss/**/*',
		tasks: ['sass:dev', 'postcss:dev'],
	},
	html: {
		files: '<%= paths.src %>/**/*.html',
		tasks: ['sync:html'],
	}
};