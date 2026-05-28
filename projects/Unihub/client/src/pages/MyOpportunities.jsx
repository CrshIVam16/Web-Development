// src/pages/MyOpportunities.jsx
import { useEffect, useState } from "react";
import AppLayout from "../layouts/AppLayout";
import { api } from "../lib/api";
import FilterBtn from "../components/FilterBtn";
import Alert from "../components/Alert"; // DRY alerts

function fmtDate(d) {
  if (!d) return "";
  const dt = new Date(d);
  // dd-mm-yy
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  }).format(dt);
}

export default function MyOpportunities() {
  const [status, setStatus] = useState("all"); // all|pending|approved|rejected
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function load(s) {
    setLoading(true);
    setError("");
    try {
      const data = await api.get(`/opportunities/mine?status=${s}`);
      setItems(data.opportunities || []);
    } catch (err) {
      setError(err.message || "Failed to load submissions");
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
      <h1 className="text-2xl font-semibold">My Submissions</h1>
      <p className="muted mt-1">Track your submitted opportunities.</p>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <FilterBtn active={status === "all"} onClick={() => setStatus("all")}>
          All
        </FilterBtn>
        <FilterBtn active={status === "pending"} onClick={() => setStatus("pending")}>
          Pending
        </FilterBtn>
        <FilterBtn active={status === "approved"} onClick={() => setStatus("approved")}>
          Approved
        </FilterBtn>
        <FilterBtn active={status === "rejected"} onClick={() => setStatus("rejected")}>
          Rejected
        </FilterBtn>

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
            No submissions found.
          </div>
        ) : null}

        {items.map((o) => (
          <div key={o._id} className="card p-4">
            <div className="flex flex-wrap items-center gap-2">
              <div className="font-semibold">{o.title}</div>

              <span
                className={[
                  "rounded-full border px-2 py-0.5 text-xs font-medium",
                  o.type === "Internship"
                    ? "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-blue-200"
                    : "border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-900/50 dark:bg-purple-950/40 dark:text-purple-200",
                ].join(" ")}
              >
                {o.type}
              </span>

              <span
                className={[
                  "rounded-full border px-2 py-0.5 text-xs font-medium",
                  o.status === "pending"
                    ? "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-200"
                    : o.status === "approved"
                      ? "border-green-200 bg-green-50 text-green-800 dark:border-green-900/50 dark:bg-green-950/40 dark:text-green-200"
                      : "border-red-200 bg-red-50 text-red-800 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-200",
                ].join(" ")}
              >
                {o.status}
              </span>
            </div>

            {o.deadline ? (
              <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                Deadline: {fmtDate(o.deadline)}
              </div>
            ) : null}

            <details className="mt-3">
              <summary className="cursor-pointer text-sm text-indigo-600 hover:underline">
                View details
              </summary>
              <div className="mt-2 whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-200">
                {o.description}
              </div>
              <div className="mt-2 whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-200">
                <span className="font-medium">Eligibility:</span> {o.eligibility}
              </div>
            </details>
          </div>
        ))}
      </div>
    </AppLayout>
  );
}