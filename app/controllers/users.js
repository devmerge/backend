define(['config/db', 'fb'],
function (mongo, FB) {

	var Actions = {};

	Actions.create = function (req, res, next) {
		var accessToken = req.body.accessToken || null,
		userID = req.body.userID || null,
		user = {};

		if (!accessToken) {
			return false;
		}

		mongo.collection('users').findOne({id: userID}, function (err, model) {
			if (err) {
				console.log('error');
				return false;
			}

			user = model;

			FB.setAccessToken(accessToken);

			// TODO Should be getting access to user's (organizer's)
			// events and pages-events
			FB.api('', 'post', {
				batch: [
					{ method: 'get', relative_url: 'me' }
					// { method: 'get', relative_url: 'me/posts' },
					// { method: 'get', relative_url: 'me/checkins' }
				]
			}, function (data) {
				var me, events, music;

				if (!data || data.error) {
					console.log(!data ? 'error occurred' : data.error);
					return;
				}

				me = JSON.parse(data[0].body);

				user = me;
				user.facebook = me;

				user.accessToken = accessToken;

				console.log(user);

/*
				mongo.collection('users').update(
					{ id: user.id },
					user,
					{ upsert: true },
					function (err, order) {
						if (err) {
							res.send({'status': {
								'msg':'error'
							}});
							return false;
						} else {
							console.log('Inserted:', mongoOrder.id, ++o.counter);
							res.send({'status': {
								'msg':'success'
							}});
						}
					}
				);

*/
				return true;
			});

		});
	}

	Actions.login = function (req, res) {
		var accessToken = req.body.accessToken || null,
		userID = req.body.userID || null,
		user = {};

		if (!accessToken) {
			res.send(401, {'status': {
				'msg':'error'
			}});
			return false;
		}

		if (req.session.signedIn) {
			console.log(req.session);
			res.send({
				'status': {'msg':'success'}
			});
		} else {
			Actions.create(req, res);
		}
	}


	return Actions;
});
