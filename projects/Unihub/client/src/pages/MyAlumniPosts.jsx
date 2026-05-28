// src/pages/MyAlumniPosts.jsx
import { useEffect, useState } from "react";
import AppLayout from "../layouts/AppLayout";
import { api } from "../lib/api";
import FilterBtn from "../components/FilterBtn";
import Alert from "../components/Alert";

function StatusBadge({ status }) {
  const base = "rounded-full border px-2 py-0.5 text-xs font-medium";
  if (status === "pending")
    return (
      <span className={`${base} border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-200`}>
        pending
      </span>
    );
  if (status === "approved")
    return (
      <span className={`${base} border-green-200 bg-green-50 text-green-800 dark:border-green-900/50 dark:bg-green-950/40 dark:text-green-200`}>
        approved
      </span>
    );
  return (
    <span className={`${base} border-red-200 bg-red-50 text-red-800 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-200`}>
      rejected
    </span>
  );
}

export default function MyAlumniPosts() {
  const [status, setStatus] = useState("all"); // all|pending|approved|rejected
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function load(s) {
    setLoading(true);
    setError("");
    try {
      const data = await api.get(`/alumni-posts/mine?status=${s}`);
      setItems(data.posts || []);
    } catch (err) {
      setError(err.message || "Failed to load posts");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load(status);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <AppLayout>
      <h1 className="text-2xl font-semibold">My Alumni Posts</h1>
      <p className="muted mt-1">Track your submitted posts and their approval status.</p>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <FilterBtn active={status === "all"} onClick={() => setStatus("all")}>All</FilterBtn>
        <FilterBtn active={status === "pending"} onClick={() => setStatus("pending")}>Pending</FilterBtn>
        <FilterBtn active={status === "approved"} onClick={() => setStatus("approved")}>Approved</FilterBtn>
        <FilterBtn active={status === "rejected"} onClick={() => setStatus("rejected")}>Rejected</FilterBtn>

        <div className="ml-auto text-sm text-gray-500 dark:text-gray-400">
          {loading ? "Loading..." : `${items.length} items`}
        </div>
      </div>

      <div className="mt-4">
        <Alert variant="error">{error}</Alert>
      </div>

      <div className="mt-4 space-y-3">
        {items.length === 0 && !loading ? (
          <div className="card p-6 text-sm text-gray-600 dark:text-gray-300">
            No posts found.
          </div>
        ) : null}

        {items.map((p) => (
          <div key={p._id} className="card p-4">
            <div className="flex flex-wrap items-center gap-2">
              <div className="font-semibold">{p.title}</div>
              <StatusBadge status={p.status} />
            </div>

            {p.createdAt ? (
              <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Submitted: {new Date(p.createdAt).toLocaleString()}
              </div>
            ) : null}

            <details className="mt-3">
              <summary className="cursor-pointer text-sm text-indigo-600 hover:underline">
                View post
              </summary>
              <div className="mt-2 whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-200">
                {p.content}
              </div>
            </details>
          </div>
        ))}
      </div>
    </AppLayout>
  );
}