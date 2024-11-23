const mongoose = require("mongoose");
const Topic = require("./models/topic.model");
const Question = require("./models/question.model");
require("dotenv").config();

const topicsData = [
	{ topicName: "History" },
	{ topicName: "Science" },
	{ topicName: "Maths" },
	{ topicName: "Sports" },
	{ topicName: "Pop Culture" },
	{ topicName: "General Knowledge" },
	{ topicName: "Philosophy" },
	{ topicName: "Music" },
	{ topicName: "Movies" },
	{ topicName: "Technology" },
	{ topicName: "Artificial Intelligence" },
	{ topicName: "Fitness" },
];

const questionsData = [
	// History
	{
		topicName: "History",
		question: "Who was the first President of the United States?",
		optionA: "George Washington",
		optionB: "Abraham Lincoln",
		optionC: "Thomas Jefferson",
		optionD: "John Adams",
		correctAnswer: "George Washington",
	},
	{
		topicName: "History",
		question: "In what year did the Titanic sink?",
		optionA: "1912",
		optionB: "1898",
		optionC: "1920",
		optionD: "1905",
		correctAnswer: "1912",
	},
	{
		topicName: "History",
		question: "Which ancient civilization built the pyramids?",
		optionA: "Romans",
		optionB: "Greeks",
		optionC: "Egyptians",
		optionD: "Mesopotamians",
		correctAnswer: "Egyptians",
	},
	{
		topicName: "History",
		question: "Who discovered America in 1492?",
		optionA: "Christopher Columbus",
		optionB: "Marco Polo",
		optionC: "Vasco da Gama",
		optionD: "Ferdinand Magellan",
		correctAnswer: "Christopher Columbus",
	},
	{
		topicName: "History",
		question: "The Berlin Wall separated which two countries?",
		optionA: "East and West Germany",
		optionB: "East and West France",
		optionC: "East and West Italy",
		optionD: "East and West Russia",
		correctAnswer: "East and West Germany",
	},

	// Science
	{
		topicName: "Science",
		question: "What is the chemical formula for Water?",
		optionA: "H2O",
		optionB: "CO2",
		optionC: "N2O",
		optionD: "H2SO4",
		correctAnswer: "H2O",
	},
	{
		topicName: "Science",
		question: "What planet is known as the Red Planet?",
		optionA: "Venus",
		optionB: "Mars",
		optionC: "Jupiter",
		optionD: "Saturn",
		correctAnswer: "Mars",
	},
	{
		topicName: "Science",
		question: "What is the chemical symbol for gold?",
		optionA: "Ag",
		optionB: "Au",
		optionC: "Pb",
		optionD: "Fe",
		correctAnswer: "Au",
	},
	{
		topicName: "Science",
		question: "How many bones are in the adult human body?",
		optionA: "206",
		optionB: "300",
		optionC: "150",
		optionD: "250",
		correctAnswer: "206",
	},
	{
		topicName: "Science",
		question:
			"What gas do plants absorb from the atmosphere for photosynthesis?",
		optionA: "Oxygen",
		optionB: "Carbon Dioxide",
		optionC: "Nitrogen",
		optionD: "Hydrogen",
		correctAnswer: "Carbon Dioxide",
	},

	// Maths
	{
		topicName: "Maths",
		question: "What is 5 + 3?",
		optionA: "7",
		optionB: "8",
		optionC: "9",
		optionD: "6",
		correctAnswer: "8",
	},
	{
		topicName: "Maths",
		question: "What is the value of Pi (π) to two decimal places?",
		optionA: "3.12",
		optionB: "3.14",
		optionC: "3.16",
		optionD: "3.18",
		correctAnswer: "3.14",
	},
	{
		topicName: "Maths",
		question: "What is 12 x 12?",
		optionA: "120",
		optionB: "144",
		optionC: "132",
		optionD: "110",
		correctAnswer: "144",
	},
	{
		topicName: "Maths",
		question: "What is the square root of 16?",
		optionA: "4",
		optionB: "5",
		optionC: "3",
		optionD: "6",
		correctAnswer: "4",
	},
	{
		topicName: "Maths",
		question: "What is 20 divided by 4?",
		optionA: "6",
		optionB: "5",
		optionC: "4",
		optionD: "8",
		correctAnswer: "5",
	},

	// Sports
	{
		topicName: "Sports",
		question: "Which sport is known as the 'king of sports'?",
		optionA: "Basketball",
		optionB: "Cricket",
		optionC: "Soccer",
		optionD: "Tennis",
		correctAnswer: "Soccer",
	},
	{
		topicName: "Sports",
		question: "Who won the 100 meters gold medal in the 2008 Olympics?",
		optionA: "Usain Bolt",
		optionB: "Michael Phelps",
		optionC: "Tyson Gay",
		optionD: "Asafa Powell",
		correctAnswer: "Usain Bolt",
	},
	{
		topicName: "Sports",
		question: "Which country is known for the sport of baseball?",
		optionA: "United Kingdom",
		optionB: "Japan",
		optionC: "USA",
		optionD: "India",
		correctAnswer: "USA",
	},
	{
		topicName: "Sports",
		question: "Which team won the 2018 FIFA World Cup?",
		optionA: "Germany",
		optionB: "Brazil",
		optionC: "France",
		optionD: "Argentina",
		correctAnswer: "France",
	},
	{
		topicName: "Sports",
		question: "Which sport uses a shuttlecock?",
		optionA: "Soccer",
		optionB: "Tennis",
		optionC: "Badminton",
		optionD: "Volleyball",
		correctAnswer: "Badminton",
	},

	// Pop Culture
	{
		topicName: "Pop Culture",
		question: "Who is the lead singer of the band Queen?",
		optionA: "Freddie Mercury",
		optionB: "Mick Jagger",
		optionC: "Elton John",
		optionD: "Axl Rose",
		correctAnswer: "Freddie Mercury",
	},
	{
		topicName: "Pop Culture",
		question:
			"Which popular TV series features a character named Walter White?",
		optionA: "Breaking Bad",
		optionB: "The Office",
		optionC: "Friends",
		optionD: "Game of Thrones",
		correctAnswer: "Breaking Bad",
	},
	{
		topicName: "Pop Culture",
		question: "Which movie features a character named Harry Potter?",
		optionA: "Lord of the Rings",
		optionB: "The Hobbit",
		optionC: "Harry Potter",
		optionD: "The Chronicles of Narnia",
		correctAnswer: "Harry Potter",
	},
	{
		topicName: "Pop Culture",
		question: "Who is known as the 'King of Pop'?",
		optionA: "Elvis Presley",
		optionB: "Michael Jackson",
		optionC: "Justin Timberlake",
		optionD: "Prince",
		correctAnswer: "Michael Jackson",
	},
	{
		topicName: "Pop Culture",
		question: "Which famous artist painted the Mona Lisa?",
		optionA: "Pablo Picasso",
		optionB: "Vincent van Gogh",
		optionC: "Leonardo da Vinci",
		optionD: "Michelangelo",
		correctAnswer: "Leonardo da Vinci",
	},

	// General Knowledge
	{
		topicName: "General Knowledge",
		question: "What is the largest state of India?",
		optionA: "Uttar Pradesh",
		optionB: "Madhya Pradesh",
		optionC: "Maharashtra",
		optionD: "Rajasthan",
		correctAnswer: "Rajasthan",
	},
	{
		topicName: "General Knowledge",
		question: "What is the capital city of Japan?",
		optionA: "Tokyo",
		optionB: "Kyoto",
		optionC: "Osaka",
		optionD: "Hokkaido",
		correctAnswer: "Tokyo",
	},
	{
		topicName: "General Knowledge",
		question: "Which is the largest continent by land area?",
		optionA: "Africa",
		optionB: "Asia",
		optionC: "Europe",
		optionD: "Australia",
		correctAnswer: "Asia",
	},
	{
		topicName: "General Knowledge",
		question: "How many continents are there?",
		optionA: "5",
		optionB: "7",
		optionC: "6",
		optionD: "8",
		correctAnswer: "7",
	},
	{
		topicName: "General Knowledge",
		question: "What is the longest river in the world?",
		optionA: "Amazon River",
		optionB: "Nile River",
		optionC: "Yangtze River",
		optionD: "Mississippi River",
		correctAnswer: "Nile River",
	},

	// Philosophy
	{
		topicName: "Philosophy",
		question: "Who is known as the father of modern philosophy?",
		optionA: "Socrates",
		optionB: "Plato",
		optionC: "René Descartes",
		optionD: "Aristotle",
		correctAnswer: "René Descartes",
	},
	{
		topicName: "Philosophy",
		question: "What is the main focus of ethics?",
		optionA: "How to gain wealth",
		optionB: "Moral principles",
		optionC: "Technological progress",
		optionD: "Political ideologies",
		correctAnswer: "Moral principles",
	},
	{
		topicName: "Philosophy",
		question: "What does 'tabula rasa' mean in philosophy?",
		optionA: "A clean slate",
		optionB: "An empty bowl",
		optionC: "A wise mind",
		optionD: "A filled cup",
		correctAnswer: "A clean slate",
	},
	{
		topicName: "Philosophy",
		question: "Which philosopher wrote 'The Republic'?",
		optionA: "Socrates",
		optionB: "Plato",
		optionC: "Aristotle",
		optionD: "Kant",
		correctAnswer: "Plato",
	},
	{
		topicName: "Philosophy",
		question:
			"Which philosopher is famous for the phrase 'I think, therefore I am'?",
		optionA: "Immanuel Kant",
		optionB: "René Descartes",
		optionC: "John Locke",
		optionD: "Friedrich Nietzsche",
		correctAnswer: "René Descartes",
	},

	// Music
	{
		topicName: "Music",
		question: "Who is known as the 'Queen of Pop'?",
		optionA: "Lady Gaga",
		optionB: "Madonna",
		optionC: "Beyoncé",
		optionD: "Ariana Grande",
		correctAnswer: "Madonna",
	},
	{
		topicName: "Music",
		question: "Which instrument is played by pressing keys?",
		optionA: "Violin",
		optionB: "Trumpet",
		optionC: "Piano",
		optionD: "Drums",
		correctAnswer: "Piano",
	},
	{
		topicName: "Music",
		question: "Which band is famous for the song 'Hey Jude'?",
		optionA: "The Beatles",
		optionB: "The Rolling Stones",
		optionC: "Queen",
		optionD: "Pink Floyd",
		correctAnswer: "The Beatles",
	},
	{
		topicName: "Music",
		question: "Which artist released the album 'Thriller'?",
		optionA: "Elvis Presley",
		optionB: "Michael Jackson",
		optionC: "Prince",
		optionD: "Whitney Houston",
		correctAnswer: "Michael Jackson",
	},
	{
		topicName: "Music",
		question: "Which genre of music is Taylor Swift known for?",
		optionA: "Pop",
		optionB: "Rock",
		optionC: "Jazz",
		optionD: "Country",
		correctAnswer: "Pop",
	},

	// Movies
	{
		topicName: "Movies",
		question: "Which movie won the Academy Award for Best Picture in 1994?",
		optionA: "Titanic",
		optionB: "Forrest Gump",
		optionC: "The Shawshank Redemption",
		optionD: "The Godfather",
		correctAnswer: "Forrest Gump",
	},
	{
		topicName: "Movies",
		question: "Who directed the movie 'Avatar'?",
		optionA: "James Cameron",
		optionB: "Steven Spielberg",
		optionC: "George Lucas",
		optionD: "Christopher Nolan",
		correctAnswer: "James Cameron",
	},
	{
		topicName: "Movies",
		question:
			"Which character does Robert Downey Jr. play in the Marvel movies?",
		optionA: "Thor",
		optionB: "Iron Man",
		optionC: "Hulk",
		optionD: "Captain America",
		correctAnswer: "Iron Man",
	},
	{
		topicName: "Movies",
		question: "Which movie is about a 'Jungle Book' story?",
		optionA: "The Lion King",
		optionB: "Mowgli",
		optionC: "Tarzan",
		optionD: "The Jungle Book",
		correctAnswer: "The Jungle Book",
	},
	{
		topicName: "Movies",
		question: "Which actor played Jack Dawson in Titanic?",
		optionA: "Leonardo DiCaprio",
		optionB: "Brad Pitt",
		optionC: "Johnny Depp",
		optionD: "Matthew McConaughey",
		correctAnswer: "Leonardo DiCaprio",
	},

	// Technology
	{
		topicName: "Technology",
		question: "Who is the co-founder of Microsoft?",
		optionA: "Steve Jobs",
		optionB: "Elon Musk",
		optionC: "Bill Gates",
		optionD: "Mark Zuckerberg",
		correctAnswer: "Bill Gates",
	},
	{
		topicName: "Technology",
		question: "What does 'URL' stand for?",
		optionA: "Universal Resource Locator",
		optionB: "Uniform Resource Locator",
		optionC: "United Resource Locator",
		optionD: "Universal Reference Locator",
		correctAnswer: "Uniform Resource Locator",
	},
	{
		topicName: "Technology",
		question: "What does 'Wi-Fi' stand for?",
		optionA: "Wireless Fidelity",
		optionB: "Wireless Functionality",
		optionC: "Wide Fidelity",
		optionD: "Wired Fidelity",
		correctAnswer: "Wireless Fidelity",
	},
	{
		topicName: "Technology",
		question: "What was the first iPhone model released?",
		optionA: "iPhone 5",
		optionB: "iPhone 3G",
		optionC: "iPhone 4",
		optionD: "iPhone 2G",
		correctAnswer: "iPhone 2G",
	},
	{
		topicName: "Technology",
		question: "Who invented the first practical telephone?",
		optionA: "Nikola Tesla",
		optionB: "Alexander Graham Bell",
		optionC: "Thomas Edison",
		optionD: "Elon Musk",
		correctAnswer: "Alexander Graham Bell",
	},

	// Artificial Intelligence
	{
		topicName: "Artificial Intelligence",
		question: "What does AI stand for?",
		optionA: "Artificial Insight",
		optionB: "Automated Intelligence",
		optionC: "Artificial Intelligence",
		optionD: "Artificial Integration",
		correctAnswer: "Artificial Intelligence",
	},
	{
		topicName: "Artificial Intelligence",
		question: "Which company created the AI chatbot 'Siri'?",
		optionA: "Google",
		optionB: "Microsoft",
		optionC: "Apple",
		optionD: "Amazon",
		correctAnswer: "Apple",
	},
	{
		topicName: "Artificial Intelligence",
		question: "What is a neural network in AI?",
		optionA: "A web network",
		optionB: "A biological-inspired network",
		optionC: "A programming language",
		optionD: "A hardware component",
		correctAnswer: "A biological-inspired network",
	},
	{
		topicName: "Artificial Intelligence",
		question: "Which of these is an example of AI?",
		optionA: "Google Search",
		optionB: "Digital Thermostat",
		optionC: "Smartphones",
		optionD: "All of the above",
		correctAnswer: "All of the above",
	},
	{
		topicName: "Artificial Intelligence",
		question: "Which of these is NOT a common AI application?",
		optionA: "Self-driving cars",
		optionB: "Voice assistants",
		optionC: "Photo editing software",
		optionD: "None of the above",
		correctAnswer: "None of the above",
	},

	// Fitness
	{
		topicName: "Fitness",
		question: "What is a common exercise for building arm strength?",
		optionA: "Push-ups",
		optionB: "Squats",
		optionC: "Lunges",
		optionD: "Sit-ups",
		correctAnswer: "Push-ups",
	},
	{
		topicName: "Fitness",
		question: "Which nutrient is essential for muscle repair?",
		optionA: "Carbohydrates",
		optionB: "Proteins",
		optionC: "Fats",
		optionD: "Fiber",
		correctAnswer: "Proteins",
	},
	{
		topicName: "Fitness",
		question:
			"How many steps should a person aim for each day to maintain a healthy lifestyle?",
		optionA: "1,000",
		optionB: "5,000",
		optionC: "10,000",
		optionD: "15,000",
		correctAnswer: "10,000",
	},
	{
		topicName: "Fitness",
		question: "What is the primary benefit of aerobic exercise?",
		optionA: "Increased flexibility",
		optionB: "Improved cardiovascular health",
		optionC: "Strengthening of bones",
		optionD: "Increased muscle mass",
		correctAnswer: "Improved cardiovascular health",
	},
	{
		topicName: "Fitness",
		question: "What is the best type of exercise for burning calories?",
		optionA: "Yoga",
		optionB: "Cardio",
		optionC: "Pilates",
		optionD: "Stretching",
		correctAnswer: "Cardio",
	},
];

const seedDatabase = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI);
		console.log("Connected to MongoDB");

		await Topic.deleteMany();
		await Question.deleteMany();
		console.log("Cleared existing data");

		const topics = await Topic.insertMany(topicsData);
		console.log("Topics seeded successfully");

		const questionPromises = questionsData.map(async (questionData) => {
			const topic = await Topic.findOne({ topicName: questionData.topicName });
			if (!topic) {
				throw new Error(`Topic not found: ${questionData.topicName}`);
			}

			const question = await Question.create({
				question: questionData.question,
				optionA: questionData.optionA,
				optionB: questionData.optionB,
				optionC: questionData.optionC,
				optionD: questionData.optionD,
				correctAnswer: questionData.correctAnswer,
				topicName: topic._id,
			});
			return question;
		});

		const questions = await Promise.all(questionPromises);
		console.log("Questions seeded successfully");

		await mongoose.connection.close();
		console.log("Database connection closed");
	} catch (error) {
		console.error("Error seeding database:", error);
		await mongoose.connection.close();
		process.exit(1);
	}
};

seedDatabase();
