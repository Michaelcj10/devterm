import { useState, useMemo } from "react";
import { Btn, TA, Lbl, Row, Msg } from "../components/ui";
import { INP } from "../constants";

export default function RegexTool({ init, onInput }) {
  const [pat, setPat] = useState(init || "(\\w+)@([\\w.]+)");
  const [flags, setFlags] = useState("gi");
  const [text, setText] = useState(
    "Contact hello@example.com or admin@test.org for help.",
  );
  const [result, setResult] = useState([]);
  const [err, setErr] = useState("");
  const hi = (v) => {
    setPat(v);
    onInput && onInput(v);
  };
  const run = () => {
    try {
      const gf = flags.includes("g") ? flags : flags + "g";
      setResult([...text.matchAll(new RegExp(pat, gf))]);
      setErr("");
    } catch (e) {
      setErr(e.message);
      setResult(null);
    }
  };
  const highlighted = useMemo(() => {
    if (!result?.length) return null;
    try {
      const parts = [];
      let last = 0;
      for (const m of result) {
        if (m.index > last)
          parts.push({ t: text.slice(last, m.index), h: false });
        parts.push({ t: m[0], h: true });
        last = m.index + m[0].length;
      }
      if (last < text.length) parts.push({ t: text.slice(last), h: false });
      return parts;
    } catch {
      return null;
    }
  }, [result, text]);
  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <div className="flex-1">
          <Lbl>pattern</Lbl>
          <input
            className={INP}
            value={pat}
            onChange={(e) => hi(e.target.value)}
          />
        </div>
        <div className="w-20">
          <Lbl>flags</Lbl>
          <input
            className={INP}
            value={flags}
            onChange={(e) => setFlags(e.target.value)}
          />
        </div>
      </div>
      <Row>
        <Btn onClick={run}>[ test ]</Btn>
      </Row>
      <Msg msg={err} />
      <Lbl>test string</Lbl>
      <TA value={text} onChange={setText} rows={4} />
      {result !== null && (
        <>
          <Lbl>matches ({result.length})</Lbl>
          <div className="bg-black border border-green-900 rounded p-3 font-mono text-sm leading-7 break-words">
            {highlighted ? (
              highlighted.map((p, i) =>
                p.h ? (
                  <mark
                    key={i}
                    className="bg-yellow-400 text-black rounded px-0.5"
                  >
                    {p.t}
                  </mark>
                ) : (
                  <span key={i} className="text-green-400">
                    {p.t}
                  </span>
                ),
              )
            ) : (
              <span className="text-green-900">no matches</span>
            )}
          </div>
          {result.map((m, i) => (
            <div
              key={i}
              className="bg-black border border-green-900 rounded px-3 py-2 font-mono text-xs text-green-400"
            >
              <span className="text-yellow-600">#{i + 1}</span> "{m[0]}"
              {m.slice(1).map(
                (g, j) =>
                  g != null && (
                    <span key={j}>
                      {" "}
                      · <span className="text-green-600">g{j + 1}:</span> "{g}"
                    </span>
                  ),
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
}
