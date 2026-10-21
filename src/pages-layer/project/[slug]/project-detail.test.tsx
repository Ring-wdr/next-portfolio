import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import messages from "../../../../messages/en.json";
import { getFixtureProjects } from "@/shared/content/fixture-projects";
import { ProjectDetailPage } from "./index";

function lookup(path: string) {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in acc) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, messages);
}

vi.mock("next-intl", () => ({
  useTranslations: (namespace: string) => (key: string) =>
    (lookup(`${namespace}.${key}`) as string | undefined) ?? key,
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

vi.mock("@/feature/chat/ui/project-ask", () => ({
  ProjectAsk: ({ title }: { title: string }) => <p>ask:{title}</p>,
}));

const projects = getFixtureProjects();
const bySlug = (slug: string) => projects.find((project) => project.slug === slug)!;

describe("ProjectDetailPage", () => {
  it("renders only the confirmed summary rows and the short title for chat", () => {
    render(<ProjectDetailPage project={bySlug("xmorse")} />);

    const brief = screen.getByTestId("project-brief");
    expect(within(brief).getByText("Who it is for")).toBeInTheDocument();
    expect(within(brief).getByText("Outcome")).toBeInTheDocument();
    expect(within(brief).queryByText("What I did")).not.toBeInTheDocument();
    expect(screen.getByText("ask:XMORSE 2.0")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Fixture section" })).toBeInTheDocument();
  });

  it("keeps hidden gallery images and empty sections out of the page", () => {
    render(<ProjectDetailPage project={bySlug("xmorse")} />);

    expect(screen.queryByAltText("Hidden fixture image")).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Screenshots" })).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: /Technical Challenges/i }),
    ).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Achievements" })).not.toBeInTheDocument();
  });

  it("puts the plain-language line before each challenge and omits unknown facts", () => {
    const { unmount } = render(<ProjectDetailPage project={bySlug("pocaz")} />);
    expect(screen.getByText("Fixture plain summary.")).toBeInTheDocument();
    unmount();

    render(<ProjectDetailPage project={bySlug("alltime-car")} />);
    expect(screen.queryByText("Team")).not.toBeInTheDocument();
  });
});
