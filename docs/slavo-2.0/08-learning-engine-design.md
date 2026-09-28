# Learning Engine: Draft Schema and API

Status: **design only, unapplied**. See `07-supabase-readiness.md` before approving persistence. Runtime TypeScript contracts are in `lib/learning/contracts.ts`; the curated Day 1 material and deterministic answer-key feedback are in `lib/learning/day-one.ts` and `engine.ts`.

## Proposed Tables

Use UUID primary keys for relational records and versioned stable content slugs for curriculum. Exact naming must be reconciled with a deployed schema export before migrations.

| Table | Proposed fields and constraints | Proposed indexes |
| --- | --- | --- |
| learning_paths | id, slug unique, title, description, content_version, availability enum | unique slug |
| learning_modules | id, path_id FK, position, title; unique(path_id, position) | path_id |
| lessons | id, module_id FK, slug, position, estimated_minutes > 0, prerequisites, curated content; unique(module_id, position) | module_id, unique slug/version |
| learning_outcomes | id, lesson_id FK, description, success_criterion | lesson_id |
| enrollments | id, user_id FK to auth.users, path_id FK, version, status, enrolled_at; unique(user_id, path_id, version) | user_id/status |
| lesson_progress | enrollment_id FK, lesson_id FK, status, last_activity_at, completed_at; composite primary key | enrollment_id/status |
| exercises | id, lesson_id FK, target_skill, instruction, versioned criteria | lesson_id |
| exercise_attempts | id, enrollment_id FK, exercise_id FK, answers JSONB, submitted_at, idempotency_key; private; unique(enrollment_id, idempotency_key) | enrollment_id/exercise_id/submitted_at |
| feedback | id, attempt_id FK unique, criteria_results JSONB, rubric_version; no automatic mastery flag | attempt_id |
| lesson_reflections | enrollment_id FK, lesson_id FK, private reflection text (20–1,000 chars) | unique enrollment_id/lesson_id |
| review_schedules | id, enrollment_id FK, outcome_id FK, due_at, reviewed_at | enrollment_id/due_at |

Completion, active learning dates (consistency), and evaluated skill evidence (proficiency) are distinct. Completed lessons and streaks must never create a mastery claim. Reflection and attempts are private; sharing requires a separate, explicit publication record. Snapshot curriculum/rubric versions so historical feedback remains interpretable.

## Proposed Authorization

- Public catalog reads expose only published curriculum; availability must reflect implemented content.
- All learner records use verified auth UUIDs, never caller-supplied email as ownership.
- Derive mutation user identity server-side with Supabase token/session verification, then use a user-scoped client. Never use a service-role write as a substitute for authorization.
- RLS must require enrollment ownership on progress, attempts, feedback, reflections, and review rows, including INSERT/UPDATE WITH CHECK. Test another user's read/write denial and anonymous denial in staging.
- Add length/enum validation, rate limits, idempotency, consistent error statuses, and a transaction for attempt + feedback + progress. Only the server evaluates trusted criteria and completion.
- Plan reversible migrations and additive rollout; no destructive changes to Porch/profile rows. Record backup and staging rollback evidence first.

## API Contracts

Implemented now: `GET /api/learning/catalog` serves the curated public preview and `persistence.available=false`. Other methods return 405. It accepts no submissions and performs no database calls.

Future endpoints (not implemented):

- `POST /api/learning/enrollments`: `EnrollRequest` → `Enrollment`; 401 anonymous, 403 unavailable path, 422 invalid input, 503 persistence unavailable.
- `GET /api/learning/me`: owned enrollments/progress/reviews only.
- `POST /api/learning/attempts`: `SubmitAttemptRequest` → private `ExerciseAttempt` plus server-computed `Feedback`; validate scenario keys/enums and idempotency.
- `POST /api/learning/completion`: `CompleteLessonRequest` → `LessonProgress`; verify owned attempt, current content version, criteria, reading completion, and reflection limits in one transaction.

No user ID is accepted in mutation DTOs. No production enrollment endpoint exists in this sprint. The session preview maintains private drafts only in React memory, survives client navigation, resets on reload/identity change, and is not a durable enrollment or resume implementation.