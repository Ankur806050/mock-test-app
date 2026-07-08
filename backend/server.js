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
const attemptHistoryRouter = require("./routes/attemptHistoryRoutes.js");
const reviewRouter = require("./routes/reviewRoutes.js");
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
app.use("/",attemptHistoryRouter);
app.use("/",reviewRouter);
app.get("/",(req,res) => {
    res.sendFile(path.join(__dirname,"../frontend/pages/index.html"));
});

app.use((req,res) => {
    res.status(404).sendFile(
        path.join(__dirname,"../frontend/pages/404.html")
    );
});

app.listen(PORT,() => {
    console.log(`Server is running on PORT ${PORT}`);
});