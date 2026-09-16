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
- [ ] Fix the pre-existing lint command/configuration; add a test script and focused smoke tests.

## Phase 2 — Learning Foundation

- [ ] Verify deployed Supabase schema, RLS, constraints, and backups with an authorized project owner.
- [ ] Agree on path/module/lesson/outcome/enrollment/progress contracts and migrations.
- [ ] Implement deterministic enrollment and progress with separate completion, consistency, and proficiency signals.
- [ ] Add observable outcomes, prerequisites, and content authoring conventions.

## Phase 3 — AI From Zero MVP

- [ ] Author the curated nine-day curriculum with objectives, examples, exercises, submissions, feedback, reflection, and optional sharing.
- [ ] Implement authenticated enrollment, resume state, private attempts, and completion logic.
- [ ] Build a focused learner dashboard and upcoming-review view.
- [ ] Add tests for progress rules, authorization, privacy, and recovery/resume behavior.

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
