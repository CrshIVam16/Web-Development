// src/pages/TeacherDashboard.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import { api } from "../lib/api";
import StatCard from "../components/StatCard";
import RecentList from "../components/RecentList";
import Alert from "../components/Alert";

export default function TeacherDashboard() {
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
      <h1 className="text-2xl font-semibold">Teacher Dashboard</h1>
      <p className="muted mt-1">Your uploads and notices.</p>

      <div className="mt-4">
        <Alert variant="error">{error}</Alert>
      </div>

      {/* Quick actions (minimal + optional guidance) */}
      <div className="mt-5 flex flex-wrap gap-2">
        <Link className="btn-primary" to="/teacher/upload">Upload Material</Link>
        <Link className="btn-outline" to="/teacher/notices/new">Create Notice</Link>
        <Link className="btn-outline" to="/guidance">Guidance</Link>
      </div>

      {/* Stats (not clickable) */}
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <StatCard label="My Materials" value={data?.stats?.myMaterialsCount} />
        <StatCard label="My Notices" value={data?.stats?.myNoticesCount} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <RecentList
          title="Recent Uploads"
          items={data?.recent?.materials}
          emptyText="No uploads yet."
          renderItem={(m) => (
            <div key={m._id} className="text-sm">
              <div className="font-medium">{m.title}</div>
              <div className="muted">
                {m.subject} • Sem {m.semester}
              </div>
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
      </div>
    </AppLayout>
  );
}