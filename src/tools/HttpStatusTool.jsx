import { useState } from "react";
import { INP } from "../constants";

export default function HttpStatusTool() {
  const CODES = [
    [100, "Continue", "Keep going."],
    [
      101,
      "Switching Protocols",
      "Upgrading. Like your tech stack, but successfully.",
    ],
    [200, "OK", "The dream."],
    [201, "Created", "You are a creator now."],
    [204, "No Content", "Success, but nothing to say."],
    [301, "Moved Permanently", "Gone. Forever. Like my work-life balance."],
    [302, "Found", "Temporarily elsewhere. Like my motivation."],
    [304, "Not Modified", "Cached. Efficient. Boring."],
    [400, "Bad Request", "You messed up the request. We all do."],
    [401, "Unauthorized", "Who are you? Prove it."],
    [403, "Forbidden", "I know who you are. Still no."],
    [404, "Not Found", "The classic. The legend. The pain."],
    [405, "Method Not Allowed", "Wrong verb."],
    [408, "Request Timeout", "You took too long. Like my deploys."],
    [409, "Conflict", "Two things disagree. Git knows this feeling."],
    [410, "Gone", "Like 404 but with closure."],
    [418, "I'm a Teapot", "Cannot brew coffee. RFC 2324. Not a joke."],
    [422, "Unprocessable Entity", "Valid syntax, broken logic."],
    [429, "Too Many Requests", "Slow down, turbo."],
    [500, "Internal Server Error", "It's not you, it's me. (It's me.)"],
    [502, "Bad Gateway", "The middleman failed. Typical."],
    [503, "Service Unavailable", "We're on fire. Please hold."],
    [504, "Gateway Timeout", "The middleman gave up waiting. Relatable."],
  ];
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(null);
  const filtered = CODES.filter(
    ([c, n]) =>
      String(c).includes(q) || n.toLowerCase().includes(q.toLowerCase()),
  );
  return (
    <div className="space-y-3">
      <input
        className={INP}
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="search by code or name..."
      />
      <div className="space-y-1 max-h-64 overflow-y-auto">
        {filtered.map(([code, name, desc]) => (
          <button
            key={code}
            onClick={() => setSel(sel === code ? null : code)}
            className={`w-full text-left px-3 py-2 rounded border font-mono text-xs cursor-pointer transition-colors ${sel === code ? "border-green-600 bg-green-950" : "border-green-900 bg-black hover:border-green-700"}`}
          >
            <span
              className={`font-bold mr-3 ${code < 300 ? "text-green-400" : code < 400 ? "text-blue-400" : code < 500 ? "text-yellow-400" : "text-red-400"}`}
            >
              {code}
            </span>
            <span className="text-green-300">{name}</span>
            <span className="text-green-500 ml-2">— {desc}</span>
          </button>
        ))}
      </div>
      {sel && (
        <div className="border border-green-900 rounded overflow-hidden">
          <div className="px-3 py-2 bg-green-950 text-xs font-mono text-green-600 font-bold">
            // http.cat/{sel}
          </div>
          <img
            src={"https://http.cat/" + sel}
            alt={"http " + sel}
            className="w-full"
            style={{ maxHeight: 300, objectFit: "cover" }}
          />
        </div>
      )}
    </div>
  );
}
