import { useState } from "react";
import { Link } from "react-router-dom";
import ThemeSwitch from "./ThemeSwitch";

export default function PublicNavbar() {
  const [open, setOpen] = useState(false);

  function close() {
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/80 backdrop-blur dark:border-gray-800 dark:bg-gray-900/70">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        {/* Brand */}
        <Link to="/" className="flex items-baseline gap-2" onClick={close}>
          <span className="text-lg font-semibold">UniHub</span>
          <span className="hidden text-xs text-gray-500 dark:text-gray-400 sm:inline">
            College Portal
          </span>
        </Link>

        {/* Desktop links */}
        <nav className="hidden items-center gap-6 text-sm text-gray-600 dark:text-gray-300 md:flex">
          <a className="hover:text-gray-900 dark:hover:text-white" href="#features">
            Features
          </a>
          <a className="hover:text-gray-900 dark:hover:text-white" href="#roles">
            For roles
          </a>
          <a className="hover:text-gray-900 dark:hover:text-white" href="#faq">
            FAQ
          </a>
          <a className="hover:text-gray-900 dark:hover:text-white" href="#about">
            About
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <ThemeSwitch />

          {/* Desktop auth buttons */}
          <div className="hidden items-center gap-2 md:flex">
            <Link
              to="/login"
              className="h-9 rounded-lg border border-gray-200 bg-white px-3 text-sm leading-9 hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-900"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="h-9 rounded-lg bg-indigo-600 px-3 text-sm font-medium leading-9 text-white hover:bg-indigo-700"
            >
              Register
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-sm hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-900 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Open menu"
            aria-expanded={open}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {open ? (
        <div className="border-t border-gray-200 bg-white px-4 py-3 dark:border-gray-800 dark:bg-gray-900 md:hidden">
          <div className="grid gap-2 text-sm">
            <a onClick={close} className="rounded-lg px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-800/60" href="#features">
              Features
            </a>
            <a onClick={close} className="rounded-lg px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-800/60" href="#roles">
              For roles
            </a>
            <a onClick={close} className="rounded-lg px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-800/60" href="#faq">
              FAQ
            </a>
            <a onClick={close} className="rounded-lg px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-800/60" href="#about">
              About
            </a>

            <div className="mt-2 grid grid-cols-2 gap-2">
              <Link
                to="/login"
                onClick={close}
                className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-center text-sm hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-900"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={close}
                className="rounded-lg bg-indigo-600 px-3 py-2 text-center text-sm font-medium text-white hover:bg-indigo-700"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}