// src/lib/nav.js
// Central place for sidebar navigation (role-based)
export function getNavItems(role) {
  // Common items for all authenticated users
  const common = [
    { label: "Profile", path: "/profile" },
    { label: "Guidance", path: "/guidance" }, // NEW (admin creates, everyone views)
  ];

  const student = [
    { label: "Dashboard", path: "/student" },
    { label: "Materials", path: "/student/materials" },
    { label: "Notices", path: "/student/notices" },
    { label: "Opportunities", path: "/student/opportunities" },
    { label: "Alumni Posts", path: "/student/alumni-posts" }, // NEW
  ];

  const teacher = [
    { label: "Dashboard", path: "/teacher" },
    { label: "Upload Material", path: "/teacher/upload" },
    { label: "Create Notice", path: "/teacher/notices/new" },
  ];

  const alumni = [
    { label: "Dashboard", path: "/alumni" },
    { label: "Submit Opportunity", path: "/alumni/opportunities/new" },
    { label: "My Submissions", path: "/alumni/opportunities/mine" },
    { label: "Submit Alumni Post", path: "/alumni/posts/new" }, // NEW
    { label: "My Alumni Posts", path: "/alumni/posts/mine" }, // NEW
  ];

  const admin = [
    { label: "Dashboard", path: "/admin" },
    { label: "Opportunities", path: "/admin/opportunities/pending" },
    { label: "Alumni Posts", path: "/admin/alumni-posts/pending" }, // NEW
    { label: "Create Guidance", path: "/admin/guidance/new" }, // NEW
  ];

  switch (role) {
    case "Student":
      return [...student, ...common];
    case "Teacher":
      return [...teacher, ...common];
    case "Alumni":
      return [...alumni, ...common];
    case "Admin":
      return [...admin, ...common];
    default:
      return common;
  }
}