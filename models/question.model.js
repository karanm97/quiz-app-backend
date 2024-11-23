const mongoose = require("mongoose");
const Topic = require("./topic.model");

const Question = mongoose.Schema(
	{
		question: {
			type: String,
			required: true,
		},
		correctAnswer: {
			type: String,
			required: true,
		},
		optionA: {
			type: String,
			required: true,
		},
		optionB: {
			type: String,
			required: true,
		},
		optionC: {
			type: String,
			required: true,
		},
		optionD: {
			type: String,
			required: true,
		},
		topicName: {
			type: mongoose.Schema.ObjectId,
			ref: "Topic",
			required: true,
		},
	},
	{
		collection: "questions",
	}
);

const questionModel = mongoose.model("QuestionData", Question);

module.exports = questionModel;
