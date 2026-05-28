const jwt = require("jsonwebtoken");
const env = require("../config/env");

// Keeps token logic DRY across auth controller.
function signToken(user) {
  return jwt.sign(
    {
      userId: user._id.toString(),
      role: user.role,
      email: user.email,
      name: user.name,
    },
    env.JWT_SECRET,
    { expiresIn: env.JWT_EXPIRES_IN }
  );
}

module.exports = { signToken };