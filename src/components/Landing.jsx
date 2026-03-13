import { useState, useEffect } from "react";
import { CATS, META } from "../constants";

const SHORTCUTS = [
  ["⌘K / Ctrl+K", "Open command palette"],
  ["/", "Focus sidebar search"],
  ["↑ ↓", "Navigate results"],
  ["↵", "Open selected tool"],
  ["Esc", "Close palette / clear search"],
];

function SettingsModal({ onClose }) {
  const [counts, setCounts] = useState({ history: 0, pins: 0, saved: 0 });

  useEffect(() => {
    try {
      const h = JSON.parse(localStorage.getItem("devterm_history") || "[]");
      const p = JSON.parse(localStorage.getItem("devterm_pins") || "[]");
      const s = JSON.parse(localStorage.getItem("devterm_saved") || "{}");
      setCounts({
        history: h.length,
        pins: p.length,
        saved: Object.keys(s).length,
      });
    } catch {}
  }, []);

  const clear = (key, label) => {
    localStorage.removeItem(key);
    setCounts((c) => ({ ...c, [label]: 0 }));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-neutral-950 border border-green-800 rounded-lg overflow-hidden"
        style={{ boxShadow: "0 0 40px rgba(74,222,128,0.12)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-green-900 px-5 py-3">
          <div className="text-green-400 font-bold font-mono text-sm">
            // settings
          </div>
          <button
            onClick={onClose}
            className="text-green-600 hover:text-green-300 font-mono text-xl bg-transparent border-0 cursor-pointer leading-none transition-colors"
          >
            ×
          </button>
        </div>

        <div className="px-5 py-4 border-b border-green-900">
          <div className="text-xs font-bold text-green-600 tracking-widest mb-3">
            // keyboard shortcuts
          </div>
          <div className="space-y-2">
            {SHORTCUTS.map(([key, desc]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-green-500 text-xs font-mono">{desc}</span>
                <kbd className="text-xs font-mono bg-green-950 border border-green-800 text-green-400 rounded px-1.5 py-0.5">
                  {key}
                </kbd>
              </div>
            ))}
          </div>
        </div>

        <div className="px-5 py-4 border-b border-green-900">
          <div className="text-xs font-bold text-green-600 tracking-widest mb-3">
            // saved data
          </div>
          <div className="space-y-2.5">
            {[
              ["history", "devterm_history", "recent tools"],
              ["pins", "devterm_pins", "pinned tools"],
              ["saved", "devterm_saved", "saved inputs"],
            ].map(([label, key, desc]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-green-500 text-xs font-mono">
                  {desc}{" "}
                  <span className="text-green-700">({counts[label]})</span>
                </span>
                <button
                  onClick={() => clear(key, label)}
                  disabled={counts[label] === 0}
                  className="text-xs font-mono text-green-600 hover:text-red-400 bg-transparent border border-green-900 rounded px-2 py-0.5 cursor-pointer transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  [ clear ]
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="px-5 py-3 text-xs text-green-600 font-mono">
          DEVTERM v9000.0.2 · no backend · no cookies · no tracking
        </div>
      </div>
    </div>
  );
}

export default function Landing({ nav }) {
  const total = Object.keys(META).length;
  const [scrolled, setScrolled] = useState(false);
  const [settings, setSettings] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const BOOT = [
    { t: "DEVTERM v9000.0.2 — booting...", c: "text-green-600" },
    {
      t: "[  OK  ] tools ................. " + total + " loaded",
      c: "text-green-400",
    },
    {
      t: "[  OK  ] json→typescript ........ inference engine online",
      c: "text-green-400",
    },
    {
      t: "[  OK  ] pem decoder ........... openssl wrapper removed",
      c: "text-green-400",
    },
    {
      t: "[  OK  ] password hashing ........ PBKDF2-SHA256 (not bcrypt, don't @ us)",
      c: "text-green-400",
    },
    {
      t: "[  OK  ] qr code generator ....... scannable and slightly retro",
      c: "text-green-400",
    },
    {
      t: "[  OK  ] ⌘K recent history ....... last 5 tools remembered",
      c: "text-green-400",
    },
    {
      t: "[ WARN ] excuse generator ........ still won't hold up in court",
      c: "text-cyan-600",
    },
    { t: "╔══════════════════════════════════════════╗", c: "text-green-900" },
    { t: "║  > ready. choose your weapon._           ║", c: "text-cyan-400" },
    { t: "╚══════════════════════════════════════════╝", c: "text-green-900" },
  ];

  return (
    <div
      className="min-h-screen bg-black text-green-400 font-mono"
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,255,80,0.015) 2px,rgba(0,255,80,0.015) 4px)",
      }}
    >
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-black/90 backdrop-blur-sm border-b border-green-900 py-2.5"
            : "bg-transparent border-b border-transparent py-4"
        }`}
      >
        <div className="max-w-4xl mx-auto px-6 flex items-center justify-between">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-green-400 font-black font-mono tracking-tighter text-lg cursor-pointer bg-transparent border-0 p-0 hover:text-green-300 transition-colors"
            style={{ textShadow: scrolled ? "0 0 12px #4ade80" : "0 0 30px #4ade80, 0 0 60px #16a34a" }}
          >
            &gt; DEVTERM_
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSettings(true)}
              className="text-green-600 hover:text-green-400 font-mono text-xs bg-transparent border border-green-900 hover:border-green-700 rounded px-2.5 py-1 cursor-pointer transition-colors"
            >
              [ settings ]
            </button>
            <button
              onClick={() => nav("/json")}
              className="text-green-400 hover:text-green-300 font-mono text-xs bg-green-950 hover:bg-green-900 border border-green-800 hover:border-green-600 rounded px-3 py-1 cursor-pointer transition-colors font-bold"
            >
              [ open toolbox ]
            </button>
          </div>
        </div>
      </header>

      {settings && <SettingsModal onClose={() => setSettings(false)} />}

      <div className="max-w-4xl mx-auto px-6 pt-24 pb-16">
        <div className="text-center mb-10">
          <div
            className="text-6xl font-black tracking-tighter text-green-400 mb-1"
            style={{ textShadow: "0 0 30px #4ade80, 0 0 60px #16a34a" }}
          >
            DEVTERM
          </div>
          <div className="text-green-500 text-sm">
            // {total} tools · no backend · no tracking · ⌘K to search
          </div>
        </div>
        <div className="bg-neutral-950 border border-green-900 rounded-lg p-5 mb-10 text-sm space-y-0.5">
          {BOOT.map((l, i) => (
            <div key={i} className={`leading-6 ${l.c}`}>
              {l.t}
            </div>
          ))}
        </div>
        <div className="text-center mb-10">
          <button
            onClick={() => nav("/json")}
            className="bg-green-800 hover:bg-green-700 border border-green-600 text-green-100 px-8 py-3 rounded text-base font-bold font-mono cursor-pointer transition-colors"
            style={{ boxShadow: "0 0 20px rgba(74,222,128,0.2)" }}
          >
            [ OPEN TOOLBOX ]
          </button>
          <div className="text-green-600 text-xs mt-2">
            or pick below · or ⌘K to search
          </div>
        </div>
        {CATS.map((cat) => (
          <div key={cat.id} className="mb-10">
            <div className="text-cyan-600 text-xs font-bold tracking-widest mb-3">
              // {cat.label}
            </div>
            <div
              className="grid gap-2"
              style={{
                gridTemplateColumns: "repeat(auto-fill,minmax(190px,1fr))",
              }}
            >
              {cat.ids.map((id) => {
                const m = META[id];
                return (
                  <button
                    key={id}
                    onClick={() => nav("/" + id)}
                    className="bg-neutral-950 hover:bg-green-950 border border-green-900 hover:border-green-700 rounded p-3 text-left cursor-pointer transition-all group"
                  >
                    <div className="font-mono text-sm text-cyan-600 mb-1 group-hover:text-cyan-400">
                      {m.icon}
                    </div>
                    <div className="font-bold text-xs text-green-400 mb-1">
                      {m.label}
                    </div>
                    <div className="text-xs text-green-500 leading-relaxed">
                      {m.desc}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-green-950 py-4 text-center text-xs text-green-600 font-mono">
        DEVTERM · no cookies · no ads · {total} tools · exit 0
      </div>
    </div>
  );
}
