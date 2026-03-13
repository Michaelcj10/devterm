import { useState } from "react";
import { Btn, CopyBtn, TA, Row } from "../components/ui";
import { SEL } from "../constants";

export default function LoremTool() {
  const W =
    "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum".split(
      " ",
    );
  const [type, setType] = useState("paragraphs");
  const [count, setCount] = useState(2);
  const [out, setOut] = useState("");
  const rnd = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const sent = () => {
    const ws = Array.from({ length: 7 + Math.floor(Math.random() * 10) }, () =>
      rnd(W),
    );
    ws[0] = ws[0][0].toUpperCase() + ws[0].slice(1);
    return ws.join(" ") + ".";
  };
  const gen = () => {
    if (type === "words")
      setOut(Array.from({ length: count }, () => rnd(W)).join(" "));
    else if (type === "sentences")
      setOut(Array.from({ length: count }, sent).join(" "));
    else
      setOut(
        Array.from({ length: count }, () =>
          Array.from({ length: 4 + Math.floor(Math.random() * 3) }, sent).join(
            " ",
          ),
        ).join("\n\n"),
      );
  };
  // Removed setState call from useEffect. Call gen in event handler.
  return (
    <div className="space-y-3">
      <Row>
        <select
          className={SEL}
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          {["words", "sentences", "paragraphs"].map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <select
          className={SEL}
          value={count}
          onChange={(e) => setCount(+e.target.value)}
        >
          {[1, 2, 3, 5, 10].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
        <Btn onClick={gen}>[ generate ]</Btn>
        {out && <CopyBtn text={out} />}
      </Row>
      {out && <TA value={out} readOnly rows={10} />}
    </div>
  );
}
