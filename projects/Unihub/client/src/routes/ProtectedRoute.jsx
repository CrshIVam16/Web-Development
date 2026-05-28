import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Wrap protected pages with this component.
// Optionally restrict to specific roles.
export default function ProtectedRoute({ children, roles }) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) return <Navigate to="/" replace />;

  if (roles?.length && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}