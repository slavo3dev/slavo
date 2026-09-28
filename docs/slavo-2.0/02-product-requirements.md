# Product Requirements

## Product

**Slavo.io** is a founder-led learning and builder community for AI, technology, and practical skills. Its mission is to help people learn in small steps, practice deliberately, build real projects, and share progress. Brand line: **Learn. Practice. Build. Grow.**

LearningWar remains a separate challenge/gamification product; AriClear remains a separate commercial AI SaaS; Prototype.NEXT remains the parent consulting and engineering business. Do not merge their applications or add cross-project dependencies in this release.

## Principles

- Learning is demonstrated through practice, feedback, application, and reflection, not lesson views or streaks alone.
- A completed lesson is progress, not evidence of mastery.
- Curated content and deterministic progress come before generated curriculum or AI coaching.
- Publish no invented testimonials, learner counts, outcomes, or activity.
- Preserve existing production routes and data; verify database policies before changing writes.

## Initial Audience and Outcomes

- Beginners starting with AI and technology.
- Self-directed learners and career changers who need a clear next step and consistent practice.
- Builders who want to apply learning to practical projects and share progress.

Users should be able to discover a learning path, understand expected outcomes and time commitment, complete focused practice, retain a learning record, and optionally share progress.

## First Release Scope

- Phase 1: learning-brand homepage, blue/white design system, navigation entry to learning paths, and truthful path availability states.
- Phase 2: learning-path, module, lesson, enrollment, and progress foundations.
- Phase 3: curated nine-day AI From Zero challenge, exercise submission/feedback/reflection, and a focused learner dashboard.
- Phase 4: Porch privacy, public learning updates, project sharing, feedback, and moderation foundations.

AI From Zero now has a curated Day 1 session-only preview. The full nine-day challenge, authenticated enrollment, durable saving, and cross-session resume are not available. The homepage and catalog must distinguish this preview from a live enrolled challenge. Coding & Technology, AI Automation & Agents, and Build & Launch remain upcoming.

## Functional Expectations

- Hero primary action: **Start Learning Free**. Secondary action: **Explore Learning Paths**.
- Homepage explains Discover → Plan → Learn → Practice → Build → Share → Review.
- A path has observable outcomes, prerequisite/context, and clear availability.
- Learner progress, consistency, and proficiency are separate concepts.
- Daily practice guidance is approximately 20–30 minutes and adjustable, not a required timer.
- Authenticated users can resume progress once enrollment persistence exists.
- Community sharing is optional; private exercise submissions are not public by default.

## Non-Functional Requirements

- Responsive and keyboard accessible; use semantic landmarks, clear focus indicators, readable contrast, and reduced-motion support.
- Keep current Pages Router, Supabase, Stripe, and Vercel infrastructure unless an audit justifies change.
- Keep private keys server-side, validate inputs, enforce user-specific authorization on the server/database, and avoid email as public identity.
- Preserve public URLs and metadata; introduce redirects only with an inventory and explicit rationale.
