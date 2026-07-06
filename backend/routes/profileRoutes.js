const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middlewares/authMiddleware");
const {profilePage,getProfile} = require("../controllers/profileController.js");


router.get("/profile",authenticateUser,profilePage);
router.get("/api/profile",authenticateUser,getProfile);

module.exports = router;