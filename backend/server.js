const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db.js");
const authRouter = require("./routes/authRoutes.js");
const PORT = process.env.PORT || 3000;

connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/auth",authRouter);
app.get("/",(req,res) => {
    res.send("this is home page");
});

app.listen(PORT,() => {
    console.log(`Server is running on PORT ${PORT}`);
});