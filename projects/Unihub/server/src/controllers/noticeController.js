const Notice = require("../models/Notice");

// POST /api/notices (Teacher only)
async function createNotice(req, res, next) {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "title and content are required" });
    }

    const notice = await Notice.create({
      title,
      content,
      createdBy: req.user.userId,
    });

    res.status(201).json({ notice });
  } catch (err) {
    next(err);
  }
}

// GET /api/notices (Any logged-in)
async function listNotices(req, res, next) {
  try {
    const { q, sort } = req.query;

    const query = {};
    if (q) {
      const rx = new RegExp(q, "i");
      query.$or = [{ title: rx }, { content: rx }];
    }

    const sortOrder = sort === "oldest" ? { createdAt: 1 } : { createdAt: -1 };

    const notices = await Notice.find(query)
      .populate("createdBy", "name email role")
      .sort(sortOrder);

    res.json({ notices });
  } catch (err) {
    next(err);
  }
}

module.exports = { createNotice, listNotices };