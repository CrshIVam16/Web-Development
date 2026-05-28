// server/src/routes/alumniPostRoutes.js
const express = require("express");
const auth = require("../middleware/auth");
const allowRoles = require("../middleware/allowRoles");
const {
  submitAlumniPost,
  listApprovedAlumniPosts,
  listMyAlumniPosts,
} = require("../controllers/alumniPostController");

const router = express.Router();

// Approved posts (visible to any logged-in user)
router.get("/", auth, listApprovedAlumniPosts);

// Alumni: my posts
router.get("/mine", auth, allowRoles("Alumni"), listMyAlumniPosts);

// Alumni: submit post (pending)
router.post("/", auth, allowRoles("Alumni"), submitAlumniPost);

module.exports = router;