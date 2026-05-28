// src/pages/Unauthorized.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { HOME_BY_ROLE } from "../lib/constants";
import ThemeSwitch from "../components/ThemeSwitch";

/**
 * Shown when a logged-in user tries to open a route not allowed for their role.
 * ProtectedRoute redirects here on role mismatch.
 */
export default function Unauthorized() {
  const { user, logout, isAuthenticated } = useAuth();

  const backTo = user?.role ? HOME_BY_ROLE[user.role] : "/";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-50 px-4">
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-semibold">Unauthorized</h1>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              You don’t have access to this page.
            </p>
          </div>
          <ThemeSwitch />
        </div>

        {isAuthenticated ? (
          <div className="mt-4 text-sm text-gray-700 dark:text-gray-200">
            Signed in as{" "}
            <span className="font-medium">
              {user?.name} ({user?.role})
            </span>
            .
          </div>
        ) : (
          <div className="mt-4 text-sm text-gray-700 dark:text-gray-200">
            You are not logged in.
          </div>
        )}

        <div className="mt-5 flex flex-wrap gap-2">
          <Link className="btn-primary" to={backTo}>
            Go to dashboard
          </Link>

          {!isAuthenticated ? (
            <Link className="btn-outline" to="/login">
              Login
            </Link>
          ) : (
            <button className="btn-outline" type="button" onClick={logout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
}