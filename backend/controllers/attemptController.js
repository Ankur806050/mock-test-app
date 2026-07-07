const Attempt = require("../models/attempt.js");
const Question = require("../models/question.js");

async function submitAttempt(req, res) {
    try {
        let score = 0;
        let correctAnswers = 0;
        let incorrectAnswers = 0;
        let unanswered = 0;
        const { testId } = req.params;
        const userId = req.user.id;
        const { responses } = req.body;
        const questions = await Question.find({ testId })
            .sort({ questionNumber: 1 });
        const attemptResponses = [];
        for (let i = 0; i < questions.length; i++) {
            const question = questions[i];
            const response = responses[i];
            // Save response in Attempt format
            attemptResponses.push({
                questionId: question._id,
                selectedAnswer: response.answer,
                status: response.status
            });
            // Calculate Result
            if (response.answer === null) {
                unanswered++;
            }
            else if (response.answer === question.correctAnswer) {
                score += question.positiveMarks;
                correctAnswers++;
            }
            else {
                score += question.negativeMarks;
                incorrectAnswers++;
            }
        }
        const attempt = new Attempt({
            userId,
            testId,
            responses: attemptResponses,
            score,
            correctAnswers,
            incorrectAnswers,
            unanswered
        });
        await attempt.save();
        return res.status(200).json({
            message: "Test Submitted Successfully",
            attempt
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

module.exports = {
    submitAttempt
};