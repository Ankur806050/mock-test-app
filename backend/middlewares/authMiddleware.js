const jwt = require("jsonwebtoken");

function authenticateUser(req,res,next){
    try{
        const token = req.cookies.token;
        if(!token){
            return res.redirect("/login");
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(error){
        return res.redirect("/login");
    } 
}

module.exports = {authenticateUser};