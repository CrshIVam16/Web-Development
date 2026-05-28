const env = require("../config/env");

// Central error handler (keeps responses consistent)
function errorHandler(err, req, res, next) {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // Common Mongo/Mongoose errors (optional but helpful)
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Validation error";
  }
  if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid ID format";
  }

  // JWT errors
  if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Unauthorized: invalid or expired token";
  }

  res.status(statusCode).json({
    message,
    // Stack only in development (avoid leaking details)
    ...(env.NODE_ENV === "development" && { stack: err.stack }),
  });
}

module.exports = errorHandler;