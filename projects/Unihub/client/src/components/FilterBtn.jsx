// src/components/FilterBtn.jsx

/**
 * Reusable filter/tab button used in list pages.
 * Keeps styling consistent and avoids duplicating the same class logic.
 */
export default function FilterBtn({ active, className = "", children, ...props }) {
  return (
    <button
      {...props}
      className={[
        "rounded-lg border px-3 py-2 text-sm",
        active
          ? "border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-indigo-900/40 dark:bg-indigo-950/40 dark:text-indigo-200"
          : "border-gray-300/70 bg-white text-gray-700 hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-200 dark:hover:bg-gray-900",
        className,
      ].join(" ")}
    >
      {children}
    </button>
  );
}