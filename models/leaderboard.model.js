const mongoose = require("mongoose");
const User = require("./user.model");

const Leaderboard = mongoose.Schema(
	{
		email: {
			type: mongoose.Schema.ObjectId,
			ref: "User",
			required: true,
		},
		score: {
			type: Number,
			required: true,
		},
	},
	{
		collection: "leaderboard",
	}
);

const leaderboardModel = mongoose.model("LeaderboardData", Leaderboard);

module.exports = leaderboardModel;
