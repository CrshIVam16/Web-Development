// src/pages/CreateGuidance.jsx
import { useEffect, useMemo, useState } from "react";
import AppLayout from "../layouts/AppLayout";
import { api } from "../lib/api";
import Alert from "../components/Alert";

const inputCls =
  "w-full rounded-lg border border-gray-300/70 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 dark:border-gray-800 dark:bg-gray-950";

const DEFAULT_CATEGORIES = [
  "Scholarship",
  "Internship",
  "Exam",
  "Placement",
  "General",
  "Other",
];

export default function CreateGuidance() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("General");
  const [customCategory, setCustomCategory] = useState(""); // used when "Other"
  const [content, setContent] = useState("");

  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const isOther = category === "Other";
  const finalCategory = useMemo(() => {
    if (!isOther) return category;
    return customCategory.trim() || "Other";
  }, [category, customCategory, isOther]);

  // Optional: read existing categories from server (no server change needed)
  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        const data = await api.get("/guidance?sort=newest");
        const list = data.guidance || [];
        const newCats = list
          .map((x) => (x.category || "").trim())
          .filter(Boolean);

        if (!alive) return;

        setCategories((prev) => {
          const set = new Set([...(prev || []), ...newCats]);
          return Array.from(set);
        });
      } catch {
        // ignore; defaults still work
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    setLoading(true);
    try {
      await api.post("/guidance", {
        title,
        category: finalCategory,
        content,
      });
      setSuccess("Guidance entry created.");
      setTitle("");
      setCategory("General");
      setCustomCategory("");
      setContent("");
    } catch (err) {
      setError(err.message || "Failed to create guidance");
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
      <h1 className="text-2xl font-semibold">Create Guidance</h1>
      <p className="muted mt-1">Admin only • Visible to all users after creation</p>

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

        {/* Category dropdown */}
        <div className="grid gap-3 sm:grid-cols-2">
          <select
            className={inputCls}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          {/* Only show if category is Other */}
          {isOther ? (
            <input
              className={inputCls}
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
              placeholder="Custom category (optional)"
            />
          ) : (
            <div className="text-xs text-gray-500 dark:text-gray-400 self-center">
              Tip: Choose “Other” to type a custom category.
            </div>
          )}
        </div>

        <textarea
          className={`${inputCls} min-h-[160px]`}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write guidance in simple steps..."
          required
        />

        <button disabled={loading} className="btn-primary disabled:opacity-60" type="submit">
          {loading ? "Creating..." : "Create"}
        </button>
      </form>
    </AppLayout>
  );
}