// src/pages/Notices.jsx
import { useEffect, useState } from "react";
import AppLayout from "../layouts/AppLayout";
import { api } from "../lib/api";
import Alert from "../components/Alert"; // DRY alerts

export default function Notices() {
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("newest"); // newest|oldest

  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchNotices(searchText = "", sortValue = sort) {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      if (searchText) params.set("q", searchText);
      if (sortValue) params.set("sort", sortValue);

      const path = params.toString()
        ? `/notices?${params.toString()}`
        : "/notices";
      const data = await api.get(path);
      setNotices(data.notices || []);
    } catch (err) {
      setError(err.message || "Failed to load notices");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchNotices("", "newest");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onSearch(e) {
    e.preventDefault();
    fetchNotices(q.trim(), sort);
  }

  function onReset() {
    setQ("");
    setSort("newest");
    fetchNotices("", "newest");
  }

  return (
    <AppLayout>
      {/* <h1 className="text-2xl font-semibold">Notices ({notices.length})</h1> */}
      <h1 className="text-2xl font-semibold">Notices</h1>
      <p className="muted mt-1">Latest academic notices posted by teachers.</p>

      <form onSubmit={onSearch} className="card mt-5 p-4">
        <div className="grid gap-2 sm:grid-cols-3">
          <input
            className="sm:col-span-2 rounded-lg border border-gray-300/70 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 dark:border-gray-800 dark:bg-gray-950"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search title/content"
          />

          <select
            className="rounded-lg border border-gray-300/70 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 dark:border-gray-800 dark:bg-gray-950"
            value={sort}
            onChange={(e) => {
              const v = e.target.value;
              setSort(v);
              // optional: apply sort immediately
              fetchNotices(q.trim(), v);
            }}
          >
            <option value="newest">Newest → Oldest</option>
            <option value="oldest">Oldest → Newest</option>
          </select>
        </div>

        <div className="mt-3 flex gap-2">
          <button
            disabled={loading}
            className="btn-primary disabled:opacity-60"
            type="submit"
          >
            {loading ? "..." : "Search"}
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
        {notices.length === 0 && !loading ? (
          <div className="card p-6 text-sm text-gray-600 dark:text-gray-300">
            No notices found.
          </div>
        ) : null}

        {notices.map((n) => (
          <div key={n._id} className="card p-4">
            <div className="font-semibold">{n.title}</div>

            <div className="mt-2 whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-200">
              {n.content}
            </div>

            {n.createdAt ? (
              <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                Posted on: {new Date(n.createdAt).toLocaleString()}
              </div>
            ) : null}

            {n.createdBy?.name ? (
              <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Posted by: {n.createdBy.name}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </AppLayout>
  );
}