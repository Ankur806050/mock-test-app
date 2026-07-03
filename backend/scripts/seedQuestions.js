require("dotenv").config();

const connectDB = require("../config/db");
const Question = require("../models/question");
const sampleQuestions = require("../data/sampleQuestions");

async function seedQuestions() {

    try {

        await connectDB();

        await Question.deleteMany({});

        await Question.insertMany(sampleQuestions);

        console.log("✅ Sample Questions Inserted Successfully");

        process.exit();

    } catch (error) {

        console.log(error);

        process.exit(1);

    }

}

seedQuestions();