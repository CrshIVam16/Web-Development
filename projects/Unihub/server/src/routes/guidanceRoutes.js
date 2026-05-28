// server/src/routes/guidanceRoutes.js
const express = require("express");
const auth = require("../middleware/auth");
const allowRoles = require("../middleware/allowRoles");
const { createGuidance, listGuidance } = require("../controllers/guidanceController");

const router = express.Router();

// Any logged-in user can view
router.get("/", auth, listGuidance);

// Admin creates guidance
router.post("/", auth, allowRoles("Admin"), createGuidance);

module.exports = router;