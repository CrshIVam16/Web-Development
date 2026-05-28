// server/src/controllers/guidanceController.js
const Guidance = require("../models/Guidance");

// POST /api/guidance (Admin only)
async function createGuidance(req, res, next) {
  try {
    const { title, category, content } = req.body;

    if (!title || !category || !content) {
      return res.status(400).json({ message: "title, category, content are required" });
    }

    const entry = await Guidance.create({
      title,
      category,
      content,
      createdBy: req.user.userId,
    });

    res.status(201).json({ guidance: entry });
  } catch (err) {
    next(err);
  }
}

// GET /api/guidance (any authenticated)
async function listGuidance(req, res, next) {
  try {
    const { q, category, sort } = req.query;

    const query = {};
    if (category) query.category = category;

    if (q) {
      const rx = new RegExp(q, "i");
      query.$or = [{ title: rx }, { category: rx }, { content: rx }];
    }

    const sortOrder = sort === "oldest" ? { createdAt: 1 } : { createdAt: -1 };

    const items = await Guidance.find(query)
      .populate("createdBy", "name role")
      .sort(sortOrder);

    res.json({ guidance: items });
  } catch (err) {
    next(err);
  }
}

module.exports = { createGuidance, listGuidance };