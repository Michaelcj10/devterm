import { useState } from "react";
import { Btn, CopyBtn, TA, Lbl, Row, Msg } from "../components/ui";

export default function LogRemoverTool({ init, onInput }) {
  const DEF = `function fetchData(url) {\n  console.log("fetching:", url);\n  console.log("debug", {auth: true});\n  const result = doFetch(url);\n  console.error("oh no:", result);\n  console.warn("todo: remove this");\n  return result;\n}`;
  const [inp, setInp] = useState(init || DEF);
  const [out, setOut] = useState("");
  const [count, setCount] = useState(0);
  const hi = (v) => {
    setInp(v);
    onInput && onInput(v);
  };
  const strip = () => {
    const lines = inp.split("\n");
    let removed = 0;
    const result = lines.filter((line) => {
      if (
        /^\s*console\.(log|warn|error|info|debug|trace|dir|table)\s*\(/.test(
          line,
        )
      ) {
        removed++;
        return false;
      }
      return true;
    });
    setOut(result.join("\n"));
    setCount(removed);
  };
  return (
    <div className="space-y-3">
      <Row>
        <Btn onClick={strip}>[ strip console.* ]</Btn>
        {out && <CopyBtn text={out} />}
      </Row>
      {count > 0 && (
        <Msg
          msg={
            "✓ removed " +
            count +
            " console call" +
            (count === 1 ? "" : "s") +
            ". your PR reviewers thank you."
          }
        />
      )}
      <Lbl>input</Lbl>
      <TA value={inp} onChange={hi} rows={10} />
      {out && (
        <>
          <Lbl>cleaned output</Lbl>
          <TA value={out} readOnly rows={10} />
        </>
      )}
    </div>
  );
}
