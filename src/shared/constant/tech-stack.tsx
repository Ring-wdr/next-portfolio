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

export type TechStackCodeDemo = {
  kind: "code";
  lang: "ts" | "tsx";
  summaryKey: string;
  improvementKey: string;
  beforeCode: string;
  afterCode: string;
};

export type TechStackNarrativeDemo = {
  kind: "narrative";
  summaryKey: string;
  improvementKey: string;
  detailKey: string;
};

export type TechStackDemo = TechStackCodeDemo | TechStackNarrativeDemo;

export type TechStackType = {
  name: string;
  icon: React.ReactNode;
  category: (typeof TechStackCategory)[number][];
  demo?: TechStackDemo;
};

export type TechStackEnum = (typeof TechStack)[number]["name"];

export type TechStackShowcaseEntry = {
  name: string;
  demo: TechStackDemo;
};

const reactBeforeCode = `function CheckoutButton({ items }) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    await fetch('/api/checkout', {
      method: 'POST',
      body: JSON.stringify(items),
    });
    setLoading(false);
  }

  return <button onClick={handleClick}>Buy</button>;
}`;

const reactAfterCode = `import { useActionState } from 'react';

function CheckoutButton({ items, onSuccess }) {
  const [, submitAction, isPending] = useActionState(
    async () => {
      await createCheckoutSession(items);
      onSuccess?.();
    },
    undefined,
  );

  return (
    <form action={submitAction}>
      <button type="submit" disabled={isPending}>
        {isPending ? 'Processing…' : 'Buy now'}
      </button>
    </form>
  );
}`;

const nextBeforeCode = `"use client";

export default function TechStackPage() {
  const [selected, setSelected] = useState('React');

  return <TechStackExperience selected={selected} />;
}`;

const nextAfterCode = `export default async function Page(
  props: PageProps<'/tech-stack/[category]'>
) {
  const { category } = await props.params;
  const stacks = await getTechStacks(category);

  return (
    <TechStackPage
      stacks={stacks}
      showcase={<TechStackShowcase stacks={stacks} />}
    />
  );
}`;

const typeScriptBeforeCode = `const tech = {
  name: 'React',
  category: ['Frameworks & Libraries'],
  beforeCode: 'const count = 0',
  afterCode: 'const [count] = useState(0)',
};`;

const typeScriptAfterCode = `type CodeDemo = {
  kind: 'code';
  lang: 'ts' | 'tsx';
  beforeCode: string;
  afterCode: string;
};

type NarrativeDemo = {
  kind: 'narrative';
  detail: string;
};

const react = {
  name: 'React',
  category: ['Frameworks & Libraries'],
  demo: {
    kind: 'code',
    lang: 'tsx',
    beforeCode: '…',
    afterCode: '…',
  },
} satisfies TechItem;`;

const playwrightBeforeCode = `test('tech stack page', async ({ page }) => {
  await page.goto('/en/tech-stack');
});`;

const playwrightAfterCode = `test('tech stack page', async ({ page }) => {
  await page.goto('/en/tech-stack');

  await test.step('showcase renders', async () => {
    await expect(
      page.getByTestId('tech-stack-showcase')
    ).toBeVisible();
  });

  await test.step('mode toggle works', async () => {
    await page.getByTestId('tech-stack-mode-after').click();
    await expect(
      page.getByTestId('tech-stack-mode-after')
    ).toHaveAttribute('aria-pressed', 'true');
  });
});`;

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
    demo: {
      kind: "code",
      lang: "ts",
      summaryKey: "showcase.items.typescript.summary",
      improvementKey: "showcase.items.typescript.improvement",
      beforeCode: typeScriptBeforeCode,
      afterCode: typeScriptAfterCode,
    },
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
    demo: {
      kind: "code",
      lang: "tsx",
      summaryKey: "showcase.items.react.summary",
      improvementKey: "showcase.items.react.improvement",
      beforeCode: reactBeforeCode,
      afterCode: reactAfterCode,
    },
  },
  {
    name: "Next.js",
    icon: <NextjsIcon />,
    category: ["Frameworks & Libraries", "Backend"],
    demo: {
      kind: "code",
      lang: "tsx",
      summaryKey: "showcase.items.nextjs.summary",
      improvementKey: "showcase.items.nextjs.improvement",
      beforeCode: nextBeforeCode,
      afterCode: nextAfterCode,
    },
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
    category: ["Tools", "Testing"],
    demo: {
      kind: "code",
      lang: "ts",
      summaryKey: "showcase.items.playwright.summary",
      improvementKey: "showcase.items.playwright.improvement",
      beforeCode: playwrightBeforeCode,
      afterCode: playwrightAfterCode,
    },
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
    demo: {
      kind: "narrative",
      summaryKey: "showcase.items.supabase.summary",
      improvementKey: "showcase.items.supabase.improvement",
      detailKey: "showcase.items.supabase.detail",
    },
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

export function getTechStackShowcaseEntries(): TechStackShowcaseEntry[] {
  return TechStack.filter(
    (tech): tech is TechStackType & { demo: TechStackDemo } => tech.demo !== undefined
  ).map((tech) => ({
    name: tech.name,
    demo: tech.demo,
  }));
}
