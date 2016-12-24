module.exports = function(gulp, plugins, config) {
	return function() {
		return gulp.src(config.svg.src)
		.pipe(plugins.plumber())
    .pipe(plugins.svgSprite(config.svg.options))
    .on('error', function(error) {
    	console.log(error);
    })
    .pipe(gulp.dest(config.svg.jekylldest));
  }
};
