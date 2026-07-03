require("dotenv").config();

const connectDB = require("../config/db");
const Test = require("../models/test");
const sampleTests = require("../data/sampleTests");

async function seedTests() {

    try {

        await connectDB();

        await Test.deleteMany({});

        await Test.insertMany(sampleTests);

        console.log("✅ Sample tests inserted");

        process.exit();

    } catch (error) {

        console.log(error);

        process.exit(1);

    }

}

seedTests();