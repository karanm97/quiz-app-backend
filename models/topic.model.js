const mongoose = require("mongoose");

const Topic = mongoose.Schema(
	{
		topicName: {
			type: String,
			required: true,
			unique: true,
		},
	},
	{
		collection: "topics",
	}
);

const topicModel = mongoose.model("TopicData", Topic);

module.exports = topicModel;
