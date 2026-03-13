import { useState } from "react";
import { Lbl, ResultRow } from "../components/ui";
import { INP, SEL } from "../constants";

export default function ByteConverterTool() {
  const UNITS = [
    ["B", 1],
    ["KB", 1e3],
    ["KiB", 1024],
    ["MB", 1e6],
    ["MiB", 1048576],
    ["GB", 1e9],
    ["GiB", 1073741824],
    ["TB", 1e12],
    ["TiB", 1099511627776],
  ];
  const [val, setVal] = useState("1");
  const [unit, setUnit] = useState("GB");
  const bytes = parseFloat(val) * (UNITS.find((u) => u[0] === unit)?.[1] || 1);
  const fmt = (n) => {
    if (n === 0) return "0";
    return parseFloat(n.toPrecision(8)).toLocaleString(undefined, {
      maximumFractionDigits: 8,
    });
  };
  return (
    <div className="space-y-3">
      <div className="flex gap-2 items-end">
        <div className="flex-1">
          <Lbl>value</Lbl>
          <input
            className={INP}
            value={val}
            onChange={(e) => setVal(e.target.value)}
          />
        </div>
        <div>
          <Lbl>unit</Lbl>
          <select
            className={SEL + " h-9"}
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          >
            {UNITS.map(([u]) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
        </div>
      </div>
      {!isNaN(bytes) && (
        <div className="space-y-1.5">
          {UNITS.map(([u, f]) => (
            <ResultRow key={u} label={u} value={fmt(bytes / f) + " " + u} />
          ))}
        </div>
      )}
    </div>
  );
}
