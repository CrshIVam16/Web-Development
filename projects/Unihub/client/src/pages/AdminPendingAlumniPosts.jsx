// src/pages/AdminPendingAlumniPosts.jsx
import { useEffect, useState } from "react";
import AppLayout from "../layouts/AppLayout";
import { api } from "../lib/api";
import FilterBtn from "../components/FilterBtn";
import Alert from "../components/Alert";

function Badge({ status }) {
  const base = "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium border";
  if (status === "pending")
    return <span className={`${base} border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-200`}>pending</span>;
  if (status === "approved")
    return <span className={`${base} border-green-200 bg-green-50 text-green-800 dark:border-green-900/50 dark:bg-green-950/40 dark:text-green-200`}>approved</span>;
  return <span className={`${base} border-red-200 bg-red-50 text-red-800 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-200`}>rejected</span>;
}

export default function AdminPendingAlumniPosts() {
  const [status, setStatus] = useState("pending");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [busyId, setBusyId] = useState("");
  const [error, setError] = useState("");

  async function load(listStatus = status) {
    setLoading(true);
    setError("");
    try {
      const data = await api.get(`/admin/alumni-posts?status=${listStatus}`);
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

  async function act(id, action) {
    setBusyId(id);
    setError("");
    try {
      await api.patch(`/admin/alumni-posts/${id}/${action}`, {});
      await load(status);
    } catch (err) {
      setError(err.message || "Action failed");
    } finally {
      setBusyId("");
    }
  }

  const showActions = status === "pending";

  return (
    <AppLayout>
      <h1 className="text-2xl font-semibold">Alumni Posts (Admin)</h1>
      <p className="muted mt-1">Approve/reject alumni guidance posts.</p>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <FilterBtn active={status === "pending"} onClick={() => setStatus("pending")}>Pending</FilterBtn>
        <FilterBtn active={status === "approved"} onClick={() => setStatus("approved")}>Approved</FilterBtn>
        <FilterBtn active={status === "rejected"} onClick={() => setStatus("rejected")}>Rejected</FilterBtn>
        <FilterBtn active={status === "all"} onClick={() => setStatus("all")}>All</FilterBtn>

        <div className="ml-auto flex items-center gap-2">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {loading ? "Loading..." : `${items.length} items`}
          </div>
          <button onClick={() => load(status)} className="btn-outline px-3 py-2">
            Refresh
          </button>
        </div>
      </div>

      <div className="mt-4">
        <Alert variant="error">{error}</Alert>
      </div>

      <div className="mt-4 space-y-3">
        {items.length === 0 && !loading ? (
          <div className="card p-6 text-sm text-gray-600 dark:text-gray-300">No items found.</div>
        ) : null}

        {items.map((p) => (
          <div key={p._id} className="card p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="font-semibold">{p.title}</div>
                  <Badge status={p.status} />
                </div>

                <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Posted by: {p.postedBy?.name || "Alumni"}
                  {p.reviewedBy?.name ? ` • Reviewed by: ${p.reviewedBy.name}` : ""}
                </div>

                <details className="mt-3">
                  <summary className="cursor-pointer text-sm text-indigo-600 hover:underline">
                    View post
                  </summary>
                  <div className="mt-2 whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-200">
                    {p.content}
                  </div>
                </details>
              </div>

              {showActions ? (
                <div className="shrink-0 space-y-2">
                  <button
                    disabled={busyId === p._id}
                    onClick={() => act(p._id, "approve")}
                    className="w-full rounded-lg bg-green-600 px-3 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-60"
                  >
                    Approve
                  </button>
                  <button
                    disabled={busyId === p._id}
                    onClick={() => act(p._id, "reject")}
                    className="w-full rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-60"
                  >
                    Reject
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  );
}