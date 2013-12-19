define(['mongoose'],
function (mongoose) {

	var AccountSchema = new mongoose.Schema({
		id: { type: String, unique: true },
		name: { type: String, default: '' },
		email: { type: String, default: '' },

		accessToken: { type: String, default: '' },

		facebook: mongoose.Schema.Types.Mixed,
		music: mongoose.Schema.Types.Mixed,
		events: mongoose.Schema.Types.Mixed,

		timestamp: { type : Date, default: Date.now },
		last_active: { type : Date, default: Date.now }
	}, { strict: true });

	AccountSchema.methods = {
		view: function () {},
		list: function () {},
		update: function () {},
		add: function () {},
		remove: function () {}
	};


	AccountSchema.statics = {

	};

	AccountSchema.pre('save', function (next) {

		next();
	});



	mongoose.model('Account', AccountSchema);
});
