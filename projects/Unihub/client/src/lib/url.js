// src/lib/url.js

/**
 * Returns server origin (without /api) so we can build file URLs like:
 *   `${serverOrigin}${filePathFromAPI}`
 *
 * Example:
 *   VITE_API_BASE = "http://localhost:5000/api"
 *   => serverOrigin = "http://localhost:5000"
 */
export function getServerOrigin() {
  const base = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";
  return base.replace(/\/api\/?$/, "");
}

/**
 * Build a full URL for a stored file path returned by API (e.g. "/uploads/...").
 * Safe for empty/null paths.
 */
export function fileUrl(filePath) {
  if (!filePath) return "";
  return `${getServerOrigin()}${filePath}`;
}