import { writeFileSync } from "node:fs";
import { deflateRawSync } from "node:zlib";

const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++)
    c = c & 1 ? (0xedb88320 ^ (c >>> 1)) : c >>> 1;
  crcTable[n] = c;
}

function crc32(buf) {
  let c = 0xffffffff;
  for (const b of buf) c = crcTable[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function pngChunk(type, data) {
  const t = Buffer.from(type, "ascii");
  const lenBuf = Buffer.allocUnsafe(4);
  lenBuf.writeUInt32BE(data.length, 0);
  const crcBuf = Buffer.allocUnsafe(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([t, data])), 0);
  return Buffer.concat([lenBuf, t, data, crcBuf]);
}

function makePNG(size) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.allocUnsafe(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8;
  ihdr[9] = 2;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  const rowSize = 1 + size * 3;
  const raw = Buffer.allocUnsafe(size * rowSize);
  const pad = Math.floor(size * 0.18);

  for (let y = 0; y < size; y++) {
    raw[y * rowSize] = 0;
    for (let x = 0; x < size; x++) {
      const i = y * rowSize + 1 + x * 3;
      if (x >= pad && x < size - pad && y >= pad && y < size - pad) {
        // #15803d (green-700) — inner area
        raw[i] = 21;
        raw[i + 1] = 128;
        raw[i + 2] = 61;
      } else {
        // black background / border
        raw[i] = 0;
        raw[i + 1] = 0;
        raw[i + 2] = 0;
      }
    }
  }

  return Buffer.concat([
    sig,
    pngChunk("IHDR", ihdr),
    pngChunk("IDAT", deflateRawSync(raw)),
    pngChunk("IEND", Buffer.alloc(0)),
  ]);
}

writeFileSync("public/pwa-192.png", makePNG(192));
writeFileSync("public/pwa-512.png", makePNG(512));
console.log("Created public/pwa-192.png and public/pwa-512.png");
