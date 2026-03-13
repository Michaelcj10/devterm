import { lazy, ComponentType, LazyExoticComponent } from "react";

export interface ToolProps {
  init?: string;
  onInput?: (v: string) => void;
}

const JsonTool = lazy(() => import("./JsonTool"));
const Base64Tool = lazy(() => import("./Base64Tool"));
const HashTool = lazy(() => import("./HashTool"));
const UrlTool = lazy(() => import("./UrlTool"));
const HtmlEntityTool = lazy(() => import("./HtmlEntityTool"));
const StringEscapeTool = lazy(() => import("./StringEscapeTool"));
const CaseTool = lazy(() => import("./CaseTool"));
const UuidTool = lazy(() => import("./UuidTool"));
const GuidTool = lazy(() => import("./GuidTool"));
const PasswordTool = lazy(() => import("./PasswordTool"));
const RandomStringTool = lazy(() => import("./RandomStringTool"));
const JwtDecodeTool = lazy(() => import("./JwtDecodeTool"));
const JwtBuilderTool = lazy(() => import("./JwtBuilderTool"));
const PasswordHashTool = lazy(() => import("./PasswordHashTool"));
const PemDecoderTool = lazy(() => import("./PemDecoderTool"));
const JsonToTsTool = lazy(() => import("./JsonToTsTool"));
const DiffTool = lazy(() => import("./DiffTool"));
const MarkdownTool = lazy(() => import("./MarkdownTool"));
const LoremTool = lazy(() => import("./LoremTool"));
const LogRemoverTool = lazy(() => import("./LogRemoverTool"));
const RegexTool = lazy(() => import("./RegexTool"));
const TimestampTool = lazy(() => import("./TimestampTool"));
const NumberBaseTool = lazy(() => import("./NumberBaseTool"));
const ColorTool = lazy(() => import("./ColorTool"));
const CronTool = lazy(() => import("./CronTool"));
const CsvTool = lazy(() => import("./CsvTool"));
const ByteConverterTool = lazy(() => import("./ByteConverterTool"));
const ChmodCalcTool = lazy(() => import("./ChmodCalcTool"));
const CidrCalcTool = lazy(() => import("./CidrCalcTool"));
const HttpStatusTool = lazy(() => import("./HttpStatusTool"));
const MimeLookupTool = lazy(() => import("./MimeLookupTool"));
const AsciiTableTool = lazy(() => import("./AsciiTableTool"));
const QrCodeTool = lazy(() => import("./QrCodeTool"));
const ExcuseGenTool = lazy(() => import("./ExcuseGenTool"));
const CommitGenTool = lazy(() => import("./CommitGenTool"));

// Tools are .jsx files so TypeScript infers their props as required any.
// Using ComponentType<any> avoids contravariance errors while keeping
// the ToolProps interface available for typed consumers.
const TOOLS: Record<string, LazyExoticComponent<ComponentType<any>>> = {
  json: JsonTool,
  base64: Base64Tool,
  hash: HashTool,
  url: UrlTool,
  "html-entity": HtmlEntityTool,
  "string-escape": StringEscapeTool,
  case: CaseTool,
  uuid: UuidTool,
  guid: GuidTool,
  password: PasswordTool,
  "random-string": RandomStringTool,
  jwt: JwtDecodeTool,
  "jwt-builder": JwtBuilderTool,
  "password-hash": PasswordHashTool,
  "pem-decoder": PemDecoderTool,
  "json-to-ts": JsonToTsTool,
  diff: DiffTool,
  markdown: MarkdownTool,
  lorem: LoremTool,
  "log-remover": LogRemoverTool,
  regex: RegexTool,
  timestamp: TimestampTool,
  "number-base": NumberBaseTool,
  color: ColorTool,
  cron: CronTool,
  csv: CsvTool,
  "byte-converter": ByteConverterTool,
  chmod: ChmodCalcTool,
  cidr: CidrCalcTool,
  "http-status": HttpStatusTool,
  mime: MimeLookupTool,
  ascii: AsciiTableTool,
  "qr-code": QrCodeTool,
  excuse: ExcuseGenTool,
  commit: CommitGenTool,
};

export default TOOLS;
