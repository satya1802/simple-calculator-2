# simple calculator-2 — SDLC Documentation

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start overview -->
basic calculator

**Documentation version:** v7
<!-- sdlc:auto:end overview -->

## Contents

<!-- sdlc:auto:start contents -->
| Document | State |
|---|---|
| [Requirements](requirements/README.md) | v5 approved |
| [Architecture](architecture/README.md) | 5 entries |
| [Development](development/README.md) | 0 entries |
| [Testing](testing/README.md) | 0 entries |
| [Deployment](deployment/README.md) | 0 entries |
| [Maintenance](maintenance/README.md) | 0 entries |
| [Data model](architecture/data-model.md) | generated |
| [API (OpenAPI)](architecture/api/openapi.yaml) | generated |
| [Decisions (ADRs)](architecture/adr/README.md) | 4 decisions |
| [Sprint plan](development/sprint-plan.md) | not generated yet |
| [Developer guide](development/developer-guide.md) | generated |
| [API reference](development/api-reference.md) | 1 route |
| [Test report](testing/test-report.md) | not run yet |
| [Tests](testing/test-cases.md) | 0 tests |
| [Deployment guide](deployment/deployment-guide.md) | not deployed yet |
| [Runbook](deployment/runbook.md) | not deployed yet |
| [Release notes](deployment/release-notes.md) | 0 releases |
| [Traceability matrix](traceability-matrix.md) | 19 requirements |
| [Changelog](CHANGELOG.md) | 7 versions |
<!-- sdlc:auto:end contents -->

## Open gaps

<!-- sdlc:auto:start open-gaps -->
### Requirements

- No architecture or App Design phase input yet to confirm how/whether this stack is actually applied (e.g. FastAPI/PostgreSQL/AWS specifics are not yet relevant since the app is client-side only).
- US-009: 'sensible digit limit' and whether overflow is truncated, rounded, or shown compactly is left open -- exact digit count and chosen display strategy are not specified in requirements.
- NFR-005 does not specify the exact digit limit or which single overflow strategy (truncate vs round vs compact form) will be used -- same gap as flagged under EPIC-003/US-009.

### Architecture

- Backend and database nodes are provisioned infrastructure with no defined schema, API spec, or usage yet -- confirm whether this idle cost/footprint is intended to persist across further versions or should be deferred until a feature needs it.
- NFR-002, NFR-003 and NFR-004 are referenced by these decisions but are not present in the known requirement keys list provided for this phase -- confirm these NFR ids are correctly tracked in the requirements set.
- Data model is explicitly empty and API spec is explicitly empty in this version -- this is stated as intentional (no persistence, no server logic) rather than a documentation gap, but should be re-confirmed if a future version activates the backend/database.
<!-- sdlc:auto:end open-gaps -->
