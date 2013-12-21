define(['underscore', 'config/db', 'fb', 'moment'],
function (_, mongo, FB, moment) {

	var Actions = {};

	Actions.list = function (req, res) {
		var params = req.query || {},
			past24hours = moment().subtract('days', 1).utc().format(),
			criteria = {
				"created_time": {
					$gte: past24hours
				}
			};

		if (params.all) {
			criteria = {};
		} else if (params.since) {
			criteria = {
				"created_time": {
					$gte: moment(params.since).utc().format()
				}
			}
		}

		mongo(function (err, db) {
			if (err) throw err;
			db.collection('posts').find(criteria).toArray(function (err, checkins) {
				if (err) throw err;
				_.each(checkins, function (checkin) {
					// checkin = _.omit(checkin, 'secret', 'info');
				})
				res.send(checkins);
			});
		});
	}


	return Actions;
});
