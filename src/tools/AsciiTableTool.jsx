import { useState } from "react";
import { INP } from "../constants";

export default function AsciiTableTool() {
  const [q, setQ] = useState("");
  const [copied, setCopied] = useState(null);
  const copy = (c) => {
    navigator.clipboard.writeText(c);
    setCopied(c);
    setTimeout(() => setCopied(null), 1000);
  };
  const chars = Array.from({ length: 95 }, (_, i) => ({
    code: i + 32,
    char: String.fromCharCode(i + 32),
    hex: "0x" + (i + 32).toString(16).toUpperCase().padStart(2, "0"),
  }));
  const filtered = q
    ? chars.filter(
        ({ code, char, hex }) =>
          String(code).includes(q) ||
          char === q ||
          hex.toLowerCase().includes(q.toLowerCase()),
      )
    : chars;
  return (
    <div className="space-y-3">
      <input
        className={INP}
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="filter by char, decimal, or hex..."
      />
      <div
        className="grid gap-1"
        style={{ gridTemplateColumns: "repeat(auto-fill,minmax(70px,1fr))" }}
      >
        {filtered.map(({ code, char, hex }) => (
          <button
            key={code}
            onClick={() => copy(char)}
            className={`bg-black border rounded p-2 text-center font-mono cursor-pointer transition-colors ${copied === char ? "border-green-500 bg-green-950" : "border-green-900 hover:border-green-600"}`}
          >
            <div className="text-lg text-green-300 leading-none mb-1">
              {code === 32 ? "␣" : char}
            </div>
            <div className="text-xs text-green-500">{code}</div>
            <div className="text-xs text-green-600">{hex}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
