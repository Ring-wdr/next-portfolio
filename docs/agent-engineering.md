# Agent Engineering

## Why I use agents in engineering work

I use agents to compress the distance between a fuzzy request and a verified implementation, not to skip engineering judgment.

The value comes from shaping work so it can survive:

- a bounded brief
- an explicit execution surface
- a repeatable verification loop
- inspectable proof artifacts

If a task cannot be rerun by another engineer with the same repo context and reach the same result, I do not treat it as reliable agent-assisted work.

## When I choose Codex vs Claude Code

### Codex

- Use when I need grounded repository work inside the real project.
- Best fit for source edits, shell-driven inspection, tests, and verification loops.
- I treat it as the primary execution surface for implementation-heavy tasks.

### Claude Code

- Use when I want an alternate reasoning pass on problem framing, prompt shape, or task decomposition.
- Best fit for comparing approaches, tightening a brief, or pressure-testing assumptions around execution.
- I treat it as a complementary lane, not a replacement for repo-grounded verification.

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
- `src/shared/constant/project-detail.tsx` includes the `react-devtool-cli` case study, which is the strongest project-level proof of deterministic agent-facing contracts.
- `src/pages-layer/tech-stack/tech-stack-page.test.tsx` and `tests/tech-stack.spec.ts` verify that the public proof section renders and keeps its evidence links.
- `tests/about.spec.ts` verifies that the About narrative also reflects current agent-orchestration focus.

## Repo-specific checks

For this portfolio, the main verification path is:

```bash
pnpm lint
pnpm test -- --run
pnpm build
```

That is the bar for calling an agent-assisted change complete here.
