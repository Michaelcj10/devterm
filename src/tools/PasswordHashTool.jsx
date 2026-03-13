import { useState } from "react";
import { Btn, CopyBtn, TA, Lbl, Row, Msg, MonoBox } from "../components/ui";
import { INP } from "../constants";

export default function PasswordHashTool() {
  const [mode, setMode] = useState("hash");
  const [password, setPassword] = useState("");
  const [hashInput, setHashInput] = useState("");
  const [rounds, setRounds] = useState(100000);
  const [result, setResult] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const doHash = async () => {
    if (!password) return;
    setLoading(true);
    setErr("");
    try {
      const salt = crypto.getRandomValues(new Uint8Array(16));
      const km = await crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(password),
        "PBKDF2",
        false,
        ["deriveBits"],
      );
      const bits = await crypto.subtle.deriveBits(
        { name: "PBKDF2", salt, iterations: rounds, hash: "SHA-256" },
        km,
        256,
      );
      const saltB64 = btoa(String.fromCharCode(...salt));
      const hashB64 = btoa(String.fromCharCode(...new Uint8Array(bits)));
      setResult("$pbkdf2$i=" + rounds + "$" + saltB64 + "$" + hashB64);
    } catch (e) {
      setErr(e.message);
    }
    setLoading(false);
  };

  const doVerify = async () => {
    if (!password || !hashInput) return;
    setLoading(true);
    setErr("");
    try {
      const parts = hashInput.split("$");
      if (parts.length !== 5 || parts[1] !== "pbkdf2")
        throw new Error(
          "invalid hash format — only hashes from this tool are supported",
        );
      const iters = parseInt(parts[2].split("=")[1]);
      const salt = new Uint8Array(
        atob(parts[3])
          .split("")
          .map((c) => c.charCodeAt(0)),
      );
      const km = await crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(password),
        "PBKDF2",
        false,
        ["deriveBits"],
      );
      const bits = await crypto.subtle.deriveBits(
        { name: "PBKDF2", salt, iterations: iters, hash: "SHA-256" },
        km,
        256,
      );
      const actual = btoa(String.fromCharCode(...new Uint8Array(bits)));
      setResult(
        actual === parts[4]
          ? "✓ password matches"
          : "✗ password does not match",
      );
    } catch (e) {
      setErr(e.message);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-3">
      <div className="border border-yellow-900 bg-black rounded px-3 py-2 text-xs font-mono text-yellow-700">
        // uses PBKDF2-SHA256 · not bcrypt-compatible · hashes generated here
        can only be verified here
      </div>
      <div className="flex gap-2">
        {["hash", "verify"].map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-3 py-1.5 rounded border text-xs font-mono cursor-pointer transition-colors ${mode === m ? "border-green-600 bg-green-950 text-green-300" : "border-green-900 text-green-700 hover:border-green-700"}`}
          >
            {m}
          </button>
        ))}
      </div>
      <Lbl>password</Lbl>
      <input
        type="password"
        className={INP}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="enter password..."
      />
      {mode === "hash" && (
        <>
          <Lbl>rounds: {rounds.toLocaleString()}</Lbl>
          <input
            type="range"
            min={10000}
            max={500000}
            step={10000}
            value={rounds}
            onChange={(e) => setRounds(+e.target.value)}
            className="w-full accent-green-600"
          />
        </>
      )}
      {mode === "verify" && (
        <>
          <Lbl>hash to verify against</Lbl>
          <TA
            value={hashInput}
            onChange={setHashInput}
            rows={3}
            placeholder="$pbkdf2$i=100000$..."
          />
        </>
      )}
      <Row>
        <Btn
          onClick={mode === "hash" ? doHash : doVerify}
          disabled={loading || !password}
        >
          {loading
            ? "working..."
            : "[ " + (mode === "hash" ? "hash password" : "verify") + " ]"}
        </Btn>
        {result && mode === "hash" && <CopyBtn text={result} />}
      </Row>
      <Msg msg={err} />
      {result && (
        <MonoBox
          cls={
            result.startsWith("✓")
              ? "text-green-400"
              : result.startsWith("✗")
                ? "text-red-400"
                : "text-green-300 break-all"
          }
        >
          {result}
        </MonoBox>
      )}
    </div>
  );
}
