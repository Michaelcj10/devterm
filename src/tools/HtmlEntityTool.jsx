import { useState } from "react";
import { Btn, CopyBtn, TA, Lbl, Row } from "../components/ui";

export default function HtmlEntityTool({ init, onInput }) {
  const [inp, setInp] = useState(init || "");
  const [out, setOut] = useState("");
  const hi = (v) => {
    setInp(v);
    onInput && onInput(v);
  };
  const enc = () => {
    const el = document.createElement("div");
    el.textContent = inp;
    setOut(el.innerHTML);
  };
  const dec = () => {
    const el = document.createElement("div");
    el.innerHTML = inp;
    setOut(el.textContent);
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
      <Lbl>input</Lbl>
      <TA
        value={inp}
        onChange={hi}
        placeholder='&lt;div&gt; Hello &amp; "world"'
      />
      {out && (
        <>
          <Lbl>output</Lbl>
          <TA value={out} readOnly />
        </>
      )}
    </div>
  );
}
