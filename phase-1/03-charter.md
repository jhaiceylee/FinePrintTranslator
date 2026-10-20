# Project charter

**Document ID:** FP-CH-001  
**Version:** 0.1.0 Draft  
**Date:** 2026-10-20  
**Phase:** 1, Conception  
**Status:** Draft. The sponsor has not signed. This charter does not authorize production spend or a public launch.

Scope, the objectives, and the signature are human decisions. An empty in-scope or out-of-scope list means the agent stops and asks.

## 1. Project

| Field | Value |
| --- | --- |
| Name | The "Real-World Fine Print" Translator |
| Type | Zero-login web tool (simple page + thin translate path; users keep their own files) |
| Charter date | 2026-10-20 |

## 2. Objectives

1. Help a person who receives a dense multi-page document (HOA bylaws, medical discharge forms, rental leases, utility bills, and similar) answer: "What do I actually have to do, and by when?"
2. Keep the translator free for users. Keep AI use free for users. No login, no usage fee, no free-trial fee, no credits to buy. The builder stays at $0 by using Gemini free tier with billing off.

## 3. In scope

- A zero-login simple page: the person only uploads a photo or PDF (no API key to enter)
- One Google Gemini API free-tier call (builder's key on a thin translate path, billing off) that returns a short plain-language result
- A three-part output: what the document is; the actions required of the person; hidden traps, fees, or deadlines
- Free for the person using it: no charge for the translator and no charge for AI use
- When free capacity is full, a clear “try later” message—not a paywall
- Frontend and translate logic: show the page, run the summary flow, let the person take the result
- The person saves everything on their own device (original upload and three-part output). The product does not keep their files or history for them

## 4. Out of scope

- Giving medical, legal, or money advice
- Promising that someone will be safe, healthy, or unharmed
- Replacing a doctor, a lawyer, or emergency help
- Taking payment, free-trial fees, selling credits, or charging for AI use
- Requiring an account, sign-in, or a user-supplied Gemini API key
- Turning on Gemini billing so the builder incurs overage charges
- Storing uploads, outputs, or translation history on a server the builder runs
- Cloud backups or “find my past translations” on the product side
- Selling or sharing people's documents with another company for marketing
- Guaranteeing that a free cloud model quota will never change (the product still must not charge the user)

## 5. Success measures

| Measure | Target | How it will be checked |
| --- | --- | --- |
| User cost | $0 for translator and AI use | No payment, credit, or usage-fee path in the product |
| Result shape | Three parts as in scope | Manual check of a sample upload |

## 6. Acceptance

| Role | Decision | Name | Date |
| --- | --- | --- | --- |
| Executive sponsor | Pending | | |
