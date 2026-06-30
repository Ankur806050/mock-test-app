const express = require("express");
const router = express.Router();
const path = require("path");
const {signup,signupPage} = require("../controllers/authController.js");

router.get("/signup",signupPage);
router.post("/signup",signup);

module.exports = router;