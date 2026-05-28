const User = require("../models/User");

// GET /api/profile/me
async function getMe(req, res, next) {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ user: user.toJSON() });
  } catch (err) {
    next(err);
  }
}

// PATCH /api/profile/me
async function updateMe(req, res, next) {
  try {
    const allowed = [
      "name",
      "department",
      "semester",
      "bio",
      "linkedin",
      "github",
      "instagram",
    ];

    const updates = {};
    for (const key of allowed) {
      if (req.body[key] !== undefined) updates[key] = req.body[key];
    }

    // Keep semester numeric if provided
    if (updates.semester !== undefined && updates.semester !== null && updates.semester !== "") {
      updates.semester = Number(updates.semester);
    }

    const user = await User.findByIdAndUpdate(req.user.userId, updates, { new: true });
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ user: user.toJSON() });
  } catch (err) {
    next(err);
  }
}

module.exports = { getMe, updateMe };