# Implementation Backlog

## Phase 0 — Audit

- [x] Record framework, routes, state, backend, integrations, current learning/Porch features, scripts, and verified risks.
- [x] Mark deployed schema, RLS, production settings, and missing learning models as unknown where they cannot be verified.

## Phase 1 — Rebrand

- [x] Apply the new mission, headline, CTA, path discovery, cycle, and founder-led message to the homepage.
- [x] Establish a navy/light-blue/white visual system and add Learning Paths to shared navigation.
- [x] Remove member email from the homepage/detail public projections and visible Porch card/comment labels without rewriting records.
- [x] Keep newsletter signup user-initiated so it does not cover the homepage on first visit.
- [ ] Revisit page-level styles outside the homepage and shared navigation for a consistent rollout.
- [x] Repair the lint command/configuration; add Vitest, Playwright, unit tests, and focused smoke tests.

## Phase 2 — Learning Foundation

- [ ] Verify deployed Supabase schema, RLS, constraints, and backups with an authorized project owner.
- [x] Record the unavailable production-access gate in `07-supabase-readiness.md`; no migrations or production learning writes applied.
- [x] Draft typed learning contracts and proposed schema/API contracts in `08-learning-engine-design.md`.
- [ ] Agree on path/module/lesson/outcome/enrollment/progress contracts and migrations.
- [ ] Implement deterministic enrollment and progress with separate completion, consistency, and proficiency signals.
- [x] Add observable Day 1 outcomes, prerequisites, and deterministic feedback/completion logic with separate signals.

## Phase 3 — AI From Zero MVP

- [ ] Author the curated nine-day curriculum with objectives, examples, exercises, submissions, feedback, reflection, and optional sharing.
- [x] Deliver curated Day 1 reading, example, three-scenario exercise, criteria feedback, reflection, and session-only preview completion.
- [x] Connect path discovery, lesson preview, and dashboard; preserve preview state through client navigation, clear on reload/account change.
- [ ] Implement authenticated enrollment, resume state, private attempts, and completion logic.
- [x] Add a focused learning preview panel while preserving existing dashboard activity/calendar functionality.
- [ ] Build a focused learner dashboard and upcoming-review view.
- [ ] Add tests for progress rules, authorization, privacy, and recovery/resume behavior.
- [x] Test deterministic completion/feedback and preview privacy/navigation/reset behavior; production authorization remains untested until access is verified.

## Phase 4 — Porch Evolution

- [ ] Verify and harden server-side authentication/ownership for Porch and comment mutations.
- [ ] Remove email from main Porch page props and comment API responses; add display-name/profile preferences without breaking ownership controls.
- [ ] Add project sharing, constructive feedback, reporting, and moderation foundations.
- [ ] Add privacy-safe community tests and preserve existing records.

## Phase 5 — LearningWar Integration

- [ ] Evaluate reusable challenge capabilities after the Slavo MVP is validated.
- [ ] Document an API/data contract and security review before any integration.

## Phase 6 — Monetization

- [ ] Validate premium learning paths and cohort needs before extending current Stripe flows.

## Verified Sprint Results — 2026-11-14

- `yarn test`: 15 unit tests passed.
- `yarn test:smoke`: 13 checks passed (10 public routes, catalog read-only gate, Day 1 workflow/privacy/reset, and mobile/desktop layout).
- `yarn typecheck`, `yarn lint`, and `yarn build`: passed; build generated 182 static pages. Full lint reports 0 errors and 98 legacy warnings, not new learning errors.
- Known warnings remain: legacy TypeScript parser version support, `swcMinify`, Browserslist freshness, large blog/category payloads, and existing package peers.
- Production schema/RLS/index/constraint/backup verification, authenticated enrollment, durable private saving, real review scheduling, and cross-session resume are blocked, not simulated.
- Next task: obtain authorized schema-only/RLS/backup evidence, test owner isolation in staging, then approve additive learning migrations and user-scoped persistence.
