// src/App.jsx
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
import { HOME_BY_ROLE } from "./lib/constants";

// Public pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Unauthorized from "./pages/Unauthorized";

// Dashboards
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import AlumniDashboard from "./pages/AlumniDashboard";
import AdminDashboard from "./pages/AdminDashboard";

// Feature pages (existing)
import UploadMaterial from "./pages/UploadMaterial";
import Materials from "./pages/Materials";
import CreateNotice from "./pages/CreateNotice";
import Notices from "./pages/Notices";
import SubmitOpportunity from "./pages/SubmitOpportunity";
import MyOpportunities from "./pages/MyOpportunities";
import AdminPendingOpportunities from "./pages/AdminPendingOpportunities";
import Opportunities from "./pages/Opportunities";
import Profile from "./pages/Profile";

// NEW pages (add these files next)
import Guidance from "./pages/Guidance";
import CreateGuidance from "./pages/CreateGuidance";
import AlumniPosts from "./pages/AlumniPosts";
import SubmitAlumniPost from "./pages/SubmitAlumniPost";
import MyAlumniPosts from "./pages/MyAlumniPosts";
import AdminPendingAlumniPosts from "./pages/AdminPendingAlumniPosts";

function PublicHome() {
  const { isAuthenticated, user } = useAuth();
  if (isAuthenticated) return <Navigate to={HOME_BY_ROLE[user.role] || "/login"} replace />;
  return <Landing />;
}

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<PublicHome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Profile */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* Guidance (all authenticated users can view) */}
      <Route
        path="/guidance"
        element={
          <ProtectedRoute>
            <Guidance />
          </ProtectedRoute>
        }
      />

      {/* Dashboards */}
      <Route
        path="/student"
        element={
          <ProtectedRoute roles={["Student"]}>
            <StudentDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/teacher"
        element={
          <ProtectedRoute roles={["Teacher"]}>
            <TeacherDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/alumni"
        element={
          <ProtectedRoute roles={["Alumni"]}>
            <AlumniDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute roles={["Admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* Teacher routes */}
      <Route
        path="/teacher/upload"
        element={
          <ProtectedRoute roles={["Teacher"]}>
            <UploadMaterial />
          </ProtectedRoute>
        }
      />
      <Route
        path="/teacher/notices/new"
        element={
          <ProtectedRoute roles={["Teacher"]}>
            <CreateNotice />
          </ProtectedRoute>
        }
      />

      {/* Student routes */}
      <Route
        path="/student/materials"
        element={
          <ProtectedRoute roles={["Student"]}>
            <Materials />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/notices"
        element={
          <ProtectedRoute roles={["Student"]}>
            <Notices />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/opportunities"
        element={
          <ProtectedRoute roles={["Student"]}>
            <Opportunities />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/alumni-posts"
        element={
          <ProtectedRoute roles={["Student"]}>
            <AlumniPosts />
          </ProtectedRoute>
        }
      />

      {/* Alumni routes */}
      <Route
        path="/alumni/opportunities/new"
        element={
          <ProtectedRoute roles={["Alumni"]}>
            <SubmitOpportunity />
          </ProtectedRoute>
        }
      />
      <Route
        path="/alumni/opportunities/mine"
        element={
          <ProtectedRoute roles={["Alumni"]}>
            <MyOpportunities />
          </ProtectedRoute>
        }
      />
      <Route
        path="/alumni/posts/new"
        element={
          <ProtectedRoute roles={["Alumni"]}>
            <SubmitAlumniPost />
          </ProtectedRoute>
        }
      />
      <Route
        path="/alumni/posts/mine"
        element={
          <ProtectedRoute roles={["Alumni"]}>
            <MyAlumniPosts />
          </ProtectedRoute>
        }
      />

      {/* Admin routes */}
      <Route
        path="/admin/opportunities/pending"
        element={
          <ProtectedRoute roles={["Admin"]}>
            <AdminPendingOpportunities />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/alumni-posts/pending"
        element={
          <ProtectedRoute roles={["Admin"]}>
            <AdminPendingAlumniPosts />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/guidance/new"
        element={
          <ProtectedRoute roles={["Admin"]}>
            <CreateGuidance />
          </ProtectedRoute>
        }
      />

      {/* 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}