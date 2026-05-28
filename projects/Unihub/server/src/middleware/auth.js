const jwt = require("jsonwebtoken");
const env = require("../config/env");

// Verifies JWT and attaches user payload to req.user
function auth(req, res, next) {
  const header = req.headers.authorization || "";
  const [type, token] = header.split(" ");

  if (type !== "Bearer" || !token) {
    return res.status(401).json({ message: "Unauthorized: missing token" });
  }

  try {
    const payload = jwt.verify(token, env.JWT_SECRET);
    req.user = payload; // { userId, role, email, name }
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = auth;