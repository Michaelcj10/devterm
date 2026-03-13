import { useState } from "react";
import { Lbl, ResultRow } from "../components/ui";
import { INP, SEL } from "../constants";

export default function ByteConverterTool({ init, onInput } = {}) {
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
  const _bp = (() => {
    if (!init) return {};
    const parts = init.split(":");
    return parts.length === 2 ? { val: parts[0], unit: parts[1] } : { val: init };
  })();
  const [val, setVal] = useState(_bp.val || "1");
  const [unit, setUnit] = useState(_bp.unit || "GB");
  const hiVal = (v) => { setVal(v); onInput && onInput(v + ":" + unit); };
  const hiUnit = (v) => { setUnit(v); onInput && onInput(val + ":" + v); };
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
            onChange={(e) => hiVal(e.target.value)}
          />
        </div>
        <div>
          <Lbl>unit</Lbl>
          <select
            className={SEL + " h-9"}
            value={unit}
            onChange={(e) => hiUnit(e.target.value)}
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
