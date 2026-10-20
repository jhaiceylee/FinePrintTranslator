# Support notes

**Document ID:** FP-SUP-001  
**Version:** 0.1.0 Draft  
**Date:** 2026-10-20  
**Phase:** 7, Operations  
**Status:** Draft.

Update a row in the same session as a change the user can see. Describe the outcome that exists. Leave the row blank until that outcome is real.

| What the user sees | What it means | What to tell them |
| --- | --- | --- |
| Three-part summary after upload | Translate succeeded (`FR-02`) | Reminder: not advice; check the original; use Download or Print to keep a copy |
| “Free capacity is full… try again later” | Gemini free quota/rate limit (`FR-11`, `D-05`) | Wait and try later; there is nothing to pay |
| “Use a PDF or a photo…” | Wrong file type | Choose PDF, JPEG, PNG, WebP, or GIF |
| “That file is too large…” | Over size limit | Use a smaller file (under about 12 MB) |
| “This copy is not ready yet… GEMINI_API_KEY” | Server missing env key | Person running the app must set `app/.env` from `.env.example` with billing off |

## Acceptance

| Role | Decision | Name | Date |
| --- | --- | --- | --- |
| Product owner | Pending | | |
