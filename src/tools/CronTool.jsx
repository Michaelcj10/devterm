import { useState } from "react";
import { Lbl, MonoBox } from "../components/ui";
import { INP } from "../constants";

export default function CronTool({ init, onInput }) {
  const [expr, setExpr] = useState(init || "*/5 * * * *");
  const hi = (v) => {
    setExpr(v);
    onInput && onInput(v);
  };
  const FIELDS = ["minute", "hour", "day/mo", "month", "day/wk"];
  const RANGES = ["0-59", "0-23", "1-31", "1-12", "0-6"];
  const PRESETS = [
    ["every minute", "* * * * *"],
    ["every 5 min", "*/5 * * * *"],
    ["every hour", "0 * * * *"],
    ["daily midnight", "0 0 * * *"],
    ["weekly sunday", "0 0 * * 0"],
    ["monthly 1st", "0 0 1 * *"],
    ["weekdays 9am", "0 9 * * 1-5"],
    ["every 15 min", "*/15 * * * *"],
  ];
  const explain = (e) => {
    const p = e.trim().split(/\s+/);
    if (p.length < 5) return "enter a valid 5-part expression";
    const f = (v, u) => {
      if (v === "*") return "every " + u;
      if (v.startsWith("*/")) return "every " + v.slice(2) + " " + u + "s";
      if (v.includes("-")) return u + " " + v + " (range)";
      return u + " " + v;
    };
    return (
      "runs at " +
      f(p[0], "minute") +
      ", " +
      f(p[1], "hour") +
      ", day " +
      (p[2] === "*" ? "any" : p[2]) +
      ", month " +
      (p[3] === "*" ? "any" : p[3]) +
      ", weekday " +
      (p[4] === "*" ? "any" : p[4])
    );
  };
  const parts = expr.trim().split(/\s+/);
  return (
    <div className="space-y-3">
      <Lbl>expression</Lbl>
      <input
        className={INP + " text-xl text-green-300 tracking-widest py-3"}
        value={expr}
        onChange={(e) => hi(e.target.value)}
        placeholder="* * * * *"
      />
      <div className="grid grid-cols-5 gap-1.5">
        {FIELDS.map((f, i) => (
          <div
            key={f}
            className={`bg-black border rounded p-2 text-center ${i < parts.length && parts[i] ? "border-green-700" : "border-green-900"}`}
          >
            <div className="font-mono text-base text-green-300 font-bold">
              {parts[i] || "?"}
            </div>
            <div className="text-xs text-green-500 mt-0.5">{f}</div>
            <div className="text-xs text-green-600">{RANGES[i]}</div>
          </div>
        ))}
      </div>
      <MonoBox cls="text-green-500">
        <span className="text-green-600">// </span>
        {explain(expr)}
      </MonoBox>
      <Lbl>presets</Lbl>
      <div className="grid grid-cols-2 gap-1.5">
        {PRESETS.map(([label, e]) => (
          <button
            key={label}
            onClick={() => hi(e)}
            className={`text-left px-3 py-2 rounded text-xs font-mono border cursor-pointer transition-colors ${expr === e ? "border-green-600 bg-green-950 text-green-300" : "border-green-900 bg-black text-green-500 hover:border-green-700 hover:text-green-400"}`}
          >
            <div className="mb-0.5">{label}</div>
            <div className="text-green-500">{e}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
