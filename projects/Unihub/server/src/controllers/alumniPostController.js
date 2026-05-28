// server/src/controllers/alumniPostController.js
const AlumniPost = require("../models/AlumniPost");

// POST /api/alumni-posts (Alumni)
async function submitAlumniPost(req, res, next) {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "title and content are required" });
    }

    const post = await AlumniPost.create({
      title,
      content,
      status: "pending",
      postedBy: req.user.userId,
    });

    res.status(201).json({ post });
  } catch (err) {
    next(err);
  }
}

// GET /api/alumni-posts (approved only)
async function listApprovedAlumniPosts(req, res, next) {
  try {
    const { q, sort } = req.query;

    const query = { status: "approved" };

    if (q) {
      const rx = new RegExp(q, "i");
      query.$or = [{ title: rx }, { content: rx }];
    }

    const sortOrder = sort === "oldest" ? { createdAt: 1 } : { createdAt: -1 };

    const posts = await AlumniPost.find(query)
      .populate("postedBy", "name role bio linkedin github instagram")
      .sort(sortOrder);

    res.json({ posts });
  } catch (err) {
    next(err);
  }
}

// GET /api/alumni-posts/mine?status=all|pending|approved|rejected
async function listMyAlumniPosts(req, res, next) {
  try {
    const status = (req.query.status || "all").toLowerCase();
    const allowed = ["pending", "approved", "rejected", "all"];
    if (!allowed.includes(status)) {
      return res.status(400).json({ message: "Invalid status filter" });
    }

    const base = { postedBy: req.user.userId };
    const query = status === "all" ? base : { ...base, status };

    const posts = await AlumniPost.find(query).sort({ createdAt: -1 });
    res.json({ posts });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  submitAlumniPost,
  listApprovedAlumniPosts,
  listMyAlumniPosts,
};