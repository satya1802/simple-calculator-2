# simple calculator-2 — SDLC Documentation

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start overview -->
basic calculator

**Documentation version:** v10
<!-- sdlc:auto:end overview -->

## Contents

<!-- sdlc:auto:start contents -->
| Document | State |
|---|---|
| [Requirements](requirements/README.md) | v5 approved |
| [Architecture](architecture/README.md) | 14 entries |
| [Development](development/README.md) | 4 entries |
| [Testing](testing/README.md) | 0 entries |
| [Deployment](deployment/README.md) | 0 entries |
| [Maintenance](maintenance/README.md) | 0 entries |
| [Data model](architecture/data-model.md) | generated |
| [API (OpenAPI)](architecture/api/openapi.yaml) | generated |
| [Decisions (ADRs)](architecture/adr/README.md) | 4 decisions |
| [Sprint plan](development/sprint-plan.md) | 3 sprints |
| [Developer guide](development/developer-guide.md) | generated |
| [API reference](development/api-reference.md) | 1 route |
| [Test report](testing/test-report.md) | not run yet |
| [Tests](testing/test-cases.md) | 0 tests |
| [Deployment guide](deployment/deployment-guide.md) | not deployed yet |
| [Runbook](deployment/runbook.md) | not deployed yet |
| [Release notes](deployment/release-notes.md) | 0 releases |
| [Traceability matrix](traceability-matrix.md) | 19 requirements |
| [Changelog](CHANGELOG.md) | 10 versions |
<!-- sdlc:auto:end contents -->

## Open gaps

<!-- sdlc:auto:start open-gaps -->
### Requirements

- No architecture or App Design phase input yet to confirm how/whether this stack is actually applied (e.g. FastAPI/PostgreSQL/AWS specifics are not yet relevant since the app is client-side only).
- US-009: 'sensible digit limit' and whether overflow is truncated, rounded, or shown compactly is left open -- exact digit count and chosen display strategy are not specified in requirements.
- NFR-005 does not specify the exact digit limit or which single overflow strategy (truncate vs round vs compact form) will be used -- same gap as flagged under EPIC-003/US-009.

### Architecture

- Referenced NFR-003 is not present in the supplied list of known requirement keys -- confirm this requirement id exists and is correctly tracked.
- No current requirement drives active use of this component; it exists purely as a reserved future capability.
- Referenced NFR-002 is not present in the supplied list of known requirement keys -- confirm this requirement id exists and is correctly tracked.
- Referenced NFR-006 is not present in the supplied list of known requirement keys -- confirm this requirement id exists and is correctly tracked.
- Rationale for choosing React over Vue/Svelte beyond 'entire product lives here' is not detailed in the input.

### Development

- Sprint-to-story mapping above is inferred from matching sprint goal text to story titles; the plan input did not explicitly state which stories belong to which sprint -- confirm this mapping with the plan agent.
- No ticket status, commit history, code artifacts, or completion confirmation provided for any Sprint 1 story -- cannot confirm what has actually been built.
- Sprint-to-story mapping above is inferred from matching sprint goal text to story titles; the plan input did not explicitly state which stories belong to which sprint -- confirm with the plan agent.
- No ticket status, commit history, code artifacts, or completion confirmation provided for any Sprint 2 story -- cannot confirm what has actually been built.
- No ticket status, commit history, code artifacts, or completion confirmation provided for any Sprint 3 story -- cannot confirm what has actually been built.
- This phase's input is limited to the approved plan/backlog -- no actual development execution artifacts (tickets in progress/done, commits, pull requests, code) were provided, so build status cannot be documented beyond the plan itself.
- No dates are provided for plan approval or sprint start/end, so a timeline cannot be documented.
<!-- sdlc:auto:end open-gaps -->
