import { useState } from "react";
import { Btn, CopyBtn, TA, Lbl, Row, Msg } from "../components/ui";
import { INP } from "../constants";

export default function JsonToTsTool({ init, onInput }) {
  const DEF =
    '{\n  "user": {\n    "id": 42,\n    "name": "Alice",\n    "email": "alice@example.com",\n    "roles": ["admin", "user"],\n    "address": { "city": "Dublin", "zip": "D01" },\n    "active": true,\n    "score": 9.8\n  }\n}';
  const [inp, setInp] = useState(init || DEF);
  const [out, setOut] = useState("");
  const [err, setErr] = useState("");
  const [pfx, setPfx] = useState("I");
  const [exported, setExported] = useState(true);
  const hi = (v) => {
    setInp(v);
    onInput && onInput(v);
  };

  const inferType = (val, key, ifaces) => {
    if (val === null) return "null";
    if (Array.isArray(val)) {
      if (!val.length) return "unknown[]";
      const inner = inferType(val[0], key + "Item", ifaces);
      return inner + "[]";
    }
    if (typeof val === "object") {
      const name = pfx + key[0].toUpperCase() + key.slice(1);
      const fields = Object.entries(val)
        .map(([k, v]) => "  " + k + ": " + inferType(v, k, ifaces) + ";")
        .join("\n");
      ifaces.unshift(
        (exported ? "export " : "") +
          "interface " +
          name +
          " {\n" +
          fields +
          "\n}",
      );
      return name;
    }
    if (typeof val === "number")
      return Number.isInteger(val) ? "number" : "number";
    return typeof val;
  };

  const generate = () => {
    try {
      const parsed = JSON.parse(inp);
      const ifaces = [];
      inferType(parsed, "Root", ifaces);
      setOut(ifaces.join("\n\n"));
      setErr("");
    } catch (e) {
      setErr(e.message);
      setOut("");
    }
  };

  return (
    <div className="space-y-3">
      <Row>
        <Btn onClick={generate}>[ generate ]</Btn>
        <label className="flex items-center gap-1.5 cursor-pointer">
          <input
            type="checkbox"
            checked={exported}
            onChange={(e) => setExported(e.target.checked)}
            className="accent-green-600"
          />
          <span className="text-xs font-mono text-green-700">export</span>
        </label>
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-mono text-green-800">prefix:</span>
          <input
            className="bg-black border border-green-900 rounded px-2 py-1 font-mono text-xs text-green-300 outline-none w-10 focus:border-green-600"
            value={pfx}
            onChange={(e) => setPfx(e.target.value)}
          />
        </div>
        {out && <CopyBtn text={out} />}
      </Row>
      <Msg msg={err} />
      <Lbl>json input</Lbl>
      <TA value={inp} onChange={hi} rows={10} />
      {out && (
        <>
          <Lbl>typescript output</Lbl>
          <TA value={out} readOnly rows={12} />
        </>
      )}
    </div>
  );
}
