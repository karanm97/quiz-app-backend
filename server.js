const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/user.model");
const Topic = require("./models/topic.model");
const Leaderboard = require("./models/leaderboard.model");

const jwt = require("jsonwebtoken");
const getRandomQuestionsByTopicNames = require("./queries/fetchQuestions");
const getLeaderboardData = require("./queries/fetchLeaderboardData");
require("dotenv").config();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI);

app.get("/hello", (req, res) => {
	res.json({ response: "hello world" });
});

// Middleware for protecting routes
const authenticateToken = (req, res, next) => {
	const authHeader = req.headers["authorization"];

	const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

	if (token == null) {
		return res.sendStatus(401); // No token provided
	}

	jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
		if (err) {
			return res.sendStatus(403); // Invalid token
		}
		req.user = user;
		next();
	});
};

// registration
app.post("/api/users/register", async (req, res) => {
	try {
		const { email, password } = req.body;
		const saltRounds = 10; // Recommended number of salt rounds
		const hashedPassword = await bcrypt.hash(password, saltRounds);
		const user = await User.create({
			email,
			password: hashedPassword,
		});

		const token = jwt.sign(
			{
				userId: user._id,
				email: user.email,
			},
			process.env.JWT_SECRET,
			{
				expiresIn: "24h",
			}
		);

		res.json({ status: "ok", message: "User registered successfully", token });
	} catch (error) {
		if (error.code == 11000) {
			res.json({ status: "Email ID is already registered." });
		} else {
			res.json({ status: "Something went wrong. Please try again later." });
		}
	}
});

// login
app.post("/api/users/login", async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (user && (await bcrypt.compare(password, user.password))) {
		const token = jwt.sign(
			{
				userId: user._id,
				email: user.email,
			},
			process.env.JWT_SECRET, // Use environment variable
			{
				expiresIn: "24h", // Token expires in 24 hours
			}
		);

		res.json({
			status: "ok",
			user: true,
			token,
		});
	} else {
		res.json({
			status: "error",
			user: false,
		});
	}
});

// quiz topics protected route
app.get("/api/topics/select", authenticateToken, async (req, res) => {
	const topics = await Topic.find();
	if (topics.length > 0) {
		res.json(topics);
	} else {
		res.json({ error: "Unable to fetch topics." });
	}
});

// quiz topics post protected route
app.post("/api/topics/select", authenticateToken, async (req, res) => {
	const data = req.body;
	const { selectedTags } = data;
	const response = await getRandomQuestionsByTopicNames(selectedTags);
	res.json(response);
});

// leaderboard get
app.get("/api/leaderboard", async (req, res) => {
	const leaderboardData = await getLeaderboardData();
	if (leaderboardData.length > 0) {
		res.json(leaderboardData);
	} else {
		res.json({ error: "Unable to fetch topics." });
	}
});

// leaderboard post protected route
app.post("/api/leaderboard", authenticateToken, async (req, res) => {
	try {
		const { email, score } = req.body;
		const user = await User.findOne({ email });
		const leaderboardData = await Leaderboard.create({
			email: user._id,
			score,
		});
		res.json({ status: "ok" });
	} catch (error) {
		console.log(error);
		res.json({
			status: "Something went wrong.",
		});
	}
});

app.listen(3000, () => {
	console.log("Server started at http://localhost:3000");
});
