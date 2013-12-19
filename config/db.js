define([
	'mongodb', 'config/config'
], function (
	mongodb, conf
) {
	var DB = null;

	function Init () {
		if (conf.PRODUCTION) {
			mongodb.MongoClient.connect(conf.env.OPENSHIFT_MONGODB_DB_URL, function (err, db) {
				if (err) throw err;
				DB = db;
			});

		} else {
			mongodb.MongoClient.connect(conf.db.mongo1, function (err, db) {
				if (err) throw err;
				DB = db;
			});
		}
	};
	Init();

	return function getDb (callback) {
		if (DB) {
			return callback(null, DB);
		} else {
			setTimeout(function () {
				getDb(callback);
			}, 500);
		}

		return DB;
	}
});
