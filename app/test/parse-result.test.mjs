import test from "node:test";
import assert from "node:assert/strict";
import {
  CAPACITY_MESSAGE,
  isCapacityExhausted,
  parseTranslateResult,
} from "../lib/parse-result.mjs";

test("parseTranslateResult accepts a complete JSON object (pass)", () => {
  const raw = JSON.stringify({
    whatItIs: "A residential lease renewal notice.",
    actions: ["Sign and return by March 1.", "Pay the $50 processing fee."],
    traps: ["Automatic month-to-month after April 1 if unsigned."],
  });
  const result = parseTranslateResult(raw);
  assert.equal(result.whatItIs, "A residential lease renewal notice.");
  assert.equal(result.actions.length, 2);
  assert.equal(result.traps.length, 1);
});

test("parseTranslateResult refuses empty model text (fail)", () => {
  assert.throws(() => parseTranslateResult("   "), /empty_model_text/);
});

test("parseTranslateResult refuses incomplete JSON (fail)", () => {
  assert.throws(
    () => parseTranslateResult(JSON.stringify({ whatItIs: "Only this" })),
    /incomplete_model_json|invalid_model_json/
  );
});

test("isCapacityExhausted detects 429 and quota wording", () => {
  assert.equal(isCapacityExhausted(429, ""), true);
  assert.equal(isCapacityExhausted(400, "RESOURCE_EXHAUSTED"), true);
  assert.equal(isCapacityExhausted(400, "something else"), false);
  assert.ok(CAPACITY_MESSAGE.toLowerCase().includes("try"));
});
