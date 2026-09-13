# Slavo.io 2.0 Implementation Backlog

## Phase 0: Reconnaissance

- [x] Identify the homepage entry point, its static data source, metadata, and reusable sections.
- [x] Map the shared app shell and note auth, route, Porch, and content preservation constraints.
- [x] Record repository scripts and validation limits.

## Phase 1: Learning-Brand Homepage

- [x] Establish Slavo.io as a practical, build-first web-development learning brand.
- [x] Make homepage messaging consistent across the hero, audience, and learning-process sections.
- [x] Keep existing route links, featured-post data, and public Porch preview working.
- [x] Verify the production build and desktop/mobile first-view layout.
- [ ] Repair the existing lint configuration and rerun lint; the repository has no dedicated test script.

## Phase 2: Brand System and Shared Navigation

- [ ] Align the shared navigation, footer, metadata defaults, and page titles with the learning brand.
- [ ] Define reusable color, typography, spacing, and interaction tokens without changing auth behavior.
- [ ] Audit page-level copy and visual consistency across programs, resources, blog, and Porch.
- [ ] Review the shared newsletter popup timing and first-visit mobile presentation.
- [ ] Confirm whether public Porch cards should expose member email addresses; preserve current data behavior until the policy is decided.

## Phase 3: Learning Journey and Conversion

- [ ] Clarify the learner journey from free resources to mentorship, including eligibility and outcomes.
- [ ] Review program details and calls to action against current Stripe/product configuration.
- [ ] Add evidence-backed learner stories or outcomes only when approved source material exists.
- [ ] Review homepage accessibility, responsive behavior, SEO metadata, and analytics events.

## Phase 4: Quality and Launch

- [ ] Add focused automated coverage for critical public routes and auth/Porch regressions.
- [ ] Run production build and route smoke checks with deployment environment variables configured.
- [ ] Review production assets, social preview image, sitemap, and redirects before launch.
