# Wedding repository cleanup implementation plan

> **For agentic workers:** Use superpowers:subagent-driven-development to implement and independently review each task. Steps use checkbox syntax for tracking.

**Goal:** Retire v1/v2/v4/v5 locally and on GitHub, preserve the final v3.2 exactly, document the retained project, and explain the account Actions storage warning.

**Architecture:** Keep the deployed static HTML and runtime asset locations. Extract the three source sections currently borrowed from v2 into an explicit template file, then remove the four obsolete HTML routes and their active navigation links. Keep runtime assets unchanged because v3.2 is frozen, including shared configuration and CSS/JS.

**Tech Stack:** Static HTML/CSS/JavaScript, CommonJS Node authoring and verification scripts, Git, GitHub Pages.

**Spec:** Request 30 and the user's subsequent instruction: v3.2 is the final developer handoff; any future improvements belong only to v3.1. Repository baseline: `374e8f5164bdcb683e70363e2e144cabe14148da`.

## Global Constraints

- Preserve `v3.2-wedding-story.html` and every tracked file under `assets/` byte for byte. Do not modify cache query strings or runtime references in the final page.
- Preserve v3 and v3.1 HTML byte for byte during this cleanup. No optional visual redesign is included.
- Delete exactly the four obsolete homepage routes: `v1-heritage-atelier.html`, `v2-design-studio.html`, `v4-modern-essentials.html`, `v5-fit-concierge.html`.
- Keep original historical reports/screenshots identified as history. Remove active links to retired routes; do not rewrite history or force-push.
- Do not delete Actions artifacts, change budgets/payment settings, install Cognee, download models, or upload project data to external memory services.
- User requested agent coordination. Use separate scoped implementer/reviewer tasks, with no concurrent edits of the same files.

## Review Focus

1. Shared or dynamically configured resources can affect v3.2 even when its HTML is untouched: compare hashes of all tracked assets as well as the three retained HTML pages.
2. Deleting v2 can break future generation: verify both generated variants in memory without reading the retired page or writing the final page.
3. Old migration scripts can recreate removed routes or overwrite final assets: disable obsolete entrypoints before publishing the cleanup.
4. Historical documents can contain route links, including absolute Pages URLs: check HTML attributes, Markdown links, the hub selector and iframe source.
5. Actions inventory is account-wide current storage, not the monthly billing ledger: keep measurements, estimates and inaccessible billing data distinct; keep unrelated private repository names out of public documentation.

---

## Task 1: Preserve final outputs and detach the v2 dependency

**Files:**
- Create `docs/final-v32-lock.json`, `tools/templates/wedding-shared-sections.json`, `tools/verify-final-lock.cjs`, `tools/test-cleanup.cjs`.
- Modify `tools/build-wedding-variants.cjs`, `tools/verify-studio-videos.cjs`.

**Interfaces:** The JSON section template maps exact section class strings to exact HTML strings. The lock maps repository-relative paths to SHA-256 values. The variant generator accepts `--check` to compare both outputs without writing; normal generation writes only v3.1 and refuses any v3.2 write.

- [ ] Capture lock data from the clean baseline before changing code. Include the three retained pages and all tracked assets. Use `git ls-files -z -- assets` to enumerate files, and Node `crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex')` for each value. Record baseline commit and UTC timestamp.
- [ ] Add a verifier that asserts each locked file still exists and has its expected hash; fail on differences. Verify the current final hash equals `9fbd485d477e11b43c90a087c94eefcba8b4d9aa707c70e0806c92dc3b7215b6`.
- [ ] Add the cleanup regression assertions before implementation: all four obsolete routes must be absent; all three retained routes must exist; all generator outputs in check mode must match disk. Run the test and confirm the expected failure while obsolete routes still exist.
- [ ] Extract the exact three sections from v2 with the generator's existing matcher. The keys are `section products`, `section craft-section`, and `section looks-section`. Preserve their existing whitespace and strings; expected UTF-8 byte lengths are 3016, 1132 and 2344.

```js
const keys = ['section products', 'section craft-section', 'section looks-section'];
const templates = Object.fromEntries(keys.map(key => [key, section(v2, key)]));
fs.mkdirSync('tools/templates', { recursive: true });
fs.writeFileSync('tools/templates/wedding-shared-sections.json', JSON.stringify(templates, null, 2) + '\n');
```

- [ ] Replace the generator's v2 read with the template read. Replace its three `section(v2, className)` calls with the corresponding template values. Keep every existing content transformation.
- [ ] Add check mode and the final-write guard. Compute `output` using the existing formatting expression. In check mode compare `output` to the existing page; outside check mode write only when `variant === '3.1'`. Any request to write v3.2 must throw an actionable frozen-final error.
- [ ] Replace the studio verifier's obsolete v2 swatch assertion with assertions that all three extracted section templates exist; keep actual video source/hash assertions.
- [ ] Run `node tools/build-wedding-variants.cjs --check` and `node tools/verify-final-lock.cjs`. Require exact equality for both variant outputs and every frozen file; do not rebuild browser outputs to obtain equality.

## Task 2: Retire routes and update supported project navigation

