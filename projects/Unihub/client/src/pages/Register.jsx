// src/pages/Register.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ThemeSwitch from "../components/ThemeSwitch";
import Alert from "../components/Alert"; // DRY

export default function Register() {
  const navigate = useNavigate();
  const { register, loading } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Student");
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const isStudent = role === "Student";

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const payload = { name, email, password, role };

      if (isStudent) {
        payload.department = department;
        payload.semester = semester;
      } else {
        if (department) payload.department = department; // optional
      }

      await register(payload);
      setSuccess("Registration successful. Please login.");
      setTimeout(() => navigate("/login"), 700);
    } catch (err) {
      setError(err.message || "Registration failed");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-50">
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Create account</h1>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Register to use UniHub
            </p>
          </div>
          <ThemeSwitch />
        </div>

        <div className="mt-4 space-y-3">
          <Alert variant="error">{error}</Alert>
          <Alert variant="success">{success}</Alert>
        </div>

        <form onSubmit={onSubmit} className="mt-5 space-y-4">
          <div>
            <label className="text-sm font-medium">Name</label>
            <input
              className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 dark:border-gray-800 dark:bg-gray-950"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 dark:border-gray-800 dark:bg-gray-950"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@college.com"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">Role</label>
            <select
              className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 dark:border-gray-800 dark:bg-gray-950"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option>Student</option>
              <option>Teacher</option>
              <option>Alumni</option>
            </select>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Admin accounts are created separately.
            </p>
          </div>

          <div>
            <label className="text-sm font-medium">Department</label>
            <input
              className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 dark:border-gray-800 dark:bg-gray-950"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              placeholder="e.g., BCA / CSE"
              required={isStudent}
            />
          </div>

          {isStudent ? (
            <div>
              <label className="text-sm font-medium">Semester</label>
              <input
                className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 dark:border-gray-800 dark:bg-gray-950"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                placeholder="e.g., 4"
                required
              />
            </div>
          ) : null}

          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 dark:border-gray-800 dark:bg-gray-950"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              required
            />
          </div>

          <button
            disabled={loading}
            className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
            type="submit"
          >
            {loading ? "Creating..." : "Register"}
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link className="text-indigo-600 hover:underline" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}