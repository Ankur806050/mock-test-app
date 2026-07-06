const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db.js");
const authRouter = require("./routes/authRoutes.js");
const dashboardRouter = require("./routes/dashboardRoutes.js");
const testRouter = require("./routes/testRoutes.js");
const attemptRouter = require("./routes/attemptRoutes.js");
const resultRouter = require("./routes/resultRoutes.js");
const profileRouter = require("./routes/profileRoutes.js");
const PORT = process.env.PORT || 3000;

connectDB();
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"../frontend")));
app.use("/",authRouter);
app.use("/",dashboardRouter);
app.use("/",testRouter);
app.use("/",attemptRouter);
app.use("/",resultRouter);
app.use("/",profileRouter);
app.get("/",(req,res) => {
    res.sendFile(path.join(__dirname,"../frontend/pages/index.html"));
});

app.get("/mock-tests",(req,res) => {
    res.sendFile(path.join(__dirname,"../frontend/pages/test.html"));
})

app.listen(PORT,() => {
    console.log(`Server is running on PORT ${PORT}`);
});