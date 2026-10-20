import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { translateDocument } from "./lib/translate.mjs";
import { CAPACITY_MESSAGE } from "./lib/parse-result.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = path.join(__dirname, "public");
const MAX_BYTES = 12 * 1024 * 1024; // 12 MB
const PORT = Number(process.env.PORT || 3847);

loadEnvFile(path.join(__dirname, ".env"));

const ALLOWED_MIME = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

const server = http.createServer(async (req, res) => {
  try {
    if (req.method === "GET" && (req.url === "/" || req.url === "/index.html")) {
      return sendFile(res, path.join(PUBLIC, "index.html"), "text/html; charset=utf-8");
    }
    if (req.method === "GET" && req.url === "/styles.css") {
      return sendFile(res, path.join(PUBLIC, "styles.css"), "text/css; charset=utf-8");
    }
    if (req.method === "GET" && req.url === "/app.js") {
      return sendFile(res, path.join(PUBLIC, "app.js"), "text/javascript; charset=utf-8");
    }
    if (req.method === "GET" && req.url === "/api/health") {
      return json(res, 200, {
        ok: true,
        configured: Boolean(process.env.GEMINI_API_KEY?.trim()),
      });
    }
    if (req.method === "POST" && req.url === "/api/translate") {
      return await handleTranslate(req, res);
    }
    json(res, 404, { error: "not_found" });
  } catch (err) {
    console.error(err);
    json(res, 500, { error: "server_error", message: "Something went wrong. Try again." });
  }
});

server.listen(PORT, () => {
  console.log(`Fine Print Translator at http://127.0.0.1:${PORT}`);
  if (!process.env.GEMINI_API_KEY?.trim()) {
    console.warn("GEMINI_API_KEY is not set. Copy app/.env.example to app/.env and add your free key.");
  }
});

async function handleTranslate(req, res) {
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > MAX_BYTES + 64 * 1024) {
      return json(res, 413, {
        error: "too_large",
        message: "That file is too large. Try a smaller PDF or photo (under about 12 MB).",
      });
    }
    chunks.push(chunk);
  }

  let payload;
  try {
    payload = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return json(res, 400, {
      error: "bad_json",
      message: "Could not read the upload. Try again.",
    });
  }

  const mimeType = String(payload.mimeType || "").toLowerCase();
  const base64 = String(payload.data || "").replace(/^data:[^;]+;base64,/, "");
  const fileName = String(payload.fileName || "document");

  if (!ALLOWED_MIME.has(mimeType)) {
    return json(res, 400, {
      error: "bad_type",
      message: "Use a PDF or a photo (JPEG, PNG, WebP, or GIF).",
    });
  }
  if (!base64) {
    return json(res, 400, {
      error: "empty_file",
      message: "Choose a PDF or photo first.",
    });
  }

  const approxBytes = Math.floor((base64.length * 3) / 4);
  if (approxBytes > MAX_BYTES) {
    return json(res, 413, {
      error: "too_large",
      message: "That file is too large. Try a smaller PDF or photo (under about 12 MB).",
    });
  }

  if (!process.env.GEMINI_API_KEY?.trim()) {
    return json(res, 503, {
      error: "misconfigured",
      message:
        "This copy is not ready yet. The person who runs it needs to set GEMINI_API_KEY in app/.env (billing off).",
    });
  }

  try {
    const result = await translateDocument({
      apiKey: process.env.GEMINI_API_KEY,
      model: process.env.GEMINI_MODEL,
      mimeType,
      base64,
    });
    // Do not persist upload or result (FR-06, FR-09).
    return json(res, 200, {
      ...result,
      fileName,
      disclaimer:
        "This is not medical, legal, or money advice. Check the original document before you rely on this summary.",
    });
  } catch (err) {
    if (err.code === "capacity") {
      return json(res, 503, { error: "capacity", message: CAPACITY_MESSAGE });
    }
    if (err.code === "misconfigured") {
      return json(res, 503, {
        error: "misconfigured",
        message:
          "This copy is not ready yet. The person who runs it needs to set GEMINI_API_KEY in app/.env (billing off).",
      });
    }
    console.error("translate failed:", err.detail || err.message);
    return json(res, err.status || 502, {
      error: err.code || "upstream",
      message: err.message || "Could not translate that document. Try again.",
    });
  }
}

function sendFile(res, filePath, type) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      json(res, 404, { error: "not_found" });
      return;
    }
    res.writeHead(200, { "Content-Type": type, "Cache-Control": "no-store" });
    res.end(data);
  });
}

function json(res, status, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  res.end(body);
}

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  const text = fs.readFileSync(filePath, "utf8");
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq <= 0) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (process.env[key] === undefined) process.env[key] = val;
  }
}
