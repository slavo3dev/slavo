# Current-State Audit

## Architecture

- The application is a Next.js Pages Router site. `pages/` contains public, account, commerce, content, and Porch routes; `pages/api/` contains API handlers.
- The app is primarily TypeScript/TSX with JavaScript configuration files. TypeScript is strict, `allowJs` is enabled, and aliases are defined in `tsconfig.json`.
- Dependencies declare Next.js `^16.1.6`, React `^19.2.4`, TypeScript `^5.8.2`, Tailwind CSS 3, and CSS Modules. The repository has a Yarn lockfile.
- Shared setup in `pages/_app.tsx` provides layout, navigation, footer, Supabase session state, user/video contexts, category loading, route loading, Google Analytics, and Vercel Speed Insights.
- State is React local state and context; no external global state library was found.

## Routes and Existing Features

- Public routes include About, Contact, Programs, Free Resources, Videos, Blog, Categories, and Porch. Account routes include Login, Dashboard, Subscription, Mentor, and password flows.
- API routes cover Porch/comments, notifications, sources, user activity, AI answers, contact/newsletter, Stripe checkout/webhooks/subscriptions, products, and cron work.
- Existing learning-related features include curated/shared resources, video lists, articles, Stripe-backed programs, mentorship-oriented pages, and daily Porch updates/comments/likes.
- The homepage statically obtains featured posts and revalidates every 60 seconds. Porch previews and lists fetch Supabase data at runtime.

## Data, Identity, and Integrations

- Supabase is the database and authentication provider. The browser client uses `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_KEY`; a separate server admin client reads `SUPABASE_SERVICE_ROLE_KEY`.
- Code references tables including `profile`, `porch`, `porch-comments`, `comments`, `sources`, `notifications`, and `user_activity`. Profile code visibly uses `id` and `is_subscribed`; other column contracts are inferred from queries, not a checked-in schema.
- Workspace search found no SQL or Prisma migrations. Deployed schema, constraints, indexes, backups, RLS policies, and production data shape are **unknown** and must be verified in Supabase before database changes.
- Stripe, OpenAI, Mailchimp, Resend, Google Analytics, Vercel Speed Insights, `next-pwa`, and `next-sitemap` are present in source/configuration. A `.vercel` directory exists; production settings were not independently verified.
- Environment variable names are referenced in code, but values were not inspected.

## Security and Privacy Findings

- Porch rows contain an email field. The homepage showcase and update-detail route now request projections that omit email; the daily-update and comment author UI use generic labels. The main `/porch` page still selects all columns into client props for existing email-based ownership/filtering, and the comments read handler selects all columns. Their responses may contain email; deployed RLS is **unknown**.
- `pages/api/createDailyUpdate.ts` accepts non-PATCH methods as inserts and writes the request body without visible schema or user-identity validation. Its PATCH path also accepts caller-supplied fields. RLS enforcement is **unknown**.
- `pages/api/updateUserActivity.ts` accepts an email in the request body and updates by that email without visible session verification. Porch comment update/delete handlers similarly identify records by supplied IDs without visible server-side ownership checks. Effective database protection is **unknown**.
- The admin Supabase client uses a service-role key. It is read from a server environment variable and must remain server-only; no value was inspected.
- React renders user strings as text in the audited Porch components; comment code also imports DOMPurify. A complete user-content and API security review remains outstanding.

## Technical Debt, Accessibility, and Performance

- `package.json` has no test script. `yarn lint` invokes `next lint`, incompatible with the installed Next.js 16 CLI. Direct ESLint is blocked by an invalid `linebreak-style` rule in `.eslintrc.json` that specifies both `unix` and `windows`.
- `yarn build` succeeds and generated 180 static pages during audit. It reports deprecated `swcMinify`, stale Browserslist data, and approximately 2.78 MB page data for `/blog` and `/category/[...category]`.
- Existing global CSS applies broad section rules and legacy visual styles; `.hidden { display: none !important }` overrode responsive Tailwind display utilities during homepage work.
- Some Porch components use broad `any` fields and client-side direct Supabase mutations. Keyboard, contrast, screen-reader, and Core Web Vitals coverage has not been measured systematically.
- Newsletter signup previously auto-opened for first-time visitors and blocked the page; it is now user-initiated through the existing Subscribe Now button.

## Preserve, Refactor, and Missing

- Preserve existing URLs, Supabase authentication, Stripe products/subscriptions, learning-resource records, blog content, and Porch records.
- Refactor public identity to use display names, improve Porch authorization only after RLS/session contracts are verified, and align shared navigation and marketing surfaces with the learning brand.
- No learning-path, module, lesson, enrollment, exercise-attempt, review-schedule, skill-mastery, challenge, or project-submission model was found. Profile learning goals/skill-level/privacy-preference fields are **unknown**.
- No checked-in test suite or automated route smoke tests were found through package scripts.

## Recommended Order

1. Complete the public rebrand while retaining existing routes and source data.
2. Verify Supabase schema/RLS and define identity/privacy boundaries before Porch or learning mutations change.
3. Design learning-path and progress contracts, separating completion, consistency, and demonstrated proficiency.
4. Build the curated AI From Zero challenge and deterministic progress flow, then add focused tests.
5. Evolve Porch and evaluate LearningWar integration only after the Slavo MVP is validated.
