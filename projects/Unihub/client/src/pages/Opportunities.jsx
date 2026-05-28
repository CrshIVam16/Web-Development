import { useEffect, useMemo, useState } from "react";
import AppLayout from "../layouts/AppLayout";
import { api } from "../lib/api";
import MultiSelectDropdown from "../components/MultiSelectDropdown";
import { fileUrl } from "../lib/url";
import { COURSE_OPTIONS } from "../lib/constants";
import Alert from "../components/Alert";

function isClosedOpportunity(o) {
  if (!o?.deadline) return false;

  // Treat deadline as end-of-day (prevents "closing" at 12:00 AM)
  const d = new Date(o.deadline);
  d.setHours(23, 59, 59, 999);
  return d < new Date();
}

function fmtDate(d) {
  if (!d) return "";
  const dt = new Date(d);
  // dd-mm-yy
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  }).format(dt);
}

export default function Opportunities() {
  const [q, setQ] = useState("");
  const [type, setType] = useState("");
  const [sort, setSort] = useState("newest"); // newest|oldest
  const [showClosed, setShowClosed] = useState(false); // NEW: hide closed by default

  const [selectedCourses, setSelectedCourses] = useState([]);

  const [items, setItems] = useState([]); // raw from API
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function toggleCourse(course) {
    setSelectedCourses((prev) =>
      prev.includes(course) ? prev.filter((x) => x !== course) : [...prev, course]
    );
  }

  async function fetchList(paramsObj = {}) {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams(paramsObj);
      const path = params.toString()
        ? `/opportunities?${params.toString()}`
        : "/opportunities";

      const data = await api.get(path);
      setItems(data.opportunities || []);
    } catch (err) {
      setError(err.message || "Failed to load opportunities");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchList();
  }, []);

  function onSearch(e) {
    e.preventDefault();
    fetchList({
      ...(q.trim() ? { q: q.trim() } : {}),
      ...(type ? { type } : {}),
      ...(sort ? { sort } : {}),
      ...(selectedCourses.length ? { courses: selectedCourses.join(",") } : {}),
    });
  }

  function onReset() {
    setQ("");
    setType("");
    setSort("newest");
    setSelectedCourses([]);
    setShowClosed(false); // NEW
    fetchList();
  }

  // NEW: derived list based on toggle
  const visibleItems = useMemo(() => {
    if (showClosed) return items;
    return items.filter((o) => !isClosedOpportunity(o));
  }, [items, showClosed]);

  return (
    <AppLayout>
      <h1 className="text-2xl font-semibold">
        {/* Opportunities ({visibleItems.length}) */}
        Opportunities 
      </h1>
      <p className="muted mt-1">
        Only approved opportunities are shown here.
      </p>

      <form onSubmit={onSearch} className="card mt-5 p-4">
        <div className="grid gap-3 lg:grid-cols-4">
          <input
            className="lg:col-span-2 rounded-lg border border-gray-300/70 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 dark:border-gray-800 dark:bg-gray-950"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Keyword (title/description)"
          />

          <select
            className="rounded-lg border border-gray-300/70 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 dark:border-gray-800 dark:bg-gray-950"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">All types</option>
            <option value="Internship">Internship</option>
            <option value="Scholarship">Scholarship</option>
          </select>

          <select
            className="rounded-lg border border-gray-300/70 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 dark:border-gray-800 dark:bg-gray-950"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="newest">Newest → Oldest</option>
            <option value="oldest">Oldest → Newest</option>
          </select>
        </div>

        <div className="mt-3">
          {/* Mobile */}
          <div className="block sm:hidden">
            <MultiSelectDropdown
              label="Course filter"
              options={COURSE_OPTIONS}
              value={selectedCourses}
              onChange={setSelectedCourses}
              placeholder="All courses"
            />
            <p className="muted mt-2">No course selected = all opportunities.</p>
          </div>

          {/* Desktop */}
          <div className="hidden sm:block">
            <div className="text-sm font-medium">Course filter</div>
            <div className="mt-2 flex flex-wrap gap-3">
              {COURSE_OPTIONS.map((c) => (
                <label key={c} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={selectedCourses.includes(c)}
                    onChange={() => toggleCourse(c)}
                  />
                  <span>{c}</span>
                </label>
              ))}
            </div>
            <p className="muted mt-2">No course selected = all opportunities.</p>
          </div>
        </div>

        {/* NEW: show closed toggle */}
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200">
            <input
              type="checkbox"
              checked={showClosed}
              onChange={(e) => setShowClosed(e.target.checked)}
            />
            <span>Show closed opportunities</span>
          </label>
        </div>

        <div className="mt-3 flex gap-2">
          <button disabled={loading} className="btn-primary disabled:opacity-60" type="submit">
            {loading ? "Searching..." : "Search"}
          </button>
          <button type="button" className="btn-outline" onClick={onReset}>
            Reset
          </button>
        </div>
      </form>

      <div className="mt-4">
        <Alert variant="error">{error}</Alert>
      </div>

      <div className="mt-4 space-y-3">
        {visibleItems.length === 0 && !loading ? (
          <div className="card p-6 text-sm text-gray-600 dark:text-gray-300">
            No opportunities found.
          </div>
        ) : null}

        {visibleItems.map((o) => {
          const closed = isClosedOpportunity(o);

          return (
            <div key={o._id} className={`card p-4 ${closed ? "opacity-80" : ""}`}>
              <div className="flex flex-wrap items-center gap-2">
                <div className="font-semibold">{o.title}</div>

                <span
                  className={[
                    "rounded-full border px-2 py-0.5 text-xs font-medium",
                    o.type === "Internship"
                      ? "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-blue-200"
                      : "border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-900/50 dark:bg-purple-950/40 dark:text-purple-200",
                  ].join(" ")}
                >
                  {o.type}
                </span>

                {closed ? (
                  <span className="rounded-full border border-red-200 bg-red-50 px-2 py-0.5 text-xs font-medium text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-200">
                    Closed
                  </span>
                ) : null}
              </div>

              {o.deadline ? (
                <div className="mt-2 text-sm font-semibold text-red-600 dark:text-red-400">
                  Deadline: {fmtDate(o.deadline)}
                </div>
              ) : null}

              <details className="mt-3">
                <summary className="cursor-pointer text-sm text-indigo-600 hover:underline">
                  View details
                </summary>

                <div className="mt-2 whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-200">
                  {o.description}
                </div>

                <div className="mt-2 whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-200">
                  <span className="font-medium">Eligibility:</span> {o.eligibility}
                </div>

                {o.link ? (
                  <a
                    className="mt-2 block text-sm text-indigo-600 hover:underline break-words"
                    href={o.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open link
                  </a>
                ) : null}

                {o.attachmentPath ? (
                  <a
                    className="mt-1 block text-sm text-indigo-600 hover:underline"
                    href={fileUrl(o.attachmentPath)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open attachment
                  </a>
                ) : null}
              </details>
            </div>
          );
        })}
      </div>
    </AppLayout>
  );
}