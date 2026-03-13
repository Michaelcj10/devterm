import { useState } from "react";
import {
  Btn,
  CopyBtn,
  TA,
  Lbl,
  Row,
  Msg,
  MonoBox,
  ResultRow,
} from "../components/ui";

export default function PemDecoderTool({ init, onInput }) {
  const SAMPLE = `-----BEGIN CERTIFICATE-----
MIICpDCCAYwCCQDU+pQ4pHgSpDANBgkqhkiG9w0BAQsFADAUMRIwEAYDVQQDDAls
b2NhbGhvc3QwHhcNMjMwMTAxMDAwMDAwWhcNMjQwMTAxMDAwMDAwWjAUMRIwEAYD
VQQDDAlsb2NhbGhvc3QwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC7
o4qne60TB3pnPfHBisBfWbLIMCJBsucNJxCNMCzIFHVSnD2wFKFMKBHbMnCPAzE4
-----END CERTIFICATE-----`;
  const [inp, setInp] = useState(init || "");
  const [result, setResult] = useState(null);
  const [err, setErr] = useState("");
  const hi = (v) => {
    setInp(v);
    onInput && onInput(v);
  };

  const readTlv = (buf, pos) => {
    if (pos >= buf.length) return null;
    const tag = buf[pos++];
    let len = buf[pos++];
    if (len & 0x80) {
      const nb = len & 0x7f;
      len = 0;
      for (let i = 0; i < nb; i++) len = (len << 8) | buf[pos++];
    }
    return { tag, data: buf.slice(pos, pos + len), next: pos + len, len };
  };

  const readSeq = (buf) => {
    const items = [];
    let pos = 0;
    while (pos < buf.length) {
      const t = readTlv(buf, pos);
      if (!t) break;
      items.push(t);
      pos = t.next;
    }
    return items;
  };

  const oidMap = {
    "55:04:03": "CN",
    "55:04:0a": "O",
    "55:04:06": "C",
    "55:04:07": "L",
    "55:04:08": "ST",
    "2a:86:48:86:f7:0d:01:01:01": "RSA",
    "2a:86:48:86:f7:0d:01:01:05": "sha1WithRSA",
    "2a:86:48:86:f7:0d:01:01:0b": "sha256WithRSA",
    "2a:86:48:86:f7:0d:01:01:0c": "sha384WithRSA",
    "2a:86:48:86:f7:0d:01:01:0d": "sha512WithRSA",
    "2a:86:48:ce:3d:04:03:02": "ecdsaWithSHA256",
    "55:1d:11": "subjectAltName",
    "55:1d:13": "basicConstraints",
    "55:1d:0f": "keyUsage",
  };

  const parseOid = (b) =>
    Array.from(b)
      .map((x) => x.toString(16).padStart(2, "0"))
      .join(":");
  const parseName = (b) => {
    const items = readSeq(b);
    const parts = [];
    for (const set of items) {
      const seq = readTlv(set.data, 0);
      if (!seq) continue;
      const oid = readTlv(seq.data, 0);
      const val = readTlv(seq.data, oid ? oid.next : 0);
      if (!oid || !val) continue;
      const k = oidMap[parseOid(oid.data)] || parseOid(oid.data);
      const v = new TextDecoder().decode(val.data);
      parts.push(k + "=" + v);
    }
    return parts.join(", ");
  };
  const parseTime = (b) => {
    const s = new TextDecoder().decode(b);
    if (s.length === 13) {
      const yr = parseInt(s.slice(0, 2));
      return new Date(
        (yr < 50 ? "20" : "19") +
          s.slice(0, 2) +
          "-" +
          s.slice(2, 4) +
          "-" +
          s.slice(4, 6) +
          "T" +
          s.slice(6, 8) +
          ":" +
          s.slice(8, 10) +
          ":" +
          s.slice(10, 12) +
          "Z",
      ).toLocaleString();
    }
    return s;
  };

  const decode = async () => {
    try {
      const b64 = inp.replace(/-----[^-]+-----/g, "").replace(/\s+/g, "");
      const der = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
      const cert = readTlv(der, 0);
      if (!cert || cert.tag !== 0x30)
        throw new Error("not a valid DER certificate");
      const [tbs] = readSeq(cert.data);
      const tbsItems = readSeq(tbs.data);
      let idx = 0;
      let version = "v1";
      if (tbsItems[0] && tbsItems[0].tag === 0xa0) {
        const v = readTlv(tbsItems[0].data, 0);
        version = "v" + ((v?.data[0] || 0) + 1);
        idx = 1;
      }
      const serial = tbsItems[idx++];
      const sigAlg = tbsItems[idx++];
      const issuer = tbsItems[idx++];
      const validity = tbsItems[idx++];
      const subject = tbsItems[idx++];
      const validItems = readSeq(validity.data);
      const fp = await crypto.subtle.digest("SHA-256", der);
      const fpHex = Array.from(new Uint8Array(fp))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join(":")
        .toUpperCase();
      const serialHex = Array.from(serial.data)
        .map((b) => b.toString(16).padStart(2, "0"))
        .join(":");
      const algOid = readTlv(sigAlg.data, 0);
      setResult({
        version,
        serial: serialHex,
        subject: parseName(subject.data),
        issuer: parseName(issuer.data),
        validFrom: parseTime(validItems[0].data),
        validTo: parseTime(validItems[1].data),
        algorithm:
          oidMap[parseOid(algOid?.data || new Uint8Array())] || "unknown",
        fingerprint: fpHex,
        size: der.length + " bytes",
      });
      setErr("");
    } catch (e) {
      setErr("parse error: " + e.message + " — try pasting a real PEM cert");
      setResult(null);
    }
  };

  return (
    <div className="space-y-3">
      <Lbl>paste PEM certificate</Lbl>
      <TA value={inp} onChange={hi} rows={8} placeholder={SAMPLE} />
      <Row>
        <Btn onClick={decode}>[ decode ]</Btn>
        <Btn v="s" onClick={() => hi(SAMPLE)}>
          [ load sample ]
        </Btn>
      </Row>
      <Msg msg={err} />
      {result && (
        <div className="space-y-1.5">
          {[
            ["version", result.version],
            ["serial", result.serial],
            ["subject", result.subject],
            ["issuer", result.issuer],
            ["valid from", result.validFrom],
            ["valid to", result.validTo],
            ["algorithm", result.algorithm],
            ["size", result.size],
          ].map(([k, v]) => (
            <ResultRow key={k} label={k} value={v} />
          ))}
          <div>
            <div className="flex justify-between items-center mb-1">
              <Lbl>sha-256 fingerprint</Lbl>
              <CopyBtn text={result.fingerprint} />
            </div>
            <MonoBox cls="text-green-400 text-xs leading-5">
              {result.fingerprint}
            </MonoBox>
          </div>
        </div>
      )}
    </div>
  );
}
