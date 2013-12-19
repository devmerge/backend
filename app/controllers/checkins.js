define(['underscore', 'config/db', 'fb'],
function (_, mongo, FB) {

	var Actions = {};

	Actions.list = function (req, res) {
		mongo(function (err, db) {
			if (err) throw err;
			db.collection('checkins').find().toArray(function (err, checkins) {
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