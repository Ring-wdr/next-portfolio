import Image from "next/image";
import { useTranslations } from "next-intl";

import { projectList } from "@/shared/constant/project";
import { TechStack } from "@/shared/constant/tech-stack";
import { MainProjectItem } from "./project/item";
import { Link } from "@/i18n/routing";

export function MainPage() {
  const t = useTranslations("HomePage");
  const featuredProjects = projectList.toReversed().slice(0, 3);
  const mainProject = featuredProjects[0];
  const spotlightTech = TechStack.slice(0, 8);

  return (
    <main className="flex flex-1 justify-center py-6 md:py-10">
      <div className="section-shell flex w-full flex-1 flex-col gap-10 md:gap-12">
        <section className="glass-panel relative overflow-hidden rounded-3xl px-6 py-8 md:px-10 md:py-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,color-mix(in_oklch,var(--color-highlight),transparent_82%),transparent_42%),radial-gradient(circle_at_100%_100%,color-mix(in_oklch,var(--color-primary),transparent_85%),transparent_46%)]" />
          <div className="relative z-10 grid gap-8 lg:grid-cols-[1.3fr_0.9fr] lg:items-end">
            <div className="space-y-6">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                  {t("eyebrow")}
                </p>
                <h1 className="text-gradient-hero text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                  {t("greeting")}
                </h1>
                <p className="max-w-xl text-sm text-muted-foreground md:text-base">
                  {t("description")}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/project"
                  className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  {t("viewProjects")}
                </Link>
                <Link
                  href="/about"
                  className="inline-flex h-11 items-center justify-center rounded-xl border border-border bg-card/70 px-5 text-sm font-semibold text-foreground transition-colors hover:bg-card"
                >
                  {t("aboutCta")}
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center sm:max-w-md">
                <div className="rounded-xl border border-border/70 bg-card/60 px-3 py-2">
                  <p className="text-xl font-bold">{projectList.length}</p>
                  <p className="text-xs text-muted-foreground">{t("stats.projects")}</p>
                </div>
                <div className="rounded-xl border border-border/70 bg-card/60 px-3 py-2">
                  <p className="text-xl font-bold">{TechStack.length}+</p>
                  <p className="text-xs text-muted-foreground">{t("stats.tech")}</p>
                </div>
                <div className="rounded-xl border border-border/70 bg-card/60 px-3 py-2">
                  <p className="text-xl font-bold">2026</p>
                  <p className="text-xs text-muted-foreground">{t("stats.currentFocus")}</p>
                </div>
              </div>
            </div>

            {mainProject && (
              <Link
                href={`/project/${mainProject.slug}`}
                className="group glass-panel relative block overflow-hidden rounded-2xl"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={mainProject.src}
                    alt={mainProject.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 420px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-2 p-4">
                  <p className="text-xs font-medium text-muted-foreground">
                    {t("featuredStory")}
                  </p>
                  <h2 className="text-xl font-semibold">{mainProject.title}</h2>
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {mainProject.impact}
                  </p>
                </div>
              </Link>
            )}
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-2xl font-bold">{t("featuredProjects")}</h2>
            <Link
              href="/project"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {t("viewAll")}
            </Link>
          </div>
          <div className="flex overflow-y-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex items-stretch gap-3 py-1">
              {featuredProjects.map((project) => (
                <MainProjectItem
                  key={project.title}
                  title={project.title}
                  description={project.description}
                  src={project.src}
                  href={project.href}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="px-1 text-2xl font-bold">{t("techStack")}</h2>
          <div className="glass-panel grid grid-cols-2 gap-2 rounded-2xl p-4 sm:grid-cols-3 lg:grid-cols-4">
            {spotlightTech.map((tech) => (
              <button
                key={tech.name}
                className="flex h-10 items-center justify-center rounded-xl border border-border/70 bg-card/70 px-3 text-sm font-medium transition-colors hover:border-primary/40 hover:bg-secondary"
              >
                {tech.name}
              </button>
            ))}
          </div>
        </section>

        <section className="grid gap-3 md:grid-cols-3">
          <article className="glass-panel rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-muted-foreground">
              {t("pillars.productThinking.title")}
            </h3>
            <p className="mt-2 text-sm leading-relaxed">
              {t("pillars.productThinking.description")}
            </p>
          </article>
          <article className="glass-panel rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-muted-foreground">
              {t("pillars.modernFrontend.title")}
            </h3>
            <p className="mt-2 text-sm leading-relaxed">
              {t("pillars.modernFrontend.description")}
            </p>
          </article>
          <article className="glass-panel rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-muted-foreground">
              {t("pillars.deliveryFocus.title")}
            </h3>
            <p className="mt-2 text-sm leading-relaxed">
              {t("pillars.deliveryFocus.description")}
            </p>
          </article>
        </section>
      </div>
    </main>
  );
}
