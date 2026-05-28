const Material = require("../models/Material");
const User = require("../models/User");

// Small helper to keep filtering logic DRY
async function buildQuery({ q, semester, fileKind }) {
  const query = {};

  // semester filter (optional)
  if (semester) query.semester = Number(semester);

  // file kind filter
  if (fileKind === "pdf") query.fileType = "application/pdf";
  if (fileKind === "image") query.fileType = { $regex: "^image/" };

  if (q) {
    const rx = new RegExp(q, "i");

    // Find teachers whose name matches the query (so user can search by uploader)
    const teachers = await User.find({ role: "Teacher", name: rx }).select("_id");
    const teacherIds = teachers.map((t) => t._id);

    query.$or = [
      { title: rx },
      { subject: rx },
      ...(teacherIds.length ? [{ uploadedBy: { $in: teacherIds } }] : []),
    ];
  }

  return query;
}

// POST /api/materials (Teacher only) + Multer file
async function createMaterial(req, res, next) {
  try {
    const { title, subject, semester } = req.body;

    if (!title || !subject || !semester) {
      return res.status(400).json({ message: "title, subject, semester are required" });
    }
    const semNum = Number(semester);
    if (!Number.isFinite(semNum) || semNum < 1) {
      return res.status(400).json({ message: "semester must be a number >= 1" });
    }
    if (!req.file) {
      return res.status(400).json({ message: "Material file is required (PDF/image)" });
    }

    const filePath = `/uploads/materials/${req.file.filename}`;

    const material = await Material.create({
      title,
      subject,
      semester: semNum,
      filePath,
      fileType: req.file.mimetype,
      uploadedBy: req.user.userId,
    });

    res.status(201).json({ material });
  } catch (err) {
    next(err);
  }
}

// GET /api/materials (Any logged-in) with optional filters
async function listMaterials(req, res, next) {
  try {
    const { q, semester, fileKind, sort } = req.query;

    const query = await buildQuery({ q, semester, fileKind });

    const sortOrder = sort === "oldest" ? { createdAt: 1 } : { createdAt: -1 };

    const materials = await Material.find(query)
      .populate("uploadedBy", "name email role")
      .sort(sortOrder);

    res.json({ materials });
  } catch (err) {
    next(err);
  }
}

// GET /api/materials/mine (Teacher only)
async function listMyMaterials(req, res, next) {
  try {
    const { q, semester, fileKind, sort } = req.query;

    const query = await buildQuery({ q, semester, fileKind });
    query.uploadedBy = req.user.userId;

    const sortOrder = sort === "oldest" ? { createdAt: 1 } : { createdAt: -1 };

    const materials = await Material.find(query).sort(sortOrder);
    res.json({ materials });
  } catch (err) {
    next(err);
  }
}

module.exports = { createMaterial, listMaterials, listMyMaterials };