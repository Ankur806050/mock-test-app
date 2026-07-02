const express = require("express");
const router = express.Router();
const path = require("path");

const {getAllTests,allTestPages,instructionsPage} = require("../controllers/testController.js");
const { authenticateUser } = require("../middlewares/authMiddleware.js");

router.get("/tests",allTestPages);
router.get("/mock-tests",getAllTests);
router.get("/instructions", (req, res) => {
    res.sendFile(
        path.join(__dirname, "../../frontend/pages/instructions.html")
    );
});
router.get("/instructions/:testId",authenticateUser,instructionsPage);

module.exports = router;