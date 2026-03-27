# Risk Register — University Event Management System

**Project:** University Event Management System
**Last Updated:** 2026-03-27
**Sprint:** Week 3 MVP

---

## Risk Matrix

| # | Risk | Category | Likelihood | Impact | Score | Mitigation Strategy | Status |
|---|------|----------|-----------|--------|-------|---------------------|--------|
| R1 | Timeline slippage — backend implementation delayed | Schedule | High | High | 🔴 Critical | Prioritize core API endpoints (auth, events, registrations) first; defer analytics to later sprint | **Active** |
| R2 | Frontend ↔ Backend integration issues (CORS, JWT, data shape mismatch) | Technical | Medium | High | 🟠 High | Test all API endpoints with Postman before connecting frontend; use consistent serializer field names | **Active** |
| R3 | Team member unavailability (illness, exams) | Resource | Low | Medium | 🟡 Medium | All code committed to shared GitHub repo with clear README; any member can continue any task | **Monitoring** |
| R4 | Database schema changes mid-sprint breaking existing work | Technical | Low | High | 🟡 Medium | Schema finalized and locked after Week 2 DB design; only additive changes allowed | **Resolved** |
| R5 | CI pipeline failures blocking merges to main | DevOps | Low | Low | 🟢 Low | All developers must run tests locally before pushing; fix failing tests before opening PRs | **Monitoring** |
| R6 | Docker environment inconsistency across dev machines | DevOps | Medium | Medium | 🟡 Medium | Use pinned base image versions in Dockerfiles; document tested Docker version in README | **Active** |
| R7 | JWT token expiry causing session issues during demo | Technical | Low | Medium | 🟡 Medium | Set ACCESS_TOKEN_LIFETIME to 24h in demo settings; have fresh login ready | **Monitoring** |
| R8 | SQLite not suitable for production (concurrency, scale) | Technical | High | Low | 🟡 Medium | SQLite is MVP-only; PostgreSQL migration path documented; switch before production deployment | **Accepted** |

---

## Risk Score Matrix

|  | Low Impact | Medium Impact | High Impact |
|--|-----------|--------------|------------|
| **High Likelihood** | 🟡 Medium | 🟠 High | 🔴 Critical |
| **Medium Likelihood** | 🟢 Low | 🟡 Medium | 🟠 High |
| **Low Likelihood** | 🟢 Low | 🟢 Low | 🟡 Medium |

---

## Risk Status Legend

- **Active** — Risk is present and mitigation is in progress
- **Monitoring** — Risk is known and being watched; no immediate action needed
- **Resolved** — Risk has been addressed and is no longer a concern
- **Accepted** — Risk acknowledged; accepted as a known trade-off

---

## Update History

| Date | Change |
|------|--------|
| 2026-03-27 | Initial risk register created; 8 risks identified for MVP sprint |
