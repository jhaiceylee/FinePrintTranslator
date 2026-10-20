# Decision log

**Document ID:** FP-DEC-001  
**Version:** 0.1.0 Draft  
**Date:** 2026-10-20  
**Phase:** 4, Implementation  
**Status:** Living record. A row here does not close a gate.

Add a row in the same session as the code whenever the running application changes a rule, a screen, or a claim. Future troubleshooting starts here. The agent may draft the row. A person decides whether the change was allowed.

| ID | Date | Decision | Why | Requirement, screen, or route |
| --- | --- | --- | --- | --- |
| D-01 | 2026-10-20 | The product is free for users: no charge for the translator and no charge for AI use. Kit placeholders about sign-in and saved records are not in scope for this release. | The person stated users must not pay for the translator or for AI. The idea is a zero-login upload page with a three-part summary. | FR-01, FR-02, FR-03, FR-07, FR-08, NFR-01 |
| D-02 | 2026-10-20 | The person can save the three-part output on their device (download or print). Server-side history is out of scope. | The person asked that users keep local copies of the output if possible, without adding accounts. | FR-05, FR-09 |
| D-03 | 2026-10-20 | The builder ships a simple page plus translate logic. Users save everything on their end; the product does not store uploads or outputs. A thin translate call may hold the builder's Gemini key so the key is not in the browser. | The person wants frontend/logic focus and user-local saves, then chose a simple UX without a user API key. | FR-06, FR-09, NFR-03 |
| D-04 | 2026-10-20 | *(Superseded by D-05.)* Translate used Gemini free tier with bring-your-own-key. | First AI path before UX feedback. | — |
| D-05 | 2026-10-20 | Keep the product free (no free-trial fee, no small charge). Translate uses the Google Gemini API free tier with the builder's key on a thin translate path. Gemini billing stays off so the builder is not charged. People only upload a file—no API key field. When free capacity is exhausted, show a clear “try later” message; do not charge the person. | BYOK was too much for people. The person wants something enjoyable and free for users and $0 for the builder. They kept free rather than a trial/fee. | FR-03, FR-08, FR-10, NFR-01, NFR-02, NFR-04 |
| D-06 | 2026-10-20 | First runnable app under `app/`: SCR-01, `POST /api/translate` (R-03), download/print local save, capacity message, key only in `GEMINI_API_KEY` env. | Person asked to build now. | SCR-01, R-03, FR-01–FR-06, FR-10, FR-11 |

## Still outside this release

- Accounts and sign-in
- Payment, free trial fees, credits, or usage fees for users
- Server-side storage of uploads, outputs, or past translations
- Product-side cloud backup of the person's files
- Asking each person for their own Gemini API key
- Turning on Gemini billing so overages create charges
- Medical, legal, or money advice claims
