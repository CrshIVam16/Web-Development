const fs = require("fs");
const path = require("path");
const multer = require("multer");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function makeUploader({ folderName }) {
  const DIR = path.join(process.cwd(), "uploads", folderName);
  ensureDir(DIR);

  const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, DIR),
    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname) || "";
      const safeExt = ext.toLowerCase();
      const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}${safeExt}`;
      cb(null, unique);
    },
  });

  function fileFilter(_req, file, cb) {
    const allowed =
      file.mimetype === "application/pdf" || file.mimetype.startsWith("image/");
    if (!allowed) return cb(new Error("Only PDF and image files are allowed"));
    cb(null, true);
  }

  return multer({
    storage,
    fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  });
}

const uploadMaterial = makeUploader({ folderName: "materials" });
const uploadOpportunityAttachment = makeUploader({ folderName: "opportunities" });

module.exports = { uploadMaterial, uploadOpportunityAttachment };