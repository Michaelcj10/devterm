import { CATS, META } from "../constants";

export default function Landing({ nav }) {
  const total = Object.keys(META).length;
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
      c: "text-yellow-600",
    },
    { t: "╔══════════════════════════════════════════╗", c: "text-green-900" },
    { t: "║  > ready. choose your weapon._           ║", c: "text-yellow-400" },
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
      <div className="max-w-4xl mx-auto px-6 py-16">
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
            <div className="text-yellow-600 text-xs font-bold tracking-widest mb-3">
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
                    <div className="font-mono text-sm text-yellow-600 mb-1 group-hover:text-yellow-400">
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
