const leaderboardModel = require("../models/leaderboard.model");
const userModel = require("../models/user.model");

const getLeaderboardData = async () => {
	try {
		// Use populate to join User model data
		const leaderboard = await leaderboardModel
			.find()
			.populate({
				path: "email", // This should be the reference field; check your schema
				model: "UserData", // Ensure this is correct model name
				select: "email -_id", // Only select the email field, exclude _id
			})
			.sort({ score: -1 }); // sort by score descending

		// Format the response to get email string from populated User document
		const formattedLeaderboard = leaderboard.map((entry) => ({
			email: entry.email ? entry.email.email : "No Email", // Handle missing email
			score: entry.score,
		}));

		return formattedLeaderboard;
	} catch (error) {
		console.error("Error:", error);
		throw error;
	}
};

module.exports = getLeaderboardData;
