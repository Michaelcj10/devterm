import { useState, useEffect } from "react";
import { Btn, Lbl, Row } from "../components/ui";
import { INP } from "../constants";

export default function TimestampTool({ init }) {
  const [unix, setUnix] = useState(init || "");
  const [iso, setIso] = useState("");
  const fromUnix = () => {
    const d = new Date(parseInt(unix) * 1000);
    if (!isNaN(d)) setIso(d.toISOString());
  };
  const toUnix = () => {
    const d = new Date(iso);
    if (!isNaN(d)) setUnix(String(Math.floor(d.getTime() / 1000)));
  };
  useEffect(() => {
    fromUnix();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const d = unix ? new Date(parseInt(unix) * 1000) : null;
  const valid = d && !isNaN(d);
  const rel = () => {
    // eslint-disable-next-line react-hooks/purity
    const s = Math.abs(Math.floor((Date.now() - d) / 1000));
    if (s < 60) return s + "s ago";
    if (s < 3600) return Math.floor(s / 60) + "m ago";
    if (s < 86400) return Math.floor(s / 3600) + "h ago";
    return Math.floor(s / 86400) + "d ago";
  };
  return (
    <div className="space-y-3">
      <Row>
        <Btn
          v="s"
          onClick={() => {
            const ts = Math.floor(Date.now() / 1000);
            setUnix(String(ts));
            setIso(new Date(ts * 1000).toISOString());
          }}
        >
          [ now() ]
        </Btn>
      </Row>
      <Lbl>unix timestamp</Lbl>
      <div className="flex gap-2">
        <input
          className={INP}
          value={unix}
          onChange={(e) => setUnix(e.target.value)}
        />
        <Btn onClick={fromUnix}>[ → human ]</Btn>
      </div>
      <Lbl>iso / human</Lbl>
      <div className="flex gap-2">
        <input
          className={INP}
          value={iso}
          onChange={(e) => setIso(e.target.value)}
          placeholder="2024-01-01T00:00:00.000Z"
        />
        <Btn onClick={toUnix}>[ → unix ]</Btn>
      </div>
      {valid && (
        <div className="grid grid-cols-2 gap-2">
          {[
            ["UTC", d.toUTCString()],
            ["local", d.toLocaleString()],
            ["date", d.toISOString().slice(0, 10)],
            ["relative", rel()],
          ].map(([k, v]) => (
            <div
              key={k}
              className="bg-black border border-green-900 rounded p-2"
            >
              <div className="text-xs text-green-500 mb-0.5 font-mono">{k}</div>
              <div className="font-mono text-xs text-green-300">{v}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
