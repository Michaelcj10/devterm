import { useState } from "react";
import { Btn, CopyBtn, TA, Lbl, Row, Msg } from "../components/ui";
import { SEL } from "../constants";

export default function JsonTool({ init, onInput }) {
  const [inp, setInp] = useState(
    init ||
      '{\n  "status": "caffeinated",\n  "bugs": 0,\n  "confidence": 9001\n}',
  );
  const [out, setOut] = useState("");
  const [err, setErr] = useState("");
  const [sp, setSp] = useState(2);
  const hi = (v) => {
    setInp(v);
    onInput && onInput(v);
  };
  const fmt = (n) => {
    try {
      setOut(JSON.stringify(JSON.parse(inp), null, n));
      setErr("");
    } catch (e) {
      setErr(e.message);
      setOut("");
    }
  };
  const min = () => {
    try {
      setOut(JSON.stringify(JSON.parse(inp)));
      setErr("");
    } catch (e) {
      setErr(e.message);
      setOut("");
    }
  };
  const val = () => {
    try {
      JSON.parse(inp);
      setErr("✓ valid json. nice.");
    } catch (e) {
      setErr("✗ " + e.message);
    }
  };
  return (
    <div className="space-y-3">
      <Row>
        <Btn onClick={() => fmt(sp)}>[ format ]</Btn>
        <Btn v="s" onClick={min}>
          [ minify ]
        </Btn>
        <Btn v="s" onClick={val}>
          [ validate ]
        </Btn>
        <select
          className={SEL}
          value={sp}
          onChange={(e) => setSp(+e.target.value)}
        >
          {[2, 4, 8].map((n) => (
            <option key={n} value={n}>
              {n} spaces
            </option>
          ))}
        </select>
        {out && <CopyBtn text={out} />}
      </Row>
      <Msg msg={err} />
      <Lbl>input</Lbl>
      <TA value={inp} onChange={hi} rows={7} />
      {out && (
        <>
          <Lbl>output</Lbl>
          <TA value={out} readOnly rows={7} />
        </>
      )}
    </div>
  );
}
