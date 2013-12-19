define(['mongoose'],
function (mongoose) {

	var EventSchema = mongoose.Schema({
		title: { type: 'string', required: true, unique: true },
		description: {},
		start: {},
		end: {},
		location: {}
	});

	EventSchema.methods = {
		view: function () {},
		list: function () {},
		update: function () {},
		add: function () {},
		remove: function () {}
	}

	EventSchema.statics = {

	}


	mongoose.model('Event', EventSchema);
});
