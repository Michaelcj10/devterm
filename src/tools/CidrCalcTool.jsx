import { useState } from "react";
import { Btn, Lbl, Row, Msg, ResultRow } from "../components/ui";
import { INP } from "../constants";

export default function CidrCalcTool({ init, onInput }) {
  const [cidr, setCidr] = useState(init || "192.168.1.0/24");
  const [result, setResult] = useState(null);
  const [err, setErr] = useState("");
  const hi = (v) => {
    setCidr(v);
    onInput && onInput(v);
  };
  const calc = () => {
    try {
      const [ip, prefix] = cidr.trim().split("/");
      if (!ip || prefix === undefined)
        throw new Error("use CIDR notation: 192.168.1.0/24");
      const pl = parseInt(prefix);
      if (isNaN(pl) || pl < 0 || pl > 32)
        throw new Error("prefix must be 0–32");
      const parts = ip.split(".").map(Number);
      if (parts.length !== 4 || parts.some((p) => isNaN(p) || p < 0 || p > 255))
        throw new Error("invalid IPv4 address");
      const ipNum =
        ((parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]) >>>
        0;
      const mask = pl === 0 ? 0 : (~0 << (32 - pl)) >>> 0;
      const network = (ipNum & mask) >>> 0;
      const broadcast = (network | (~mask >>> 0)) >>> 0;
      const toIp = (n) =>
        [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join(
          ".",
        );
      const hosts = pl >= 31 ? Math.pow(2, 32 - pl) : Math.pow(2, 32 - pl) - 2;
      setResult({
        network: toIp(network),
        broadcast: toIp(broadcast),
        mask: toIp(mask),
        first: pl >= 31 ? toIp(network) : toIp(network + 1),
        last: pl >= 31 ? toIp(broadcast) : toIp(broadcast - 1),
        hosts,
        total: Math.pow(2, 32 - pl),
        prefix: pl,
      });
      setErr("");
    } catch (e) {
      setErr(e.message);
      setResult(null);
    }
  };
  return (
    <div className="space-y-3">
      <div className="flex gap-2 items-end">
        <div className="flex-1">
          <Lbl>CIDR notation</Lbl>
          <input
            className={INP}
            value={cidr}
            onChange={(e) => hi(e.target.value)}
            placeholder="192.168.0.0/16"
          />
        </div>
        <Btn onClick={calc}>[ calculate ]</Btn>
      </div>
      <Msg msg={err} />
      {result && (
        <div className="space-y-1.5">
          {[
            ["network", result.network],
            ["broadcast", result.broadcast],
            ["subnet mask", result.mask],
            ["first host", result.first],
            ["last host", result.last],
            ["usable hosts", result.hosts.toLocaleString()],
            ["total IPs", result.total.toLocaleString()],
            ["prefix", "/" + result.prefix],
          ].map(([k, v]) => (
            <ResultRow key={k} label={k} value={v} />
          ))}
        </div>
      )}
    </div>
  );
}
