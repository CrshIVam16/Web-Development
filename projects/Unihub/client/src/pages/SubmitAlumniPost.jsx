// src/pages/SubmitAlumniPost.jsx
import { useEffect, useState } from "react";
import AppLayout from "../layouts/AppLayout";
import { api } from "../lib/api";
import Alert from "../components/Alert";

const inputCls =
  "w-full rounded-lg border border-gray-300/70 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 dark:border-gray-800 dark:bg-gray-950";

export default function SubmitAlumniPost() {
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
      await api.post("/alumni-posts", { title, content });
      setSuccess("Post submitted. Status: pending (awaiting admin approval).");
      setTitle("");
      setContent("");
    } catch (err) {
      setError(err.message || "Failed to submit post");
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
      <h1 className="text-2xl font-semibold">Submit Alumni Post</h1>
      <p className="muted mt-1">Alumni only • Admin approval required</p>

      <div className="mt-4 space-y-3">
        <Alert variant="error">{error}</Alert>
        <Alert variant="success">{success}</Alert>
      </div>

      <form onSubmit={onSubmit} className="card mt-5 space-y-4 p-5">
        <input
          className={inputCls}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post title"
          required
        />

        <textarea
          className={`${inputCls} min-h-[160px]`}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write guidance in simple language..."
          required
        />

        <button disabled={loading} className="btn-primary disabled:opacity-60" type="submit">
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </AppLayout>
  );
}