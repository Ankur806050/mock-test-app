const express = require("express");
const router = express.Router();
const path = require("path");
const {authenticateUser} = require("../middlewares/authMiddleware.js");
const {dashboardPage} = require("../controllers/dashboardController.js");

router.get("/dashboard",authenticateUser,dashboardPage);

module.exports = router;