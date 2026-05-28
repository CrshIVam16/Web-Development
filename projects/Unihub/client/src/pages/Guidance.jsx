// src/pages/Guidance.jsx
import { useEffect, useState } from "react";
import AppLayout from "../layouts/AppLayout";
import { api } from "../lib/api";
import Alert from "../components/Alert";

const DEFAULT_CATEGORIES = [
  "Scholarship",
  "Internship",
  "Exam",
  "Placement",
  "General",
  "Other",
];

function categoryBadgeClass(category = "") {
  const c = category.toLowerCase();

  if (c.includes("scholar")) {
    return "border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-900/50 dark:bg-purple-950/40 dark:text-purple-200";
  }
  if (c.includes("intern")) {
    return "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-blue-200";
  }
  if (c.includes("exam")) {
    return "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-200";
  }
  if (c.includes("placement") || c.includes("job") || c.includes("career")) {
    return "border-green-200 bg-green-50 text-green-800 dark:border-green-900/50 dark:bg-green-950/40 dark:text-green-200";
  }
  if (c.includes("general")) {
    return "border-gray-300/70 bg-white text-gray-700 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-200";
  }
  return "border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-indigo-900/40 dark:bg-indigo-950/40 dark:text-indigo-200";
}

export default function Guidance() {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState(""); // "" = all
  const [sort, setSort] = useState("newest");

  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function load(paramsObj = {}) {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams(paramsObj);
      const path = params.toString()
        ? `/guidance?${params.toString()}`
        : "/guidance";

      const data = await api.get(path);
      const list = data.guidance || [];
      setItems(list);

      // Build dropdown options (client-only). We keep defaults + merge new ones.
      const newCats = list
        .map((x) => (x.category || "").trim())
        .filter(Boolean);

      setCategories((prev) => {
        const set = new Set([...(prev || []), ...newCats]);
        return Array.from(set);
      });
    } catch (err) {
      setError(err.message || "Failed to load guidance");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load({ sort: "newest" });
  }, []);

  function onSearch(e) {
    e.preventDefault();
    load({
      ...(q.trim() ? { q: q.trim() } : {}),
      ...(category ? { category } : {}),
      ...(sort ? { sort } : {}),
    });
  }

  function onReset() {
    setQ("");
    setCategory("");
    setSort("newest");
    load({ sort: "newest" });
  }

  return (
    <AppLayout>
      <h1 className="text-2xl font-semibold">Guidance</h1>
      <p className="muted mt-1">
        Admin-created guidance entries (how to apply, eligibility, next steps).
      </p>

      <form onSubmit={onSearch} className="card mt-5 p-4">
        <div className="grid gap-3 md:grid-cols-4">
          <input
            className="md:col-span-2 rounded-lg border border-gray-300/70 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 dark:border-gray-800 dark:bg-gray-950"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search title/category/content"
          />

          {/* Dropdown category filter */}
          <select
            className="rounded-lg border border-gray-300/70 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 dark:border-gray-800 dark:bg-gray-950"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select
            className="rounded-lg border border-gray-300/70 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 dark:border-gray-800 dark:bg-gray-950"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="newest">Newest → Oldest</option>
            <option value="oldest">Oldest → Newest</option>
          </select>
        </div>

        <div className="mt-3 flex gap-2">
          <button
            className="btn-primary disabled:opacity-60"
            disabled={loading}
            type="submit"
          >
            {loading ? "Searching..." : "Search"}
          </button>
          <button type="button" className="btn-outline" onClick={onReset}>
            Reset
          </button>
        </div>
      </form>

      <div className="mt-4">
        <Alert variant="error">{error}</Alert>
      </div>

      <div className="mt-4 space-y-3">
        {items.length === 0 && !loading ? (
          <div className="card p-6 text-sm text-gray-600 dark:text-gray-300">
            No guidance entries found.
          </div>
        ) : null}

        {items.map((g) => (
          <div key={g._id} className="card p-4">
            <div className="flex flex-wrap items-center gap-2">
              <div className="font-semibold">{g.title}</div>

              {g.category ? (
                <span
                  className={[
                    "rounded-full border px-2 py-0.5 text-xs font-medium",
                    categoryBadgeClass(g.category),
                  ].join(" ")}
                >
                  {g.category}
                </span>
              ) : null}
            </div>

            {g.createdBy?.name ? (
              <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                By: {g.createdBy.name}
              </div>
            ) : null}

            <details className="mt-3">
              <summary className="cursor-pointer text-sm text-indigo-600 hover:underline">
                View details
              </summary>
              <div className="mt-2 whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-200">
                {g.content}
              </div>
            </details>

            {g.createdAt ? (
              <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                Created: {new Date(g.createdAt).toLocaleString()}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </AppLayout>
  );
}