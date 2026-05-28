// export default function StatCard({ label, value }) {
//   return (
//     <div className="card p-4">
//       <div className="text-xs font-medium text-gray-600 dark:text-gray-400">
//         {label}
//       </div>
//       <div className="mt-2 text-2xl font-semibold">{value ?? "-"}</div>
//     </div>
//   );
// }

// src/components/StatCard.jsx
import { Link } from "react-router-dom";

/**
 * Small stat card used in dashboards.
 * - If `to` is provided, the card becomes clickable (Link).
 * - Keeps UI consistent with the rest of the app (uses `card` utility class).
 */
export default function StatCard({ label, value, to, sublabel }) {
  const Wrapper = to ? Link : "div";
  const wrapperProps = to
    ? { to, className: "card block p-4 hover:bg-gray-50 dark:hover:bg-gray-900/30" }
    : { className: "card p-4" };

  return (
    <Wrapper {...wrapperProps}>
      <div className="text-sm text-gray-600 dark:text-gray-300">{label}</div>

      <div className="mt-2 text-2xl font-semibold">
        {value === undefined || value === null ? "—" : value}
      </div>

      {sublabel ? (
        <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          {sublabel}
        </div>
      ) : null}
    </Wrapper>
  );
}