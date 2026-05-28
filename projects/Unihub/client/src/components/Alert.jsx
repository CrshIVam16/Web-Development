// src/components/Alert.jsx

/**
 * Reusable alert box to avoid repeating the same JSX on every page.
 *
 * variant: "error" | "success" | "info"
 */
export default function Alert({ variant = "info", children, className = "" }) {
  if (!children) return null;

  const base =
    "rounded-lg border p-3 text-sm";

  const styles = {
    error:
      "border-red-200 bg-red-50 text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-200",
    success:
      "border-green-200 bg-green-50 text-green-800 dark:border-green-900/50 dark:bg-green-950/40 dark:text-green-200",
    info:
      "border-gray-200 bg-gray-50 text-gray-700 dark:border-gray-800 dark:bg-gray-900/40 dark:text-gray-200",
  };

  return <div className={`${base} ${styles[variant]} ${className}`}>{children}</div>;
}