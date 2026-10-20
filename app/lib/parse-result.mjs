/**
 * Parse model text into the three-part result (FR-02).
 * @param {string} raw
 * @returns {{ whatItIs: string, actions: string[], traps: string[] }}
 */
export function parseTranslateResult(raw) {
  if (typeof raw !== "string" || !raw.trim()) {
    throw new Error("empty_model_text");
  }

  const text = stripFences(raw.trim());
  let data;
  try {
    data = JSON.parse(extractJsonObject(text));
  } catch {
    throw new Error("invalid_model_json");
  }

  const whatItIs = asNonEmptyString(data.whatItIs);
  const actions = asStringList(data.actions);
  const traps = asStringList(data.traps);

  if (!whatItIs || actions.length === 0 || traps.length === 0) {
    throw new Error("incomplete_model_json");
  }

  return { whatItIs, actions, traps };
}

/**
 * Detect free-tier capacity / rate-limit style failures (FR-11).
 * @param {number} status
 * @param {string} [bodyText]
 */
export function isCapacityExhausted(status, bodyText = "") {
  if (status === 429) return true;
  const t = String(bodyText).toLowerCase();
  return (
    t.includes("resource_exhausted") ||
    t.includes("quota") ||
    t.includes("rate limit") ||
    t.includes("ratelimit")
  );
}

export const CAPACITY_MESSAGE =
  "Free capacity is full right now. Please try again later. This tool stays free — there is nothing to pay.";

function stripFences(s) {
  const m = s.match(/^```(?:json)?\s*([\s\S]*?)```$/i);
  return m ? m[1].trim() : s;
}

function extractJsonObject(s) {
  const start = s.indexOf("{");
  const end = s.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) {
    throw new Error("no_json_object");
  }
  return s.slice(start, end + 1);
}

function asNonEmptyString(v) {
  if (typeof v !== "string") return "";
  return v.trim();
}

function asStringList(v) {
  if (!Array.isArray(v)) return [];
  return v
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter(Boolean);
}
