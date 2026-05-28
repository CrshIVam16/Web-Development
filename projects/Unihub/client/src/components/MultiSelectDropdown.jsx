import { useEffect, useMemo, useRef, useState } from "react";

/**
 * Minimal multi-select dropdown (checkbox list inside a popover)
 * - Click to open/close
 * - Click outside closes
 * - Controlled by value[] + onChange(nextArray)
 */
export default function MultiSelectDropdown({
    label = "Select",
    options = [],
    value = [],
    onChange,
    placeholder = "Select...",
}) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    const selectedText = useMemo(() => {
        if (!value?.length) return placeholder;
        if (value.length <= 2) return value.join(", ");
        return `${value.slice(0, 2).join(", ")} +${value.length - 2}`;
    }, [value, placeholder]);

    useEffect(() => {
        function onDocClick(e) {
            if (!ref.current) return;
            if (!ref.current.contains(e.target)) setOpen(false);
        }
        document.addEventListener("mousedown", onDocClick);
        return () => document.removeEventListener("mousedown", onDocClick);
    }, []);

    function toggleItem(opt) {
        const set = new Set(value || []);
        if (set.has(opt)) set.delete(opt);
        else set.add(opt);
        onChange([...set]);
    }

    return (
        <div ref={ref} className="relative">
            <div className="text-sm font-medium">{label}</div>

            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="mt-1 flex w-full items-center justify-between rounded-lg border border-gray-300/70 bg-white px-3 py-2 text-sm hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-900"
            >
                <span className={value?.length ? "" : "text-gray-500 dark:text-gray-400"}>
                    {selectedText}
                </span>
                <span className="text-gray-500 dark:text-gray-400">{open ? "▲" : "▼"}</span>
            </button>

            {open ? (
                <div className="absolute z-50 mt-2 w-full rounded-xl border border-gray-200 bg-white p-2 shadow-lg dark:border-gray-800 dark:bg-gray-900">
                    <div className="max-h-48 overflow-auto">
                        {options.map((opt) => (
                            <label
                                key={opt}
                                className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800/60"
                            >
                                <input
                                    type="checkbox"
                                    checked={value.includes(opt)}
                                    onChange={() => toggleItem(opt)}
                                />
                                <span>{opt}</span>
                            </label>
                        ))}
                    </div>

                    <div className="mt-2 flex justify-end">
                        <button
                            type="button"
                            className="btn-outline px-3 py-2"
                            onClick={() => setOpen(false)}
                        >
                            Done
                        </button>
                    </div>
                </div>
            ) : null}
        </div>
    );
}