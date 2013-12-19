define(['mongoose'],
function (mongoose) {

	var UserSchema = new mongoose.Schema({
		id: { type: String, unique: true },
		name: { type: String, default: '' },
		email: { type: String, default: '' },

		accessToken: { type: String, default: '' },

		facebook: mongoose.Schema.Types.Mixed,

		timestamp: { type : Date, default: Date.now },
		last_active: { type : Date, default: Date.now }
	}, { strict: true });

	UserSchema.methods = {
		view: function () {},
		list: function () {},
		update: function () {},
		add: function () {},
		remove: function () {}
	};


	UserSchema.statics = {

	};

	UserSchema.pre('save', function (next) {
		next();
	});



	mongoose.model('User', UserSchema);
});
