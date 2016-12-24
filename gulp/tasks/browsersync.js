module.exports = function(gulp, plugins, config) {
	return function() {
		plugins.browsersync.init(config.browsersync);
	};
};
