# Mentorship & Consulting

## Learning How to Code:

## Tech Stack:

- NextJS
- Supabase
- Vercal Deployment

## Learning Preview

Visit `/learn` for AI From Zero Day 1. Enrollment and durable private saving are disabled until Supabase schema/RLS and recovery readiness are verified. Preview answers and reflection stay only in memory and reset on reload or account change. Existing auth, Stripe, Porch, and dashboard activity remain in place.

## Local Checks

```sh
yarn
yarn typecheck
yarn lint
yarn test
yarn build
yarn playwright install chromium
yarn test:smoke
```

Smoke tests start a temporary production server on port 3100 and require a current build. Keep that port free. `yarn dev` runs the interactive development site; only one Next development process may hold this workspace's lock. Configure required environment variables locally; never commit or print their values.

See `docs/slavo-2.0/07-supabase-readiness.md` and `08-learning-engine-design.md` for the production-persistence gate and unapplied schema/API design.
