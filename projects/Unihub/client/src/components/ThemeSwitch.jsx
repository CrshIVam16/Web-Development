import { useTheme } from "../context/ThemeContext";

// Clean icon-toggle (compact, consistent height with navbar buttons)
export default function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      title="Toggle theme"
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-sm hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-900"
    >
      <span className="leading-none">{isDark ? "☀" : "🌙"}</span>
    </button>
  );
}