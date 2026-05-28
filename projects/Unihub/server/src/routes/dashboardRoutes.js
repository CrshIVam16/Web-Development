const express = require("express");
const auth = require("../middleware/auth");
const { getOverview } = require("../controllers/dashboardController");

const router = express.Router();

// Role-based dashboard data
router.get("/overview", auth, getOverview);

module.exports = router;