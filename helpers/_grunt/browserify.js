module.exports = {
	options: {
		transform: [
			[
				"babelify", {
				"presets": ["es2015"]
			}
			]
		]
	},
	dev: {
		options: {
			browserifyOptions: {
				debug: true
			},
			watch: true
		},
		files: {
			'<%= paths.dev %>/js/main.js': '<%= paths.src %>/js/main.js'
		}
	},
	dist: {
		files: {
			'<%= paths.dev %>/js/main.js': '<%= paths.src %>/js/main.js'
		}
	}
};