import { useState } from "react";
import { ResultRow } from "../components/ui";

export default function ChmodCalcTool() {
  const [p, setP] = useState({
    ur: true,
    uw: true,
    ux: true,
    gr: true,
    gw: false,
    gx: true,
    or: true,
    ow: false,
    ox: true,
  });
  const tog = (k) => setP((pp) => ({ ...pp, [k]: !pp[k] }));
  const oct = (r, w, x) => (r ? 4 : 0) + (w ? 2 : 0) + (x ? 1 : 0);
  const sym = (r, w, x) => (r ? "r" : "-") + (w ? "w" : "-") + (x ? "x" : "-");
  const uo = oct(p.ur, p.uw, p.ux),
    go = oct(p.gr, p.gw, p.gx),
    oo = oct(p.or, p.ow, p.ox);
  const octalStr = "" + uo + go + oo;
  const symbolic =
    sym(p.ur, p.uw, p.ux) + sym(p.gr, p.gw, p.gx) + sym(p.or, p.ow, p.ox);
  return (
    <div className="space-y-4">
      <div className="border border-green-900 rounded overflow-hidden">
        <div className="grid grid-cols-4 bg-green-950 text-xs font-mono text-green-600 font-bold">
          <div className="p-2 text-green-500">who</div>
          {["read (4)", "write (2)", "exec (1)"].map((c) => (
            <div key={c} className="p-2 text-center">
              {c}
            </div>
          ))}
        </div>
        {[
          ["user (owner)", "u"],
          ["group", "g"],
          ["other", "o"],
        ].map(([label, prefix]) => (
          <div
            key={prefix}
            className="grid grid-cols-4 border-t border-green-900"
          >
            <div className="p-3 text-xs font-mono text-green-500 flex items-center">
              {label}
            </div>
            {["r", "w", "x"].map((c) => (
              <div key={c} className="p-3 flex justify-center items-center">
                <input
                  type="checkbox"
                  checked={p[prefix + c]}
                  onChange={() => tog(prefix + c)}
                  className="accent-green-600 w-4 h-4 cursor-pointer"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="space-y-1.5">
        {[
          ["octal", octalStr],
          ["symbolic", symbolic],
          ["chmod cmd", "chmod " + octalStr + " file"],
          ["chmod -R", "chmod -R " + octalStr + " dir/"],
        ].map(([k, v]) => (
          <ResultRow key={k} label={k} value={v} />
        ))}
      </div>
    </div>
  );
}
