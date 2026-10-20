# API contract

**Document ID:** FP-API-001  
**Version:** 0.1.0 Draft  
**Date:** 2026-10-20  
**Phase:** 4, Implementation  
**Status:** Draft. The routes below are the contract. An implemented route that disagrees with this file is a defect or a decision-log entry.

## 1. Conventions

- Base path: same origin as the page (`/`).
- No sign-in on any route.
- Uploads and results are not stored after the response.
- Error bodies never include the Gemini API key or full upstream secrets.

## 2. Routes

| ID | Method | Path | Sign-in | Behavior | Requirement ids |
| --- | --- | --- | --- | --- | --- |
| R-01 | GET | `/` | No | Serves SCR-01 | FR-01, FR-10 |
| R-02 | GET | `/api/health` | No | `{ ok, configured }` — whether `GEMINI_API_KEY` is set | NFR-02 |
| R-03 | POST | `/api/translate` | No | JSON body `{ mimeType, data (base64), fileName }`. Returns `{ whatItIs, actions, traps, disclaimer, fileName }` or error. Does not persist the file. Capacity → 503 `capacity` with try-later message. | FR-01, FR-02, FR-04, FR-06, FR-09, FR-11, NFR-02, NFR-04 |

## 3. Acceptance

| Role | Decision | Name | Date |
| --- | --- | --- | --- |
| Engineering lead | Pending | | |
| Security | Pending | | |
