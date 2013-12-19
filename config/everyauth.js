define(['everyauth', 'mongoose'],
function(everyauth, mongoose) {
	return function (app, config) {

		var account = mongoose.model('Account');

		everyauth.facebook
			.appId(config.fb.appId)
			.appSecret(config.fb.appSecret)
			.findUserById(function (userId, callback) {
				console.log(userId, callback);
				account.findOne({_id: id}, function (err, user) {
					callback(user);
				})
			})
			.findOrCreateUser	( function (session, accessToken, accessTokenExtra, fbUserMetadata) {
				if (fbUserMetadata.id === 1356227080) {

				}
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
