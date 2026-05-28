// src/pages/SubmitOpportunity.jsx
import { useEffect, useState } from "react";
import AppLayout from "../layouts/AppLayout";
import { api } from "../lib/api";
import MultiSelectDropdown from "../components/MultiSelectDropdown";
import { fileUrl } from "../lib/url";
import { COURSE_OPTIONS } from "../lib/constants";
import Alert from "../components/Alert"; // DRY alerts

const inputCls =
  "w-full rounded-lg border border-gray-300/70 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 dark:border-gray-800 dark:bg-gray-950";

export default function SubmitOpportunity() {
  const [selectedCourses, setSelectedCourses] = useState(["Any"]);

  const [title, setTitle] = useState("");
  const [type, setType] = useState("Internship");
  const [description, setDescription] = useState("");
  const [eligibility, setEligibility] = useState("");
  const [deadline, setDeadline] = useState("");
  const [link, setLink] = useState("");
  const [attachment, setAttachment] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [created, setCreated] = useState(null);

  useEffect(() => {
    if (!success) return;
    const t = setTimeout(() => setSuccess(""), 2500);
    return () => clearTimeout(t);
  }, [success]);

  function toggleCourse(course) {
    setSelectedCourses((prev) => {
      const set = new Set(prev);

      if (set.has(course)) set.delete(course);
      else set.add(course);

      // If any specific course is selected, remove Any
      const hasSpecific = [...set].some((c) => c !== "Any");
      if (hasSpecific) set.delete("Any");

      // If nothing selected, fallback to Any
      if (set.size === 0) set.add("Any");

      return [...set];
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setCreated(null);

    const fd = new FormData();
    fd.append("title", title);
    fd.append("type", type);
    fd.append("description", description);
    fd.append("eligibility", eligibility);
    fd.append("eligibleCourses", selectedCourses.join(","));
    fd.append("deadline", deadline);
    if (link.trim()) fd.append("link", link.trim());
    if (attachment) fd.append("attachment", attachment);

    setLoading(true);
    try {
      const data = await api.upload("/opportunities", fd);
      setCreated(data.opportunity);
      setSuccess("Submitted successfully. Status: pending (awaiting admin approval).");

      setTitle("");
      setType("Internship");
      setDescription("");
      setEligibility("");
      setDeadline("");
      setLink("");
      setAttachment(null);
      setSelectedCourses(["Any"]);
      e.target.reset();
    } catch (err) {
      setError(err.message || "Submission failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AppLayout>
      <h1 className="text-2xl font-semibold">Submit Opportunity</h1>
      <p className="muted mt-1">Alumni only • Admin approval required</p>

      <div className="mt-4 space-y-3">
        <Alert variant="error">{error}</Alert>
        <Alert variant="success">{success}</Alert>
      </div>

      <form onSubmit={onSubmit} className="card mt-5 space-y-4 p-5">
        <input
          className={inputCls}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />

        <div className="grid gap-3 sm:grid-cols-2">
          <select
            className={inputCls}
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option>Internship</option>
            <option>Scholarship</option>
          </select>

          <div>
            <input
              className={inputCls}
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              required
            />
            <div className="muted mt-1">Select deadline date</div>
          </div>
        </div>

        <textarea
          className={`${inputCls} min-h-[120px]`}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
        />

        <textarea
          className={`${inputCls} min-h-[90px]`}
          value={eligibility}
          onChange={(e) => setEligibility(e.target.value)}
          placeholder="Eligibility"
          required
        />

        <div>
          <div className="text-sm font-medium">Eligible Courses</div>

          {/* Mobile: dropdown */}
          <div className="mt-2 sm:hidden">
            <MultiSelectDropdown
              label=""
              options={COURSE_OPTIONS}
              value={selectedCourses}
              onChange={(next) => {
                let courses = next;

                const hasSpecific = courses.some((c) => c !== "Any");
                if (hasSpecific) courses = courses.filter((c) => c !== "Any");

                if (!courses.length) courses = ["Any"];
                setSelectedCourses(courses);
              }}
              placeholder="Choose courses"
            />
          </div>

          {/* Desktop: checkboxes */}
          <div className="mt-2 hidden flex-wrap gap-3 sm:flex">
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

          <p className="muted mt-2">
            Selecting specific courses removes “Any”. If nothing selected, “Any” is used.
          </p>
        </div>

        <input
          className={inputCls}
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="Link (optional)"
        />

        <input
          className={inputCls}
          type="file"
          accept="application/pdf,image/*"
          onChange={(e) => setAttachment(e.target.files?.[0] || null)}
        />

        <button disabled={loading} className="btn-primary disabled:opacity-60" type="submit">
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>

      {created ? (
        <div className="card mt-5 p-5">
          <div className="font-semibold">Submitted</div>
          <div className="muted mt-1">
            Status: <span className="font-medium">{created.status}</span>
          </div>

          {created.attachmentPath ? (
            <a
              className="mt-2 inline-block text-indigo-600 hover:underline"
              href={fileUrl(created.attachmentPath)}
              target="_blank"
              rel="noreferrer"
            >
              Open attachment
            </a>
          ) : null}
        </div>
      ) : null}
    </AppLayout>
  );
}