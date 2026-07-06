const path = require("path");
const User = require("../models/user.js");

function profilePage(req,res){
    res.sendFile(
        path.join(__dirname,"../../frontend/pages/profile.html")
    );
}

async function getProfile(req,res){
    try{
        const userId = req.user.id;
        const user = await User.find({_id :`${userId}`});
        return res.status(200).json(user);
    }catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

module.exports = {
    profilePage,getProfile
};

