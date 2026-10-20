# Where we are

**Document ID:** FP-NOW-001  
**Version:** 0.1.0 Draft  
**Date:** 2026-10-20  
**Status:** Living note for the coding agent. Replace this page at the start of a session. A row here does not close a gate.

The agent reads this file after `AGENTS.md`. It is the memory the agent does not keep between sessions.

## 1. Already true

Facts the code and the record already agree on. One line each. Cite a requirement id or a decision id when one exists.

- Product name is The "Real-World Fine Print" Translator.
- Users pay $0; no free-trial fee or small charge (`FR-03`, `FR-08`, `D-01`, `D-05`).
- Runnable app under `app/`: SCR-01 upload page, `POST /api/translate` (R-03), download/print, capacity message (`D-06`).
- AI is Gemini free tier with builder key in `GEMINI_API_KEY` only; billing off (`NFR-02`, `NFR-04`, `D-05`).
- Unit tests for parse + capacity pass (`npm test` in `app/`).
- Private GitHub repo: `https://github.com/jhaiceylee/FinePrintTranslator`
- Kit leftover Project Record Assistant work is not this product.

## 2. This session

The only work the agent may do now.

| Item | Requirement ids | Done when |
| --- | --- | --- |
| Set `GEMINI_API_KEY` in `app/.env` (billing off) and smoke-test translate | NFR-02, D-05, D-06 | One real PDF/photo returns three parts locally |

## 3. Do not redo

Finished work, refused scope, and files the agent must leave alone.

- Do not add payment, free-trial fees, credits, or usage fees for users.
- Do not require sign-in or a user Gemini API key field.
- Do not put the Gemini key in the browser or the repository.
- Do not turn on Gemini billing for this free path.
- Do not build server-side storage of uploads, outputs, or past translations.
- Do not invent medical, legal, money-advice, certification, or “always free cloud forever” claims.
- Do not sign gates or acceptance tables.

## 4. Ask before deciding

Choices that stay with a person. Leave blank until a person answers. The agent does not pick them.

| Choice | Answer | Date |
| --- | --- | --- |
| Stack, if it is not already in the repository | Language: JavaScript. Framework: Browser page plus a thin Node translate path for Gemini. Database: None (users save files on their device). Host: On the same computer as the application for the first build. | 2026-10-20 |
| How free AI is provided without charging users | Google Gemini API free tier; builder's key in env only; billing off; no user key; soft capacity-full message (`D-05`) | 2026-10-20 |
| What this release must not claim | See product reference Do not claim list | 2026-10-20 |
| GitHub repository visibility (public or private) | Private: https://github.com/jhaiceylee/FinePrintTranslator | 2026-10-20 |
| Who accepts the current gate | | |

## Acceptance

| Role | Decision | Name | Date |
| --- | --- | --- | --- |
| Engineering lead | Pending | | |