**Files:**
- Delete the four named root HTML files.
- Create `tools/current-pages.json`.
- Modify `index.html`, `banner-guide.html`, `brand-review.html`, `docs/screenshot-index.html`, `report.html`, `README.md`, `tools/build-version-status-docs.cjs`, and generated `docs/VERSION-STATUS.{md,html,json}`.
- Retire the historical entrypoints `tools/build.cjs`, `tools/fashion-heroes.cjs`, `tools/docs-index.cjs`, `tools/update-brand-docs.cjs`, `tools/update-fashion-docs.cjs`, `tools/update-hockerty-docs.cjs`; update supported QA page enumerations where they still require retired routes.

**Interfaces:** The current-pages manifest contains only the three retained pages with roles `reference`, `editable`, and `final`. The hub selector, default iframe and active documentation route lists use those entries. Retired writer entrypoints must fail before importing side-effecting helpers or writing files.

- [ ] Create this route manifest:

```json
[
  {"id":"v3","page":"v3-wedding-story.html","role":"reference"},
  {"id":"v3.1","page":"v3.1-wedding-story.html","role":"editable"},
  {"id":"v3.2","page":"v3.2-wedding-story.html","role":"final"}
]
```

- [ ] Remove the four root files using `git rm --` with the four explicit paths. Do not recursively remove asset directories.
- [ ] Change the hub to three Wedding Story cards and selector entries. Use v3.2 as the default preview and label it final; label v3.1 as the editable variant. Reuse existing hub CSS and assets without editing any `assets/` file.
- [ ] Replace the banner guide's v5 demo link/art with retained Wedding Story equivalents. Remove active links to retired routes from the report, comparison and screenshot gallery; retain historical descriptions with an explicit retired-version notice.
- [ ] Update version-status generation to enumerate only retained routes, date the cleanup, document the final freeze, and reference extracted templates rather than a live v2 page. Preserve current banner/interaction facts. Regenerate documentation only, then run the lock verifier.
- [ ] Disable each retired writer before its first existing statement with an error naming `tools/build-wedding-variants.cjs --check` and the final freeze. Verify that invoking each guarded entrypoint exits nonzero without changing tracked files. Do not execute its old body.
- [ ] Update supported static checks to read the retained route manifest. Clearly mark old migration-specific QA as historical rather than asserting it passes today.
- [ ] Run `node tools/test-cleanup.cjs`, `node tools/verify-final-lock.cjs`, `node tools/test-product-touch.cjs`, and `node tools/test-wedding-autoslide.cjs`. Scan current HTML/Markdown links excluding code examples; fail for missing local files and links to the four retired routes.

## Task 3: Durable project memory, verified review and publication

**Files:**
- Create `AGENTS.md`, `CLAUDE.md`, `docs/PROJECT-MEMORY.md`, `docs/SESSION-HISTORY.md`, `docs/REQUEST30-CLEANUP.md`.
- Keep the detailed account inventory private under ignored `.local/request30-*`; publish only a sanitized storage explanation if included in repository docs.

**Interfaces:** `CLAUDE.md` points future sessions to the shared instructions and project memory. Memory distinguishes implemented state from proposals and records supported commands and freeze boundaries. The cleanup report records fresh verification and deployment evidence.

- [ ] Write memory from the architecture audit, reconciling all paths against the completed diff. Include runtime architecture, variant differences, exact final freeze, template ownership, retired tools, static serving, and where current versus historical evidence lives.
- [ ] State explicitly that Cognee has not been installed or indexed. File-based memory is the immediate cross-session handoff; any future Cognee setup needs a separate isolated dataset and must exclude credentials, `.git`, `.local`, archives and unrelated projects.
- [ ] Record Actions evidence observed 21 October 2026: homepage artifact/cache storage is zero; accessible account inventory has 15 artifacts totalling 7,099,176,128 bytes; another private repo accounts for 12 artifacts totalling 4,761,787,114 bytes. Billing endpoints were inaccessible, so these are inventory values, not a reconciled bill. Link official billing and artifact-retention documentation.
- [ ] Explain that deleting source pages does not remove Actions artifacts or already accrued storage usage. Present artifact expiry/retention options; make no remote artifact or billing changes.
- [ ] Obtain an independent agent review against all user constraints. Resolve findings, rerun affected checks, and inspect `git diff --name-status` to ensure no retained page or asset changed.
- [ ] Serve the static tree locally and use browser tools to inspect the updated hub at PC, Tablet and Mobile widths. Check the selector loads only retained routes, previews are reachable, and no horizontal layout overflow appears in the hub. Inspect final runtime readiness without changing its files. Save actual screenshots as review evidence.
- [ ] Run final hash, template generation, link and interaction checks immediately before committing. Record actual command results and limitations rather than reusing historical pass reports.
- [ ] Commit only the reviewed cleanup/docs files and push normally to `origin/main`; never force-push. Verify the resulting Pages deployment commit and live routes: the four retired routes return 404; the three retained routes return 200; live final HTML/runtime assets match the frozen hashes, allowing for delivery encoding only where appropriate.
- [ ] Report the deployed commit, removed versions, unchanged-final evidence, memory document links and Actions findings. If publication fails, state the exact failure and retain all local work for recovery.

## Plan status

Prepared and self-reviewed on 21 October 2026. Implementation has not begun. No homepage or runtime asset has been changed. Awaiting the plan review required by the user-designated Superpowers writing-plans workflow.
