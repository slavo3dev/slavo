# Slavo.io 2.0: Phase 0 Findings

## Scope

Repository reconnaissance for the Slavo.io learning-brand refresh. Phase 1 is limited to the public homepage; route handlers, authentication, payment flows, Porch data, and existing content sources remain in place.

## Current Homepage

- `pages/index.tsx` is the Pages Router homepage. It loads featured posts with `getFeaturedPosts()` in `getStaticProps` and revalidates every 60 seconds.
- The page sets homepage metadata and JSON-LD, then composes the exported components `Hero`, `SeoTextBlock`, `WhoItsFor`, `ProgramsOverview`, `PorchShowcase`, `FreeResourcesTeaser`, `FeaturedPosts`, `Solution`, and `Growth`.
- The hero is in `components/Hero/index.tsx`. It links to `/programs`, `/free-resources`, and `/porch`, and its “How it works” link targets `#how-we-work`.
- The app shell in `pages/_app.tsx` owns the shared navigation, footer, Supabase session listener, user/video contexts, category loading, route loader, and analytics. It is not part of the homepage redesign.
- Homepage section components are exported through `components/index.ts` and the `@components` alias. `PorchShowcase` reads recent public updates from Supabase; `FeaturedPosts` receives the statically generated post data.

## Reusable Components

- `Hero`: homepage lead section and calls to action; its current use is only on `/`.
- `WhoItsFor`, `ProgramsOverview`, `FreeResourcesTeaser`: homepage marketing sections with internal links to existing routes.
- `Solution`: homepage process section; its `how-we-work` anchor is referenced by the hero.
- `PorchShowcase`: reusable live Porch preview; keep its query and update/profile links unchanged.
- `FeaturedPosts`: reusable featured-post list and category filtering.
- `SeoTextBlock`: internal links and web-development search copy.
- `HeadBasePage`: canonical and social metadata helper.

## Preservation Constraints

- Keep the Pages Router paths and API handlers intact, including `/login`, `/auth/*`, `/porch`, `/porch/[id]`, `/programs`, `/free-resources`, and `/blog`.
- Keep Supabase auth/session initialization in `_app.tsx` and preserve existing content/data adapters.
- Keep Porch data reads and post generation behavior unchanged during the brand pass.
- `PorchShowcase` currently falls back to rendering a member email as the display name in public cards; confirm the intended privacy/display policy before broadening that surface.
- An initial status check showed a local `.gitignore` modification; a later status check no longer showed it. No task edits were made to `.gitignore`.

## Validation Surface

- `package.json` provides `yarn lint` and `yarn build`; there is no dedicated test script.
- The configured `yarn lint` command invokes `next lint`, which is incompatible with the installed Next.js 16 CLI. Direct ESLint is also blocked by the existing invalid `linebreak-style` rule in `.eslintrc.json` (`unix` and `windows` are both configured).
- The production build completes successfully. Existing warnings include deprecated `swcMinify`, stale Browserslist data, and 2.78 MB generated data for `/blog` and `/category/[...category]`.
- Browser review confirmed the homepage renders without horizontal overflow at 390px and 1440px widths. The shared newsletter popup can cover the first viewport during local first-visit testing; its trigger/timing is tracked for follow-up rather than changed in Phase 1.
