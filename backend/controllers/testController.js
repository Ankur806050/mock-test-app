const Test = require("../models/test.js");
const Question = require("../models/question.js");
const path = require("path");

function allTestPages(req,res){
    res.sendFile(path.join(__dirname,"../../frontend/pages/test.html"));
}

function instructionsPage(req, res) {
    res.sendFile(
        path.join(__dirname, "../../frontend/pages/instructions.html")
    );
}

function attemptTestPage(req,res){
    res.sendFile(
        path.join(__dirname,"../../frontend/pages/attemptTest.html")
    );
}

async function getAllTests(req,res){
    try{
        const tests = await Test.find({isPublished:true});
        return res.status(200).json(tests);
    }catch(error){
        console.log("❌ Failed to fetch tests");
        console.log(error.message);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

async function getQuestions(req, res) {
    try {
        const testId = req.params.testId;
        const questions = await Question.find({ testId })
            .sort({ questionNumber: 1 }); // Ascending order

        return res.status(200).json(questions);
    } catch (error) {
        console.log("❌ Failed to fetch questions");
        console.log(error.message);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

module.exports = {
    getAllTests,
    allTestPages,
    instructionsPage,
    attemptTestPage,
    getQuestions
};