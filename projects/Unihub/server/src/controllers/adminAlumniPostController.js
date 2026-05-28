// server/src/controllers/adminAlumniPostController.js
const AlumniPost = require("../models/AlumniPost");

const ALLOWED = ["pending", "approved", "rejected", "all"];

// GET /api/admin/alumni-posts?status=pending|approved|rejected|all
async function listAlumniPosts(req, res, next) {
  try {
    const status = (req.query.status || "pending").toLowerCase();

    if (!ALLOWED.includes(status)) {
      return res.status(400).json({ message: "Invalid status filter" });
    }

    const query = status === "all" ? {} : { status };

    const posts = await AlumniPost.find(query)
      .populate("postedBy", "name email role bio linkedin github instagram")
      .populate("reviewedBy", "name email role")
      .sort({ createdAt: -1 });

    res.json({ posts });
  } catch (err) {
    next(err);
  }
}

// PATCH /api/admin/alumni-posts/:id/approve
async function approveAlumniPost(req, res, next) {
  try {
    const { id } = req.params;

    const updated = await AlumniPost.findByIdAndUpdate(
      id,
      { status: "approved", reviewedBy: req.user.userId },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Post not found" });

    res.json({ post: updated });
  } catch (err) {
    next(err);
  }
}

// PATCH /api/admin/alumni-posts/:id/reject
async function rejectAlumniPost(req, res, next) {
  try {
    const { id } = req.params;

    const updated = await AlumniPost.findByIdAndUpdate(
      id,
      { status: "rejected", reviewedBy: req.user.userId },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Post not found" });

    res.json({ post: updated });
  } catch (err) {
    next(err);
  }
}

module.exports = { listAlumniPosts, approveAlumniPost, rejectAlumniPost };