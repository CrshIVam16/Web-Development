// src/pages/AlumniDashboard.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import { api } from "../lib/api";
import StatCard from "../components/StatCard";
import RecentList from "../components/RecentList";
import Alert from "../components/Alert";

function TypeBadge({ type }) {
  const cls =
    type === "Internship"
      ? "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-blue-200"
      : "border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-900/50 dark:bg-purple-950/40 dark:text-purple-200";

  return (
    <span className={`rounded-full border px-2 py-0.5 text-xs font-medium ${cls}`}>
      {type}
    </span>
  );
}

function StatusBadge({ status }) {
  const base = "rounded-full border px-2 py-0.5 text-xs font-medium";
  const cls =
    status === "approved"
      ? "border-green-200 bg-green-50 text-green-800 dark:border-green-900/50 dark:bg-green-950/40 dark:text-green-200"
      : status === "rejected"
        ? "border-red-200 bg-red-50 text-red-800 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-200"
        : "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-200";

  return <span className={`${base} ${cls}`}>{status}</span>;
}

export default function AlumniDashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        const res = await api.get("/dashboard/overview");
        if (alive) setData(res);
      } catch (e) {
        if (alive) setError(e.message || "Failed to load dashboard data");
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  return (
    <AppLayout>
      <h1 className="text-2xl font-semibold">Alumni Dashboard</h1>
      <p className="muted mt-1">Submit opportunities and track approval status.</p>

      <div className="mt-4">
        <Alert variant="error">{error}</Alert>
      </div>

      {/* Quick actions (complete, still not crowded) */}
      <div className="mt-5 flex flex-wrap gap-2">
        <Link className="btn-primary" to="/alumni/opportunities/new">Submit Opportunity</Link>
        <Link className="btn-outline" to="/alumni/opportunities/mine">My Submissions</Link>

        <Link className="btn-outline" to="/alumni/posts/new">Submit Alumni Post</Link>
        <Link className="btn-outline" to="/alumni/posts/mine">My Alumni Posts</Link>

        <Link className="btn-outline" to="/guidance">Guidance</Link>
      </div>

      {/* Stats (keep 3 only, not clickable) */}
      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        <StatCard label="Pending" value={data?.stats?.pending} />
        <StatCard label="Approved" value={data?.stats?.approved} />
        <StatCard label="Rejected" value={data?.stats?.rejected} />
      </div>

      {/* Recent submissions (add useful badges) */}
      <div className="mt-5">
        <RecentList
          title="Recent Submissions"
          items={data?.recent?.submissions}
          emptyText="No submissions yet."
          renderItem={(o) => (
            <div key={o._id} className="text-sm">
              <div className="flex flex-wrap items-center gap-2">
                <div className="font-medium">{o.title}</div>
                {o.type ? <TypeBadge type={o.type} /> : null}
                {o.status ? <StatusBadge status={o.status} /> : null}
              </div>
            </div>
          )}
        />
      </div>
    </AppLayout>
  );
}