const mongoose = require("mongoose");

// Stores metadata only. Actual file stays in /uploads on server.
const materialSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    subject: { type: String, required: true, trim: true },
    semester: { type: Number, required: true, min: 1 },

    filePath: { type: String, required: true }, // e.g. /uploads/materials/abc.pdf
    fileType: { type: String, required: true }, // mime type

    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Material", materialSchema);