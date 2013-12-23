define([
	'underscore', 'config/config', 'config/db', 'fb', 'async', 'moment'
], function (
	_, conf, mongo, FB, async, moment
) {
	var Private = {}, Actions = {};

	Actions.run = function (options) {
		mongo(function (err, db) {
			if (err) throw err;
			db.collection('posts').ensureIndex({created_time: 1}, function (err) {
				if (err) throw err;
			});

			db.collection('users').find().toArray(function (err, users) {
				_.each(users, function (user) {

					if (!user.accessToken) return;

					var fb = FB;
					fb.setAccessToken(user.accessToken);
					fb.api('/me/posts', function (data) {
						if (data.error) return;

						var posts = _.filter(data.data, function (post) {
							return (!!post.message &&
								post.message.indexOf('#devmerge') != -1 &&
								!!post.place);
						});

						_.each(posts, function (post) {
							db.collection('posts').update(
								{ id: post.id },
								post,
								{ upsert: true },
								function (err, qty) {
									if (err) {
										throw err;
										return false;
									} else {
										console.log('Inserted:', qty);
									}
								}
							);
						});

					});
				});
			});
		});


	}

	return Actions;
});

