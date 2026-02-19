import { TechStack, TechStackCategory } from "@/shared/constant/tech-stack";
import { Fragment } from "react";
import { useTranslations } from "next-intl";
import { TechCategoryMeta } from "@/shared/constant/profile";

export function TechStackPage() {
  const t = useTranslations("TechStackPage");

  return (
    <main className="flex flex-1 justify-center py-6 md:py-10">
      <div className="section-shell flex w-full flex-col gap-6">
        <section className="glass-panel rounded-3xl p-6 md:p-8">
          <div className="space-y-3">
            <h1 className="text-3xl font-bold leading-tight md:text-4xl">
              {t("title")}
            </h1>
            <p className="max-w-3xl text-sm text-muted-foreground md:text-base">
              {t("description")}
            </p>
          </div>

          <div className="mt-6 grid gap-2 sm:grid-cols-3">
            <div className="rounded-xl border border-border/70 bg-card/70 px-4 py-3">
              <p className="text-lg font-semibold">{TechStack.length}</p>
              <p className="text-xs text-muted-foreground">{t("stats.totalTech")}</p>
            </div>
            <div className="rounded-xl border border-border/70 bg-card/70 px-4 py-3">
              <p className="text-lg font-semibold">{TechStackCategory.length}</p>
              <p className="text-xs text-muted-foreground">{t("stats.categories")}</p>
            </div>
            <div className="rounded-xl border border-border/70 bg-card/70 px-4 py-3">
              <p className="text-lg font-semibold">Frontend</p>
              <p className="text-xs text-muted-foreground">{t("stats.primaryTrack")}</p>
            </div>
          </div>
        </section>

        {TechStackCategory.map((category) => {
          const categoryDescription = TechCategoryMeta.find(
            (item) => item.category === category
          );
          const stacks = TechStack.filter((tech) =>
            tech.category.some((_category) => _category === category)
          );

          return (
            <Fragment key={category}>
              <section className="glass-panel rounded-2xl p-5">
                <div className="mb-4 flex flex-col gap-1">
                  <h2 className="text-xl font-semibold">{t(category)}</h2>
                  {categoryDescription && (
                    <p className="text-sm text-muted-foreground">
                      {t(categoryDescription.descriptionKey)}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-3">
                  {stacks.map((tech) => (
                    <article
                      key={tech.name}
                      className="rounded-xl border border-border/70 bg-card/70 p-3"
                    >
                      <div className="mb-2 flex h-7 w-7 items-center justify-center text-foreground">
                        {tech.icon}
                      </div>
                      <h3 className="text-sm font-semibold">{tech.name}</h3>
                    </article>
                  ))}
                </div>
              </section>
            </Fragment>
          );
        })}

        <section className="glass-panel rounded-2xl p-5">
          <h2 className="text-lg font-semibold">{t("methodTitle")}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{t("methodDescription")}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full border border-border/70 bg-card/60 px-3 py-1 text-xs font-medium">
              {t("methodTags.architecture")}
            </span>
            <span className="rounded-full border border-border/70 bg-card/60 px-3 py-1 text-xs font-medium">
              {t("methodTags.designSystem")}
            </span>
            <span className="rounded-full border border-border/70 bg-card/60 px-3 py-1 text-xs font-medium">
              {t("methodTags.performance")}
            </span>
            <span className="rounded-full border border-border/70 bg-card/60 px-3 py-1 text-xs font-medium">
              {t("methodTags.collaboration")}
            </span>
          </div>
        </section>
      </div>
    </main>
  );
}
