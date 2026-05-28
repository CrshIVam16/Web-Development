const Material = require("../models/Material");
const Notice = require("../models/Notice");
const Opportunity = require("../models/Opportunity");

async function getOverview(req, res, next) {
  try {
    const { role, userId } = req.user;

    // Helper: common selects
    const recentMaterialsSelect = "title subject semester createdAt filePath";
    const recentNoticesSelect = "title createdAt";
    const recentOppSelect = "title type status deadline createdAt link attachmentPath postedBy";

    if (role === "Student") {
      const [materialsCount, noticesCount, opportunitiesCount, recentMaterials, recentNotices, recentOpportunities] =
        await Promise.all([
          Material.countDocuments(),
          Notice.countDocuments(),
          Opportunity.countDocuments({ status: "approved" }),
          Material.find().sort({ createdAt: -1 }).limit(5).select(recentMaterialsSelect),
          Notice.find().sort({ createdAt: -1 }).limit(5).select(recentNoticesSelect),
          Opportunity.find({ status: "approved" })
            .sort({ createdAt: -1 })
            .limit(5)
            .select(recentOppSelect)
            .populate("postedBy", "name linkedin github instagram"),
        ]);

      return res.json({
        role,
        stats: { materialsCount, noticesCount, opportunitiesCount },
        recent: { materials: recentMaterials, notices: recentNotices, opportunities: recentOpportunities },
      });
    }

    if (role === "Teacher") {
      const [myMaterialsCount, myNoticesCount, recentMaterials, recentNotices] = await Promise.all([
        Material.countDocuments({ uploadedBy: userId }),
        Notice.countDocuments({ createdBy: userId }),
        Material.find({ uploadedBy: userId }).sort({ createdAt: -1 }).limit(5).select(recentMaterialsSelect),
        Notice.find({ createdBy: userId }).sort({ createdAt: -1 }).limit(5).select(recentNoticesSelect),
      ]);

      return res.json({
        role,
        stats: { myMaterialsCount, myNoticesCount },
        recent: { materials: recentMaterials, notices: recentNotices },
      });
    }

    if (role === "Alumni") {
      const [pending, approved, rejected, recentSubmissions] = await Promise.all([
        Opportunity.countDocuments({ postedBy: userId, status: "pending" }),
        Opportunity.countDocuments({ postedBy: userId, status: "approved" }),
        Opportunity.countDocuments({ postedBy: userId, status: "rejected" }),
        Opportunity.find({ postedBy: userId }).sort({ createdAt: -1 }).limit(5).select(recentOppSelect),
      ]);

      return res.json({
        role,
        stats: { pending, approved, rejected },
        recent: { submissions: recentSubmissions },
      });
    }

    if (role === "Admin") {
      const [pending, approved, rejected, recentPending, recentReviewed] = await Promise.all([
        Opportunity.countDocuments({ status: "pending" }),
        Opportunity.countDocuments({ status: "approved" }),
        Opportunity.countDocuments({ status: "rejected" }),
        Opportunity.find({ status: "pending" })
          .sort({ createdAt: -1 })
          .limit(5)
          .select(recentOppSelect)
          .populate("postedBy", "name"),
        Opportunity.find({ status: { $in: ["approved", "rejected"] } })
          .sort({ updatedAt: -1 })
          .limit(5)
          .select(recentOppSelect)
          .populate("postedBy", "name")
          .populate("reviewedBy", "name"),
      ]);

      return res.json({
        role,
        stats: { pending, approved, rejected },
        recent: { pending: recentPending, reviewed: recentReviewed },
      });
    }

    return res.status(400).json({ message: "Unknown role" });
  } catch (err) {
    next(err);
  }
}

module.exports = { getOverview };