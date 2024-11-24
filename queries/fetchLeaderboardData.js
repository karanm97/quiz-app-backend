const leaderboardModel = require("../models/leaderboard.model");
const userModel = require("../models/user.model");

const getLeaderboardData = async () => {
	try {
		// Use populate to join User model data
		const leaderboard = await leaderboardModel
			.find()
			.populate({
				path: "email", // field to populate
				model: "UserData", // model to use
				select: "email -_id", // only select email field, exclude _id
			})
			.sort({ score: -1 }); // sort by score descending

		// Format the response to get email string from populated User document
		const formattedLeaderboard = leaderboard.map((entry) => ({
			email: entry.email.email, // get email string from populated User document
			score: entry.score,
		}));

		return formattedLeaderboard;
	} catch (error) {
		console.error("Error:", error);
		throw error;
	}
};

module.exports = getLeaderboardData;
