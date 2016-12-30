module.exports = {
	dist: {
		options: {
			removeComments: true,
			collapseWhitespace: true
		},
		files: {
			'<%= paths.dev %>/index.html': '<%= paths.dev %>/index.html'
		}
	},
};