export default function RecentList({ title, items, emptyText, renderItem }) {
  return (
    <div className="card p-4">
      <div className="font-semibold">{title}</div>

      <div className="mt-3 space-y-2">
        {!items?.length ? (
          <div className="muted">{emptyText || "No items."}</div>
        ) : (
          (items || []).slice(0, 3).map(renderItem)
        )}
      </div>
    </div>
  );
}