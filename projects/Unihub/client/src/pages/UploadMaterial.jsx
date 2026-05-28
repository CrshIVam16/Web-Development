// src/pages/UploadMaterial.jsx
import { useState, useEffect } from "react";
import AppLayout from "../layouts/AppLayout";
import { api } from "../lib/api";
import { fileUrl } from "../lib/url";
import Alert from "../components/Alert"; // DRY alerts

const inputCls =
  "w-full rounded-lg border border-gray-300/70 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 dark:border-gray-800 dark:bg-gray-950";

export default function UploadMaterial() {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [semester, setSemester] = useState("");
  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [lastUpload, setLastUpload] = useState(null);

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLastUpload(null);

    if (!file) return setError("Please select a PDF or image file.");

    const fd = new FormData();
    fd.append("title", title);
    fd.append("subject", subject);
    fd.append("semester", semester);
    fd.append("file", file);

    setLoading(true);
    try {
      const data = await api.upload("/materials", fd);
      setLastUpload(data.material);
      setSuccess("Material uploaded successfully.");
      setTitle("");
      setSubject("");
      setSemester("");
      setFile(null);
      e.target.reset();
    } catch (err) {
      setError(err.message || "Upload failed");
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
      <h1 className="text-2xl font-semibold">Upload Material</h1>
      <p className="muted mt-1">Teacher only • PDF/images • Stored in /uploads</p>

      <div className="mt-4 space-y-3">
        <Alert variant="error">{error}</Alert>
        <Alert variant="success">{success}</Alert>
      </div>

      <form onSubmit={onSubmit} className="card mt-5 space-y-4 p-5">
        <input
          className={inputCls}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />

        <div className="grid gap-3 sm:grid-cols-2">
          <input
            className={inputCls}
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject"
            required
          />
          <input
            className={inputCls}
            type="number"
            min="1"
            max="6"
            step="1"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            placeholder="Semester (>= 1)"
            required
          />
        </div>

        <input
          className={inputCls}
          type="file"
          accept="application/pdf,image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          required
        />

        <button
          disabled={loading}
          className="btn-primary disabled:opacity-60"
          type="submit"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>

      {lastUpload ? (
        <div className="card mt-5 p-5">
          <div className="font-semibold">Last upload</div>
          <div className="muted mt-1">
            {lastUpload.title} • {lastUpload.subject} • Sem {lastUpload.semester}
          </div>
          <a
            className="mt-2 inline-block text-indigo-600 hover:underline"
            href={fileUrl(lastUpload.filePath)}
            target="_blank"
            rel="noreferrer"
          >
            Open file
          </a>
        </div>
      ) : null}
    </AppLayout>
  );
}