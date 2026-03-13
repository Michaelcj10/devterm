import { useState } from "react";
import { CopyBtn } from "../components/ui";
import { INP } from "../constants";

export default function MimeLookupTool() {
  const MIMES = [
    ["html", "text/html"],
    ["css", "text/css"],
    ["js", "text/javascript"],
    ["ts", "application/typescript"],
    ["json", "application/json"],
    ["xml", "application/xml"],
    ["yaml", "application/x-yaml"],
    ["csv", "text/csv"],
    ["txt", "text/plain"],
    ["md", "text/markdown"],
    ["jpg", "image/jpeg"],
    ["png", "image/png"],
    ["gif", "image/gif"],
    ["svg", "image/svg+xml"],
    ["webp", "image/webp"],
    ["ico", "image/x-icon"],
    ["mp4", "video/mp4"],
    ["mp3", "audio/mpeg"],
    ["pdf", "application/pdf"],
    ["zip", "application/zip"],
    ["gz", "application/gzip"],
    ["wasm", "application/wasm"],
    ["bin", "application/octet-stream"],
    ["ttf", "font/ttf"],
    ["woff", "font/woff"],
    ["woff2", "font/woff2"],
    ["graphql", "application/graphql"],
    ["proto", "application/x-protobuf"],
  ];
  const [q, setQ] = useState("");
  const filtered = q
    ? MIMES.filter(
        ([ext, mime]) =>
          ext.includes(q.replace(".", "").toLowerCase()) ||
          mime.toLowerCase().includes(q.toLowerCase()),
      )
    : MIMES;
  return (
    <div className="space-y-3">
      <input
        className={INP}
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="search by extension or MIME type..."
      />
      <div className="overflow-auto border border-green-900 rounded max-h-96">
        <table className="w-full font-mono text-xs">
          <thead>
            <tr className="bg-green-950 border-b border-green-900">
              <th className="px-3 py-2 text-left text-green-500 font-bold">
                ext
              </th>
              <th className="px-3 py-2 text-left text-green-500 font-bold">
                MIME type
              </th>
              <th className="px-3 py-2 w-20"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(([ext, mime], i) => (
              <tr key={ext} className={i % 2 ? "bg-black" : "bg-neutral-950"}>
                <td className="px-3 py-1.5 text-yellow-500">.{ext}</td>
                <td className="px-3 py-1.5 text-green-300">{mime}</td>
                <td className="px-3 py-1.5">
                  <CopyBtn text={mime} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
