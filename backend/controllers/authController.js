const User = require("../models/user.js");

async function signup(req,res){
    try{
        const{fullName,email,password,currentClass,targetYear,phone} = req.body;
        if(!fullName || !email || !password || !currentClass || !targetYear){
            return res.status(400).json({
                message:"All required fields are mandatory"
            });
        }
        const existingUser = await User.findOne({email:`${email}`});
        if(existingUser){
            return res.status(400).json({
                message:"User already Exists"
            });
        }
        else{
            const user = new User({
                fullName,
                email,
                password,
                currentClass,
                targetYear,
                phone
            });
            await user.save();
            return res.status(200).json({
                message:"User registered Successfully"
            });
        }

    }catch(error){
        console.log("❌ User Registration Failed")
        console.log(error.message);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}
module.exports = {signup};