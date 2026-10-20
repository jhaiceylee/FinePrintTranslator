import { SYSTEM_INSTRUCTION, userAskText } from "./prompt.mjs";
import {
  CAPACITY_MESSAGE,
  isCapacityExhausted,
  parseTranslateResult,
} from "./parse-result.mjs";

const DEFAULT_MODEL = "gemini-2.0-flash";

/**
 * Call Gemini with an uploaded file. Does not store the file (D-03, D-05).
 * @param {{ apiKey: string, model?: string, mimeType: string, base64: string }} opts
 */
export async function translateDocument(opts) {
  const apiKey = opts.apiKey?.trim();
  if (!apiKey) {
    const err = new Error("missing_api_key");
    err.code = "misconfigured";
    throw err;
  }

  const model = (opts.model || DEFAULT_MODEL).trim() || DEFAULT_MODEL;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;

  const body = {
    systemInstruction: {
      parts: [{ text: SYSTEM_INSTRUCTION }],
    },
    contents: [
      {
        role: "user",
        parts: [
          { text: userAskText() },
          {
            inlineData: {
              mimeType: opts.mimeType,
              data: opts.base64,
            },
          },
        ],
      },
    ],
    generationConfig: {
      temperature: 0.2,
      responseMimeType: "application/json",
    },
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const rawText = await res.text();

  if (!res.ok) {
    if (isCapacityExhausted(res.status, rawText)) {
      const err = new Error(CAPACITY_MESSAGE);
      err.code = "capacity";
      err.status = 503;
      throw err;
    }
    const err = new Error("gemini_request_failed");
    err.code = "upstream";
    err.status = 502;
    err.detail = summarizeUpstream(rawText);
    throw err;
  }

  let payload;
  try {
    payload = JSON.parse(rawText);
  } catch {
    const err = new Error("gemini_bad_response");
    err.code = "upstream";
    err.status = 502;
    throw err;
  }

  const modelText = extractModelText(payload);
  try {
    return parseTranslateResult(modelText);
  } catch {
    const err = new Error("Could not read a clear three-part summary from the model. Try another file or try again.");
    err.code = "parse";
    err.status = 502;
    throw err;
  }
}

function extractModelText(payload) {
  const parts = payload?.candidates?.[0]?.content?.parts;
  if (!Array.isArray(parts)) return "";
  return parts.map((p) => p.text || "").join("\n").trim();
}

function summarizeUpstream(rawText) {
  try {
    const j = JSON.parse(rawText);
    return j?.error?.message || "Upstream error";
  } catch {
    return "Upstream error";
  }
}
