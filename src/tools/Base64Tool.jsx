import { useState } from "react";
import { Btn, CopyBtn, TA, Lbl, Row, Msg } from "../components/ui";

export default function Base64Tool({ init, onInput }) {
  const [inp, setInp] = useState(init || "");
  const [out, setOut] = useState("");
  const [err, setErr] = useState("");
  const hi = (v) => {
    setInp(v);
    onInput && onInput(v);
  };
  const enc = () => {
    try {
      setOut(btoa(unescape(encodeURIComponent(inp))));
      setErr("");
    } catch (e) {
      setErr(e.message);
    }
  };
  const dec = () => {
    try {
      setOut(decodeURIComponent(escape(atob(inp.trim()))));
      setErr("");
    } catch {
      setErr("not valid base64, chief");
    }
  };
  return (
    <div className="space-y-3">
      <Row>
        <Btn onClick={enc}>[ encode → ]</Btn>
        <Btn v="s" onClick={dec}>
          [ ← decode ]
        </Btn>
        {out && <CopyBtn text={out} />}
      </Row>
      <Msg msg={err} />
      <Lbl>input</Lbl>
      <TA value={inp} onChange={hi} placeholder="text or base64 string..." />
      {out && (
        <>
          <Lbl>output</Lbl>
          <TA value={out} readOnly />
        </>
      )}
    </div>
  );
}
