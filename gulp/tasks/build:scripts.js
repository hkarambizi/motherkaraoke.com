module.exports = function(gulp, plugins, config) {
	// https://github.com/gulpjs/gulp/blob/master/docs/recipes/browserify-uglify-sourcemap.md
	return function() {
		// set up the browserify instance on a task basis
		var b = plugins.browserify({
			entries: './_assets/scripts/main.js',
			debug: true
		});

		return b.bundle()
		  .pipe(plugins.stream('scripts.min.js'))
		  .pipe(plugins.buffer())
		  //.pipe(plugins.sourcemaps.init({loadMaps: true}))
		  // add transformation tasks to the pipeline here
		  .pipe(plugins.uglify())
			//.pipe to './assets' and './_site/assets'
			.pipe(gulp.dest(config.styles.appdest))
			.pipe(gulp.dest(config.styles.jekylldest));
	}
};
