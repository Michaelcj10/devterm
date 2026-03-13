import { useState } from "react";
import { Btn, CopyBtn, TA, Lbl, Row } from "../components/ui";

export default function StringEscapeTool({ init, onInput }) {
  const [inp, setInp] = useState(init || "");
  const [out, setOut] = useState("");
  const hi = (v) => {
    setInp(v);
    onInput && onInput(v);
  };
  const esc = () =>
    setOut(
      inp
        .replace(/\\/g, "\\\\")
        .replace(/"/g, '\\"')
        .replace(/'/g, "\\'")
        .replace(/\n/g, "\\n")
        .replace(/\r/g, "\\r")
        .replace(/\t/g, "\\t"),
    );
  const une = () =>
    setOut(
      inp
        .replace(/\\t/g, "\t")
        .replace(/\\r/g, "\r")
        .replace(/\\n/g, "\n")
        .replace(/\\'/g, "'")
        .replace(/\\"/g, '"')
        .replace(/\\\\/g, "\\"),
    );
  return (
    <div className="space-y-3">
      <Row>
        <Btn onClick={esc}>[ escape → ]</Btn>
        <Btn v="s" onClick={une}>
          [ ← unescape ]
        </Btn>
        {out && <CopyBtn text={out} />}
      </Row>
      <Lbl>input</Lbl>
      <TA value={inp} onChange={hi} placeholder='He said "hello\\nworld"' />
      {out && (
        <>
          <Lbl>output</Lbl>
          <TA value={out} readOnly />
        </>
      )}
    </div>
  );
}
