import {
  JavascriptIcon,
  TypescriptIcon,
  HtmlIcon,
  CssIcon,
  ReactIcon,
  NextjsIcon,
  SvelteIcon,
  TailwindIcon,
  GithubIcon,
  FigmaIcon,
  TerminalIcon,
  VanillaExtractIcon,
  WebComponentIcon,
  MysqlIcon,
  MongoIcon,
  ExpressIcon,
  PrismaIcon,
  PostgreSQLIcon,
  ElysiaIcon,
  BunJSIcon,
} from "../ui/icon/brand";
import { PlaywrightIcon } from "../ui/icon/brand/playwright";
import { StorybookIcon } from "../ui/icon/brand/storybook";
import { TanstackIcon } from "../ui/icon/brand/tanstack";
import { XStateIcon } from "../ui/icon/brand/xstate";
import { SupabaseIcon } from "../ui/icon/brand/supabase";
import { StyleXIcon } from "../ui/icon/brand/stylex";

export const TechStackCategory = [
  "Languages",
  "Frameworks & Libraries",
  "Database",
  "Styling",
  "Testing",
  "Tools",
  "Backend",
] as const;

export type TechStackType = {
  name: string;
  icon: React.ReactNode;
  category: (typeof TechStackCategory)[number][];
};

export type TechStackEnum = (typeof TechStack)[number]["name"];

export const TechStack: TechStackType[] = [
  {
    name: "JavaScript",
    icon: <JavascriptIcon />,
    category: ["Languages"],
  },
  {
    name: "TypeScript",
    icon: <TypescriptIcon />,
    category: ["Languages"],
  },
  {
    name: "HTML",
    icon: <HtmlIcon />,
    category: ["Languages"],
  },
  {
    name: "CSS",
    icon: <CssIcon />,
    category: ["Styling"],
  },
  {
    name: "Vanilla Extract",
    icon: <VanillaExtractIcon />,
    category: ["Styling"],
  },
  {
    name: "React",
    icon: <ReactIcon />,
    category: ["Frameworks & Libraries"],
  },
  {
    name: "Next.js",
    icon: <NextjsIcon />,
    category: ["Frameworks & Libraries", "Backend"],
  },
  {
    name: "SvelteKit",
    icon: <SvelteIcon />,
    category: ["Frameworks & Libraries", "Backend"],
  },
  {
    name: "Express.js",
    icon: <ExpressIcon />,
    category: ["Frameworks & Libraries", "Backend"],
  },
  {
    name: "Elysia.js",
    icon: <ElysiaIcon />,
    category: ["Frameworks & Libraries", "Backend"],
  },
  {
    name: "Web Component",
    icon: <WebComponentIcon />,
    category: ["Frameworks & Libraries"],
  },
  {
    name: "TanStack Query",
    icon: <TanstackIcon width={18} height={18} />,
    category: ["Frameworks & Libraries"],
  },
  {
    name: "XState",
    icon: <XStateIcon width={18} height={18} />,
    category: ["Frameworks & Libraries"],
  },
  {
    name: "Tailwind CSS",
    icon: <TailwindIcon />,
    category: ["Styling"],
  },
  {
    name: "StyleX",
    icon: <StyleXIcon />,
    category: ["Styling"],
  },
  {
    name: "Bun.js",
    icon: <BunJSIcon />,
    category: ["Tools"],
  },
  {
    name: "Codex",
    icon: (
      <span
        aria-hidden
        className="text-[0.55rem] font-black uppercase tracking-[0.12em]"
      >
        CX
      </span>
    ),
    category: ["Tools"],
  },
  {
    name: "Claude Code",
    icon: (
      <span
        aria-hidden
        className="text-[0.5rem] font-black uppercase tracking-[0.08em]"
      >
        CC
      </span>
    ),
    category: ["Tools"],
  },
  {
    name: "Github",
    icon: <GithubIcon />,
    category: ["Tools"],
  },
  {
    name: "Command Line",
    icon: <TerminalIcon />,
    category: ["Tools"],
  },
  {
    name: "Figma",
    icon: <FigmaIcon />,
    category: ["Tools"],
  },
  {
    name: "Storybook",
    icon: <StorybookIcon />,
    category: ["Tools", "Testing"],
  },
  {
    name: "Playwright",
    icon: <PlaywrightIcon />,
    category: ["Testing", "Tools"],
  },
  {
    name: "MySQL",
    icon: <MysqlIcon />,
    category: ["Database"],
  },
  {
    name: "MongoDB",
    icon: <MongoIcon />,
    category: ["Database"],
  },
  {
    name: "Supabase",
    icon: <SupabaseIcon width={18} height={18} />,
    category: ["Database", "Backend"],
  },
  {
    name: "Prisma",
    icon: <PrismaIcon width={18} height={18} />,
    category: ["Database", "Backend"],
  },
  {
    name: "PostgreSQL",
    icon: <PostgreSQLIcon width={18} height={18} />,
    category: ["Database", "Backend"],
  },
];
