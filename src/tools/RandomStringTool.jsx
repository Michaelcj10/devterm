import { useState, useEffect } from "react";
import { Btn, CopyBtn, Lbl, Row } from "../components/ui";
import { INP, SEL } from "../constants";

export default function RandomStringTool() {
  const CS = {
    alphanumeric:
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
    hex: "0123456789abcdef",
    alpha: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    numeric: "0123456789",
    base58: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz",
  };
  const [len, setLen] = useState(32);
  const [cs, setCs] = useState("alphanumeric");
  const [custom, setCustom] = useState("");
  const [count, setCount] = useState(5);
  const [list, setList] = useState([]);
  const gen = () => {
    const chars = custom.trim() || CS[cs];
    if (!chars) return;
    setList(
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
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Lbl>length: {len}</Lbl>
          <input
            type="range"
            min={4}
            max={256}
            value={len}
            onChange={(e) => setLen(+e.target.value)}
            className="w-full accent-green-600"
          />
        </div>
        <div>
          <Lbl>count</Lbl>
          <select
            className={SEL + " w-full"}
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
      <div>
        <Lbl>charset</Lbl>
        <select
          className={SEL + " w-full"}
          value={cs}
          onChange={(e) => setCs(e.target.value)}
        >
          {Object.keys(CS).map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
        </select>
      </div>
      <div>
        <Lbl>custom charset</Lbl>
        <input
          className={INP}
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
          placeholder="ABCDEFabcdef0123!@#..."
        />
      </div>
      <Row>
        <Btn onClick={gen}>[ generate ]</Btn>
        {list.length > 0 && <CopyBtn text={list.join("\n")} />}
      </Row>
      <div className="space-y-1">
        {list.map((s, i) => (
          <div
            key={i}
            className="flex items-center justify-between bg-black border border-green-900 rounded px-3 py-2"
          >
            <span className="font-mono text-sm text-green-300 flex-1 truncate mr-2">
              {s}
            </span>
            <CopyBtn text={s} />
          </div>
        ))}
      </div>
    </div>
  );
}
