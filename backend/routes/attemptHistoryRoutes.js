const express = require("express");
const router = express.Router();

const {authenticateUser} = require("../middlewares/authMiddleware.js");
const {historyPage,getHistory} = require("../controllers/historyController.js");

router.get("/history",authenticateUser,historyPage);
router.get("/api/history",authenticateUser,getHistory);

module.exports = router;
