import { useState } from "react";
import { Btn, CopyBtn, TA, Lbl, Row } from "../components/ui";
import { SEL } from "../constants";

export default function QrCodeTool({ init, onInput }) {
  const [text, setText] = useState(init || "https://devterm.tools");
  const [size, setSize] = useState(256);
  const [dark, setDark] = useState("000000");
  const [bg, setBg] = useState("0a0a0a");
  const [url, setUrl] = useState("");
  const [, setLoading] = useState(false);

  const hi = (v) => {
    setText(v);
    onInput && onInput(v);
  };

  const generate = () => {
    if (!text.trim()) return;
    setLoading(true);
    const qrUrl =
      "https://api.qrserver.com/v1/create-qr-code/?size=" +
      size +
      "x" +
      size +
      "&data=" +
      encodeURIComponent(text) +
      "&color=" +
      dark +
      "&bgcolor=" +
      bg +
      "&format=svg&qzone=2";
    setUrl(qrUrl);
  };

  return (
    <div className="space-y-3">
      <Lbl>content to encode</Lbl>
      <TA
        value={text}
        onChange={hi}
        rows={4}
        placeholder="URL, text, JSON, anything..."
      />
      <div className="grid grid-cols-3 gap-3">
        <div>
          <Lbl>size (px)</Lbl>
          <select
            className={SEL + " w-full"}
            value={size}
            onChange={(e) => setSize(+e.target.value)}
          >
            {[128, 256, 512, 1024].map((s) => (
              <option key={s} value={s}>
                {s}px
              </option>
            ))}
          </select>
        </div>
        <div>
          <Lbl>dot color</Lbl>
          <div className="flex gap-2 items-center">
            <input
              type="color"
              value={"#" + dark}
              onChange={(e) => setDark(e.target.value.slice(1))}
              className="w-9 h-9 cursor-pointer bg-transparent border-0"
            />
            <span className="font-mono text-xs text-green-700">#{dark}</span>
          </div>
        </div>
        <div>
          <Lbl>background</Lbl>
          <div className="flex gap-2 items-center">
            <input
              type="color"
              value={"#" + bg}
              onChange={(e) => setBg(e.target.value.slice(1))}
              className="w-9 h-9 cursor-pointer bg-transparent border-0"
            />
            <span className="font-mono text-xs text-green-700">#{bg}</span>
          </div>
        </div>
      </div>
      <Row>
        <Btn onClick={generate}>[ generate QR ]</Btn>
        <Btn
          v="s"
          onClick={() => {
            setDark("000000");
            setBg("ffffff");
          }}
        >
          [ light mode ]
        </Btn>
        <Btn
          v="s"
          onClick={() => {
            setDark("00ff66");
            setBg("0a0a0a");
          }}
        >
          [ terminal mode ]
        </Btn>
      </Row>
      {url && (
        <div className="flex flex-col items-center gap-3">
          <div className="border border-green-900 rounded overflow-hidden inline-block">
            <img
              src={url}
              alt="QR code"
              onLoad={() => setLoading(false)}
              onError={() => setLoading(false)}
              style={{
                display: "block",
                width: Math.min(size, 400),
                height: Math.min(size, 400),
              }}
            />
          </div>
          <a
            href={url}
            download="qr.svg"
            className="text-xs font-mono text-green-600 hover:text-green-400 border border-green-900 hover:border-green-700 px-3 py-1.5 rounded transition-colors"
          >
            [ download SVG ]
          </a>
        </div>
      )}
    </div>
  );
}
