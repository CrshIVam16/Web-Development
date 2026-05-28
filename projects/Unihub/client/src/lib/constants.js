// src/lib/constants.js

// Single source of truth for role-based home routes
export const HOME_BY_ROLE = {
  Student: "/student",
  Teacher: "/teacher",
  Alumni: "/alumni",
  Admin: "/admin",
};

// Common course list used in opportunity submit + filter UI
// Note: "Any" is handled as a fallback internally, not shown as a checkbox option.
export const COURSE_OPTIONS = ["BBA", "BCA", "BCOM", "BJMC", "MBA", "MCA", "Others"];