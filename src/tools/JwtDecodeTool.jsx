import { useState, useEffect } from "react";
import { Btn, CopyBtn, TA, Lbl, Row, Msg, MonoBox } from "../components/ui";

export default function JwtDecodeTool({ init, onInput }) {
  const DEF =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
  const [tok, setTok] = useState(init || DEF);
  const [parts, setParts] = useState(null);
  const [err, setErr] = useState("");
  const hi = (v) => {
    setTok(v);
    onInput && onInput(v);
  };
  const dec = () => {
    try {
      const s = tok.trim().split(".");
      if (s.length < 2) throw new Error("invalid jwt format");
      const p = (x) =>
        JSON.parse(atob(x.replace(/-/g, "+").replace(/_/g, "/")));
      setParts({ header: p(s[0]), payload: p(s[1]), signature: s[2] });
      setErr("");
    } catch (e) {
      setErr(e.message);
      setParts(null);
    }
  };
  useEffect(() => {
    if (tok) dec();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const C = {
    header: "border-green-800 text-green-300",
    payload: "border-yellow-800 text-yellow-300",
    signature: "border-red-900 text-red-400",
  };
  return (
    <div className="space-y-3">
      <Lbl>token</Lbl>
      <TA value={tok} onChange={hi} rows={4} placeholder="paste jwt here..." />
      <Row>
        <Btn onClick={dec}>[ decode ]</Btn>
      </Row>
      <Msg msg={err} />
      {parts &&
        ["header", "payload", "signature"].map((k) => (
          <div key={k}>
            <div className="flex justify-between items-center mb-1">
              <Lbl>{k}</Lbl>
              {k !== "signature" && (
                <CopyBtn text={JSON.stringify(parts[k], null, 2)} />
              )}
            </div>
            <MonoBox cls={C[k]}>
              {k === "signature" ? parts[k] : JSON.stringify(parts[k], null, 2)}
            </MonoBox>
            {k === "payload" && parts.payload.exp && (
              <div
                className={`text-xs font-mono mt-1 px-2 py-1 rounded border ${Date.now() / 1000 > parts.payload.exp ? "text-red-400 bg-black border-red-900" : "text-green-400 bg-green-950 border-green-800"}`}
              >
                {Date.now() / 1000 > parts.payload.exp
                  ? "✗ expired"
                  : "✓ valid"}{" "}
                — {new Date(parts.payload.exp * 1000).toLocaleString()}
              </div>
            )}
          </div>
        ))}
    </div>
  );
}
