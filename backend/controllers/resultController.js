const path = require("path");
const Attempt = require("../models/attempt.js");

function resultPage(req, res) {
    res.sendFile(
        path.join(__dirname,
        "../../frontend/pages/result.html")
    );
}

async function getResult(req, res) {
    try {
        const { attemptId } = req.params;
        const attempt = await Attempt.findById(attemptId)
            .populate("testId");
        if (!attempt) {
            return res.status(404).json({
                message: "Attempt not found"
            });
        }
        return res.status(200).json(attempt);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

module.exports = {
    resultPage,getResult
}