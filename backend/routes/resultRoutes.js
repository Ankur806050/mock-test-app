const express = require("express");
const router = express.Router();
const {resultPage,getResult} = require("../controllers/resultController.js");
const {authenticateUser} = require("../middlewares/authMiddleware.js");

router.get("/result/:attemptId",authenticateUser,resultPage);
router.get("/api/result/:attemptId",authenticateUser,getResult);

module.exports = router;