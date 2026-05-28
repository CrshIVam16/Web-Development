import { NavLink } from "react-router-dom";

export default function Sidebar({ items, open, onClose, onLogout }) {
  return (
    <>
      {/* Mobile overlay */}
      {open ? (
        <button
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/30 md:hidden"
          aria-label="Close sidebar"
        />
      ) : null}

      <aside
        className={[
          "fixed left-0 top-0 z-50 h-full w-64 border-r border-gray-200 bg-white",
          "dark:border-gray-800 dark:bg-gray-900",
          "transition-transform",
          "md:sticky md:top-0 md:h-screen md:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        ].join(" ")}
      >
        <div className="flex h-full flex-col p-4">
          <div className="mb-6">
            <div className="text-lg font-semibold">UniHub</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              College Support Platform
            </div>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto pr-1">
            {items.map((it) => (
              <NavLink
                key={it.path}
                to={it.path}
                end={["/student", "/teacher", "/alumni", "/admin"].includes(it.path)}
                onClick={onClose}
                className={({ isActive }) =>
                  [
                    "block rounded-lg px-3 py-2 text-sm",
                    isActive
                      ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-200"
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800/60",
                  ].join(" ")
                }
              >
                {it.label}
              </NavLink>
            ))}
          </nav>
          {onLogout ? (
            <button
              onClick={() => {
                onClose?.();
                onLogout();
              }}
              className="mt-4 md:hidden rounded-lg border border-gray-200 bg-white px-3 py-2 text-left text-sm hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-900"
            >
              Logout
            </button>
          ) : null}
          <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} UniHub
          </div>
        </div>
      </aside>
    </>
  );
}