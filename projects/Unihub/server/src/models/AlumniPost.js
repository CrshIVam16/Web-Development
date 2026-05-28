// server/src/models/AlumniPost.js
const mongoose = require("mongoose");

const STATUSES = ["pending", "approved", "rejected"];

const alumniPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true },

    status: { type: String, enum: STATUSES, default: "pending" },

    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AlumniPost", alumniPostSchema);