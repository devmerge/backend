define(['underscore', 'http', 'fs'],
function (_, http, fs) {
	var Actions = {},


	Actions.download = function (url, name) {
		var file = fs.createWriteStream(name),
		request = http.get(url, function(response) {
			response.pipe(file);
		});
	}


	return Actions;
});
