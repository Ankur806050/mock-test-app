const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db.js");
const authRouter = require("./routes/authRoutes.js");
const PORT = process.env.PORT || 3000;

connectDB();
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"../frontend")));
app.use("/",authRouter);
app.get("/login",(req,res) => {
    res.send("Welcome to login page");
})
app.get("/",(req,res) => {
    res.send("Server is running on PORT 3000");
});

app.listen(PORT,() => {
    console.log(`Server is running on PORT ${PORT}`);
});