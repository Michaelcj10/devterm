import { useState, useEffect } from "react";
import { Btn, CopyBtn, Lbl, Row } from "../components/ui";
import { SEL } from "../constants";

export default function PasswordTool() {
  const SETS = {
    upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lower: "abcdefghijklmnopqrstuvwxyz",
    digits: "0123456789",
    symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
  };
  const [len, setLen] = useState(24);
  const [use, setUse] = useState({
    upper: true,
    lower: true,
    digits: true,
    symbols: true,
  });
  const [pwds, setPwds] = useState([]);
  const [count, setCount] = useState(5);
  const gen = () => {
    const chars = Object.entries(use)
      .filter(([, v]) => v)
      .map(([k]) => SETS[k])
      .join("");
    if (!chars) return;
    setPwds(
      Array.from({ length: count }, () => {
        const b = crypto.getRandomValues(new Uint8Array(len));
        return Array.from(b)
          .map((x) => chars[x % chars.length])
          .join("");
      }),
    );
  };
  // Remove setState call from useEffect. Instead, call gen() after state changes.
  useEffect(() => {
    gen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="space-y-3">
      <div className="flex gap-6 flex-wrap">
        <div>
          <Lbl>length: {len}</Lbl>
          <input
            type="range"
            min={8}
            max={128}
            value={len}
            onChange={(e) => setLen(+e.target.value)}
            className="w-40 accent-green-600"
          />
        </div>
        <div>
          <Lbl>count</Lbl>
          <select
            className={SEL}
            value={count}
            onChange={(e) => setCount(+e.target.value)}
          >
            {[1, 3, 5, 10].map((x) => (
              <option key={x} value={x}>
                {x}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex gap-4 flex-wrap">
        {Object.keys(SETS).map((k) => (
          <label key={k} className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={use[k]}
              onChange={(e) => setUse((u) => ({ ...u, [k]: e.target.checked }))}
              className="accent-green-600"
            />
            <span className="text-xs font-mono text-green-700">{k}</span>
          </label>
        ))}
      </div>
      <Row>
        <Btn onClick={gen}>[ generate ]</Btn>
        {pwds.length > 0 && <CopyBtn text={pwds.join("\n")} />}
      </Row>
      <div className="space-y-1">
        {pwds.map((p, i) => (
          <div
            key={i}
            className="flex items-center justify-between bg-black border border-green-900 rounded px-3 py-2"
          >
            <span className="font-mono text-sm text-green-300 break-all flex-1 mr-2">
              {p}
            </span>
            <CopyBtn text={p} />
          </div>
        ))}
      </div>
    </div>
  );
}
