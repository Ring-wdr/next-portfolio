import { notFound } from "next/navigation";
import { ProjectDetailPage } from "@/pages-layer/project/[slug]";
import { projectDetailList } from "@/shared/constant/project-detail";
import { Modal } from "@/shared/ui/modal";

export default async function ProjectModal({
	params,
}: PageProps<"/[locale]/project/[slug]">) {
	const { slug } = await params;
	const project = projectDetailList.find((p) => p.slug === slug);

	if (!project) {
		notFound();
	}

	return (
		<Modal>
			<ProjectDetailPage project={project} />
		</Modal>
	);
}
