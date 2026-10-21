# Dunnio durable project memory

Updated 21 October 2026. This is a source map and decision record, not a substitute for checking the current files. Read [shared instructions](../AGENTS.md) and [Request 30 evidence](REQUEST30-CLEANUP.md) first. Request 30 implementation and publication remain pending verification wherever the evidence report says pending.

## Project and retained pages

The repository is a static collection of Dunnio Tailor homepage prototypes and review tools. Checked-in HTML/CSS/JavaScript and local assets are the deployable source. There is no package manifest, framework runtime, application build, database, or backend required to view it. GitHub Pages serves the root of `main` with `.nojekyll`; Laragon can serve the same files at `http://localhost/dunnio-homepage-concepts/`. A local static server is sufficient; the optional `.test` domain requires existing host/vhost configuration.

| Entrypoint | Purpose and change policy |
| --- | --- |
| `index.html` | Review hub and responsive iframe preview; Request 30 limits its selector to retained routes and defaults to the final page. |
| `v3-wedding-story.html` | Original Wedding Story reference; preserve. |
| `v3.1-wedding-story.html` | The only homepage variant open to future improvements. |
| `v3.2-wedding-story.html` | Frozen final developer handoff; exact preservation. |
| `report.html`, `brand-review.html`, `banner-guide.html`, `banner-lab.html` | Review, documentation, and banner tools. |
| `docs/screenshot-index.html` | Historical screenshot index, with retired-version context. |

The route manifest is `tools/current-pages.json`, with roles `reference`, `editable`, and `final`. The Request 30 retirement targets are `v1-heritage-atelier.html`, `v2-design-studio.html`, `v4-modern-essentials.html`, and `v5-fit-concierge.html`. Their historical reports/screenshots and recoverable Git history are retained; a mention of an old version in a historical report does not make it an active route.

## Exact freeze and variant differences

The user has handed v3.2 to developers. Its HTML, behavior, resource references, and cache query strings must remain exact. All existing tracked files under `assets/` are frozen too, even assets not currently loaded by v3.2. Do not prune old banner branches or supposedly unused assets during this cleanup. During Request 30, v3 and v3.1 HTML are preserved as well.

The baseline is commit `374e8f5164bdcb683e70363e2e144cabe14148da`. The final HTML SHA-256 is `9fbd485d477e11b43c90a087c94eefcba8b4d9aa707c70e0806c92dc3b7215b6`. [final-v32-lock.json](final-v32-lock.json) records the retained pages and every tracked asset; its verifier checks existence and bytes. The lock is preservation evidence, not permission to change and recapture a frozen file.

v3.1 retains Wedding party and FAQ sections and places mobile hero copy below the image. v3.2 omits those two sections, overlays mobile copy, and uses a streamlined final layout. Its banner uses PC 7:4, Tablet 5:3, and a mobile frame aiming for 4:7 with a viewport-height cap. Final banner changes include six-second sequential autoplay and horizontal dragging/swiping without banner buttons. Later final requests cover USP/fit CTA placement, product hover and touch feedback, removal of decorative arrows, spacing, and heading semantics. Preserve the actual final sources; these facts are context for maintenance, not a request to reimplement them.

The retained variants still contain the historical footer wording “All 5 concepts.” The preserved footer links to the hub; leave the wording untouched under the strict freeze. Current hub navigation can show only retained routes.

Future v3.1 work must edit that page or create exclusively referenced files. A cache query string does not create an independent runtime asset: changing a shared underlying file changes all consumers. Any future approved v3.1 source change should reconcile its generator/template and editable lock entry deliberately while retaining final and asset hashes.

## Runtime dependency map

v3.2 loads these styles in order:

1. `assets/fonts.css`
2. `assets/styles.css`
3. `assets/brand.css`
4. `assets/fashion-heroes.css`
5. `assets/navigation-system.css`
6. `assets/wedding-variants.css`
7. `assets/wedding-final.css`

It loads these scripts in order: `assets/banner-config.js`, `assets/app.js`, `assets/product-card-touch.js`, `assets/wedding-final.js`, `assets/studio-video.js`, and `assets/navigation-system.js`.

v3.1 uses the first six styles and the banner/app/studio-video/navigation scripts. It does not load final CSS/JS or product-card-touch.js. v3 uses the first five styles and banner/app/navigation scripts. All three select `data-banner="wedding-story"`; app.js selects that configuration branch.

The current responsive wedding banner files are `assets/banners/wedding-story-{a,b}-{7x4,5x3,4x5}.webp`. Other dependencies include product JPGs; garden/formal/couple/editorial/workshop images; logos; gallery and review imagery; local Garamond and Afacad fonts; and three studio MP4s with poster images. Trace HTML, CSS `url()`/imports, script configuration, and video/font references when inspecting dependencies. An `<img>`-only search is incomplete.

