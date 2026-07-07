const express = require("express");
const router = express.Router();
const {authenticateUser} = require("../middlewares/authMiddleware.js");
const {reviewPage,getReview} = require("../controllers/reviewController.js");

router.get("/review/:attemptId",authenticateUser,reviewPage);
router.get("/api/review/:attemptId",authenticateUser,getReview);

module.exports = router;
