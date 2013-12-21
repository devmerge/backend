define(['underscore', 'config/config'],
function (_, config) {
	var Actions = {},

	nodemailer = require("nodemailer"),
	smtpTransport = nodemailer.createTransport("SMTP", {
		service: "Gmail",
		auth: {
			user: "devmerge@gmail.com",
			pass: config.env.GMAILPASS
		}
	}),
	mailOptions = {
		from: "Devmerge ✔ <devmerge@gmail.com>",
		to: "devmerge@gmail.com",
		subject: "Hello",
		text: "Hello world",
		html: "<b>Hello world ✔</b>"
	};


	Actions.sendMail = function (options) {
		mailOptions = _.extend({
			from: mailOptions.from,
			to: mailOptions.to,
			subject: mailOptions.subject,
			text: mailOptions.text
		}, options);

		smtpTransport.sendMail(mailOptions, function(error, response) {
			if (error) {
				msg = error;
			} else {
				msg = "Message sent: " + response.message;
			}
			smtpTransport.close(); // shut down the connection pool, no more messages
		});
	}



	return Actions.sendMail;
});
