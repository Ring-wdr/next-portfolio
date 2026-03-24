import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeAll, describe, expect, it, vi } from "vitest";

import { TechStackPage } from "./index";

const translations = {
  title: "Tech Stack",
  description: "Technologies and tools I use",
  stats: {
    totalTech: "Total technologies",
    categories: "Categories",
    primaryTrack: "Primary track",
  },
  categoryDescriptions: {
    languages: "Core programming languages used in product delivery and frontend systems.",
    frameworksLibraries: "Framework and state patterns for scalable interfaces.",
    database: "Data layer technologies used for product persistence and analytics.",
    styling: "Design-system and styling approaches for maintainable UI.",
    testing: "Quality and confidence tooling for stable releases.",
    tools: "Execution environment and collaboration tools used daily.",
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
        summary: "Turn local UI logic into resilient mutation-driven product flows.",
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
        summary: "Use type systems to shape maintainable content and UI contracts.",
        improvement:
          "Moves from loose objects to explicit domain modeling with optional showcase metadata.",
      },
      playwright: {
        summary: "Verify user-visible behavior instead of stopping at navigation.",
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

vi.mock("next-themes", () => ({
  useTheme: () => ({ resolvedTheme: "dark" }),
}));

vi.mock("shiki", () => ({
  createHighlighter: vi.fn(() => new Promise(() => {})),
}));

vi.mock("shiki-magic-move/react", () => ({
  ShikiMagicMove: ({ code }: { code: string }) => (
    <pre data-testid="magic-move-code">{code}</pre>
  ),
}));

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

describe("TechStackPage", () => {
  it("renders the showcase and keeps non-demo inventory cards visible", async () => {
    render(<TechStackPage />);

    expect(screen.getByRole("heading", { name: /Tech Stack/i })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /From newbie code to expert systems/i })
    ).toBeInTheDocument();
    expect(screen.getByTestId("tech-stack-showcase")).toBeInTheDocument();
    expect(screen.getByText("Figma")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId("magic-move-code")).toBeInTheDocument();
    });
  });

  it("switches a stack from before to after state", async () => {
    render(<TechStackPage />);

    fireEvent.click(screen.getByRole("button", { name: "React" }));

    await waitFor(() => {
      expect(screen.getByTestId("magic-move-code")).toHaveTextContent(
        "const [loading, setLoading] = useState(false)"
      );
    });

    fireEvent.click(screen.getByTestId("tech-stack-mode-after"));

    await waitFor(() => {
      expect(screen.getByTestId("magic-move-code")).toHaveTextContent("useMutation");
    });

    expect(screen.getByTestId("tech-stack-showcase")).toHaveTextContent(
      /async boundary with explicit success handling/i
    );
  });

  it("renders explanation-only content for Supabase without code toggle controls", async () => {
    render(<TechStackPage />);

    fireEvent.click(screen.getByRole("button", { name: "Supabase" }));

    expect(screen.queryByTestId("tech-stack-mode-before")).not.toBeInTheDocument();
    expect(screen.queryByTestId("tech-stack-mode-after")).not.toBeInTheDocument();
    expect(screen.getByText(/Explanation-only walkthrough/i)).toBeInTheDocument();
    expect(screen.getByText(/tiny before\/after toy snippet hides the real skill signal/i)).toBeInTheDocument();
  });
});
