const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    currentClass:{
        type:String,
        required:true
    },
    targetYear:{
        type:Number,
        required:true
    },
    phone:{
        type:String
    },
    role:{
        type:String,
        default:"student"
    },
},
{
    timestamps:true
});

const User = mongoose.model("User",userSchema);
module.exports = User;