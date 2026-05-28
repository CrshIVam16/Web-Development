const express = require("express");
const auth = require("../middleware/auth");
const allowRoles = require("../middleware/allowRoles");

const {
  listOpportunities,
  approveOpportunity,
  rejectOpportunity,
} = require("../controllers/adminOpportunityController");

const router = express.Router();

// Admin history (pending/approved/rejected/all)
router.get("/opportunities", auth, allowRoles("Admin"), listOpportunities);

// Admin actions
router.patch("/opportunities/:id/approve", auth, allowRoles("Admin"), approveOpportunity);
router.patch("/opportunities/:id/reject", auth, allowRoles("Admin"), rejectOpportunity);

module.exports = router;