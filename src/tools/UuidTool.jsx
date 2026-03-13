import { useState } from "react";
import { Btn, CopyBtn, Row } from "../components/ui";
import { SEL } from "../constants";

export default function UuidTool() {
  const g = () => crypto.randomUUID();
  const [list, setList] = useState(() => Array.from({ length: 5 }, g));
  const [n, setN] = useState(5);
  return (
    <div className="space-y-3">
      <Row>
        <Btn onClick={() => setList(Array.from({ length: n }, g))}>
          [ generate ]
        </Btn>
        <select
          className={SEL}
          value={n}
          onChange={(e) => setN(+e.target.value)}
        >
          {[1, 5, 10, 20, 50].map((x) => (
            <option key={x} value={x}>
              {x} UUIDs
            </option>
          ))}
        </select>
        <CopyBtn text={list.join("\n")} />
      </Row>
      <div className="space-y-1">
        {list.map((u, i) => (
          <div
            key={i}
            className="flex items-center justify-between bg-black border border-green-900 rounded px-3 py-2"
          >
            <span className="font-mono text-sm text-green-300">{u}</span>
            <CopyBtn text={u} />
          </div>
        ))}
      </div>
    </div>
  );
}
