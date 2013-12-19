define(['cron'], function (cron) {
	var Actions = {},
	cron = cron.CronJob,
	Schedules = {},
	Jobs = {};



	Jobs.updateMerges = requirejs('app/jobs/updateMerges.js');

	Actions.run = function () {
		Jobs.updateMerges.run();
		Schedules['every5minutes'] = new cron('*/5 * * * *', function () {
			console.log(new Date + ' every5minutes');
			Jobs.updateMerges.run();

		}, null, true);


	}


	return Actions;
});
