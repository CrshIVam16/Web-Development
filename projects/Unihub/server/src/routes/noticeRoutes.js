const express = require("express");
const auth = require("../middleware/auth");
const allowRoles = require("../middleware/allowRoles");
const { createNotice, listNotices } = require("../controllers/noticeController");

const router = express.Router();

// List (any logged-in user)
router.get("/", auth, listNotices);

// Create (teacher only)
router.post("/", auth, allowRoles("Teacher"), createNotice);

module.exports = router;