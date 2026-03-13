import { useState } from "react";
import { Btn, TA, Lbl, Row } from "../components/ui";

export default function DiffTool() {
  const [a, setA] = useState(
    "the quick brown fox\njumps over the lazy dog\nno bugs in this code",
  );
  const [b, setB] = useState(
    "the quick red fox\njumps over the lazy cat\none or two bugs in this code\nextra line nobody asked for",
  );
  const [diff, setDiff] = useState([]);
  const cmp = () => {
    const la = a.split("\n"),
      lb = b.split("\n"),
      res = [];
    for (let i = 0; i < Math.max(la.length, lb.length); i++) {
      if (la[i] === lb[i]) res.push({ t: "same", a: la[i] });
      else if (la[i] == null) res.push({ t: "add", b: lb[i] });
      else if (lb[i] == null) res.push({ t: "rem", a: la[i] });
      else res.push({ t: "mod", a: la[i], b: lb[i] });
    }
    setDiff(res);
  };
  const BG = {
    same: "bg-black",
    add: "bg-green-950",
    rem: "bg-red-950",
    mod: "bg-yellow-950",
  };
  const SYM = { same: " ", add: "+", rem: "-", mod: "~" };
  const SC = {
    same: "text-green-900",
    add: "text-green-500",
    rem: "text-red-500",
    mod: "text-yellow-500",
  };
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Lbl>original (A)</Lbl>
          <TA value={a} onChange={setA} rows={7} />
        </div>
        <div>
          <Lbl>modified (B)</Lbl>
          <TA value={b} onChange={setB} rows={7} />
        </div>
      </div>
      <Row>
        <Btn onClick={cmp}>[ compare ]</Btn>
      </Row>
      {diff && (
        <div className="border border-green-900 rounded overflow-hidden font-mono text-xs">
          {diff.map((l, i) => (
            <div key={i} className={`flex ${BG[l.t]}`}>
              <span
                className={`w-5 text-center select-none shrink-0 ${SC[l.t]}`}
              >
                {SYM[l.t]}
              </span>
              <span className="px-2 py-0.5 flex-1 whitespace-pre-wrap text-green-300">
                {l.t === "rem" ? (
                  l.a
                ) : l.t === "add" ? (
                  l.b
                ) : l.t === "mod" ? (
                  <>
                    <span className="line-through text-red-500">{l.a}</span>
                    {" → "}
                    <span className="text-green-400">{l.b}</span>
                  </>
                ) : (
                  l.a
                )}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
