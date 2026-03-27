# Architecture & Trade-offs

## What this portfolio optimizes for
- **Recruiter readability first**: the repo favors clear case-study delivery over generic portfolio animations or novelty.
- **Small-system maintainability**: feature/page/shared boundaries keep content, UI, and route concerns separated without introducing unnecessary framework layers.
- **Evidence-based frontend craft**: metadata, tests, responsive behavior, and performance checks are treated as part of the product, not polish.

## Chosen stack
- **Next.js App Router** for route-level metadata, localized pages, static generation, and built-in SEO surfaces.
- **React 19** for server/client composition and view-transition-driven interactions.
- **TypeScript + Zod** for keeping recruiter-visible content and operational inputs explicit.
- **Tailwind CSS** for fast iteration on a consistent visual system.
- **next-intl** for bilingual delivery without duplicating whole page implementations.
- **Vitest + Playwright** for fast content/data regression checks plus recruiter-critical route smoke coverage.

## Why this shape
### 1. Feature/page/shared boundaries instead of a larger app framework
This codebase is content-heavy and interaction-light compared with a SaaS product. The current structure keeps route composition simple while still separating page-level composition, feature logic, and shared UI/constants.

### 2. Project data in shared constants
Project stories drive multiple surfaces: homepage, project list, detail pages, README, metadata, and tests. Centralizing those facts reduces trust-breaking drift in roles, dates, and outcomes.

### 3. Route-native metadata instead of afterthought SEO
Metadata is defined at the route level so each page can emit its own canonical URL, locale alternates, and share copy. This makes the portfolio easier to search, preview, and review in hiring workflows.

## Trade-offs accepted
- **Static constants over CMS**: simpler and safer for a personal portfolio, but updates require code changes.
- **In-memory contact throttling**: low-cost spam protection suitable for a portfolio, but not durable across distributed serverless instances.
- **Playwright smoke over full browser matrix in CI**: keeps CI fast while still covering the recruiter-critical paths. Wider browser confidence is preserved for local/manual runs.
- **Generated OG images over custom design assets**: faster to maintain and always aligned with current titles, but visually less bespoke than hand-crafted social cards.

## Alternatives considered
- **Headless CMS**: rejected for now because it increases operational overhead without improving hiring signal enough for this repo.
- **More abstract data model for projects**: rejected because the current domain is small; a thin canonical source is enough.
- **External anti-spam service**: rejected because it adds keys, vendor setup, and maintenance for a low-volume form.

## Consequences
- Updating portfolio stories is straightforward, but still requires discipline around canonical project facts.
- The repo now has stronger trust signals for interviews: documented trade-offs, smoke-tested routes, and metadata/CI coverage.
- Future scaling pressure will most likely appear in the contact flow and project content editing path, not in the rendering layer.

## Follow-ups
- Add durable rate limiting or bot protection if unsolicited submissions grow.
- Expand project-level metrics only when numbers are interview-defensible.
- Consider localized project data if English copy needs to diverge meaningfully from Korean.
