import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import type { ProjectCard } from "@/shared/content/project";
import { classNames } from "@/shared/utils/classnames";
import { isSvgSource } from "@/shared/utils/image";

// Supporting tiles cycle through the flat brand blocks; text stays ink on all three
const tileColors = ["bg-tangerine", "bg-mint", "bg-butter"] as const;

/** Lead project gets the wide ink block; the rest become color tiles below it. */
export function SelectedWork({ projects }: { projects: ProjectCard[] }) {
	const [lead, ...rest] = projects;
	if (!lead) return null;

	return (
		<div className="mt-10 flex flex-col gap-3 md:mt-12">
			<LeadProject project={lead} />
			{rest.length > 0 && (
				<ul className="grid gap-3 md:grid-cols-3">
					{rest.map((project, index) => (
						<li key={project.slug}>
							<ProjectTile project={project} color={tileColors[index % tileColors.length]} />
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

function ProjectMeta({ project, tone }: { project: ProjectCard; tone: "light" | "dark" }) {
	const categoryT = useTranslations("ProjectsPage.categories");
	const statusT = useTranslations("ProjectsPage.status");

	return (
		<div className="flex min-h-7 flex-wrap items-center gap-2 text-xs font-bold">
			<span>
				{categoryT(project.category)} · {project.year}
			</span>
			{project.status === "Live" && (
				<span
					className={classNames(
						"inline-flex items-center gap-1.5 rounded-full px-2.5 py-1",
						tone === "light" ? "bg-white/12" : "bg-on-block/10",
					)}
				>
					<span aria-hidden className="h-1.5 w-1.5 rounded-full bg-current" />
					{statusT("Live")}
				</span>
			)}
		</div>
	);
}

function LeadProject({ project }: { project: ProjectCard }) {
	const t = useTranslations("ProjectsPage");

	return (
		<article className="group overflow-hidden rounded-[2rem] bg-ink text-white">
			<Link
				href={`/project/${project.slug}`}
				className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]"
			>
				<div className="relative aspect-16/10 overflow-hidden bg-white/6 lg:aspect-auto lg:min-h-[26rem]">
					<Image
						src={project.src}
						unoptimized={isSvgSource(project.src)}
						alt={project.title}
						fill
						sizes="(max-width: 1024px) 100vw, 60vw"
						className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
					/>
				</div>
				<div className="flex flex-col gap-4 p-6 md:p-9">
					<ProjectMeta project={project} tone="light" />
					<h3 className="type-display text-[clamp(2rem,4.4vw,3.5rem)]">{project.title}</h3>
					<p className="text-sm leading-6 text-white/72 md:text-base md:leading-7">
						{project.description}
					</p>
					<p className="rounded-2xl bg-white/8 p-4 text-sm leading-6 font-medium md:text-base md:leading-7">
						{project.impact}
					</p>
					{project.role && (
						<p className="text-sm text-white/72">
							<span className="font-bold text-white">{t("roleLabel")}</span> · {project.role}
						</p>
					)}
					<ul className="flex flex-wrap gap-1.5" aria-label={t("stackLabel")}>
						{project.techStack.slice(0, 5).map((tech) => (
							<li key={tech} className="rounded-full border border-white/20 px-3 py-1 text-xs font-medium">
								{tech}
							</li>
						))}
					</ul>
					<span className="mt-auto inline-flex h-11 w-fit items-center gap-1.5 rounded-full bg-tangerine px-5 text-sm font-bold text-on-block transition-transform group-hover:-translate-y-0.5">
						{t("openDetail")}
						<ArrowUpRight size={16} aria-hidden />
					</span>
				</div>
			</Link>
		</article>
	);
}

function ProjectTile({ project, color }: { project: ProjectCard; color: string }) {
	return (
		<article className={classNames("group h-full rounded-[1.75rem] p-3 text-on-block", color)}>
			<Link href={`/project/${project.slug}`} className="flex h-full flex-col gap-4">
				<div className="relative aspect-16/9 overflow-hidden rounded-[1.25rem] bg-on-block/8">
					<Image
						src={project.src}
						unoptimized={isSvgSource(project.src)}
						alt={project.title}
						fill
						sizes="(max-width: 768px) 100vw, 33vw"
						className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
					/>
				</div>
				<div className="flex flex-1 flex-col gap-2 px-2 pb-3">
					<ProjectMeta project={project} tone="dark" />
					<h3 className="flex items-start justify-between gap-3 text-2xl type-heading">
						{project.title}
						<ArrowUpRight
							size={22}
							aria-hidden
							className="mt-1 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
						/>
					</h3>
					<p className="line-clamp-3 text-sm leading-6 text-on-block/76">{project.result}</p>
				</div>
			</Link>
		</article>
	);
}
