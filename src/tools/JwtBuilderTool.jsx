import { useState } from "react";
import { Btn, CopyBtn, TA, Lbl, Row, Msg, MonoBox } from "../components/ui";
import { INP } from "../constants";

export default function JwtBuilderTool({ init, onInput } = {}) {
  const _jp = (() => { try { return JSON.parse(init || "{}"); } catch { return {}; } })();
  const [header, setHeader] = useState(
    _jp.header || '{\n  "alg": "HS256",\n  "typ": "JWT"\n}',
  );
  const [payload, setPayload] = useState(
    _jp.payload || '{\n  "sub": "1234567890",\n  "name": "John Doe",\n  "iat": ""\n}',
  );
  const [secret, setSecret] = useState("your-256-bit-secret");
  const [token, setToken] = useState("");
  const [err, setErr] = useState("");
  const hiHeader = (v) => { setHeader(v); onInput && onInput(JSON.stringify({ header: v, payload })); };
  const hiPayload = (v) => { setPayload(v); onInput && onInput(JSON.stringify({ header, payload: v })); };
  const build = async () => {
    try {
      const h = JSON.parse(header);
      const p = JSON.parse(payload);
      const b64u = (s) =>
        btoa(JSON.stringify(s))
          .replace(/=/g, "")
          .replace(/\+/g, "-")
          .replace(/\//g, "_");
      const msg = b64u(h) + "." + b64u(p);
      const key = await crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(secret),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"],
      );
      const sig = await crypto.subtle.sign(
        "HMAC",
        key,
        new TextEncoder().encode(msg),
      );
      const sb64 = btoa(String.fromCharCode(...new Uint8Array(sig)))
        .replace(/=/g, "")
        .replace(/\+/g, "-")
        .replace(/\//g, "_");
      setToken(msg + "." + sb64);
      setErr("");
    } catch (e) {
      setErr(e.message);
      setToken("");
    }
  };
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Lbl>header (JSON)</Lbl>
          <TA value={header} onChange={hiHeader} rows={5} />
        </div>
        <div>
          <Lbl>payload (JSON)</Lbl>
          <TA value={payload} onChange={hiPayload} rows={5} />
        </div>
      </div>
      <Lbl>secret (HS256)</Lbl>
      <input
        className={INP}
        value={secret}
        onChange={(e) => setSecret(e.target.value)}
      />
      <Row>
        <Btn onClick={build}>[ sign HS256 ]</Btn>
        {token && <CopyBtn text={token} />}
      </Row>
      <Msg msg={err} />
      {token && (
        <MonoBox cls="text-yellow-400 break-all leading-6">{token}</MonoBox>
      )}
    </div>
  );
}
