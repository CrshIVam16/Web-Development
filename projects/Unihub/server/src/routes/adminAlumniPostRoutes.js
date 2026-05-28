// server/src/routes/adminAlumniPostRoutes.js
const express = require("express");
const auth = require("../middleware/auth");
const allowRoles = require("../middleware/allowRoles");
const {
  listAlumniPosts,
  approveAlumniPost,
  rejectAlumniPost,
} = require("../controllers/adminAlumniPostController");

const router = express.Router();

router.get("/alumni-posts", auth, allowRoles("Admin"), listAlumniPosts);
router.patch("/alumni-posts/:id/approve", auth, allowRoles("Admin"), approveAlumniPost);
router.patch("/alumni-posts/:id/reject", auth, allowRoles("Admin"), rejectAlumniPost);

module.exports = router;