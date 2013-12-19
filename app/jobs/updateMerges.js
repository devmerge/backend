define([
	'underscore', 'config/config', 'config/db', 'fb', 'async', 'moment'
], function (
	_, conf, mongo, FB, async, moment
) {
	var Private = {}, Actions = {};

	Actions.run = function (options) {
		mongo(function (err, db) {
			if (err) throw err;
			db.collection('users').find().toArray(function (err, users) {
				_.each(users, function (user) {
					console.log(user);

					if (!user.accessToken) return;

					var fb = FB;
					fb.setAccessToken(user.accessToken);
					fb.api('/me/posts', function (err, data) {
						console.log(data);
						// filter out only with message contains #devmerge
					});
				});
			});
		});


	}

	return Actions;
});

