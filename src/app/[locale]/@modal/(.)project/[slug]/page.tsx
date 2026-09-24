import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ProjectDetailPage } from "@/pages-layer/project/[slug]";
import { getProjectBySlug } from "@/shared/content/project-source";
import { Modal } from "@/shared/ui/modal";

export default async function ProjectModal({
	params,
}: PageProps<"/[locale]/project/[slug]">) {
	const { locale, slug } = await params;
	setRequestLocale(locale);
	const project = await getProjectBySlug(slug);

	if (!project) {
		notFound();
	}

	return (
		<Modal>
			<ProjectDetailPage project={project} />
		</Modal>
	);
}
