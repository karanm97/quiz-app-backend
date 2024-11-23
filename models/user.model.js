const mongoose = require("mongoose");

const User = mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{
		collection: "users",
	}
);

const userModel = mongoose.model("UserData", User);

module.exports = userModel;
