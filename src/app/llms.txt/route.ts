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

      const role = [project.role, project.team && `(${project.team})`]
        .filter(Boolean)
        .join(" ");

      return [
        `### ${project.title} (${project.period})`,
        "",
        `${project.summary}`,
        "",
        ...(role ? [`- Role: ${role}`] : []),
        `- Stack: ${project.tech.stack.join(", ")}`,
        `- Links: ${links}`,
      ].join("\n");
    })
    .join("\n\n");

  const body = `# ${siteConfig.name}

> ${siteConfig.description}

Manjoong Kim (김만중) is a frontend and product engineer with four years of professional experience. At ScatterX, Manjoong spent three years on the frontend of a B2B data analysis and visualization SaaS and designed the architecture of its move from jQuery to Next.js (XMORSE 2.0). Personal projects are planned, built, deployed, and run by Manjoong alone. Content is primarily in Korean; English pages live under /en.

## Pages

- [Home](${absoluteUrl("/")}): overview and an AI assistant grounded in this portfolio
- [Projects](${absoluteUrl("/project")}): case studies with problems, decisions, and outcomes
- [Role Fit](${absoluteUrl("/fit")}): paste a job description to get an evidence-linked fit report
- [Tech Stack](${absoluteUrl("/tech-stack")}): tools and how agents are used in engineering work
- [About](${absoluteUrl("/about")}): work experience and working principles
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
