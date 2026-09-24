import { getProjects } from "@/shared/content/project-source";
import { absoluteUrl, getProjectPath, siteConfig } from "@/shared/constant/site";

// Static, agent-readable index of the portfolio (https://llmstxt.org).
export async function GET() {
  const projects = (await getProjects())
    .map((project) => {
      const links = [
        `[Case study](${absoluteUrl(getProjectPath(project.slug))})`,
        project.links.github && `[GitHub](${project.links.github})`,
        project.links.demo && `[Demo](${project.links.demo})`,
      ]
        .filter(Boolean)
        .join(" · ");

      return [
        `### ${project.title} (${project.period})`,
        "",
        `${project.summary}`,
        "",
        `- Role: ${project.role} (${project.team})`,
        `- Stack: ${project.tech.stack.join(", ")}`,
        `- Links: ${links}`,
      ].join("\n");
    })
    .join("\n\n");

  const body = `# ${siteConfig.name}

> ${siteConfig.description}

Manjoong Kim (김만중) is a frontend engineer working with React, Next.js, and TypeScript, focused on product UX, maintainable frontend systems, and verifiable AI-agent workflows. Content is primarily in Korean; English pages live under /en.

## Pages

- [Home](${absoluteUrl("/")}): overview and an AI assistant grounded in this portfolio
- [Projects](${absoluteUrl("/project")}): case studies with problems, decisions, and outcomes
- [Role Fit](${absoluteUrl("/fit")}): paste a job description to get an evidence-linked fit report
- [Tech Stack](${absoluteUrl("/tech-stack")}): tools and how agents are used in engineering work
- [About](${absoluteUrl("/about")}): career timeline and working principles
- [Contact](${absoluteUrl("/contact")})

## Projects

${projects}

## Profiles

- GitHub: ${siteConfig.social.github}
- LinkedIn: ${siteConfig.social.linkedin}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
