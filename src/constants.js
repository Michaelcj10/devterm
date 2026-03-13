export const CATS = [
  {
    id: "enc",
    label: "ENCODING & ESCAPING",
    ids: ["base64", "url", "html-entity", "string-escape"],
  },
  {
    id: "sec",
    label: "CRYPTO & SECURITY",
    ids: [
      "hash",
      "uuid",
      "guid",
      "password",
      "random-string",
      "jwt",
      "jwt-builder",
      "password-hash",
      "pem-decoder",
    ],
  },
  {
    id: "txt",
    label: "TEXT & FORMATTING",
    ids: [
      "json",
      "json-to-ts",
      "markdown",
      "case",
      "diff",
      "lorem",
      "log-remover",
    ],
  },
  {
    id: "util",
    label: "DEV UTILITIES",
    ids: [
      "regex",
      "timestamp",
      "number-base",
      "color",
      "cron",
      "csv",
      "byte-converter",
      "chmod",
      "cidr",
      "http-status",
      "mime",
      "ascii",
      "qr-code",
    ],
  },
  { id: "fun", label: "ACTUALLY USELESS", ids: ["excuse", "commit"] },
];

export const META = {
  base64: {
    label: "Base64",
    icon: "b64",
    desc: "Security theatre. Everyone knows it's not encryption.",
  },
  url: {
    label: "URL Encode",
    icon: "%20",
    desc: "Turn spaces into %20 like a civilised developer.",
  },
  "html-entity": {
    label: "HTML Entities",
    icon: "&;",
    desc: "Escape your code. And maybe your problems.",
  },
  "string-escape": {
    label: "String Escape",
    icon: "\\n",
    desc: "Backslash your feelings.",
  },
  hash: {
    label: "SHA Hash",
    icon: "###",
    desc: "One-way ticket to Digest Town. No refunds.",
  },
  uuid: {
    label: "UUID",
    icon: "uid",
    desc: "Generate IDs your DB will store and never query.",
  },
  guid: {
    label: "GUID",
    icon: "{id}",
    desc: "UUID with curly brace energy. Very enterprise.",
  },
  password: {
    label: "Password Gen",
    icon: "***",
    desc: "Your IT dept will reject it anyway.",
  },
  "random-string": {
    label: "Random String",
    icon: "???",
    desc: "When /dev/random is too many keystrokes.",
  },
  jwt: {
    label: "JWT Decoder",
    icon: "jwt",
    desc: "Decode tokens. Understand past-you's life choices.",
  },
  "jwt-builder": {
    label: "JWT Builder",
    icon: "+jwt",
    desc: "Build and sign tokens. With great power etc.",
  },
  "password-hash": {
    label: "bcrypt / PBKDF2",
    icon: "hash",
    desc: "Hash & verify passwords. PBKDF2-SHA256 under the hood.",
  },
  "pem-decoder": {
    label: "PEM Cert Decoder",
    icon: "pem",
    desc: "Paste a cert. Stop Googling openssl x509 commands.",
  },
  json: {
    label: "JSON Formatter",
    icon: "{ }",
    desc: "Beautify your JSON crimes before the PR review.",
  },
  "json-to-ts": {
    label: "JSON → TypeScript",
    icon: "<T>",
    desc: "Paste JSON. Get interfaces. Save 10 minutes.",
  },
  markdown: {
    label: "Markdown",
    icon: "## ",
    desc: "Write once. Render everywhere. Mostly.",
  },
  case: {
    label: "Case Converter",
    icon: "aA",
    desc: "Automate the camelCase vs snake_case argument.",
  },
  diff: {
    label: "Text Diff",
    icon: "+-",
    desc: "Blame-ready output. Works great in standups.",
  },
  lorem: {
    label: "Lorem Ipsum",
    icon: "¶",
    desc: "Placeholder text for ideas you'll never finish.",
  },
  "log-remover": {
    label: "Log Remover",
    icon: "//x",
    desc: "Strip your console.logs before the PR. You forgot.",
  },
  regex: {
    label: "Regex Tester",
    icon: ".*",
    desc: "Now you have two problems. Test them here.",
  },
  timestamp: {
    label: "Timestamp",
    icon: "ts",
    desc: "Unix time: because human dates were too easy.",
  },
  "number-base": {
    label: "Number Base",
    icon: "01",
    desc: "There are 10 types of devs. Serve all of them.",
  },
  color: {
    label: "Color Converter",
    icon: "rgb",
    desc: "Argue with designers across multiple colour spaces.",
  },
  cron: {
    label: "Cron Builder",
    icon: "* *",
    desc: "Schedule your regrets. Five fields. Infinite pain.",
  },
  csv: {
    label: "CSV Viewer",
    icon: ",,,",
    desc: "Excel, but it actually respects you.",
  },
  "byte-converter": {
    label: "Byte Converter",
    icon: "byte",
    desc: "1 GiB = 1073741824 B. Prove me wrong.",
  },
  chmod: {
    label: "Chmod Calc",
    icon: "rwx",
    desc: "755? 644? Click boxes. Stop Googling.",
  },
  cidr: {
    label: "CIDR Calc",
    icon: "/24",
    desc: "Subnetting maths without the crying.",
  },
  "http-status": {
    label: "HTTP Status",
    icon: "4xx",
    desc: "Every status code explained. Plus cats.",
  },
  mime: {
    label: "MIME Types",
    icon: ".ext",
    desc: "What the hell is application/octet-stream?",
  },
  ascii: {
    label: "ASCII Table",
    icon: "chr",
    desc: "Click any character. Copy. Done. Go home.",
  },
  "qr-code": {
    label: "QR Code",
    icon: "▣",
    desc: "Encode any URL or text to a scannable QR.",
  },
  excuse: {
    label: "Excuse Gen",
    icon: "shrug",
    desc: "For when 'works on my machine' won't cut it.",
  },
  commit: {
    label: "Commit Msg Gen",
    icon: "git",
    desc: "Generate commit messages. Mood-based, surprisingly accurate.",
  },
};

export const INP =
  "w-full bg-black border border-green-900 rounded p-2 font-mono text-sm text-green-300 outline-none focus:border-green-600 focus-visible:ring-1 focus-visible:ring-green-500/30";

export const SEL =
  "bg-black border border-green-900 text-green-400 rounded px-2 py-1.5 text-xs font-mono outline-none cursor-pointer focus:border-green-600 focus-visible:ring-1 focus-visible:ring-green-500/30";

export const BS = {
  p: "bg-green-800 hover:bg-green-700 text-green-100 border border-green-700",
  s: "bg-transparent border border-green-900 text-green-600 hover:border-green-600 hover:text-green-300",
  d: "bg-transparent border border-red-900 text-red-600 hover:border-red-700 hover:text-red-400",
};
