// src/pages/Profile.jsx
import { useEffect, useState } from "react";
import AppLayout from "../layouts/AppLayout";
import { api } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import Alert from "../components/Alert"; // DRY alerts

const inputCls =
  "w-full rounded-lg border border-gray-300/70 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 dark:border-gray-800 dark:bg-gray-950";

export default function Profile() {
  const { user, setUser } = useAuth();

  const [form, setForm] = useState({
    name: "",
    department: "",
    semester: "",
    bio: "",
    linkedin: "",
    github: "",
    instagram: "",
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const isStudent = user?.role === "Student";
  const isAlumni = user?.role === "Alumni";

  useEffect(() => {
    let alive = true;

    async function load() {
      setLoading(true);
      setError("");
      try {
        const data = await api.get("/profile/me");
        if (!alive) return;

        const u = data.user;
        setForm({
          name: u.name || "",
          department: u.department || "",
          semester: u.semester ?? "",
          bio: u.bio || "",
          linkedin: u.linkedin || "",
          github: u.github || "",
          instagram: u.instagram || "",
        });
      } catch (err) {
        if (alive) setError(err.message || "Failed to load profile");
      } finally {
        if (alive) setLoading(false);
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    if (!success) return;
    const t = setTimeout(() => setSuccess(""), 2500);
    return () => clearTimeout(t);
  }, [success]);

  function setField(key, value) {
    setForm((p) => ({ ...p, [key]: value }));
  }

  async function onSave(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const payload = { ...form };
      const data = await api.patch("/profile/me", payload);
      setUser(data.user);
      setSuccess("Profile updated.");
    } catch (err) {
      setError(err.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  }

  return (
    <AppLayout>
      <h1 className="text-2xl font-semibold">Profile</h1>
      <p className="muted mt-1">
        Update your details.{" "}
        {isAlumni ? "Add social links so students can connect." : ""}
      </p>

      {loading ? <div className="muted mt-4">Loading...</div> : null}

      <div className="mt-4 space-y-3">
        <Alert variant="error">{error}</Alert>
        <Alert variant="success">{success}</Alert>
      </div>

      <form onSubmit={onSave} className="card mt-5 space-y-4 p-5">
        <Field label="Name">
          <input
            className={inputCls}
            value={form.name}
            onChange={(e) => setField("name", e.target.value)}
            required
          />
        </Field>

        <Field label="Department">
          <input
            className={inputCls}
            value={form.department}
            onChange={(e) => setField("department", e.target.value)}
            required={isStudent}
            placeholder={isStudent ? "Required for students" : "Optional"}
          />
        </Field>

        {isStudent ? (
          <Field label="Semester">
            <input
              className={inputCls}
              value={form.semester}
              onChange={(e) => setField("semester", e.target.value)}
              placeholder="e.g., 4"
              required
            />
          </Field>
        ) : null}

        {isAlumni ? (
          <>
            <Field label="Bio (optional)">
              <textarea
                className={`${inputCls} min-h-[90px]`}
                value={form.bio}
                onChange={(e) => setField("bio", e.target.value)}
                placeholder="Short intro..."
              />
            </Field>

            <Field label="LinkedIn (optional)">
              <input
                className={inputCls}
                value={form.linkedin}
                onChange={(e) => setField("linkedin", e.target.value)}
                placeholder="https://linkedin.com/in/..."
              />
            </Field>

            <Field label="GitHub (optional)">
              <input
                className={inputCls}
                value={form.github}
                onChange={(e) => setField("github", e.target.value)}
                placeholder="https://github.com/..."
              />
            </Field>

            <Field label="Instagram (optional)">
              <input
                className={inputCls}
                value={form.instagram}
                onChange={(e) => setField("instagram", e.target.value)}
                placeholder="https://instagram.com/..."
              />
            </Field>
          </>
        ) : null}

        <button disabled={saving} className="btn-primary disabled:opacity-60" type="submit">
          {saving ? "Saving..." : "Save changes"}
        </button>
      </form>
    </AppLayout>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <div className="text-sm font-medium">{label}</div>
      <div className="mt-1">{children}</div>
    </div>
  );
}