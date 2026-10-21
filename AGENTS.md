# Dunnio project instructions

Read [README.md](README.md), [project memory](docs/PROJECT-MEMORY.md), [session history](docs/SESSION-HISTORY.md), and the latest [Request 30 cleanup evidence](docs/REQUEST30-CLEANUP.md) before changing this repository. Inspect `git status` and preserve unrelated user changes.

## User decision and preservation boundary

- `v3.2-wedding-story.html` is the final developer handoff. Preserve its bytes, runtime behavior, resource URLs, and cache query strings exactly.
- Every existing tracked file under `assets/` is frozen byte for byte, including shared CSS/JS, configuration, fonts, images, videos, and historical assets. A selector scoped to v3.1 does not permit changing a shared frozen file.
- Keep `v3-wedding-story.html` as the original reference. Future improvements belong only to `v3.1-wedding-story.html` and files referenced exclusively by v3.1. Trace dependencies before editing or adding files; do not reuse a shared filename for a new implementation.
- Request 30 preserves all three retained HTML pages byte for byte. It retires only the four root homepage routes for v1, v2, v4, and v5, while retaining recoverable Git history and identified historical reports/screenshots. See the cleanup report for actual completion status.
- Do not run broad generators, asset optimizers, or migration scripts without inspecting their outputs. Do not restore retired pages to satisfy historical tooling.

## Working safely

This is a static HTML/CSS/JavaScript project. Serving checked-in files over HTTP requires no application build, package installation, database, or backend. Use the existing Laragon URL `http://localhost/dunnio-homepage-concepts/` or a loopback static server. Do not change hosts/vhost configuration merely to preview the site.

The supported generator contract is:

```sh
node tools/build-wedding-variants.cjs --check
node tools/verify-final-lock.cjs
```

`--check` compares both variant outputs without writing. Default generation writes only v3.1; a v3.2 write request must fail. Generation derives from the retained v3 base, explicit shared section templates, source metadata, and the final transformation helper. It is unnecessary for normal viewing. A future intentional v3.1 edit may need its source and editable lock entry reconciled; never refresh frozen v3.2/asset hashes to conceal a difference.

Before and after changes, verify the [frozen baseline manifest](docs/final-v32-lock.json). Its cleanup snapshot also covers v3 and v3.1. Inspect the diff for unexpected retained-page or asset changes. Use checks relevant to the change and report actual results; historical QA JSON and screenshots do not prove the current tree passes. Inspect browser scripts before running them because some write reports/screenshots or contain machine-specific paths.

Update project memory and append a concise session-history entry after meaningful work: decision, changed files, verification, limitations, and unresolved follow-up. Keep machine-specific drafts and sensitive audit details in ignored `.local/`; never publish account inventory files, private repository names, artifact IDs, credentials, or unrelated workspace data.

## Memory and publication

Tracked Markdown is the immediate cross-session memory. Cognee has not been installed, initialized, indexed, or connected for this project. Do not install dependencies, download models, upload data, or start cloud indexing as an implied memory step. Any separately authorized future setup must use an isolated project dataset and exclude `.git`, `.local`, archives, credentials, private analytics, and unrelated projects.

For Request 30, the user authorized reviewed cleanup and a normal push to `origin/main`; routine work within that scope needs no additional permission. Never force-push. Record verified commit/deployment evidence in the cleanup report. That authorization does not authorize Actions artifact deletion, billing changes, or unrelated future publication.
