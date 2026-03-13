import { useState } from "react";
import { Btn, CopyBtn, TA, Lbl, Row, MonoBox } from "../components/ui";

export default function HashTool({ init, onInput }) {
  const [inp, setInp] = useState(init || "");
  const [hashes, setHashes] = useState({});
  const [loading, setLoading] = useState(false);
  const hi = (v) => {
    setInp(v);
    onInput && onInput(v);
  };
  const run = async () => {
    if (!inp) return;
    setLoading(true);
    const enc = new TextEncoder().encode(inp);
    const res = {};
    for (const a of ["SHA-1", "SHA-256", "SHA-384", "SHA-512"]) {
      const buf = await crypto.subtle.digest(a, enc);
      res[a] = Array.from(new Uint8Array(buf))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
    }
    setHashes(res);
    setLoading(false);
  };
  return (
    <div className="space-y-3">
      <Lbl>input text</Lbl>
      <TA
        value={inp}
        onChange={hi}
        placeholder="enter text to hash..."
        rows={4}
      />
      <Row>
        <Btn onClick={run} disabled={loading || !inp}>
          {loading ? "hashing..." : "[ generate hashes ]"}
        </Btn>
      </Row>
      {Object.entries(hashes).map(([a, v]) => (
        <div key={a}>
          <div className="flex justify-between items-center mb-1">
            <Lbl>{a}</Lbl>
            <CopyBtn text={v} />
          </div>
          <MonoBox cls="text-green-400">{v}</MonoBox>
        </div>
      ))}
    </div>
  );
}
