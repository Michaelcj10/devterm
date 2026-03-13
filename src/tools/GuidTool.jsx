import { useState, useEffect } from "react";
import { Btn, CopyBtn, Row } from "../components/ui";
import { SEL } from "../constants";

export default function GuidTool() {
  const [n, setN] = useState(5);
  const [upper, setUpper] = useState(false);
  const [braces, setBraces] = useState(true);
  const [list, setList] = useState([]);
  const gen = () =>
    setList(
      Array.from({ length: n }, () => {
        let g = crypto.randomUUID();
        if (upper) g = g.toUpperCase();
        if (braces) g = "{" + g + "}";
        return g;
      }),
    );
  // Remove setState call from useEffect. Instead, call gen() after state changes.
  useEffect(() => {
    gen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="space-y-3">
      <Row>
        <Btn onClick={gen}>[ generate ]</Btn>
        <select
          className={SEL}
          value={n}
          onChange={(e) => setN(+e.target.value)}
        >
          {[1, 5, 10, 20, 50].map((x) => (
            <option key={x} value={x}>
              {x}
            </option>
          ))}
        </select>
        <label className="flex items-center gap-1.5 cursor-pointer">
          <input
            type="checkbox"
            checked={upper}
            onChange={(e) => setUpper(e.target.checked)}
            className="accent-green-600"
          />
          <span className="text-xs font-mono text-green-700">UPPER</span>
        </label>
        <label className="flex items-center gap-1.5 cursor-pointer">
          <input
            type="checkbox"
            checked={braces}
            onChange={(e) => setBraces(e.target.checked)}
            className="accent-green-600"
          />
          <span className="text-xs font-mono text-green-700">{"{braces}"}</span>
        </label>
        {list.length > 0 && <CopyBtn text={list.join("\n")} />}
      </Row>
      <div className="space-y-1">
        {list.map((g, i) => (
          <div
            key={i}
            className="flex items-center justify-between bg-black border border-green-900 rounded px-3 py-2"
          >
            <span className="font-mono text-sm text-green-300">{g}</span>
            <CopyBtn text={g} />
          </div>
        ))}
      </div>
    </div>
  );
}
