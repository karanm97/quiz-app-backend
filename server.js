const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user.model");
const Topic = require("./models/topic.model");
const jwt = require("jsonwebtoken");
const getRandomQuestionsByTopicNames = require("./queries/fetchQuestions");
require("dotenv").config();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI);

app.get("/hello", (req, res) => {
	res.json({ response: "hello world" });
});

// registration
app.post("/api/users/register", async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.create({
			email,
			password,
		});
		res.json({ status: "ok" });
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
	const user = await User.findOne({
		email,
		password,
	});
	if (user) {
		const token = jwt.sign(
			{
				email,
				password,
			},
			"secret123"
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

// quiz topics get
app.get("/api/topics/select", async (req, res) => {
	const topics = await Topic.find();
	if (topics.length > 0) {
		res.json(topics);
	} else {
		res.json({ error: "Unable to fetch topics." });
	}
});

// quiz topics post
app.post("/api/topics/select", async (req, res) => {
	const data = req.body;
	const { selectedTags } = data;
	const response = await getRandomQuestionsByTopicNames(selectedTags);
	res.json(response);
});

app.listen(3000, () => {
	console.log("Server started at http://localhost:3000");
});
