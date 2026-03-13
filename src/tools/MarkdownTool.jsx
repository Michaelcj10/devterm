import { useState } from "react";
import { TA, Lbl } from "../components/ui";

export default function MarkdownTool({ init, onInput }) {
  const DEF = [
    "# Hello, DEVTERM!",
    "",
    "## This actually renders",
    "",
    "**Bold** and *italic* text, plus `inline code`.",
    "",
    "- Bullet one",
    "- Bullet two",
    "",
    "```",
    "const coffee = () => keepCoding();",
    "```",
    "",
    "Links: [example.com](https://example.com)",
  ].join("\n");
  const [inp, setInp] = useState(init || DEF);
  const hi = (v) => {
    setInp(v);
    onInput && onInput(v);
  };
  const md2h = (s) => {
    const css =
      ".mh1{font-size:1.6em;font-weight:800;margin:0 0 .5em;color:#4ade80}.mh2{font-size:1.25em;font-weight:700;margin:.8em 0 .4em;color:#86efac}.mh3{font-size:1.05em;font-weight:600;margin:.6em 0 .3em;color:#bbf7d0}.mp{margin:0 0 .7em;line-height:1.65;font-size:.9em;color:#86efac;font-family:monospace}.mc{background:#052e16;padding:2px 5px;border-radius:3px;font-family:monospace;font-size:.82em;color:#34d399}.mpre{background:#022c22;border:1px solid #065f46;border-radius:4px;padding:12px;font-family:monospace;font-size:.8em;overflow-x:auto;margin:0 0 .7em;white-space:pre;color:#6ee7b7}.mbq{border-left:3px solid #16a34a;padding:.3em .8em;color:#6b7280;font-style:italic;margin:0 0 .7em}.mul{list-style:disc;padding-left:1.5em;margin:0 0 .7em}.mli{margin:.2em 0;font-size:.9em;color:#86efac;font-family:monospace}.ma{color:#34d399;text-decoration:underline}";
    let r = s
      .replace(
        /```([\s\S]*?)```/g,
        (_, c) => '<pre class="mpre">' + c.replace(/^[\w-]*\n/, "") + "</pre>",
      )
      .replace(/^### (.+)$/gm, '<h3 class="mh3">$1</h3>')
      .replace(/^## (.+)$/gm, '<h2 class="mh2">$1</h2>')
      .replace(/^# (.+)$/gm, '<h1 class="mh1">$1</h1>')
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/`(.+?)`/g, '<code class="mc">$1</code>')
      .replace(/^> (.+)$/gm, '<blockquote class="mbq">$1</blockquote>')
      .replace(/\[(.+?)\]\((.+?)\)/g, '<a class="ma" href="$2">$1</a>')
      .replace(/^[ \t]*[-*] (.+)$/gm, '<li class="mli">$1</li>');
    r = r.replace(
      /(<li[^>]*>[\s\S]*?<\/li>\n?)+/g,
      (m) => '<ul class="mul">' + m + "</ul>",
    );
    return (
      "<style>" +
      css +
      "</style>" +
      r
        .split(/\n{2,}/)
        .map((blk) =>
          blk.startsWith("<") ? blk : '<p class="mp">' + blk + "</p>",
        )
        .join("")
    );
  };
  return (
    <div className="grid grid-cols-2 gap-3">
      <div>
        <Lbl>markdown</Lbl>
        <TA value={inp} onChange={hi} rows={20} />
      </div>
      <div>
        <Lbl>preview</Lbl>
        <div
          className="bg-black border border-green-900 rounded p-4 overflow-auto"
          style={{ minHeight: 400 }}
          dangerouslySetInnerHTML={{ __html: md2h(inp) }}
        />
      </div>
    </div>
  );
}
