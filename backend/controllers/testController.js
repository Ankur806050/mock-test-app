const Test = require("../models/test.js");
const path = require("path");

function allTestPages(req,res){
    res.sendFile(path.join(__dirname,"../../frontend/pages/test.html"));
}

function instructionsPage(req, res) {
    res.sendFile(
        path.join(__dirname, "../../frontend/pages/instructions.html")
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

module.exports = {getAllTests,allTestPages,instructionsPage};