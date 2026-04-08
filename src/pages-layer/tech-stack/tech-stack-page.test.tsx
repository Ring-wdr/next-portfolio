import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import {
  agentEngineeringDocUrl,
  agentEngineeringProjectHref,
} from "@/shared/constant/agent-engineering";

import { TechStackPage } from "./index";

const {
  getMockResolvedTheme,
  setMockResolvedTheme,
  shouldResolveHighlighterImmediately,
  setShouldResolveHighlighterImmediately,
  getShikiMagicMoveMountCount,
  resetShikiMagicMoveMountCount,
  incrementShikiMagicMoveMountCount,
} = vi.hoisted(() => {
  let resolvedTheme = "dark";
  let resolveHighlighterImmediately = false;
  let shikiMagicMoveMountCount = 0;

  return {
    getMockResolvedTheme: () => resolvedTheme,
    setMockResolvedTheme: (theme: "dark" | "light") => {
      resolvedTheme = theme;
    },
    shouldResolveHighlighterImmediately: () => resolveHighlighterImmediately,
    setShouldResolveHighlighterImmediately: (value: boolean) => {
      resolveHighlighterImmediately = value;
    },
    getShikiMagicMoveMountCount: () => shikiMagicMoveMountCount,
    resetShikiMagicMoveMountCount: () => {
      shikiMagicMoveMountCount = 0;
    },
    incrementShikiMagicMoveMountCount: () => {
      shikiMagicMoveMountCount += 1;
    },
  };
});

