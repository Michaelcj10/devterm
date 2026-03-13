import { useState } from "react";
import { CopyBtn, TA, Lbl } from "../components/ui";

export default function CaseTool({ init, onInput }) {
  const [inp, setInp] = useState(
    init || "the quick brown fox jumps over the lazy dog",
  );
  const hi = (v) => {
    setInp(v);
    onInput && onInput(v);
  };
  const w = (s) => s.match(/[a-zA-Z0-9]+/g) || [];
  const cases = [
    [
      "camelCase",
      (s) => {
        const r = w(s);
        return r
          .map((x, i) =>
            i === 0
              ? x.toLowerCase()
              : x[0].toUpperCase() + x.slice(1).toLowerCase(),
          )
          .join("");
      },
    ],
    [
      "PascalCase",
      (s) =>
        w(s)
          .map((x) => x[0].toUpperCase() + x.slice(1).toLowerCase())
          .join(""),
    ],
    [
      "snake_case",
      (s) =>
        w(s)
          .map((x) => x.toLowerCase())
          .join("_"),
    ],
    [
      "SCREAMING",
      (s) =>
        w(s)
          .map((x) => x.toUpperCase())
          .join("_"),
    ],
    [
      "kebab-case",
      (s) =>
        w(s)
          .map((x) => x.toLowerCase())
          .join("-"),
    ],
    [
      "dot.case",
      (s) =>
        w(s)
          .map((x) => x.toLowerCase())
          .join("."),
    ],
    [
      "Title Case",
      (s) =>
        w(s)
          .map((x) => x[0].toUpperCase() + x.slice(1).toLowerCase())
          .join(" "),
    ],
    ["lowercase", (s) => s.toLowerCase()],
    ["UPPERCASE", (s) => s.toUpperCase()],
  ];
  return (
    <div className="space-y-3">
      <Lbl>input</Lbl>
      <TA value={inp} onChange={hi} rows={3} />
      <div className="space-y-1.5">
        {cases.map(([name, fn]) => {
          const r = fn(inp);
          return (
            <div
              key={name}
              className="flex items-center justify-between bg-black border border-green-900 rounded px-3 py-2"
            >
              <span className="text-xs font-mono text-green-500 w-28 shrink-0">
                {name}
              </span>
              <span className="font-mono text-sm text-green-300 flex-1 truncate mx-2">
                {r}
              </span>
              <CopyBtn text={r} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
