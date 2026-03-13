import { useState } from "react";
import { Btn, CopyBtn, Lbl, Row } from "../components/ui";

export default function CommitGenTool() {
  const MSGS = {
    panicked: [
      "fix: PLEASE WORK",
      "fix: I have no idea why this works but it does",
      "fix: reverting the revert of the revert",
      "fix: null check but I don't know which null",
      "fix: it was a semicolon. I hate this job.",
      "fix: 3am commit, ship it",
    ],
    confident: [
      "feat: implement elegant O(1) solution",
      "refactor: this is so clean it hurts",
      "perf: 10x speedup, you're welcome",
      "refactor: delete 300 lines, add 3",
    ],
    caffeinated: [
      "feat: added thing at 3am, seems fine",
      "fix: found bug, introduced 2 new ones",
      "wip: no idea what time it is",
      "feat: yolo driven development",
      "fix: it's always the last console.log",
    ],
    "passive-aggressive": [
      "fix: revert of revert as per JIRA-420",
      "chore: do what the PR reviewer wanted I guess",
      "fix: addressing 'feedback' from standup",
    ],
    philosophical: [
      "refactor: delete code — the greatest feature",
      "feat: add absence of a bug",
      "docs: update README to reflect the lie we agreed to tell",
    ],
  };
  const [mood, setMood] = useState("panicked");
  const [msg, setMsg] = useState("");
  const [spin, setSpin] = useState(false);
  const gen = () => {
    setSpin(true);
    setTimeout(() => {
      const arr = MSGS[mood];
      setMsg(arr[Math.floor(Math.random() * arr.length)]);
      setSpin(false);
    }, 300);
  };
  return (
    <div className="space-y-4">
      <Lbl>mood</Lbl>
      <div className="grid grid-cols-2 gap-2">
        {Object.keys(MSGS).map((m) => (
          <button
            key={m}
            onClick={() => setMood(m)}
            className={`px-3 py-2 rounded border text-xs font-mono cursor-pointer transition-colors text-left ${mood === m ? "border-green-600 bg-green-950 text-green-300" : "border-green-900 text-green-500 hover:border-green-700 hover:text-green-400"}`}
          >
            {m}
          </button>
        ))}
      </div>
      <Row>
        <Btn onClick={gen}>[ generate commit ]</Btn>
        {msg && <CopyBtn text={msg} />}
      </Row>
      {msg && (
        <div
          className={`bg-black border border-green-800 rounded p-4 font-mono text-green-300 text-sm transition-opacity ${spin ? "opacity-0" : "opacity-100"}`}
          style={{ transition: "opacity 0.2s" }}
        >
          $ git commit -m "<span className="text-yellow-400">{msg}</span>"
        </div>
      )}
    </div>
  );
}