const translations = {
  title: "Tech Stack",
  description: "Technologies and tools I use",
  stats: {
    totalTech: "Total technologies",
    categories: "Categories",
    primaryTrack: "Primary track",
  },
  categoryDescriptions: {
    languages:
      "Core programming languages used in product delivery and frontend systems.",
    frameworksLibraries:
      "Framework and state patterns for scalable interfaces.",
    database:
      "Data layer technologies used for product persistence and analytics.",
    styling: "Design-system and styling approaches for maintainable UI.",
    testing: "Quality and confidence tooling for stable releases.",
    tools:
      "Execution environment, collaboration tooling, and AI-agent surfaces used daily.",
    backend: "Server and platform technologies used in full-stack delivery.",
  },
  showcase: {
    eyebrow: "Proof of growth",
    title: "From newbie code to expert systems",
    description:
      "Selected stacks where I can show how my implementation changes when the bar moves from “it works” to “it scales.”",
    selectLabel: "Choose a stack",
    before: "Before · Newbie",
    after: "After · Expert",
    whatChanged: "What changed",
    narrativeLabel: "Explanation-only walkthrough",
    loading: "Preparing code walkthrough…",
    items: {
      react: {
        summary:
          "Turn local UI logic into resilient mutation-driven product flows.",
        improvement:
          "Moves from ad-hoc loading state to an async boundary with explicit success handling and a reusable mutation flow.",
      },
      nextjs: {
        summary:
          "Keep the route server-first and isolate only the interaction that truly needs the client.",
        improvement:
          "Moves from a client-heavy page shell to a narrow interactive boundary that fits App Router delivery.",
      },
      typescript: {
        summary:
          "Use type systems to shape maintainable content and UI contracts.",
        improvement:
          "Moves from loose objects to explicit domain modeling with optional showcase metadata.",
      },
      playwright: {
        summary:
          "Verify user-visible behavior instead of stopping at navigation.",
        improvement:
          "Moves from a smoke visit to an assertion-driven confidence check for real route output.",
      },
      supabase: {
        summary: "Query data in a product-shaped way, not as raw table dumps.",
        improvement:
          "Moves from broad reads to constrained filters that match real user decision flows.",
        detail:
          "For Supabase, a tiny before/after toy snippet hides the real skill signal. The stronger proof is how I shape filtering, data access, and product intent so the query layer matches real user decisions.",
      },
    },
  },
  agentEngineering: {
    eyebrow: "AI agent engineering",
    title: "I use agents like working surfaces, not magic shortcuts.",
    description:
      "The strongest signal is not that I can prompt Codex or Claude Code. It is that I can shape bounded tasks, explicit contracts, verification loops, and proof artifacts so the work is engineerable by both humans and agents.",
    labels: {
      claim: "Claim",
      workflow: "Workflow",
      codex: "Codex",
      claude: "Claude Code",
      contract: "Input contract",
      verification: "Verification",
      proof: "Proof links",
    },
    artifacts: {
      doc: "Agent engineering doc",
      project: "react-devtool-cli case study",
    },
    items: {
      taskDecomposition: {
        title: "Task decomposition & spec writing",
        claim:
          "I turn vague requests into implementation-ready work packets with clear scope, constraints, and success criteria.",
        workflow:
          "I start from repository truth, then break the job into bounded tasks, interfaces, and acceptance checks that can survive handoff.",
        codexRole:
          "Codex is my primary implementation surface when the repo needs grounded edits, test runs, and iterative verification.",
        claudeRole:
          "Claude Code is useful when I want a second execution lens on spec shape, prompt clarity, or task framing before or alongside coding.",
        contract:
          "Every task gets a brief with the goal, hard constraints, changed surfaces, expected artifact, and the exact proof needed to call it done.",
        verification:
          "I do not stop at 'the agent answered.' The output must line up with source, docs, and tests.",
      },
      toolFluency: {
        title: "Tool / orchestration fluency",
        claim:
          "I know how to route work across CLI tools, repo instructions, prompts, and browser automation without losing the thread.",
        workflow:
          "I keep the execution surface explicit: AGENTS.md, task-specific prompts, repo paths, and the command surface the agent is allowed to use.",
        codexRole:
          "Codex handles repo-native implementation, shell-driven inspection, and test-backed iteration inside the actual project context.",
        claudeRole:
          "Claude Code complements that with alternate reasoning on prompt shape, decomposition, and high-context review loops when I want contrast.",
        contract:
          "The agent does not get a vibe-based ask. It gets the exact file or subsystem scope, allowed tools, and the expected output format.",
        verification:
          "The orchestration is only good if another engineer can rerun it, inspect the same artifacts, and reach the same conclusion.",
      },
      verificationHarness: {
        title: "Verification & harness design",
        claim:
          "I build verification into the workflow so agent output becomes evidence-backed engineering instead of plausible text.",
        workflow:
          "I close the loop with repo-native checks, page-level assertions, and markdown decision records that explain what the system proves.",
        codexRole:
          "Codex is where I wire the source edits, route metadata, and executable checks into a single working harness.",
        claudeRole:
          "Claude Code is useful as a contrasting reviewer for whether the brief, prompt surface, and observed result still line up.",
        contract:
          "The contract ends with runnable checks and named proof artifacts, not with a narrative summary alone.",
        verification:
          "For this portfolio, the proof is the combination of UI, source data, tests, and markdown documentation all agreeing.",
      },
    },
    harness: {
      eyebrow: "Engineerable harness",
      title: "The workflow I expect an agent task to survive",
      description:
        "If a workflow cannot survive a handoff, a rerun, and a verification pass, I do not consider it production-ready engineering.",
      commandLabel: "Example surface",
      steps: {
        brief: {
          title: "Brief and constraints",
          description:
            "Start with the actual goal, hard boundaries, changed surfaces, and the acceptance criteria that matter.",
        },
        surface: {
          title: "Agent execution surface",
          description:
            "Give the agent the repo contract, task prompt, and relevant paths so it can operate inside a bounded system.",
        },
        verification: {
          title: "Verification loop",
          description:
            "Run the repo-native checks that prove the output works, not just that the patch exists.",
        },
        proof: {
          title: "Proof artifacts",
          description:
            "Leave behind docs, source, and test evidence that another engineer can inspect without re-discovering intent.",
        },
      },
    },
  },
  methodTitle: "How I apply this stack",
  methodDescription:
    "I optimize for predictable delivery: clear architecture, reusable design systems, measurable performance, and collaboration-friendly code.",
  methodTags: {
    architecture: "Architecture-first",
    designSystem: "Design system",
    performance: "Performance budget",
    collaboration: "Team collaboration",
  },
  Languages: "Languages",
  "Frameworks & Libraries": "Frameworks & Libraries",
  Database: "Database",
  Styling: "Styling",
  Testing: "Testing",
  Tools: "Tools",
  Backend: "Backend",
} as const;

function lookup(path: string) {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in acc) {
      return (acc as Record<string, unknown>)[key];
    }

    return undefined;
  }, translations);
}

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => lookup(key) ?? key,
}));

