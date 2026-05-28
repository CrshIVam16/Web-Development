const express = require("express");
const auth = require("../middleware/auth");
const allowRoles = require("../middleware/allowRoles");
const { uploadMaterial } = require("../utils/upload");
const {
  createMaterial,
  listMaterials,
  listMyMaterials,
} = require("../controllers/materialController");

const router = express.Router();

// Any logged-in user can view materials
router.get("/", auth, listMaterials);

// Teacher can view their uploads (optional but useful)
router.get("/mine", auth, allowRoles("Teacher"), listMyMaterials);

// Teacher upload (multipart/form-data)
router.post(
  "/",
  auth,
  allowRoles("Teacher"),
  uploadMaterial.single("file"),
  createMaterial
);

module.exports = router;