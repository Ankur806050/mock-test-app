const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.get("/",(req,res) => {
    res.send("this is home page");
});

app.listen(PORT,() => {
    console.log(`Server is running on PORT ${PORT}`);
});