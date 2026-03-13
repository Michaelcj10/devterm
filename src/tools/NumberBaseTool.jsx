import { useState } from "react";
import { Msg, ResultRow } from "../components/ui";
import { INP, SEL } from "../constants";

export default function NumberBaseTool({ init, onInput }) {
  const [val, setVal] = useState(init || "255");
  const [from, setFrom] = useState("10");
  const hi = (v) => {
    setVal(v);
    onInput && onInput(v);
  };
  const bases = [
    ["2", "binary"],
    ["8", "octal"],
    ["10", "decimal"],
    ["16", "hex"],
  ];
  const num = parseInt(val, parseInt(from));
  const valid = !isNaN(num) && val.trim() !== "";
  return (
    <div className="space-y-3">
      <div className="flex gap-2 items-end">
        <div className="flex-1">
          <div className="text-xs font-bold text-green-800 tracking-widest mb-1 font-mono">
            // value
          </div>
          <input
            className={INP}
            value={val}
            onChange={(e) => hi(e.target.value)}
          />
        </div>
        <div>
          <div className="text-xs font-bold text-green-800 tracking-widest mb-1 font-mono">
            // from base
          </div>
          <select
            className={SEL + " h-9"}
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          >
            {bases.map(([v, l]) => (
              <option key={v} value={v}>
                {l}
              </option>
            ))}
          </select>
        </div>
      </div>
      {valid ? (
        <div className="space-y-1.5">
          {bases.map(([b, l]) => {
            const r = num.toString(parseInt(b)).toUpperCase();
            return <ResultRow key={b} label={l + " (" + b + ")"} value={r} />;
          })}
        </div>
      ) : (
        <Msg msg="invalid value for selected base" />
      )}
    </div>
  );
}
