import { useMemo, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getNavItems } from "../lib/nav";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function AppLayout({ children }) {
  const { user, logout } = useAuth();
  const items = useMemo(() => getNavItems(user?.role), [user?.role]);
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      <div className="md:flex">
        <Sidebar
  items={items}
  open={open}
  onClose={() => setOpen(false)}
  onLogout={logout}
/>

        <div className="min-w-0 flex-1">
          <Topbar
            user={user}
            onMenuClick={() => setOpen(true)}
            onLogout={logout}
          />

          <main className="mx-auto max-w-6xl px-4 py-6">
            {/* If used as wrapper component */}
            {children}

            {/* If used with nested routes later */}
            {!children ? <Outlet /> : null}
          </main>
        </div>
      </div>
    </div>
  );
}