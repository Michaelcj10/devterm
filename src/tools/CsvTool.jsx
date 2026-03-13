import { useState } from "react";
import { Btn, TA, Lbl, Row } from "../components/ui";

export default function CsvTool({ init, onInput }) {
  const DEF =
    "name,age,city,role\nAlice,30,Dublin,Engineer\nBob,25,Cork,Designer\nCharlie,35,Galway,Manager";
  const [inp, setInp] = useState(init || DEF);
  const [data, setData] = useState(null);
  const hi = (v) => {
    setInp(v);
    onInput && onInput(v);
  };
  const parse = () =>
    setData(
      inp
        .trim()
        .split("\n")
        .filter(Boolean)
        .map((line) => {
          const cols = [];
          let cur = "",
            inQ = false;
          for (const ch of line) {
            if (ch === '"') {
              inQ = !inQ;
              continue;
            }
            if (ch === "," && !inQ) {
              cols.push(cur.trim());
              cur = "";
              continue;
            }
            cur += ch;
          }
          cols.push(cur.trim());
          return cols;
        }),
    );
  // Remove setState call from useEffect. Instead, call parse in event handler.
  return (
    <div className="space-y-3">
      <Lbl>csv input</Lbl>
      <TA value={inp} onChange={hi} rows={5} />
      <Row>
        <Btn onClick={parse}>[ parse → table ]</Btn>
      </Row>
      {data && data.length > 0 && (
        <div className="overflow-auto border border-green-900 rounded">
          <table className="w-full text-xs font-mono">
            <thead>
              <tr className="bg-green-950 border-b border-green-900">
                {data[0].map((h, i) => (
                  <th
                    key={i}
                    className="px-3 py-2 text-left text-green-400 font-bold whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.slice(1).map((row, i) => (
                <tr key={i} className={i % 2 ? "bg-black" : "bg-neutral-950"}>
                  {row.map((c, j) => (
                    <td
                      key={j}
                      className="px-3 py-1.5 text-green-300 border-b border-green-950"
                    >
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-3 py-1.5 text-xs text-green-600 font-mono">
            {data.length - 1} rows × {data[0]?.length || 0} cols — no pivot
            tables here, just peace
          </div>
        </div>
      )}
    </div>
  );
}
