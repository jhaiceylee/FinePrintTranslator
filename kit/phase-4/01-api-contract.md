# API contract

**Document ID:** FP-API-001  
**Version:** 0.1.0 Draft  
**Date:** 2026-10-20  
**Phase:** 4, Implementation  
**Status:** Draft. The routes below are the contract. An implemented route that disagrees with this file is a defect or a decision-log entry.

## 1. Conventions

- Base path.
- Which routes require a sign-in.
- How an unknown record that belongs to someone else is answered.
- What error bodies must never contain.

## 2. Routes

One row is the route. An empty row means the agent stops and asks. A route with no requirement id is not ready to build.

| ID | Method | Path | Sign-in | Behavior | Requirement ids |
| --- | --- | --- | --- | --- | --- |
| R-01 | | | Yes or No | | |

## 3. Acceptance

| Role | Decision | Name | Date |
| --- | --- | --- | --- |
| Engineering lead | Pending | | |
| Security | Pending | | |
