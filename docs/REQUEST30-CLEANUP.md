# Request 30 — Wedding repository cleanup

Prepared 21 October 2026. **Integration and verification are pending.** This report records the approved scope and audited baseline; it does not yet claim the cleanup has passed checks, been pushed, or been deployed.

## Scope and preservation

Keep `v3-wedding-story.html` as the original reference, `v3.1-wedding-story.html` as the sole editable homepage variant, and `v3.2-wedding-story.html` as the frozen final developer handoff. Retire the four root routes `v1-heritage-atelier.html`, `v2-design-studio.html`, `v4-modern-essentials.html`, and `v5-fit-concierge.html`, and remove their active navigation links. Historical reports/screenshots remain identified as history; Git history remains recoverable.

All three retained HTML pages and every tracked file under `assets/` must remain byte-identical during this cleanup. This includes old/shared assets and configuration branches; no asset pruning or runtime refactor is included. Future improvements belong only to v3.1 and exclusively referenced files.

Baseline commit: `374e8f5164bdcb683e70363e2e144cabe14148da`. Expected final HTML SHA-256: `9fbd485d477e11b43c90a087c94eefcba8b4d9aa707c70e0806c92dc3b7215b6`. The [preservation lock](final-v32-lock.json) records all retained pages and tracked assets.

## Implementation record

| Area | Required result | Integration status |
| --- | --- | --- |
| Retired routes | Four named root HTML files absent; three retained routes remain | Pending final diff verification |
| Navigation/docs | Hub defaults to v3.2; selector and current docs expose only retained routes | Pending static and browser verification |
| Authoring inputs | Three former v2 source sections preserved in explicit JSON template | Pending final generation comparison |
| Generator | `--check` compares both variants without writes; default writes v3.1 only; final write requests fail | Pending final command evidence |
| Frozen files | All retained-page and tracked-asset hashes match baseline | Pending final lock evidence |
| Historical tools | Obsolete writers fail before imports/side effects; supported checks enumerate retained routes | Pending guard/check evidence |
| Durable memory | Shared instructions, Claude entrypoint, project map, session history, and this report | Drafted; pending integrated review |
| Memory service | File memory only; Cognee inactive, with no install/index/model download/cloud upload | No service setup performed |

The approved plan is [here](superpowers/plans/2026-10-21-wedding-repository-cleanup.md). The project map and future maintenance boundary are in [PROJECT-MEMORY.md](PROJECT-MEMORY.md); session milestones are in [SESSION-HISTORY.md](SESSION-HISTORY.md).

## Verification and review evidence

Fill this table from fresh command output. A historical report or an earlier audit is not a pass for the integrated cleanup.

| Check | Result |
| --- | --- |
| `node tools/build-wedding-variants.cjs --check` | Pending |
| `node tools/verify-final-lock.cjs` | Pending |
| `node tools/test-cleanup.cjs` | Pending |
| `node tools/test-product-touch.cjs` | Pending |
| `node tools/test-wedding-autoslide.cjs` | Pending |
| Supported static checks and recursive current-document local links | Pending |
| Obsolete writer invocation: nonzero exit and no tracked-file changes | Pending |
| Independent review of scope, privacy, generated output, and freeze | Pending |
| Hub PC/Tablet/Mobile: selector, reachable preview, no horizontal overflow | Pending |
| Final runtime readiness; actual screenshots and console/network observations | Pending |
| Final `git diff --name-status`: no retained HTML/asset changes | Pending |

Known preservation detail: the retained footer still says “All 5 concepts.” This historical wording remains because its HTML is frozen; the hub target can list only retained routes. Browser QA cannot establish physical-device touch behavior unless such a device was actually used.

## Publication evidence

The user authorized a reviewed normal push to `origin/main`. Do not force-push. No new commit, push, Pages deployment, or post-cleanup live-route result is asserted here yet.

| Evidence | Result |
| --- | --- |
| Cleanup commit and normal push | Pending |
| Pages deployment tied to cleanup commit | Pending |
| Three retained live routes return HTTP 200 | Pending |
| Four retired live routes return HTTP 404 | Pending |
| Live final HTML and runtime asset hashes match lock | Pending |
| Publication failure or remaining limitation | Pending verification |

## Actions storage finding

Read-only audit snapshot: 21 October 2026, 08:42–08:46 UTC. This homepage had **0 retained Actions artifact bytes and 0 cache bytes**. Accessible account inventory contained **15 artifacts totalling 7,099,176,128 bytes**; an unrelated private repository accounted for **12 artifacts totalling 4,761,787,114 bytes**. Private repository names, artifact IDs, and detailed account inventories are intentionally excluded from this public report.

Billing endpoints were inaccessible and Packages listing was unavailable. These are current inventory observations, not an exact monthly bill or proof that the next artifact upload will succeed. The last observed pre-cleanup Pages deployment served baseline commit `374e8f5164bdcb683e70363e2e144cabe14148da`; a fresh cleanup deployment is still pending.

Deleting source pages does not remove stored Actions artifacts or already accrued storage. GitHub distinguishes current storage from storage accrued hourly during the billing cycle; deleting artifacts lowers current storage and future accrual, while prior accrued usage remains. See [GitHub Actions billing](https://docs.github.com/en/billing/concepts/product-billing/github-actions).

Possible follow-up is to let unneeded artifacts expire, review specific older outputs before deleting them, or set shorter retention for future uploads. Existing artifact expiry can be inspected through the API. No remote artifacts, workflows, payment settings, budgets, or retention settings were changed. See [removing workflow artifacts and retention options](https://docs.github.com/en/actions/how-tos/manage-workflow-runs/remove-workflow-artifacts). Detailed financial reconciliation requires the account's billing usage view; it remains outside the completed evidence.
