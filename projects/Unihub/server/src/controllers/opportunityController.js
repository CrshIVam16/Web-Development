// src/controllers/opportunityController.js
const Opportunity = require("../models/Opportunity");

// POST /api/opportunities  (Alumni)
async function submitOpportunity(req, res, next) {
  try {
    const {
      title,
      type,
      description,
      eligibility,
      deadline,
      link,
      eligibleCourses,
    } = req.body;

    if (!title || !type || !description || !eligibility || !deadline) {
      return res.status(400).json({
        message: "title, type, description, eligibility, deadline are required",
      });
    }

    const attachmentPath = req.file
      ? `/uploads/opportunities/${req.file.filename}`
      : "";

    const ALLOWED_COURSES = [
      "Any",
      "BBA",
      "BCA",
      "BCOM",
      "BJMC",
      "MBA",
      "MCA",
      "Others",
    ];

    // From multipart/form-data, eligibleCourses will come as a string.
    // We'll accept: "BCA,MCA" or "Any" etc.
    let courses = [];

    if (typeof eligibleCourses === "string" && eligibleCourses.trim()) {
      courses = eligibleCourses
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    }

    // Default/fallback
    if (!courses.length) courses = ["Any"];

    // If specific courses selected, drop "Any"
    if (courses.length > 1 && courses.includes("Any")) {
      courses = courses.filter((c) => c !== "Any");
    }

    // Validate courses (only allow known values)
    courses = courses.filter((c) => ALLOWED_COURSES.includes(c));
    if (!courses.length) courses = ["Any"];

    const opportunity = await Opportunity.create({
      title,
      type,
      description,
      eligibility,
      eligibleCourses: courses,
      deadline: new Date(deadline),
      link: link || "",
      attachmentPath,
      status: "pending",
      postedBy: req.user.userId,
    });

    res.status(201).json({ opportunity });
  } catch (err) {
    next(err);
  }
}

// GET /api/opportunities (approved only)
async function listApprovedOpportunities(req, res, next) {
  try {
    const { q, type, sort, courses, hasAttachment } = req.query;

    const and = [{ status: "approved" }];

    if (type) and.push({ type });

    if (hasAttachment === "true") {
      and.push({ attachmentPath: { $ne: "" } });
    }

    // keyword search
    if (q) {
      const rx = new RegExp(q, "i");
      and.push({ $or: [{ title: rx }, { description: rx }] });
    }

    // course filter (selected + Any + backward compatibility)
    if (courses) {
      const selected = courses
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
        .filter((c) => c !== "Any"); // if UI ever sends Any, ignore it

      if (selected.length) {
        const inList = ["Any", ...selected];
        and.push({
          $or: [
            { eligibleCourses: { $in: inList } },
            { eligibleCourses: { $exists: false } }, // old records treated as Any
          ],
        });
      }
    }

    const mongoQuery = and.length === 1 ? and[0] : { $and: and };
    const sortOrder = sort === "oldest" ? { createdAt: 1 } : { createdAt: -1 };

    const opportunities = await Opportunity.find(mongoQuery)
      .populate("postedBy", "name role bio linkedin github instagram")
      .sort(sortOrder);

    res.json({ opportunities });
  } catch (err) {
    next(err);
  }
}

// GET /api/opportunities/mine?status=pending|approved|rejected|all
async function listMyOpportunities(req, res, next) {
  try {
    const status = (req.query.status || "all").toLowerCase();
    const allowed = ["pending", "approved", "rejected", "all"];
    if (!allowed.includes(status)) {
      return res.status(400).json({ message: "Invalid status filter" });
    }

    const base = { postedBy: req.user.userId };
    const query = status === "all" ? base : { ...base, status };

    const opportunities = await Opportunity.find(query).sort({ createdAt: -1 });
    res.json({ opportunities });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  submitOpportunity,
  listApprovedOpportunities,
  listMyOpportunities,
};