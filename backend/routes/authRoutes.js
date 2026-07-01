const express = require("express");
const router = express.Router();
const path = require("path");
const {signup,signupPage,login,loginPage,logoutUser} = require("../controllers/authController.js");

router.get("/signup",signupPage);
router.post("/signup",signup);

router.get("/login",loginPage);
router.post("/login",login);

router.post("/logout",logoutUser);

module.exports = router;