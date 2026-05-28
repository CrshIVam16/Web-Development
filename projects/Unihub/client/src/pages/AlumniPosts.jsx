// src/pages/AlumniPosts.jsx
import { useEffect, useState } from "react";
import AppLayout from "../layouts/AppLayout";
import { api } from "../lib/api";
import Alert from "../components/Alert";

export default function AlumniPosts() {
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("newest"); // newest|oldest

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function load(paramsObj = {}) {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams(paramsObj);
      const path = params.toString()
        ? `/alumni-posts?${params.toString()}`
        : "/alumni-posts";
      const data = await api.get(path);
      setItems(data.posts || []);
    } catch (err) {
      setError(err.message || "Failed to load alumni posts");
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
      ...(sort ? { sort } : {}),
    });
  }

  function onReset() {
    setQ("");
    setSort("newest");
    load({ sort: "newest" });
  }

  return (
    <AppLayout>
      <h1 className="text-2xl font-semibold">Alumni Posts</h1>
      <p className="muted mt-1">
        Approved guidance posts shared by alumni (verified by admin).
      </p>

      <form onSubmit={onSearch} className="card mt-5 p-4">
        <div className="grid gap-3 md:grid-cols-4">
          <input
            className="md:col-span-3 rounded-lg border border-gray-300/70 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 dark:border-gray-800 dark:bg-gray-950"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search title/content"
          />

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
          <button disabled={loading} className="btn-primary disabled:opacity-60" type="submit">
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
            No alumni posts found.
          </div>
        ) : null}

        {items.map((p) => (
          <div key={p._id} className="card p-4">
            <div className="font-semibold">{p.title}</div>

            <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {p.postedBy?.name ? `By: ${p.postedBy.name}` : "By: Alumni"}
              {p.createdAt ? ` • ${new Date(p.createdAt).toLocaleDateString()}` : ""}
            </div>

            <details className="mt-3">
              <summary className="cursor-pointer text-sm text-indigo-600 hover:underline">
                View post
              </summary>

              <div className="mt-2 whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-200">
                {p.content}
              </div>

              {/* Social links (from alumni profile) */}
              {p.postedBy &&
              (p.postedBy.linkedin || p.postedBy.github || p.postedBy.instagram) ? (
                <div className="mt-3">
                  <div className="text-sm font-medium">Connect</div>
                  <div className="mt-2 flex flex-wrap gap-3 text-sm">
                    {p.postedBy.linkedin ? (
                      <a
                        className="text-indigo-600 hover:underline"
                        href={p.postedBy.linkedin}
                        target="_blank"
                        rel="noreferrer"
                      >
                        LinkedIn
                      </a>
                    ) : null}
                    {p.postedBy.github ? (
                      <a
                        className="text-indigo-600 hover:underline"
                        href={p.postedBy.github}
                        target="_blank"
                        rel="noreferrer"
                      >
                        GitHub
                      </a>
                    ) : null}
                    {p.postedBy.instagram ? (
                      <a
                        className="text-indigo-600 hover:underline"
                        href={p.postedBy.instagram}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Instagram
                      </a>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </details>
          </div>
        ))}
      </div>
    </AppLayout>
  );
}