`assets/asset-map.json`, `assets/banner-layout.json`, and `assets/navigation-tree.json` support authoring/documentation; inspect actual consumers before assuming a JSON file is fetched at runtime. Shared app handlers for other concepts can be dormant when selectors are absent. Their removal is outside the frozen cleanup scope.

## Authoring sources and tools

The preserved HTML and assets determine browser behavior. [VERSION-STATUS.md](VERSION-STATUS.md) describes current variant differences; `design-system/dunnio-tailor/MASTER.md` and `DESIGN-LANGUAGE.md` record design intent. Provenance lives in `docs/asset-provenance.json`, `docs/font-provenance.json`, `docs/wedding-story-sources.json`, and `docs/studio-video-assets.json`.

The supported Wedding generator reads the retained v3 base, `tools/templates/wedding-shared-sections.json`, wedding/story/video metadata, and `tools/wedding-final.cjs`. The explicit template contains the three exact former v2 sections: `section products`, `section craft-section`, and `section looks-section` (3,016, 1,132, and 2,344 UTF-8 bytes at extraction). Removing the v2 route must not remove those authoring inputs.

```sh
node tools/build-wedding-variants.cjs --check
node tools/verify-final-lock.cjs
node tools/test-cleanup.cjs
node tools/test-retired-tools.cjs
node tools/test-current-links.cjs
node tools/check-current-links.cjs
node tools/test-product-touch.cjs
node tools/test-wedding-autoslide.cjs
```

The generator's `--check` mode computes both variants and compares them with disk without writing. Its default mode writes v3.1 only; final write arguments are rejected. It is not needed for preview. Check-mode equality is a stronger cleanup requirement than “the generator ran,” and must not be obtained by rewriting final output.

The authoritative [retired-tools manifest](../tools/retired-tools.json) lists **18 historical writers and 6 historical QA entrypoints**. Each fails before imports or side effects, protecting retained pages and frozen assets. This includes broad builds, hero/navigation/font/asset preparation, optimization, typography and old documentation migrations. Their original bodies remain as provenance, not supported commands. `test-retired-tools.cjs` checks both pre-import failure and actual CLI rejection. Do not remove guards or treat every file under `tools/` as a safe build command.

`tools/build-version-status-docs.cjs` generates the version-status documents, not runtime assets. Historical QA scripts may assume five concepts or old design assertions. Supported enumeration should follow `tools/current-pages.json`; old migration checks must be identified as historical rather than reported as passing by inheritance.

## Evidence and future-session workflow

Fresh Request 30 results belong in [REQUEST30-CLEANUP.md](REQUEST30-CLEANUP.md). Older QA JSON, screenshots, `PLAN.md`, and request reports preserve history; their pass statements apply to their recorded run. Current source and explicit user constraints take precedence over outdated rebuild instructions.

1. Read instructions, README, this map, current version status, and latest session-history entry. Inspect Git status and the requested scope.
2. Verify frozen hashes before work. Stop to investigate any existing difference; do not reset user changes or regenerate to hide it.
3. Trace dependencies and inspect a writer's full outputs before choosing a tool. Keep runtime changes exclusive to v3.1 when improvements are requested.
4. Make the smallest scoped change. Run appropriate syntax/static/link checks and the freeze verifier. Check actual browser behavior at desktop, tablet, and mobile widths for changed UI.
5. Record exact changed files, fresh results, limitations, and remaining work in session history. Keep detailed local/private audit data out of public instructions.

Existing browser QA uses Node/CommonJS, Playwright, and Chrome; some scripts include machine-specific dependency or executable paths and may write checked-in reports/screenshots. `DUNNIO_PREVIEW_URL` selects the preview base URL. `DUNNIO_STATIC_ONLY=1` skips local-clone HTTP checks in the historical link checker; it does not prove external destinations work. Inspect scripts before execution and do not install a new toolchain merely to view static pages.

## Memory state

These tracked documents provide the immediate, reviewable cross-session memory. Ignored `.local/` drafts do not travel with a new clone, and no document automatically preserves every chat transcript.

Cognee has not been installed, initialized, indexed, or connected for this project. No project data was uploaded, no models were downloaded, and no cloud memory requests were made for this cleanup. A source checkout elsewhere on disk is not an active memory service. Any separately authorized future setup must inventory installed tools/stores, use a separate project dataset, exclude credentials, `.git`, `.local`, archives, private analytics, and unrelated projects, and verify persistence with a write/read roundtrip before claiming it works. File memory remains usable without that setup.
