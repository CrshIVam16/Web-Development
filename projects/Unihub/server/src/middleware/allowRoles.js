// src/middleware/allowRoles.js

/**
 * RBAC middleware: allow only specific roles to access a route.
 * Usage: router.get("/path", auth, allowRoles("Admin"), handler)
 */
function allowRoles(...roles) {
  return (req, res, next) => {
    if (!req.user?.role) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden: insufficient role" });
    }

    next();
  };
}

module.exports = allowRoles;