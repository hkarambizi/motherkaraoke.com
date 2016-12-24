module.exports = function(gulp, plugins, config) {
	return function() {
		return gulp.src(config.images.src)
    .pipe(plugins.imagemin({
      progressive: true,
      use: [plugins.pngquant({
        quality: '65-75'
      })]
    }))
		.pipe(gulp.dest(config.images.jekylldest))
    .pipe(gulp.dest(config.images.appdest));
  }
};
