# Dunnio session history

This is a concise record of durable decisions and actual evidence. It does not reconstruct all earlier conversations. Read [project memory](PROJECT-MEMORY.md) and [Request 30](REQUEST30-CLEANUP.md) for current scope and status.

## Baseline: Requests 21–29, through 16 October 2026

The existing final handoff at baseline commit `374e8f5164bdcb683e70363e2e144cabe14148da` includes responsive studio videos, final banner/layout decisions, autoplay and swipe behavior, USP/fit CTA changes, community spacing, product hover/touch feedback, removal of decorative arrows, and heading cleanup. Existing request documents and QA artifacts preserve those earlier results; they are not fresh Request 30 verification. [VERSION-STATUS.md](VERSION-STATUS.md) maps the retained variants.

## 21 October 2026 — Request 30 cleanup and durable memory

User decision: retain v3 as reference, v3.1 as the only editable homepage variant, and v3.2 as the exact final developer handoff. Retire v1/v2/v4/v5 root pages and active navigation. Preserve all three retained HTML pages and every tracked asset byte for byte during cleanup; historical reports/screenshots and Git history remain recoverable. Future improvements must be isolated to v3.1 and exclusively referenced files.

Approved implementation plan: [wedding repository cleanup](superpowers/plans/2026-10-21-wedding-repository-cleanup.md). Scope includes extracting v2's three borrowed authoring sections, read-only generator comparison of both retained variants, default writes limited to v3.1, guarded historical writers, current-route navigation, a SHA-256 preservation lock, and durable file memory. The user authorized a reviewed normal push to `origin/main` without a further routine approval step. No force-push or artifact/billing mutation is authorized.

Memory files drafted: `AGENTS.md`, `CLAUDE.md`, `docs/PROJECT-MEMORY.md`, `docs/SESSION-HISTORY.md`, and `docs/REQUEST30-CLEANUP.md`. Cognee remains inactive: no installation, initialization, indexing, model download, or cloud data transfer was performed. Ignored local audits informed the documents; private inventories and unrelated repository/artifact identifiers must remain private.

Read-only storage audit: the homepage had no retained Actions artifacts or caches at the audit snapshot. Accessible account storage was concentrated elsewhere; see the sanitized [storage finding](REQUEST30-CLEANUP.md#actions-storage-finding). No artifacts were deleted and no billing settings changed. Billing data was unavailable, so inventory is not a reconciled bill.

Implementation verification, independent review, responsive browser evidence, final commit, push, and Pages checks: **pending integration**. Update [REQUEST30-CLEANUP.md](REQUEST30-CLEANUP.md) with actual results before describing cleanup or deployment as complete. Preserve failures and limitations instead of replacing them with assumed passes.
