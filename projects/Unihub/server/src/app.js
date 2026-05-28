const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

const env = require("./config/env");
const errorHandler = require("./middleware/errorHandler");
const authRoutes = require("./routes/authRoutes");
const materialRoutes = require("./routes/materialRoutes");
const noticeRoutes = require("./routes/noticeRoutes");
const opportunityRoutes = require("./routes/opportunityRoutes");
const adminOpportunityRoutes = require("./routes/adminOpportunityRoutes");
const profileRoutes = require("./routes/profileRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const alumniPostRoutes = require("./routes/alumniPostRoutes");
const adminAlumniPostRoutes = require("./routes/adminAlumniPostRoutes");
const guidanceRoutes = require("./routes/guidanceRoutes");

const app = express();

/** Core middleware */
app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true);

      // allow any localhost port in dev (prevents this issue forever)
      if (
        env.NODE_ENV === "development" &&
        /^http:\/\/localhost:\d+$/.test(origin)
      ) {
        return cb(null, true);
      }

      if (env.CORS_ORIGINS.includes(origin)) return cb(null, true);

      return cb(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan(env.NODE_ENV === "development" ? "dev" : "combined"));

/** Serve uploaded files (PDF/images) */
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

/** Health check */
app.get("/api/health", (req, res) => {
  res.json({ ok: true, service: "unihub-api" });
});

app.use("/api/auth", authRoutes);
app.use("/api/materials", materialRoutes);
app.use("/api/notices", noticeRoutes);
app.use("/api/opportunities", opportunityRoutes);
app.use("/api/admin", adminOpportunityRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/alumni-posts", alumniPostRoutes);
app.use("/api/guidance", guidanceRoutes);

// mount alongside existing /api/admin router
app.use("/api/admin", adminAlumniPostRoutes);

/**
 * API routes will be mounted here (added next):
 * /api/auth
 * /api/materials
 * /api/notices
 * /api/opportunities
 * /api/admin
 * /api/guidance
 * /api/search
 */

/** 404 handler */
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

/** Central error handler */
app.use(errorHandler);

module.exports = app;