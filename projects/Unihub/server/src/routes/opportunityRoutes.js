const express = require("express");
const auth = require("../middleware/auth");
const allowRoles = require("../middleware/allowRoles");

const { uploadOpportunityAttachment } = require("../utils/upload");
const {
  submitOpportunity,
  listApprovedOpportunities,
  listMyOpportunities,
} = require("../controllers/opportunityController");

const router = express.Router();

/**
 * GET /api/opportunities
 * Returns only approved opportunities (student view)
 */
router.get("/", auth, listApprovedOpportunities);

/**
 * GET /api/opportunities/mine?status=all|pending|approved|rejected
 * Returns alumni's own submissions (status-wise)
 */
router.get("/mine", auth, allowRoles("Alumni"), listMyOpportunities);

/**
 * POST /api/opportunities
 * Alumni submits an opportunity (multipart/form-data)
 * Optional file field name: attachment
 */
router.post(
  "/",
  auth,
  allowRoles("Alumni"),
  uploadOpportunityAttachment.single("attachment"),
  submitOpportunity
);

module.exports = router;