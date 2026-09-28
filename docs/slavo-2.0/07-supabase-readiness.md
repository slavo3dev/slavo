# Supabase Readiness Gate

Reviewed 2026-11-14. **Production persistence is blocked.** No authorized Supabase management tool, installed CLI, or linked Supabase project configuration is available in this workspace. Existing application credentials are not evidence of permission to inspect the database or its policies. No secrets or private rows were read; no migrations or writes were performed.

| Area | Verified from repository | Deployed state |
| --- | --- | --- |
| Profiles | `profile` is queried by auth ID for subscription state | Columns, constraints, RLS, indexes unknown |
| Porch | Email-based ownership/filtering and direct mutations exist | Constraints, anonymous visibility, owner policies unknown |
| Comments | API handlers accept supplied identities/IDs | Ownership policies and public projection unknown |
| User activity | Mutations filter by supplied email | Ownership enforcement and unique constraints unknown |
| Learning tables | No existing models/migrations found | Existence unknown |
| Recovery | No backup/restore evidence in repository | Backup freshness and rollback rehearsal unknown |

Before approving migrations, an authorized owner must provide a schema-only export and policy/index/constraint inventory for these tables, confirm RLS enabled/forced status and grants, test cross-user denial with disposable non-production identities, and document a backup timestamp and tested restore/rollback procedure. Do not inspect private production rows as a shortcut.

The sprint exposes a session-only lesson preview. Answers and reflection are kept only in React memory, not localStorage, cookies, API requests, or the database. Reloading or changing identity clears them. Enrollment, durable attempts, review scheduling, and cross-session resume remain disabled.