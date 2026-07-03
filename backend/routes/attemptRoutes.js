const express = require("express");
const router = express.Router();
const path = require("path");
const {authenticateUser} = require("../middlewares/authMiddleware.js");
const {submitAttempt} = require("../controllers/attemptController.js");

router.post("/submit-test/:testId",authenticateUser,submitAttempt);

module.exports = router;