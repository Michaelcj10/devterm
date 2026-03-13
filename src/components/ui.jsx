import { useState } from "react";
import { INP, SEL, BS } from "../constants";

export function Btn({ onClick, v = "p", disabled, children, cls = "" }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-3 py-1.5 rounded text-xs font-bold font-mono cursor-pointer transition-colors disabled:opacity-40 ${BS[v]} ${cls}`}
    >
      {children}
    </button>
  );
}

export function CopyBtn({ text }) {
  const [ok, setOk] = useState(false);
  return (
    <Btn
      v="s"
      onClick={() => {
        navigator.clipboard.writeText(String(text));
        setOk(true);
        setTimeout(() => setOk(false), 1500);
      }}
    >
      {ok ? "✓ copied" : "[ copy ]"}
    </Btn>
  );
}

export function TA({ value, onChange, placeholder, rows = 6, readOnly }) {
  return (
    <textarea
      className={INP + " resize-y"}
      rows={rows}
      value={value}
      onChange={(e) => onChange && onChange(e.target.value)}
      placeholder={placeholder}
      readOnly={readOnly}
      spellCheck={false}
    />
  );
}

export function Lbl({ children }) {
  return (
    <div className="text-xs font-bold text-green-500 tracking-widest mb-1 font-mono">
      // {children}
    </div>
  );
}

export function Row({ children }) {
  return (
    <div className="flex gap-2 items-center flex-wrap mb-2">{children}</div>
  );
}

export function Msg({ msg }) {
  if (!msg) return null;
  const ok = msg.startsWith("✓");
  return (
    <div
      className={`text-xs font-mono px-2 py-1.5 rounded mb-2 border ${ok ? "text-green-400 bg-green-950 border-green-800" : "text-red-400 bg-black border-red-900"}`}
    >
      {msg}
    </div>
  );
}

export function MonoBox({ children, cls = "" }) {
  return (
    <div
      className={`bg-black border border-green-900 rounded p-3 font-mono text-xs break-all ${cls}`}
    >
      {children}
    </div>
  );
}

export function ResultRow({ label, value, mono = true }) {
  return (
    <div className="flex items-center justify-between bg-black border border-green-900 rounded px-3 py-2">
      <span className="text-xs font-mono text-green-500 w-32 shrink-0">
        {label}
      </span>
      <span
        className={`${mono ? "font-mono" : ""} text-sm text-green-300 flex-1 mx-2 truncate`}
      >
        {value}
      </span>
      <CopyBtn text={String(value)} />
    </div>
  );
}

export { INP, SEL };
