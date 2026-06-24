# Defect Triage & Incident Management Rules

## 1. Triage Philosophy
As a Fintech software enterprise, we prioritize defects based on financial exposure, data integrity, and strict adherence to business rules. All automated test failures must be triaged within 2 hours of the CI/CD pipeline reporting them.

## 2. Priority Levels and SLAs

| Priority | Description | Resolution SLA | Example in Current Context |
| :--- | :--- | :--- | :--- |
| **P0 (Blocker)** | System down, data loss, or severe security breach. | Immediate (Hotfix) | Auth API returns HTTP 500. Users cannot log in or trade. |
| **P1 (Critical)** | Core business rule violation or infrastructure failure. | 24 Hours | 1. **Race Condition:** k6 `ApiConcurrency` test shows a user successfully bought FX despite $$wallet\_balance < trade\_price$$.<br>2. **Infra Block:** Playwright browser binaries fail to download due to 403 geo-restrictions, blocking all E2E pipelines. |
| **P2 (Major)** | Major functionality impaired, no data loss, workaround exists. | Next Sprint | k6 `ApiLoad` test shows trade history endpoint degrades to $> 2000ms$ response time under normal load. |
| **P3 (Minor)** | Non-critical bug, UI/UX issues, edge cases. | Backlog | Filtering trade history by "EUR/USD" works, but the table column headers are misaligned on Mobile iOS (found via `MobileAppium`). |
| **P4 (Trivial)** | Typos, cosmetic issues. | When Time Permits | Typo in the "Receive Money" success toast message. |

## 3. Triage Process for Automated Failures
When the ASP.NET Core Orchestrator logs a failure to the JSON/CSV logbook:
1. **Verify Test Data:** Is the test user's wallet properly seeded? (Check Setup/Teardown).
2. **Check Environment:** Was the API under a scheduled maintenance window? 
3. **Analyze Metrics:** If an `ApiSpike` test failed, cross-reference the Grafana/Console output. Did the system drop requests ($$HTTP\_Status \neq 200$$), or just slow down?
4. **Log to TestRail & Jira:** Map the failed automation script back to its corresponding TestRail ID (see `03_TestRail_Mappings.csv`).
