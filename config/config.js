define([
	'underscore'
], function (_) {
	var env = {};

	_.each(process.env, function (value, key) {
		try {
			env[key] = JSON.parse(value);
		} catch (e) {
			env[key] = value;
		}
	});

	var mongo1 = (function () {
		var mongo = {
			"hostname": "localhost",
			"port": 27017,
			"username": "",
			"password": "",
			"name": "",
			"db": "devmerge"
		}

		var generate_mongo_url = function(obj){
			obj.hostname = (obj.hostname || 'localhost');
			obj.port = (obj.port || 27017);
			obj.db = (obj.db || 'test');

			if (env.OPENSHIFT_MONGODB_DB_URL) {
				return env.OPENSHIFT_MONGODB_DB_URL;
			} else if (obj.username && obj.password) {
				return "mongodb://" + obj.username + ":" +
					obj.password + "@" +
					obj.hostname + ":" +
					obj.port + "/" +
					obj.db;
			} else {
				return "mongodb://" + obj.hostname + ":" + obj.port + "/" + obj.db;
			}
		}

		return  generate_mongo_url(mongo);
	}());

	var fb = {
		appId: env.FBAPPID,
		appSecret: env.FBAPPSECRET
	}

	var PROD = (env.NODE_ENV === 'production') ? true : false;

	return {
		PRODUCTION: PROD,
		server: {
			port: env.OPENSHIFT_NODEJS_PORT || 3000,
			ip: env.OPENSHIFT_NODEJS_IP || "127.0.0.1",
		},
		db: {
			mongo1: mongo1
		},
		fb: fb,
		env: env
	};
});
