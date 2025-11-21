"use client";

import { ProjectDetail } from "@/shared/constant/project-detail";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { ImageGallery } from "@/shared/ui/image-gallery";
import { useTranslations } from "next-intl";

type ProjectDetailPageProps = {
  project: ProjectDetail;
};

export function ProjectDetailPage({ project }: ProjectDetailPageProps) {
  const t = useTranslations("ProjectDetailPage");

  return (
    <div className="flex flex-1 justify-center py-8">
      <div className="layout-content-container flex flex-col max-w-[1200px] flex-1 px-4">
        {/* Header Section */}
        <div className="flex flex-col gap-6 pb-8 border-b border-[#3b4754]">
          <div className="flex flex-col gap-3">
            <h1
              className="text-4xl font-bold tracking-tight"
              style={{ viewTransitionName: `project-title-${project.slug}` }}
            >
              {project.title}
            </h1>
            <p className="text-xl text-[#9cabba]">{project.summary}</p>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-[#9cabba]">
            <div className="flex items-center gap-2">
              <span className="font-semibold">{t("period")}:</span>
              <span>{project.period}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">{t("team")}:</span>
              <span>{project.team}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">{t("role")}:</span>
              <span>{project.role}</span>
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-3">
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-all font-medium"
              >
                {t("github")}
              </a>
            )}
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 border border-[#3b4754] rounded-lg hover:bg-secondary transition-all font-medium"
              >
                {t("liveDemo")}
              </a>
            )}
            {project.links.etc?.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 border border-[#3b4754] rounded-lg hover:bg-secondary transition-all font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Hero Image */}
        <div className="py-8">
          <div
            className="relative w-full aspect-video rounded-xl overflow-hidden"
            style={{ viewTransitionName: `project-image-${project.slug}` }}
          >
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Overview Section */}
        <section className="py-8 border-b border-[#3b4754]">
          <h2 className="text-2xl font-bold mb-6">{t("overview")}</h2>
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-[#9cabba]">
                {t("background")}
              </h3>
              <p className="text-base leading-relaxed">
                {project.overview.background}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-[#9cabba]">
                {t("goal")}
              </h3>
              <p className="text-base leading-relaxed">
                {project.overview.goal}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-[#9cabba]">
                {t("features")}
              </h3>
              <ul className="list-disc list-inside space-y-2">
                {project.overview.features.map((feature, index) => (
                  <li key={index} className="text-base leading-relaxed">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="py-8 border-b border-[#3b4754]">
          <h2 className="text-2xl font-bold mb-6">{t("techStack")}</h2>
          <div className="flex flex-wrap gap-3">
            {project.tech.stack.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-secondary border border-[#3b4754] rounded-lg text-sm font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Challenges & Solutions Section */}
        <section className="py-8 border-b border-[#3b4754]">
          <h2 className="text-2xl font-bold mb-6">{t("challengesAndSolutions")}</h2>
          <div className="flex flex-col gap-8">
            {project.tech.challenges.map((challenge, index) => (
              <div key={index} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-primary">
                      {t("challenge")} {index + 1}
                    </span>
                    <h3 className="text-lg font-semibold">
                      {challenge.title}
                    </h3>
                  </div>
                  <p className="text-base leading-relaxed text-[#9cabba]">
                    {challenge.description}
                  </p>
                </div>

                {project.tech.solutions[index] && (
                  <div className="flex flex-col gap-2 pl-4 border-l-2 border-primary">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-green-500">
                        {t("solution")}
                      </span>
                      <h4 className="text-lg font-semibold">
                        {project.tech.solutions[index].title}
                      </h4>
                    </div>
                    <p className="text-base leading-relaxed">
                      {project.tech.solutions[index].description}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Achievements Section */}
        <section className="py-8 border-b border-[#3b4754]">
          <h2 className="text-2xl font-bold mb-6">{t("achievements")}</h2>
          <div className="flex flex-col gap-6">
            {project.achievements.metrics && (
              <div>
                <h3 className="text-lg font-semibold mb-4 text-[#9cabba]">
                  {t("metrics")}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {project.achievements.metrics.map((metric, index) => (
                    <div
                      key={index}
                      className="p-4 bg-secondary border border-[#3b4754] rounded-lg"
                    >
                      <div className="text-sm text-[#9cabba] mb-1">
                        {metric.label}
                      </div>
                      <div className="text-2xl font-bold">{metric.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {project.achievements.feedback && (
              <div>
                <h3 className="text-lg font-semibold mb-4 text-[#9cabba]">
                  {t("feedback")}
                </h3>
                <ul className="space-y-2">
                  {project.achievements.feedback.map((item, index) => (
                    <li
                      key={index}
                      className="text-base leading-relaxed flex items-start gap-2"
                    >
                      <span className="text-primary">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.achievements.improvements && (
              <div>
                <h3 className="text-lg font-semibold mb-4 text-[#9cabba]">
                  {t("improvements")}
                </h3>
                <ul className="space-y-2">
                  {project.achievements.improvements.map((item, index) => (
                    <li
                      key={index}
                      className="text-base leading-relaxed flex items-start gap-2"
                    >
                      <span className="text-green-500">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>

        {/* Gallery Section */}
        {project.gallery.length > 0 && (
          <section className="py-8 border-b border-[#3b4754]">
            <h2 className="text-2xl font-bold mb-6">{t("screenshots")}</h2>
            <ImageGallery images={project.gallery} />
          </section>
        )}

        {/* Back to Projects */}
        <div className="py-8">
          <Link
            href="/project"
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            <span>←</span>
            <span>{t("backToProjects")}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
