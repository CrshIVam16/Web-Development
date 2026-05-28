// Loads environment variables and provides a single place for config defaults.
const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.join(process.cwd(), ".env") });

function required(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env var: ${name}`);
  return value;
}

function parseOrigins(value) {
  // supports comma-separated list
  return (value || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: Number(process.env.PORT || 5000),
  MONGO_URI: required("MONGO_URI"),
  JWT_SECRET: required("JWT_SECRET"),
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",

  // NEW: allow multiple origins (comma-separated)
  // Backward compatible: if CORS_ORIGINS not set, fall back to CORS_ORIGIN
  CORS_ORIGINS: parseOrigins(
    process.env.CORS_ORIGINS || process.env.CORS_ORIGIN || "http://localhost:5173"
  ),
};

module.exports = env;