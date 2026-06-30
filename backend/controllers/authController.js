const User = require("../models/user.js");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function signupPage(req,res){
    res.sendFile(path.join(__dirname,"../../frontend/pages/signup.html"));
}

function loginPage(req,res){
    res.sendFile(path.join(__dirname,"../../frontend/pages/login.html"));
}

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
            const hashedPassword = await bcrypt.hash(password,10);
            const user = new User({
                fullName,
                email,
                password:hashedPassword,
                currentClass,
                targetYear,
                phone
            });
            await user.save();
            return res.status(201).json({
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

async function login(req,res){
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                message:"Invalid email or password"
            });
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({
                message:"Invalid email or password"
            });
        }
        const token = jwt.sign({
            id:user._id,
            role:user.role
            },
            process.env.JWT_SECRET,
            {
            expiresIn:"7d"
            }  
        );

        res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            maxAge:7*24*60*60*1000
        });
        return res.status(200).json({
            message:"Login Successful"
        });

    }catch(error){
        console.log("❌ User Login Failed")
        console.log(error.message);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

module.exports = {signup,signupPage,login,loginPage};