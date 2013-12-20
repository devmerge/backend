define(['underscore', 'config/db', 'fb'],
function (_, mongo, FB) {

	var Actions = {};

	Actions.create = function (req, res, next) {
		var fbAuthResponse = req.body;
		var accessToken = fbAuthResponse.accessToken || null,
		userID = fbAuthResponse.userID || null,
		user = {};

		if (!accessToken) {
			return false;
		}

		mongo(function (err, db) {
			if (err) throw err;
			db.collection('users').findOne({id: userID}, function (err, model) {
				if (err) throw err;

				FB.setAccessToken(accessToken);
				var extendToken = "https://graph.facebook.com/oauth/access_token?" +
					"client_id=APP_ID&" +
					"client_secret=APP_SECRET&" +
					"grant_type=fb_exchange_token&" +
					"fb_exchange_token=EXISTING_ACCESS_TOKEN";

				FB.api('', 'post', {
					batch: [
						{ method: 'get', relative_url: 'me' }
						// { method: 'get', relative_url: 'me/posts' },
						// { method: 'get', relative_url: 'me/checkins' }
					]
				}, function (data) {
					var me, posts;

					if (!data || data.error) {
						console.log(!data ? 'error occurred' : data.error);
						res.send(500);
						return;
					}

					me = JSON.parse(data[0].body);

					user = _.extend((model || {}), me);
					user.accessToken = accessToken;

					db.collection('users').update(
						{ id: user.id },
						user,
						{ upsert: true },
						function (err, qty) {
							if (err) {
								throw err;
								res.send(500);
								return false;
							} else {
								console.log('Inserted:', user);
								res.send({
									"msg": "success"
								});
							}
						}
					);

					return true;
				});

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
