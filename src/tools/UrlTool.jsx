import { useState } from "react";
import { Btn, CopyBtn, TA, Lbl, Row } from "../components/ui";

export default function UrlTool({ init, onInput }) {
  const [inp, setInp] = useState(init || "");
  const [out, setOut] = useState("");
  const hi = (v) => {
    setInp(v);
    onInput && onInput(v);
  };
  return (
    <div className="space-y-3">
      <Row>
        <Btn onClick={() => setOut(encodeURIComponent(inp))}>[ encode → ]</Btn>
        <Btn
          v="s"
          onClick={() => {
            try {
              setOut(decodeURIComponent(inp));
            } catch {
              setOut("invalid encoding");
            }
          }}
        >
          [ ← decode ]
        </Btn>
        {out && <CopyBtn text={out} />}
      </Row>
      <Lbl>input</Lbl>
      <TA
        value={inp}
        onChange={hi}
        placeholder="https://example.com/?q=hello world"
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
