define(['underscore', 'config/config', 'config/db', 'fb', 'request'],
function (_, config, mongo, FB, request) {

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

				var extendToken = "https://graph.facebook.com/oauth/access_token?" +
					"client_id=" + config.fb.appId +
					"&client_secret=" + config.fb.appSecret +
					"&grant_type=fb_exchange_token" +
					"&fb_exchange_token=" + accessToken;

				request(extendToken, function (err, response, body) {
					// Getting extended token
					var data = body.split("&"), result = {};
					for (var i=0; i < data.length; i++) {
						var item = data[i].split("=");
						result[item[0]] = item[1];
					}
					var extendedAccessToken = result.access_token;

					FB.setAccessToken(extendedAccessToken);
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
						user.accessToken = extendedAccessToken;

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
		});
	}

	return Actions;
});
