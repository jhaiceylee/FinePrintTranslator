# The "Real-World Fine Print" Translator lifecycle and phase gates

**Document ID:** FP-LIFE-001  
**Version:** 0.1.0 Draft  
**Date:** 2026-10-20  
**Status:** Draft. No gate is signed.

## Gate tracker

| Gate | From | To | Handover criteria | Evidence | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | Conception | Initialization | The executive sponsor accepts the charter and the cost assumptions. The risk assessment is accepted | Phase 1 charter, business case, risk | Draft, unsigned |
| 2 | Initialization | Planning | Security accepts the architecture. Governance rules are published | Phase 2 governance, architecture, data lineage | Draft, unsigned |
| 3 | Planning | Implementation | Requirements and screens are accepted. The first stories are estimated. Definition of Ready is in force | Phase 3 requirements, UX, sprint plan | Draft, unsigned |
| 4 | Implementation | Testing | Definition of Done is met. Automated checks are green | Phase 4 standards and the test run | Not open |
| 5 | Testing | Go-live | No open critical defects. Evaluation cases passed. Security plan signed | Phase 5 | Not open |
| 6 | Go-live | Production | Change request approved. Smoke tests passed in the target environment | Phase 6 | Not open |
| 7 | Production | Continuous management | Support notes exist. Alerts are defined | Phase 7 | Not open |

Writing this table does not close a gate. The agent does not change a status and does not sign a gate. Price and cost stay in the business case for a person to accept.

## What the application is

A person with a dense PDF or photo of fine print uses a zero-login web page to get a free three-part plain-language summary (what it is, what to do, traps and deadlines). They only upload a file—no API key. AI use is free through the Google Gemini API free tier with the builder's key (billing off). The person saves uploads and outputs on their own device. The application does not charge, sell credits, require an account, or store their files or past translations.

## What this record refuses to claim

- Medical, legal, or money advice
- That the summary replaces reading the original document
- That a free cloud model quota is permanent (users still must not be charged)
- Certification, hospital/court/government approval, or guaranteed savings

## Roles

| Role | Responsibility | Named holder |
| --- | --- | --- |
| Executive sponsor | Accepts the charter and the scope cuts | Pending |
| Product owner | Orders the work and accepts stories | Pending |
| Security | Accepts the architecture and the security tests | Pending |
| Engineering lead | Accepts Ready, Done, and the release | Pending |
