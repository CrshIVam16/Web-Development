// src/pages/AdminPendingOpportunities.jsx
import { useEffect, useState } from "react";
import AppLayout from "../layouts/AppLayout";
import { api } from "../lib/api";
import { fileUrl } from "../lib/url";
import FilterBtn from "../components/FilterBtn";
import Alert from "../components/Alert"; // DRY alerts

function Badge({ status }) {
  const base =
    "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium border";

  if (status === "pending")
    return (
      <span
        className={`${base} border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-200`}
      >
        pending
      </span>
    );

  if (status === "approved")
    return (
      <span
        className={`${base} border-green-200 bg-green-50 text-green-800 dark:border-green-900/50 dark:bg-green-950/40 dark:text-green-200`}
      >
        approved
      </span>
    );

  return (
    <span
      className={`${base} border-red-200 bg-red-50 text-red-800 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-200`}
    >
      rejected
    </span>
  );
}

export default function AdminPendingOpportunities() {
  const [status, setStatus] = useState("pending");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [busyId, setBusyId] = useState("");
  const [error, setError] = useState("");

  async function load(listStatus = status) {
    setLoading(true);
    setError("");
    try {
      const data = await api.get(`/admin/opportunities?status=${listStatus}`);
      setItems(data.opportunities || []);
    } catch (err) {
      setError(err.message || "Failed to load opportunities");
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
      await api.patch(`/admin/opportunities/${id}/${action}`, {});
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
      <h1 className="text-2xl font-semibold">Opportunities (Admin)</h1>
      <p className="muted mt-1">View pending queue and approval history.</p>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <FilterBtn active={status === "pending"} onClick={() => setStatus("pending")}>
          Pending
        </FilterBtn>
        <FilterBtn active={status === "approved"} onClick={() => setStatus("approved")}>
          Approved
        </FilterBtn>
        <FilterBtn active={status === "rejected"} onClick={() => setStatus("rejected")}>
          Rejected
        </FilterBtn>
        <FilterBtn active={status === "all"} onClick={() => setStatus("all")}>
          All
        </FilterBtn>

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
          <div className="card p-6 text-sm text-gray-600 dark:text-gray-300">
            No items found.
          </div>
        ) : null}

        {items.map((o) => (
          <div key={o._id} className="card p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="font-semibold">{o.title}</div>
                  <Badge status={o.status} />
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {o.type}
                  </span>
                </div>

                <div className="mt-2 whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-200">
                  {o.description}
                </div>

                <div className="mt-2 whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-200">
                  <span className="font-medium">Eligibility:</span> {o.eligibility}
                </div>

                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  Posted by: {o.postedBy?.name || "Alumni"}
                  {o.reviewedBy?.name ? ` • Reviewed by: ${o.reviewedBy.name}` : ""}
                </div>

                {o.postedBy &&
                (o.postedBy.linkedin || o.postedBy.github || o.postedBy.instagram) ? (
                  <div className="mt-2 flex flex-wrap gap-3 text-sm">
                    {o.postedBy.linkedin ? (
                      <a
                        className="text-indigo-600 hover:underline"
                        href={o.postedBy.linkedin}
                        target="_blank"
                        rel="noreferrer"
                      >
                        LinkedIn
                      </a>
                    ) : null}
                    {o.postedBy.github ? (
                      <a
                        className="text-indigo-600 hover:underline"
                        href={o.postedBy.github}
                        target="_blank"
                        rel="noreferrer"
                      >
                        GitHub
                      </a>
                    ) : null}
                    {o.postedBy.instagram ? (
                      <a
                        className="text-indigo-600 hover:underline"
                        href={o.postedBy.instagram}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Instagram
                      </a>
                    ) : null}
                  </div>
                ) : null}

                {o.link ? (
                  <a
                    className="mt-2 block text-sm text-indigo-600 hover:underline"
                    href={o.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open link
                  </a>
                ) : null}

                {o.attachmentPath ? (
                  <a
                    className="mt-1 block text-sm text-indigo-600 hover:underline"
                    href={fileUrl(o.attachmentPath)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open attachment
                  </a>
                ) : null}
              </div>

              {showActions ? (
                <div className="shrink-0 space-y-2">
                  <button
                    disabled={busyId === o._id}
                    onClick={() => act(o._id, "approve")}
                    className="w-full rounded-lg bg-green-600 px-3 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-60"
                  >
                    Approve
                  </button>
                  <button
                    disabled={busyId === o._id}
                    onClick={() => act(o._id, "reject")}
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