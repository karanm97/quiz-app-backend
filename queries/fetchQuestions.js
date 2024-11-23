const mongoose = require("mongoose");
const Question = require("../models/question.model");
const Topic = require("../models/topic.model");

const getRandomQuestionsByTopicNames = async (selectedTags) => {
	try {
		const topics = await Topic.find({
			topicName: { $in: selectedTags },
		});
		const topicIds = topics.map((topic) => topic._id);
		const randomQuestions = await Question.aggregate([
			{
				$match: {
					topicName: { $in: topicIds },
				},
			},
			{
				$sample: { size: 10 },
			},
		]);
		return randomQuestions;
	} catch (error) {
		console.log(error);
	}
};

module.exports = getRandomQuestionsByTopicNames;
