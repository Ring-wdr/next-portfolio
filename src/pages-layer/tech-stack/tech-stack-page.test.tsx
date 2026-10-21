import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import messages from "../../../messages/en.json";
import {
  agentEngineeringDocUrl,
  agentEngineeringProjectHref,
} from "@/shared/constant/agent-engineering";
import { TechStack } from "@/shared/constant/tech-stack";

import { TechStackPage } from "./index";

function lookup(path: string) {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in acc) {
      return (acc as Record<string, unknown>)[key];
    }

    return undefined;
  }, messages.TechStackPage);
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

describe("TechStackPage", () => {
  it("renders the inventory without the before/after code widget", () => {
    render(<TechStackPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: /Tech Stack/i }),
    ).toBeInTheDocument();
    expect(screen.queryByTestId("tech-stack-showcase")).not.toBeInTheDocument();
    for (const tech of TechStack) {
      expect(screen.getAllByText(tech.name).length).toBeGreaterThan(0);
    }
  });

  it("renders the AI agent engineering section with evidence links", () => {
    render(<TechStackPage />);

    const section = screen.getByTestId("agent-engineering-section");
    expect(section).toHaveTextContent(/Claude Code/i);

    const renderedHrefs = screen
      .getAllByTestId("agent-proof-link")
      .map((link) => link.getAttribute("href"));
    expect(renderedHrefs).toContain(agentEngineeringDocUrl);
    expect(renderedHrefs).toContain(agentEngineeringProjectHref);

    expect(screen.getByTestId("agent-engineering-harness")).toHaveTextContent(
      /pnpm lint && pnpm test -- --run && pnpm build/i,
    );
  });
});
