import { useState, useMemo, useRef, useEffect } from "react";
import { META } from "../constants";

export default function CommandPalette({ onNav, onClose, history }) {
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  const results = useMemo(() => {
    if (!q) return null;
    const lq = q.toLowerCase();
    return Object.entries(META)
      .filter(
        ([id, m]) =>
          m.label.toLowerCase().includes(lq) ||
          id.includes(lq) ||
          m.desc.toLowerCase().includes(lq),
      )
      .slice(0, 8);
  }, [q]);

  const displayed =
    results || history.map((h) => [h.id, META[h.id]]).filter(([, m]) => m);

  const go = (id) => {
    onNav("/" + id);
    onClose();
  };

  const onKey = (e) => {
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSel((s) => Math.min(s + 1, displayed.length - 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setSel((s) => Math.max(s - 1, 0));
    }
    if (e.key === "Enter" && displayed[sel]) go(displayed[sel][0]);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 bg-black/85"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-neutral-950 border border-green-700 rounded-lg overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        style={{ boxShadow: "0 0 40px rgba(74,222,128,0.15)" }}
      >
        <div className="flex items-center border-b border-green-900 px-4 py-3">
          <span className="text-green-600 mr-2 font-mono text-sm">$</span>
          <input
            ref={ref}
            className="flex-1 bg-transparent font-mono text-green-300 outline-none text-sm placeholder-green-600"
            placeholder="search all tools..."
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setSel(0);
            }}
            onKeyDown={onKey}
          />
          <kbd className="text-green-600 text-xs font-mono bg-green-950 border border-green-900 rounded px-1.5 py-0.5">
            ESC
          </kbd>
        </div>
        {!q && history.length > 0 && (
          <div className="px-4 py-1.5 text-xs font-mono text-green-600 border-b border-green-950">
            // recent
          </div>
        )}
        <div>
          {displayed.map(([id, m], i) => (
            <button
              key={id + i}
              onClick={() => go(id)}
              className={`w-full text-left px-4 py-2.5 flex items-center gap-3 border-0 cursor-pointer font-mono text-xs transition-colors ${i === sel ? "bg-green-900 text-green-200" : "text-green-600 hover:bg-green-950 hover:text-green-300"}`}
            >
              <span className="text-cyan-600 w-8 shrink-0">{m?.icon}</span>
              <span className="text-green-300 w-32 shrink-0">{m?.label}</span>
              <span className="text-green-500 flex-1 truncate">
                {!q && history.find((h) => h.id === id)?.lastInput ? (
                  <span className="text-green-600">
                    {history.find((h) => h.id === id).lastInput.slice(0, 40)}...
                  </span>
                ) : (
                  m?.desc
                )}
              </span>
            </button>
          ))}
        </div>
        <div className="border-t border-green-950 px-4 py-2 text-xs font-mono text-green-600 flex gap-4">
          <span>↑↓ navigate</span>
          <span>↵ open</span>
          <span>ESC close</span>
          <span>⌘K toggle</span>
          {!q && history.length > 0 && (
            <span className="ml-auto">
              showing last {history.length} visited
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
