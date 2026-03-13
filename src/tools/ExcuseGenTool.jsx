import { useState } from "react";
import { Btn, CopyBtn, Row } from "../components/ui";

export default function ExcuseGenTool() {
  const EXCUSES = [
    "It works on my machine.",
    "The tests were passing when I pushed.",
    "That's a feature, not a bug.",
    "DNS. It's always DNS.",
    "Have you tried turning it off and on again?",
    "Must be a caching issue.",
    "I was going to fix that in the next sprint.",
    "It only happens in production.",
    "I blame the framework.",
    "Well, it worked in staging.",
    "I can't reproduce it locally.",
    "The PM approved this behaviour.",
    "Technically, it's not broken.",
    "It was like that when I got here.",
    "We need to refactor before we can fix this.",
    "This is a known issue. It's on the backlog.",
    "I thought someone else owned that part.",
    "Quantum interference with the build server.",
    "We'll fix it in the next major version.",
    "That code predates my time here.",
    "It's a race condition. Very hard to reproduce.",
    "The intern did it.",
    "I followed the Stack Overflow answer exactly.",
  ];
  const [excuse, setExcuse] = useState("");
  const [spin, setSpin] = useState(false);
  const gen = () => {
    setSpin(true);
    setTimeout(() => {
      setExcuse(EXCUSES[Math.floor(Math.random() * EXCUSES.length)]);
      setSpin(false);
    }, 300);
  };
  return (
    <div className="space-y-4 text-center">
      <div className="py-6">
        <div className="text-xs font-mono text-green-500 mb-2">
          // your alibi, generated
        </div>
        <div
          className={`text-lg font-mono text-green-300 min-h-14 flex items-center justify-center px-4 transition-opacity ${spin ? "opacity-0" : "opacity-100"}`}
          style={{ transition: "opacity 0.2s" }}
        >
          {excuse || (
            <span className="text-green-500">
              press the button. you know you want to.
            </span>
          )}
        </div>
      </div>
      <Row>
        <Btn onClick={gen}>[ generate excuse ]</Btn>
        {excuse && <CopyBtn text={excuse} />}
      </Row>
    </div>
  );
}
