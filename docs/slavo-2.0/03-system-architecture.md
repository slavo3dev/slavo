# System Architecture

## Current Boundary

Keep the current Next.js Pages Router application as a modular monolith. `pages/` owns route composition; `pages/api/` owns server endpoints; Supabase remains identity and persistence; existing Stripe and content integrations remain in place. Shared contexts and components continue to own current authentication and navigation behavior.

No framework, database, deployment, or authentication replacement is proposed. No migration is proposed until the deployed Supabase schema and RLS policies have been inspected.

## Domain Boundaries

- **Identity:** Supabase user identity and profile/preferences. Keep auth provider concerns separate from learning records.
- **Learning:** versioned paths, modules, lessons, outcomes, prerequisite references, and curated resources.
- **Practice:** exercises, attempts, criteria, feedback, and improvement attempts.
- **Retention:** review items and due dates, distinct from lesson completion.
- **Challenges:** time-bounded programs and enrollment; first implementation is AI From Zero.
- **Projects:** project briefs, milestones, private deliverables, and explicit portfolio publication.
- **Community:** Porch posts, comments, reactions, groups, reports, and moderation; public profile fields must not include email by default.
- **Monetization:** current Stripe products/subscriptions remain separate from learning completion state.

These are logical boundaries, not a requirement for separate services or schemas. Keep LearningWar integration behind a future documented API contract; add no cross-project dependency before review.

## Learning Foundation Sprint

- `lib/learning/contracts.ts` defines typed domain and mutation DTO contracts; `day-one.ts` is the curated content source; `engine.ts` implements pure feedback and preview completion rules.
- `LearningPreviewProvider` holds transient answers, attempts, reflection, and preview completion in React memory. It is keyed to the existing Supabase user UUID (or guest scope) so identity changes reset preview state. No localStorage, cookie, API, or database submission is used for learning work.
- `/learn` and the Day 1 route expose the preview; the existing dashboard gains a preview panel without replacing its activity/calendar features.
- `GET /api/learning/catalog` is public and read-only; all other methods return 405. It explicitly reports persistence unavailable.
- Proposed table keys, indexes, ownership constraints, and future API errors are documented in `08-learning-engine-design.md`. Deployed readiness remains blocked in `07-supabase-readiness.md`.

## Proposed Learning Records (Not Deployed)

Use existing naming conventions after schema inspection. Candidate records: `learning_paths`, `modules`, `lessons`, `enrollments`, `exercises`, `exercise_attempts`, `feedback`, `review_schedules`, `challenges`, `challenge_enrollments`, `projects`, and project milestones. Avoid duplicate user identity tables; reference the existing Supabase auth/profile identity.

Store lesson completion separately from practice attempts and proficiency evidence. Enrollment/progress must be scoped to the authenticated user. Define unique keys, foreign keys, query indexes, retention, and reversible migrations after production schema review.

## API and Security Boundaries

- Validate request shape and length at API boundaries; derive user identity from a verified Supabase session, not a client-provided email or user ID.
- Enforce ownership and role checks in server code and Supabase RLS. Current RLS policies are unknown and must be verified before trusting direct client operations.
- Keep `SUPABASE_SERVICE_ROLE_KEY`, Stripe, OpenAI, Mailchimp, and Resend secrets in server-only configuration.
- Define an AI provider interface only when the curated learning workflow requires AI; deterministic curriculum and progress ship first.
- Public community reads return display-safe fields. Private submissions and contact data remain private unless a user explicitly publishes them.
