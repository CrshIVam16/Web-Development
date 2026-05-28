const Opportunity = require("../models/Opportunity");

const ALLOWED = ["pending", "approved", "rejected", "all"];

// GET /api/admin/opportunities?status=pending|approved|rejected|all
async function listOpportunities(req, res, next) {
  try {
    const status = (req.query.status || "pending").toLowerCase();

    if (!ALLOWED.includes(status)) {
      return res.status(400).json({ message: "Invalid status filter" });
    }

    const query = status === "all" ? {} : { status };

    const opportunities = await Opportunity.find(query)
      .populate("postedBy", "name email role bio linkedin github instagram")
      .populate("reviewedBy", "name email role")
      .sort({ createdAt: -1 });

    res.json({ opportunities });
  } catch (err) {
    next(err);
  }
}

// PATCH /api/admin/opportunities/:id/approve
async function approveOpportunity(req, res, next) {
  try {
    const { id } = req.params;

    const updated = await Opportunity.findByIdAndUpdate(
      id,
      { status: "approved", reviewedBy: req.user.userId },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Opportunity not found" });

    res.json({ opportunity: updated });
  } catch (err) {
    next(err);
  }
}

// PATCH /api/admin/opportunities/:id/reject
async function rejectOpportunity(req, res, next) {
  try {
    const { id } = req.params;

    const updated = await Opportunity.findByIdAndUpdate(
      id,
      { status: "rejected", reviewedBy: req.user.userId },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Opportunity not found" });

    res.json({ opportunity: updated });
  } catch (err) {
    next(err);
  }
}

module.exports = { listOpportunities, approveOpportunity, rejectOpportunity };