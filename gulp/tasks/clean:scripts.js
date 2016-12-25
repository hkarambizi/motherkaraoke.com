module.exports = function(gulp, plugins, config) {
	return function() {
		return plugins.del(config.scripts.appdest + '/scripts.min.js');
  };
};
