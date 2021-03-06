define([
	'underscore', 'everyauth', 'cors',
	'app/controllers/users',
	'app/controllers/checkins',
], function (
	_, everyauth, cors,
	Users,
	Checkins
) {
	return function (app, config) {

		app

		.get('/', function(req, res) {
			res.send(200);
		})
		.post('/users', Users.create)
		.get('/checkins', Checkins.list)




		.all('*', function (req, res) {
			res.send(404);
		})
	};
});
