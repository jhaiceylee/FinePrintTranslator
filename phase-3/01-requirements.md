# Requirements

**Document ID:** FP-REQ-001  
**Version:** 0.1.0 Draft  
**Date:** 2026-10-20  
**Phase:** 3, Planning  
**Status:** Draft. Not accepted.

Priorities are Must, Should, and Won't. Ids stay stable so tests can cite them. An empty Statement cell means the agent stops and asks. The agent does not write the requirement.

## 1. Functional requirements

| ID | Priority | Statement |
| --- | --- | --- |
| FR-01 | Must | A person can upload a photo or PDF on a web page without signing in |
| FR-02 | Must | After upload, the application shows three parts: what the document is; the actions required of the person; any hidden traps, fees, or deadlines |
| FR-03 | Must | The person pays nothing for the translator and nothing for AI use (no payment, credits, free-trial fee, or usage fee) |
| FR-04 | Must | The result tells the person to check the original document and that this is not medical, legal, or money advice |
| FR-05 | Must | The person can save the three-part output on their own device (download or print) without signing in |
| FR-06 | Must | The product does not keep the person's uploads or outputs after the translate call; the person saves copies on their device |
| FR-07 | Won't | Require an account or sign-in for this release |
| FR-08 | Won't | Charge the person or sell AI credits or a free-trial fee |
| FR-09 | Won't | Store uploads, outputs, or a server-side history of past translations |
| FR-10 | Must | The person does not enter a Gemini API key; they only upload a file and read or save the result |
| FR-11 | Must | When Gemini free capacity is exhausted, the page shows a clear “try later” style message and does not ask for payment |

## 2. Non-functional requirements

| ID | Priority | Statement | How it will be checked |
| --- | --- | --- | --- |
| NFR-01 | Must | AI for the translate step is provided without a charge to the person using the page | No checkout or usage billing in the UI |
| NFR-02 | Must | Translate calls the Google Gemini API free tier using the builder's key on a thin translate path (key not in the browser or the repo) | Key only in local env/secret settings; no key field in the UI (`D-05`) |
| NFR-03 | Must | Persistence of files and results is the person's responsibility on their device | No product-side store of user documents or outputs |
| NFR-04 | Must | Gemini billing for the builder's project stays off so the builder does not incur API charges; over-quota fails soft | Documented in decisions; capacity-full path tested (`D-05`) |

## 3. Acceptance

| Role | Decision | Name | Date |
| --- | --- | --- | --- |
| Product owner | Pending | | |
| Engineering lead | Pending | | |