vi.mock("@/i18n/routing", () => ({
  Link: ({
    href,
    children,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("next-themes", () => ({
  useTheme: () => ({ resolvedTheme: getMockResolvedTheme() }),
}));

vi.mock("shiki", () => ({
  createHighlighter: vi.fn(() =>
    shouldResolveHighlighterImmediately()
      ? Promise.resolve({ mock: true })
      : new Promise(() => {}),
  ),
}));

vi.mock("shiki-magic-move/react", async () => {
  const React = await vi.importActual<typeof import("react")>("react");

  return {
    ShikiMagicMove: ({
      code,
      theme,
    }: {
      code: string;
      theme: string;
    }) => {
      React.useEffect(() => {
        incrementShikiMagicMoveMountCount();
      }, []);

      return (
        <pre data-testid="magic-move-code" data-theme={theme}>
          {code}
        </pre>
      );
    },
  };
});

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation(() => ({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  });
});

beforeEach(() => {
  setMockResolvedTheme("dark");
  setShouldResolveHighlighterImmediately(false);
  resetShikiMagicMoveMountCount();
});

describe("TechStackPage", () => {
  it("renders the showcase and keeps non-demo inventory cards visible", async () => {
    render(<TechStackPage />);

    expect(
      screen.getByRole("heading", { name: /Tech Stack/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /From newbie code to expert systems/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByTestId("tech-stack-showcase")).toBeInTheDocument();
    expect(screen.getByText("Figma")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId("magic-move-code")).toBeInTheDocument();
    });
  });

  it("switches a stack from before to after state", async () => {
    render(<TechStackPage />);

    fireEvent.click(screen.getAllByRole("button", { name: "React" })[0]);

    await waitFor(() => {
      expect(screen.getByTestId("magic-move-code")).toHaveTextContent(
        "const [loading, setLoading] = useState(false)",
      );
    });

    fireEvent.click(screen.getByTestId("tech-stack-mode-after"));

    await waitFor(() => {
      expect(screen.getByTestId("magic-move-code")).toHaveTextContent(
        "useActionState",
      );
    });

    expect(screen.getByTestId("tech-stack-showcase")).toHaveTextContent(
      /async boundary with explicit success handling/i,
    );
  });

  it("remounts the magic move block when the theme changes", async () => {
    setShouldResolveHighlighterImmediately(true);
    vi.resetModules();
    const { TechStackShowcasePanel } = await import("./tech-stack-showcase");

    const stacks = [
      {
        name: "React",
        demo: {
          kind: "code" as const,
          lang: "tsx" as const,
          summary: "summary",
          improvement: "improvement",
          beforeCode: "const beforeCode = true;",
          afterCode: "const afterCode = true;",
        },
      },
    ];
    const copy = {
      eyebrow: "eyebrow",
      title: "title",
      description: "description",
      selectLabel: "select",
      beforeLabel: "before",
      afterLabel: "after",
      whatChanged: "what changed",
      narrativeLabel: "narrative",
      loading: "loading",
    };
    const { rerender } = render(
      <TechStackShowcasePanel stacks={stacks} copy={copy} />,
    );

    await waitFor(() => {
      expect(screen.getByTestId("magic-move-code")).toHaveAttribute(
        "data-theme",
        "github-dark",
      );
      expect(getShikiMagicMoveMountCount()).toBe(1);
    });

    setMockResolvedTheme("light");
    rerender(<TechStackShowcasePanel stacks={stacks} copy={copy} />);

    await waitFor(() => {
      expect(screen.getByTestId("magic-move-code")).toHaveAttribute(
        "data-theme",
        "github-light",
      );
      expect(getShikiMagicMoveMountCount()).toBe(2);
    });
  });

  it("renders the AI agent engineering proof section with evidence links", () => {
    render(<TechStackPage />);

    const section = screen.getByTestId("agent-engineering-section");
    expect(section).toBeInTheDocument();
    expect(section).toHaveTextContent(
      /I use agents like working surfaces, not magic shortcuts/i,
    );
    expect(section).toHaveTextContent(/Task decomposition & spec writing/i);
    expect(section).toHaveTextContent(/Codex/i);
    expect(section).toHaveTextContent(/Claude Code/i);

    const proofLinks = screen.getAllByTestId("agent-proof-link");
    expect(proofLinks.length).toBeGreaterThanOrEqual(2);
    expect(
      screen.getAllByText(/Agent engineering doc/i).length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByText(/react-devtool-cli case study/i).length,
    ).toBeGreaterThan(0);
    const renderedHrefs = proofLinks.map((link) => link.getAttribute("href"));
    expect(renderedHrefs).toContain(agentEngineeringDocUrl);
    expect(renderedHrefs).toContain(agentEngineeringProjectHref);

    const harness = screen.getByTestId("agent-engineering-harness");
    expect(harness).toHaveTextContent(
      /The workflow I expect an agent task to survive/i,
    );
    expect(harness).toHaveTextContent(/Brief and constraints/i);
    expect(harness).toHaveTextContent(/Agent execution surface/i);
    expect(harness).toHaveTextContent(/Verification loop/i);
    expect(harness).toHaveTextContent(/Proof artifacts/i);
    expect(harness).toHaveTextContent(/Example surface/i);
    expect(harness).toHaveTextContent(
      /pnpm lint && pnpm test -- --run && pnpm build/i,
    );
  });

  it("renders explanation-only content for Supabase without code toggle controls", async () => {
    render(<TechStackPage />);

    fireEvent.click(screen.getAllByRole("button", { name: "Supabase" })[0]);

    expect(
      screen.queryByTestId("tech-stack-mode-before"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("tech-stack-mode-after"),
    ).not.toBeInTheDocument();
    expect(
      screen.getAllByText(/Explanation-only walkthrough/i).length,
    ).toBeGreaterThanOrEqual(1);
    expect(
      screen.getAllByText(
        /tiny before\/after toy snippet hides the real skill signal/i,
      ).length,
    ).toBeGreaterThanOrEqual(1);
  });
});
