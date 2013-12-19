define(['everyauth', 'config/db'],
function(everyauth, mongo) {
	return function (app, config) {

		everyauth.facebook
			.appId(config.fb.appId)
			.appSecret(config.fb.appSecret)
			.findUserById(function (userId, callback) {
				mongo(function (err, db) {

				});
			})
			.findOrCreateUser	( function (session, accessToken, accessTokenExtra, fbUserMetadata) {
				fbusers[fbUserMetadata.id] = fbUserMetadata;
				return fbUserMetadata;
			})
			.redirectPath('/');

		everyauth.everymodule
			.findUserById(function (req, userId, callback) {
				console.log(arguments);
				callback(null, fbusers[userId]);
			})
			.logoutPath('/logout');
	};
});
