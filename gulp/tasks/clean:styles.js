module.exports = function(gulp, plugins, config) {
	return function() {
		return plugins.del([config.styles.jekylldest + 'styles.min.css']);
  };
};
