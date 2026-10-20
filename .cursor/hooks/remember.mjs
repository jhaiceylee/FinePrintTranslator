import { appendFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const assistantDir = path.join(root, "assistant");
const logPath = path.join(assistantDir, "session-log.md");
const lastPath = path.join(assistantDir, "00-last-session.md");
const includedPath = path.join(assistantDir, "documents-included.md");
const wherePath = path.join(root, "00-where-we-are.md");
const event = process.argv[2] || "";

function read(file) {
  try {
    return readFileSync(file, "utf8");
  } catch {
    return "";
  }
}

function ensureLog() {
  mkdirSync(assistantDir, { recursive: true });
  if (!existsSync(logPath)) {
    writeFileSync(logPath, "# Session log\n\nThe assistant appends a line here when a file changes. It is not a signed decision.\n\n", "utf8");
  }
}

function stamp() {
  return new Date().toISOString().slice(0, 16).replace("T", " ");
}

async function inputJson() {
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString("utf8").trim();
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function editedPath(data) {
  const candidate = data.file_path || data.filePath || data.path || data.uri || "";
  if (!candidate) return "";
  const normalized = String(candidate).replace(/^file:\/\//, "");
  const relative = path.relative(root, path.resolve(normalized)).replaceAll("\\", "/");
  if (!relative || relative.startsWith("..") || relative.startsWith("assistant/")) return "";
  return relative;
}

function lastSessionBody() {
  const log = read(logPath);
  const marks = [...log.matchAll(/^## Session .+$/gm)];
  const section = marks.length ? log.slice(marks[marks.length - 1].index) : log;
  const files = [...section.matchAll(/^- \d{4}-\d{2}-\d{2} \d{2}:\d{2} edited (.+)$/gm)].map((match) => match[1]);
  const unique = [...new Set(files)];
  return { closed: stamp(), files: unique };
}

if (event === "sessionStart") {
  const memory = [
    "Assistant memory for this project. Use it before writing code. Do not treat it as a signed gate.",
    "",
    "## Where we are",
    read(wherePath).trim() || "00-where-we-are.md is missing.",
    "",
    "## Documents the person chose",
    read(includedPath).trim() || "assistant/documents-included.md is missing.",
    "",
    "## Last closed session",
    read(lastPath).trim() || "No session has closed in this folder yet.",
  ].join("\n");
  ensureLog();
  appendFileSync(logPath, `\n## Session ${stamp()}\n\n`, "utf8");
  process.stdout.write(JSON.stringify({ additional_context: memory }));
} else if (event === "afterFileEdit") {
  const data = await inputJson();
  const file = editedPath(data);
  if (file) {
    ensureLog();
    appendFileSync(logPath, `- ${stamp()} edited ${file}\n`, "utf8");
  }
  process.stdout.write("{}");
} else if (event === "stop") {
  const { closed, files } = lastSessionBody();
  const lines = files.length ? files.map((file) => `- ${file}`).join("\n") : "- No project file was edited.";
  mkdirSync(assistantDir, { recursive: true });
  writeFileSync(lastPath, `# Last session

**Document ID:** APP-ASSIST-001
**Status:** Written by the assistant when a coding session closes. A person does not sign this file.

## Closed

${closed}

## Files touched

${lines}

## How to continue

Read \`assistant/documents-included.md\` and update every chosen document this session's work belongs in. Read \`00-where-we-are.md\`. Continue only the work listed under "This session". Leave every acceptance table unsigned. If a decision, screen, or claim changed and the decision log has no new row, add that row before new work.
`, "utf8");
  process.stdout.write("{}");
} else {
  process.stdout.write("{}");
}
