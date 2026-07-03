const express = require("express");
const router = express.Router();
const path = require("path");

const {getAllTests,allTestPages,instructionsPage,attemptTestPage,getQuestions} = require("../controllers/testController.js");
const { authenticateUser } = require("../middlewares/authMiddleware.js");

router.get("/tests",allTestPages);
router.get("/mock-tests",getAllTests);
router.get("/instructions/:testId",authenticateUser,instructionsPage);
router.get("/attempt-test/:testId",authenticateUser,attemptTestPage);
router.get("/questions/:testId",authenticateUser,getQuestions);

module.exports = router;