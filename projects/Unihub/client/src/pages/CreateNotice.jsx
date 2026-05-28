// src/pages/CreateNotice.jsx
import { useState, useEffect } from "react";
import AppLayout from "../layouts/AppLayout";
import { api } from "../lib/api";
import Alert from "../components/Alert"; // DRY alerts

const inputCls =
  "w-full rounded-lg border border-gray-300/70 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 dark:border-gray-800 dark:bg-gray-950";

export default function CreateNotice() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    setLoading(true);
    try {
      await api.post("/notices", { title, content });
      setSuccess("Notice posted successfully.");
      setTitle("");
      setContent("");
    } catch (err) {
      setError(err.message || "Failed to post notice");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!success) return;
    const t = setTimeout(() => setSuccess(""), 2500);
    return () => clearTimeout(t);
  }, [success]);

  return (
    <AppLayout>
      <h1 className="text-2xl font-semibold">Create Notice</h1>
      <p className="muted mt-1">Teacher only • Visible to students immediately</p>

      <div className="mt-4 space-y-3">
        <Alert variant="error">{error}</Alert>
        <Alert variant="success">{success}</Alert>
      </div>

      <form onSubmit={onSubmit} className="card mt-5 space-y-4 p-5">
        <input
          className={inputCls}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Notice title"
          required
        />

        <textarea
          className={`${inputCls} min-h-[140px]`}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Notice content"
          required
        />

        <button
          disabled={loading}
          className="btn-primary disabled:opacity-60"
          type="submit"
        >
          {loading ? "Posting..." : "Post Notice"}
        </button>
      </form>
    </AppLayout>
  );
}