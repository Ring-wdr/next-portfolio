import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  CareerTimeline,
  CoreStrengthKeys,
  FocusAreas,
  WorkingPrinciples,
} from "@/shared/constant/profile";
import { projectList } from "@/shared/constant/project";
import { TechStack } from "@/shared/constant/tech-stack";

export function AboutPage() {
  const t = useTranslations("AboutPage");

  return (
    <main className="flex flex-1 justify-center py-6 md:py-10">
      <div className="section-shell flex w-full flex-col gap-6">
        <section className="glass-panel rounded-3xl p-6 md:p-8">
          <div className="grid gap-6 lg:grid-cols-[auto_1fr] lg:items-center">
            <Image
              src="https://avatars.githubusercontent.com/u/70439662?v=4"
              alt="profile"
              className="aspect-square rounded-2xl object-cover"
              width={132}
              height={132}
              priority
            />
            <div className="space-y-3">
              <h1 className="text-3xl font-bold leading-tight md:text-4xl">
                {t("greeting")}
              </h1>
              <p className="text-sm font-medium text-primary md:text-base">
                {t("role")}
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                {t("intro")}
              </p>
            </div>
          </div>
          <div className="mt-6 grid gap-2 sm:grid-cols-3">
            <div className="rounded-xl border border-border/70 bg-card/70 px-4 py-3">
              <p className="text-lg font-semibold">{projectList.length}</p>
              <p className="text-xs text-muted-foreground">{t("stats.projects")}</p>
            </div>
            <div className="rounded-xl border border-border/70 bg-card/70 px-4 py-3">
              <p className="text-lg font-semibold">{TechStack.length}+</p>
              <p className="text-xs text-muted-foreground">{t("stats.technologies")}</p>
            </div>
            <div className="rounded-xl border border-border/70 bg-card/70 px-4 py-3">
              <p className="text-lg font-semibold">3+</p>
              <p className="text-xs text-muted-foreground">{t("stats.years")}</p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {FocusAreas.map((focus) => (
              <span
                key={focus.id}
                className="rounded-full border border-border/70 bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground"
              >
                {t(focus.labelKey)}
              </span>
            ))}
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <article className="glass-panel rounded-2xl p-5">
            <h2 className="text-lg font-semibold">{t("aboutMeTitle")}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
              {t("aboutMeDescription")}
            </p>
          </article>

          <article className="glass-panel rounded-2xl p-5">
            <h2 className="text-lg font-semibold">{t("strengthsTitle")}</h2>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {CoreStrengthKeys.map((strength) => (
                <div
                  key={strength}
                  className="rounded-xl border border-border/70 bg-card/60 px-3 py-2 text-sm font-medium"
                >
                  {t(strength)}
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="glass-panel rounded-2xl p-5">
          <h2 className="text-lg font-semibold">{t("timelineTitle")}</h2>
          <div className="mt-4 space-y-3">
            {CareerTimeline.map((item) => (
              <article
                key={item.id}
                className="rounded-xl border border-border/70 bg-card/60 p-4"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                  {item.period}
                </p>
                <h3 className="mt-1 text-base font-semibold">{t(item.titleKey)}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {t(item.descriptionKey)}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="glass-panel rounded-2xl p-5">
          <h2 className="text-lg font-semibold">{t("principlesTitle")}</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {WorkingPrinciples.map((principle) => (
              <article
                key={principle.id}
                className="rounded-xl border border-border/70 bg-card/60 p-4"
              >
                <h3 className="text-sm font-semibold">{t(principle.titleKey)}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t(principle.descriptionKey)}
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
