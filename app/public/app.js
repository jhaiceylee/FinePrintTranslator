const form = document.getElementById("translate-form");
const fileInput = document.getElementById("file-input");
const dropZone = document.getElementById("drop-zone");
const fileNameEl = document.getElementById("file-name");
const submitBtn = document.getElementById("submit-btn");
const statusEl = document.getElementById("status");
const resultEl = document.getElementById("result");
const whatEl = document.getElementById("what-it-is");
const actionsEl = document.getElementById("actions");
const trapsEl = document.getElementById("traps");
const disclaimerEl = document.getElementById("disclaimer");
const downloadBtn = document.getElementById("download-btn");
const printBtn = document.getElementById("print-btn");

let lastResult = null;
let lastFileName = "fine-print";

fileInput.addEventListener("change", () => {
  const file = fileInput.files?.[0];
  if (file) {
    fileNameEl.hidden = false;
    fileNameEl.textContent = file.name;
    submitBtn.disabled = false;
    setStatus("");
  } else {
    fileNameEl.hidden = true;
    fileNameEl.textContent = "";
    submitBtn.disabled = true;
  }
});

["dragenter", "dragover"].forEach((evt) => {
  dropZone.addEventListener(evt, (e) => {
    e.preventDefault();
    dropZone.classList.add("is-drag");
  });
});

["dragleave", "drop"].forEach((evt) => {
  dropZone.addEventListener(evt, (e) => {
    e.preventDefault();
    dropZone.classList.remove("is-drag");
  });
});

dropZone.addEventListener("drop", (e) => {
  const file = e.dataTransfer?.files?.[0];
  if (!file) return;
  const dt = new DataTransfer();
  dt.items.add(file);
  fileInput.files = dt.files;
  fileInput.dispatchEvent(new Event("change"));
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const file = fileInput.files?.[0];
  if (!file) {
    setStatus("Choose a PDF or photo first.", true);
    return;
  }

  resultEl.hidden = true;
  submitBtn.disabled = true;
  setStatus("Reading your document…");

  try {
    const dataUrl = await readAsDataUrl(file);
    const base64 = dataUrl.split(",")[1] || "";
    setStatus("Translating fine print…");

    const res = await fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mimeType: file.type || guessMime(file.name),
        data: base64,
        fileName: file.name,
      }),
    });

    const body = await res.json().catch(() => ({}));
    if (!res.ok) {
      setStatus(body.message || "Could not translate that document. Try again.", true);
      submitBtn.disabled = false;
      return;
    }

    lastResult = body;
    lastFileName = stripExt(file.name) || "fine-print";
    renderResult(body);
    setStatus("Done. Download or print to keep a copy on your device.");
  } catch {
    setStatus("Something went wrong. Check your connection and try again.", true);
  } finally {
    submitBtn.disabled = !fileInput.files?.[0];
  }
});

downloadBtn.addEventListener("click", () => {
  if (!lastResult) return;
  const text = formatPlain(lastResult);
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${lastFileName}-summary.txt`;
  a.click();
  URL.revokeObjectURL(url);
});

printBtn.addEventListener("click", () => {
  if (!lastResult) return;
  window.print();
});

function renderResult(body) {
  disclaimerEl.textContent =
    body.disclaimer ||
    "This is not medical, legal, or money advice. Check the original document before you rely on this summary.";
  whatEl.textContent = body.whatItIs || "";
  fillList(actionsEl, body.actions);
  fillList(trapsEl, body.traps);
  resultEl.hidden = false;
}

function fillList(ul, items) {
  ul.replaceChildren();
  for (const item of items || []) {
    const li = document.createElement("li");
    li.textContent = item;
    ul.appendChild(li);
  }
}

function formatPlain(body) {
  const lines = [
    "Fine Print Translator summary",
    "",
    body.disclaimer || "",
    "",
    "1. What this document is",
    body.whatItIs || "",
    "",
    "2. Actions required of you",
    ...(body.actions || []).map((a) => `- ${a}`),
    "",
    "3. Traps, fees, or deadlines",
    ...(body.traps || []).map((t) => `- ${t}`),
    "",
  ];
  return lines.join("\n");
}

function setStatus(msg, isError = false) {
  statusEl.textContent = msg;
  statusEl.classList.toggle("is-error", Boolean(isError && msg));
}

function readAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function guessMime(name) {
  const lower = name.toLowerCase();
  if (lower.endsWith(".pdf")) return "application/pdf";
  if (lower.endsWith(".png")) return "image/png";
  if (lower.endsWith(".webp")) return "image/webp";
  if (lower.endsWith(".gif")) return "image/gif";
  if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return "image/jpeg";
  return "application/octet-stream";
}

function stripExt(name) {
  return name.replace(/\.[^.]+$/, "");
}
