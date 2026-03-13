import { useState } from "react";
import { Lbl, ResultRow } from "../components/ui";
import { INP } from "../constants";

export default function ColorTool({ init }) {
  const [hex, setHex] = useState(init || "#00ff66");
  const [r, setR] = useState(0);
  const [g, setG] = useState(255);
  const [b, setB] = useState(102);
  const toHex = (rr, gg, bb) =>
    "#" +
    [rr, gg, bb]
      .map((x) =>
        Math.min(255, Math.max(0, Math.round(x)))
          .toString(16)
          .padStart(2, "0"),
      )
      .join("");
  const fromHex = (h) => {
    const c = h.replace("#", "");
    if (c.length !== 6) return;
    setR(parseInt(c.slice(0, 2), 16));
    setG(parseInt(c.slice(2, 4), 16));
    setB(parseInt(c.slice(4, 6), 16));
  };
  const rgbToHsl = (rr, gg, bb) => {
    const rn = rr / 255,
      gn = gg / 255,
      bn = bb / 255,
      mx = Math.max(rn, gn, bn),
      mn = Math.min(rn, gn, bn);
    let h2 = 0,
      s = 0;
    const l = (mx + mn) / 2;
    if (mx !== mn) {
      const d = mx - mn;
      s = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn);
      if (mx === rn) h2 = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6;
      else if (mx === gn) h2 = ((bn - rn) / d + 2) / 6;
      else h2 = ((rn - gn) / d + 4) / 6;
    }
    return {
      h: Math.round(h2 * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };
  // Remove setState call from useEffect. Instead, call fromHex in event handler.
  const setChannel = (ch, v2) => {
    const nv = Math.min(255, Math.max(0, +v2));
    const nr = ch === "r" ? nv : r,
      ng = ch === "g" ? nv : g,
      nb = ch === "b" ? nv : b;
    if (ch === "r") setR(nv);
    else if (ch === "g") setG(nv);
    else setB(nv);
    setHex(toHex(nr, ng, nb));
  };
  const hv = toHex(r, g, b);
  const hsl = rgbToHsl(r, g, b);
  return (
    <div className="space-y-4">
      <div className="flex gap-4 items-start">
        <div
          className="w-24 h-24 rounded border-2 border-green-900 shrink-0"
          style={{ background: hv, boxShadow: "0 0 20px " + hv + "88" }}
        />
        <div className="flex-1 space-y-2">
          <div>
            <Lbl>hex</Lbl>
            <input
              className={INP + " w-36"}
              value={hex}
              onChange={(e) => {
                setHex(e.target.value);
                fromHex(e.target.value);
              }}
            />
          </div>
          <div className="flex gap-2">
            {[
              ["R", "r", r, "text-red-500"],
              ["G", "g", g, "text-green-500"],
              ["B", "b", b, "text-blue-400"],
            ].map(([lbl, key, val, cls]) => (
              <div key={key} className="flex-1">
                <div className={`text-xs font-mono font-bold mb-0.5 ${cls}`}>
                  {lbl}
                </div>
                <input
                  type="number"
                  min={0}
                  max={255}
                  className={INP}
                  value={val}
                  onChange={(e) => setChannel(key, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="space-y-1.5">
        {[
          ["HEX", hv],
          ["RGB", "rgb(" + r + ", " + g + ", " + b + ")"],
          ["HSL", "hsl(" + hsl.h + ", " + hsl.s + "%, " + hsl.l + "%)"],
          ["CSS var", "--color: " + hv + ";"],
        ].map(([n, v]) => (
          <ResultRow key={n} label={n} value={v} />
        ))}
      </div>
    </div>
  );
}
