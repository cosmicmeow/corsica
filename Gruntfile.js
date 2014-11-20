module.exports = function(grunt) {
	grunt.initConfig({
		sass: {
			dist: {
				files: {
					'public/css/styles.css' : 'public/scss/_main.scss'
				}
			}
		},
		watch: {
			css: {
				files: '**/*.scss',
				tasks: ['sass']
			},

		},
		nodemon: {
		  dev: {
		    script: 'server.js'
		  }
		}
	});
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('default',['watch'],'nodemon');
};
