const path = require("path");
const Attempt = require("../models/attempt.js");

function reviewPage(req,res){
    res.sendFile(
        path.join(__dirname,"../../frontend/pages/review.html")
    );
}

async function getReview(req,res){
    try{
        const {attemptId} = req.params
        const responses = await Attempt.findById(attemptId)
        .populate("testId")
        .populate("responses.questionId");
        return res.status(200).json(responses);
    }catch(error){
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

module.exports = {
    reviewPage,
    getReview
}