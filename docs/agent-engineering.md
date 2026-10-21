# Agent Engineering

## Why I use agents in engineering work

I use agents to compress the distance between a fuzzy request and a verified implementation, not to skip engineering judgment.

The value comes from shaping work so it can survive:

- a bounded brief
- an explicit execution surface
- a repeatable verification loop
- inspectable proof artifacts

If a task cannot be rerun by another engineer with the same repo context and reach the same result, I do not treat it as reliable agent-assisted work.

## Which agent I use

I have switched my monthly subscription to whichever model did the work best at the time. I used Claude Code at work from its early versions, moved to Codex after GPT-5.3, and now mainly use Opus 5.5 with Claude Code. Each time I switched tools I reviewed the existing skills and settings and deleted rules that were no longer needed.

The workflow below does not depend on the tool: whichever agent runs the task gets the same brief, repo instructions (`AGENTS.md`), and verification commands.

## How I make agent work engineerable

Every agent task should be able to inherit the same contract:

Package-manager convention for this repo: use `pnpm` in briefs, harness commands, and verification steps.

### Workflow template

1. **Task brief**
   - Goal
   - Changed surfaces
   - Hard constraints
   - Success criteria
2. **Execution surface**
   - Relevant repo instructions (`AGENTS.md`)
   - Prompt or task framing
   - Exact files or subsystems in scope
   - Allowed tools and expected output shape
3. **Verification checklist**
   - What command proves the implementation works
   - What UI or route behavior must be visible
   - What docs or metadata must stay aligned
4. **Failure / redo rule**
   - If source, docs, and tests disagree, the task is not done
   - If verification fails, rerun the loop instead of reporting a plausible summary

## Proof inside this repo

The public proof is intentionally spread across UI, source, tests, and markdown:

- `/tech-stack` contains the AI-agent engineering section and the engineerable harness sequence.
- `src/shared/constant/agent-engineering.ts` is the canonical source for agent claims, harness steps, and proof links.
- The `react-devtool-cli` case study (`/project/react-devtool-cli`, content in `Ring-wdr/portfolio-content`) covers a CLI built for agents and developers to inspect React apps.
- `src/pages-layer/tech-stack/tech-stack-page.test.tsx` and `tests/tech-stack.spec.ts` verify that the public proof section renders and keeps its evidence links.

## Repo-specific checks

For this portfolio, the main verification path is:

```bash
pnpm lint
pnpm test -- --run
pnpm build
```

That is the bar for calling an agent-assisted change complete here.
