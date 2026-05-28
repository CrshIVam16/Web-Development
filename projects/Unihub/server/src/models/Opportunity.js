const mongoose = require("mongoose");

const TYPES = ["Internship", "Scholarship"];
const STATUSES = ["pending", "approved", "rejected"];
const COURSES = ["Any", "BBA", "BCA", "BCOM", "BJMC", "MBA", "MCA", "Others"];

const opportunitySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    type: { type: String, enum: TYPES, required: true },

    description: { type: String, required: true, trim: true },
    eligibility: { type: String, required: true, trim: true },
    eligibleCourses: {
      type: [String],
      enum: COURSES,
      default: ["Any"],
    },
    deadline: { type: Date, required: true },

    link: { type: String, trim: true, default: "" },
    attachmentPath: { type: String, trim: true, default: "" },

    status: { type: String, enum: STATUSES, default: "pending" },

    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Opportunity", opportunitySchema);