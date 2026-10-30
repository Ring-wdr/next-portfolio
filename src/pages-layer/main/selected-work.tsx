import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import type { ProjectCard } from "@/shared/content/project";
import { classNames } from "@/shared/utils/classnames";
import { isSvgSource } from "@/shared/utils/image";

/** Lead project gets the wide feature slot; the rest share a grid below it. */
export function SelectedWork({ projects }: { projects: ProjectCard[] }) {
	const [lead, ...rest] = projects;
	if (!lead) return null;

	return (
		<div className="mt-12 flex flex-col gap-10 md:gap-12">
			<LeadProject project={lead} />
			{rest.length > 0 && (
				<ul className="grid gap-6 border-t border-border/70 pt-8 md:grid-cols-3 md:gap-8 md:pt-10">
					{rest.map((project) => (
						<li key={project.slug}>
							<ProjectTile project={project} />
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

function ProjectMeta({ project }: { project: ProjectCard }) {
	const categoryT = useTranslations("ProjectsPage.categories");
	const statusT = useTranslations("ProjectsPage.status");

	return (
		<div className="flex min-h-6 flex-wrap items-center gap-2">
			<p className="home-kicker text-muted-foreground/72">
				{categoryT(project.category)} · {project.year}
			</p>
			{project.status === "Live" && (
				<span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/12 px-2 py-0.5 text-[0.6875rem] font-semibold text-emerald-700 dark:text-emerald-300">
					<span aria-hidden className="h-1.5 w-1.5 rounded-full bg-current" />
					{statusT("Live")}
				</span>
			)}
		</div>
	);
}

function StackTags({ stack, limit }: { stack: string[]; limit: number }) {
	const shown = stack.slice(0, limit);
	const hidden = stack.length - shown.length;

	return (
		<ul className="flex flex-wrap gap-1.5">
			{shown.map((tech) => (
				<li
					key={tech}
					className="rounded-full border border-border/70 px-2.5 py-0.5 text-xs text-muted-foreground"
				>
					{tech}
				</li>
			))}
			{hidden > 0 && (
				<li className="px-1 py-0.5 text-xs text-muted-foreground/70">+{hidden}</li>
			)}
		</ul>
	);
}

function ProjectThumb({
	project,
	sizes,
	className,
}: {
	project: ProjectCard;
	sizes: string;
	className: string;
}) {
	return (
		<div className={classNames("relative overflow-hidden bg-secondary/40", className)}>
			<Image
				src={project.src}
				unoptimized={isSvgSource(project.src)}
				alt={project.title}
				fill
				sizes={sizes}
				className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
			/>
			<div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,14,18,0)_40%,rgba(12,14,18,0.24)_100%)]" />
		</div>
	);
}

function LeadProject({ project }: { project: ProjectCard }) {
	const t = useTranslations("ProjectsPage");

	return (
		<article className="group">
			<Link
				href={`/project/${project.slug}`}
				className="grid gap-6 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:items-center md:gap-10"
			>
				<ProjectThumb
					project={project}
					sizes="(max-width: 768px) 100vw, 55vw"
					className="aspect-16/10 rounded-[1.75rem]"
				/>
				<div className="flex flex-col gap-4">
					<ProjectMeta project={project} />
					<h3 className="text-3xl font-semibold tracking-[-0.04em] transition-colors group-hover:text-foreground/82 md:text-5xl">
						{project.title}
					</h3>
					<p className="text-sm leading-6 text-muted-foreground md:text-base md:leading-7">
						{project.description}
					</p>
					<p className="border-l-2 border-foreground/70 pl-4 text-sm leading-6 text-foreground/86 md:text-base md:leading-7">
						{project.impact}
					</p>
					{project.role && (
						<p className="text-sm text-muted-foreground">
							<span className="font-semibold text-foreground/80">
								{t("roleLabel")}
							</span>{" "}
							· {project.role}
						</p>
					)}
					<StackTags stack={project.techStack} limit={5} />
					<span className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold">
						{t("openDetail")}
						<ArrowUpRight
							size={16}
							className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
						/>
					</span>
				</div>
			</Link>
		</article>
	);
}

function ProjectTile({ project }: { project: ProjectCard }) {
	return (
		<article className="group h-full">
			{/* Thumbnail sits beside the text on phones so three tiles don't triple the scroll */}
			<Link
				href={`/project/${project.slug}`}
				className="grid h-full grid-cols-[minmax(0,1fr)_6.5rem] gap-4 md:flex md:flex-col md:gap-5"
			>
				<ProjectThumb
					project={project}
					sizes="(max-width: 768px) 104px, 33vw"
					className="order-last aspect-square rounded-2xl md:order-first md:aspect-16/10 md:rounded-[1.5rem]"
				/>
				<div className="flex min-w-0 flex-col gap-2.5">
					<ProjectMeta project={project} />
					<h3 className="flex items-start justify-between gap-3 text-xl font-semibold tracking-[-0.03em] md:text-2xl">
						{project.title}
						<ArrowUpRight
							size={18}
							aria-hidden
							className="mt-1 hidden shrink-0 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground md:block"
						/>
					</h3>
					<p className="line-clamp-2 text-sm leading-6 text-muted-foreground">
						{project.result}
					</p>
					<div className="hidden md:mt-auto md:block md:pt-1">
						<StackTags stack={project.techStack} limit={3} />
					</div>
				</div>
			</Link>
		</article>
	);
}
