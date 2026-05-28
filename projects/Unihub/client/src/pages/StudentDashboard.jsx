// src/pages/StudentDashboard.jsx
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

export default function StudentDashboard() {
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
      <h1 className="text-2xl font-semibold">Student Dashboard</h1>
      <p className="muted mt-1">Quick access + recent updates.</p>

      <div className="mt-4">
        <Alert variant="error">{error}</Alert>
      </div>

      {/* Quick actions (expanded, not crowded) */}
      <div className="mt-5 flex flex-wrap gap-2">
        <Link className="btn-outline" to="/student/materials">Materials</Link>
        <Link className="btn-outline" to="/student/notices">Notices</Link>
        <Link className="btn-outline" to="/student/opportunities">Opportunities</Link>
        <Link className="btn-outline" to="/student/alumni-posts">Alumni Posts</Link>
        <Link className="btn-outline" to="/guidance">Guidance</Link>
      </div>

      {/* Stats (NOT clickable to avoid redundancy) */}
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard label="Total Materials" value={data?.stats?.materialsCount} />
        <StatCard label="Total Notices" value={data?.stats?.noticesCount} />
        <StatCard label="Approved Opportunities" value={data?.stats?.opportunitiesCount} />
      </div>

      {/* Recent (only add badge where useful) */}
      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        <RecentList
          title="Recent Materials"
          items={data?.recent?.materials}
          emptyText="No materials yet."
          renderItem={(m) => (
            <div key={m._id} className="text-sm">
              <div className="font-medium">{m.title}</div>
              <div className="muted">{m.subject} • Sem {m.semester}</div>
            </div>
          )}
        />

        <RecentList
          title="Recent Notices"
          items={data?.recent?.notices}
          emptyText="No notices yet."
          renderItem={(n) => (
            <div key={n._id} className="text-sm">
              <div className="font-medium">{n.title}</div>
            </div>
          )}
        />

        <RecentList
          title="Recent Opportunities"
          items={data?.recent?.opportunities}
          emptyText="No approved opportunities yet."
          renderItem={(o) => (
            <div key={o._id} className="text-sm">
              <div className="flex flex-wrap items-center gap-2">
                <div className="font-medium">{o.title}</div>
                {o.type ? <TypeBadge type={o.type} /> : null}
              </div>
            </div>
          )}
        />
      </div>
    </AppLayout>
  );
}