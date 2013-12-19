define([
	'express', 'config/config.js',
	'everyauth', 'utils/utils.js', 'cors'
], function(
	express, config, everyauth, utils, cors
) {
	return function (app, config) {

		app.set('showStackError', true);

		app.configure(function () {
			app.use(express.favicon());
			app.use(express.bodyParser());
			app.use(express.methodOverride());
			app.use(express.cookieParser('super12secret92'));
			app.use(express.session());

			// app.use(everyauth.middleware());

			app.use(cors(utils.corsOptionsDelegate));
			app.use(app.router);


			app.use(express.static(config.dirname + '/static/frontend/source/'));
			// app.engine('html', hbs.__express);
			// app.set('view engine', 'html');
			// app.set("view options", { layout: false });
			// app.set('views', config.dirname + '/app/views/');


			app.use(function(err, req, res, next){
				// treat as 404
				if (err.message
					&& (~err.message.indexOf('not found')
					|| (~err.message.indexOf('Cast to ObjectId failed')))) {
					return next()
				}
				res.status(500).send('500', { error: err.stack })
			});

			app.use(function(req, res, next) {
				res.status(404).render('404', {
					url: req.originalUrl,
					error: 'Not found'
				})
			});

		});

	};
});
