# Dunnio project entrypoint

Before work, read [AGENTS.md](AGENTS.md), [README.md](README.md), [project memory](docs/PROJECT-MEMORY.md), and [session history](docs/SESSION-HISTORY.md). AGENTS.md is the shared instruction source for this repository.

`v3.2-wedding-story.html` is final and already handed to developers. Preserve its exact HTML and every existing tracked file under `assets/`, including shared runtime dependencies and cache URL revisions. Keep v3 as the original reference. Improvements belong only to v3.1 and files exclusively referenced by v3.1.

Check actual cleanup/verification/publication status in [Request 30](docs/REQUEST30-CLEANUP.md). Use generator `--check` for read-only comparison of both variants; default generation writes v3.1 only. Inspect tools before running them, preserve unrelated changes, and record meaningful decisions and actual verification in session history.

File-based memory is active through these tracked documents. Cognee is not installed, indexed, or connected for this project; no model download, dependency installation, cloud request, or data upload is implied.
