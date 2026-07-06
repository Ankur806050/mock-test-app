//historyPage()
//getHistory()

const path = require("path");
const Attempt = require("../models/attempt.js");

function historyPage(req,res){
    res.sendFile(
        path.join(__dirname,"../../frontend/pages/attemptHistory.html")
    );
}

async function getHistory(req,res){
    try{
            const userId = req.user.id;
            const attempts = await Attempt.find({userId})
            .populate("testId")
            .sort({createdAt:-1});
            return res.status(200).json(attempts);
        }catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Internal Server Error"
            });
        }
}

module.exports = {
    historyPage,
    getHistory
};


