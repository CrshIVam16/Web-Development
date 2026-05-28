const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { signToken } = require("../utils/token");

// POST /api/auth/register
async function register(req, res, next) {
  try {
    const { name, email, password, role, department, semester } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Student must provide department + semester (as per SRS)
    if (role === "Student") {
      if (!department || !semester) {
        return res
          .status(400)
          .json({ message: "Student must provide department and semester" });
      }
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) return res.status(409).json({ message: "Email already registered" });

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      passwordHash,
      role,
      department: department || "",
      semester: role === "Student" ? Number(semester) : null,
    });

    res.status(201).json({ user });
  } catch (err) {
    next(err);
  }
}

// POST /api/auth/login
async function login(req, res, next) {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ message: "Email, password and role are required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    // Role dropdown integrity check
    if (user.role !== role) {
      return res.status(401).json({ message: "Role mismatch" });
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const token = signToken(user);

    res.json({ token, user: user.toJSON() });
  } catch (err) {
    next(err);
  }
}

module.exports = { register, login };