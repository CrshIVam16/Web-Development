import ThemeSwitch from "./ThemeSwitch";

export default function Topbar({ user, onMenuClick, onLogout }) {
  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/80 backdrop-blur dark:border-gray-800 dark:bg-gray-900/70">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-center gap-2">
          <button
            onClick={onMenuClick}
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-900 md:hidden"
            aria-label="Open menu"
          >
            Menu
          </button>
          <div className="min-w-0 text-sm text-gray-600 dark:text-gray-300">
            {/* mobile: show role only */}
            <span className="sm:hidden">{user?.name}</span>

            {/* desktop: show name + role */}
            <span className="hidden truncate sm:inline">
              {user?.name} <span className="text-gray-400">({user?.role})</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ThemeSwitch />
          <button
            onClick={onLogout}
            className="hidden sm:inline-flex rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-900"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}