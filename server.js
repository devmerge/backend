#!/bin/env node

var requirejs = require('requirejs');
requirejs.config({
	// Pass the top-level main.js/index.js require
	// function to requirejs so that node modules
	// are loaded relative to the top-level JS file.
	nodeRequire: require
});


requirejs([
	'config/config.js', 'express', 'fs'
], function(config, express, fs) {

	var app = express();
	config.dirname = __dirname;

	var models_path = __dirname + '/app/models';
	fs.readdirSync(models_path).forEach(function (file) {
		if (~file.indexOf('.js')) {
			requirejs(models_path + '/' + file);
		}
	});

	requirejs('config/everyauth')(app, config);
	requirejs('config/express')(app, config);
	requirejs('config/router')(app, config);

	app.listen(
		config.server.port,
		config.server.ip,
		function() {
			console.log('%s: Node server started on %s:%d ...',
				Date(Date.now()), config.server.ip, config.server.port
			);
		}
	);

	return app;
});

requirejs(['app/jobs/_jobs.js'], function (jobs) {
	jobs.run();
});
