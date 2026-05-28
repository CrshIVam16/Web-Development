const mongoose = require("mongoose");

const ROLES = ["Student", "Teacher", "Alumni", "Admin"];

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },

    passwordHash: { type: String, required: true },

    role: { type: String, enum: ROLES, required: true },

    // Student-specific fields (enforced during registration logic)
    department: { type: String, trim: true, default: "" },
    semester: { type: Number, default: null },

    // NEW: profile/social fields (mainly useful for Alumni)
    bio: { type: String, trim: true, default: "" },
    linkedin: { type: String, trim: true, default: "" },
    github: { type: String, trim: true, default: "" },
    instagram: { type: String, trim: true, default: "" },
  },
  { timestamps: true }
);

// Hide passwordHash in API responses
userSchema.set("toJSON", {
  transform: function (_doc, ret) {
    delete ret.passwordHash;
    return ret;
  },
});

module.exports = mongoose.model("User", userSchema);