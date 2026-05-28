// src/pages/Materials.jsx
import { useEffect, useState } from "react";
import AppLayout from "../layouts/AppLayout";
import { api } from "../lib/api";
import { fileUrl } from "../lib/url";
import Alert from "../components/Alert"; // DRY alerts

export default function Materials() {
  const [q, setQ] = useState("");
  const [fileKind, setFileKind] = useState("all"); // all|pdf|image
  const [sort, setSort] = useState("newest"); // newest|oldest
  const [semester, setSemester] = useState("all"); // all|1..6

  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchMaterials(paramsObj = {}) {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams(paramsObj);
      const path = params.toString() ? `/materials?${params}` : "/materials";
      const data = await api.get(path);
      setMaterials(data.materials || []);
    } catch (err) {
      setError(err.message || "Failed to load materials");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMaterials();
  }, []);

  function onSearch(e) {
    e.preventDefault();
    fetchMaterials({
      ...(q.trim() ? { q: q.trim() } : {}),
      ...(fileKind !== "all" ? { fileKind } : {}),
      ...(sort ? { sort } : {}),
      ...(semester !== "all" ? { semester } : {}),
    });
  }

  async function downloadFile(url, filename = "material") {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Download failed");

    const blob = await res.blob();
    const objUrl = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = objUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();

    window.URL.revokeObjectURL(objUrl);
  }

  return (
    <AppLayout>
      {/* <h1 className="text-2xl font-semibold">Materials ({materials.length})</h1> */}
      <h1 className="text-2xl font-semibold">Materials</h1>
      <p className="muted mt-1">Search and download study materials.</p>

      <form onSubmit={onSearch} className="card mt-5 p-4">
        <div className="grid gap-3 md:grid-cols-5">
          <input
            className="md:col-span-2 rounded-lg border border-gray-300/70 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 dark:border-gray-800 dark:bg-gray-950"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by title / subject / teacher..."
          />

          <select
            className="rounded-lg border border-gray-300/70 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 dark:border-gray-800 dark:bg-gray-950"
            value={fileKind}
            onChange={(e) => setFileKind(e.target.value)}
          >
            <option value="all">All files</option>
            <option value="pdf">PDF only</option>
            <option value="image">Images only</option>
          </select>

          <select
            className="rounded-lg border border-gray-300/70 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 dark:border-gray-800 dark:bg-gray-950"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="newest">Newest → Oldest</option>
            <option value="oldest">Oldest → Newest</option>
          </select>

          <select
            className="md:col-span-1 rounded-lg border border-gray-300/70 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 dark:border-gray-800 dark:bg-gray-950"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
          >
            <option value="all">All semesters</option>
            <option value="1">Sem 1</option>
            <option value="2">Sem 2</option>
            <option value="3">Sem 3</option>
            <option value="4">Sem 4</option>
            <option value="5">Sem 5</option>
            <option value="6">Sem 6</option>
          </select>
        </div>

        <div className="mt-3 flex gap-2">
          <button
            className="btn-primary disabled:opacity-60"
            disabled={loading}
            type="submit"
          >
            {loading ? "Searching..." : "Search"}
          </button>

          <button
            type="button"
            className="btn-outline"
            onClick={() => {
              setQ("");
              setFileKind("all");
              setSort("newest");
              setSemester("all");
              fetchMaterials();
            }}
          >
            Reset
          </button>
        </div>
      </form>

      <div className="mt-4">
        <Alert variant="error">{error}</Alert>
      </div>

      <div className="mt-4 space-y-3">
        {materials.length === 0 && !loading ? (
          <div className="card p-6 text-sm text-gray-600 dark:text-gray-300">
            No materials found.
          </div>
        ) : null}

        {materials.map((m) => {
          const url = fileUrl(m.filePath);

          return (
            <div key={m._id} className="card p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-semibold">{m.title}</div>
                  <div className="muted mt-1">
                    {m.subject} • Sem {m.semester}
                  </div>

                  <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Uploaded on: {new Date(m.createdAt).toLocaleString()}
                  </div>

                  {m.uploadedBy?.name ? (
                    <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Uploaded by: {m.uploadedBy.name}
                    </div>
                  ) : null}
                </div>

                <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                  <a
                    className="btn-outline px-3 py-2 text-center"
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open
                  </a>

                  <button
                    type="button"
                    className="btn-primary px-3 py-2"
                    onClick={() =>
                      downloadFile(
                        url,
                        `${(m.title || "material").replaceAll(" ", "_")}.file`
                      )
                    }
                  >
                    Download
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AppLayout>
  );
}