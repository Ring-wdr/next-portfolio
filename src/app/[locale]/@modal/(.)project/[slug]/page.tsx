import { Modal } from "@/shared/ui/modal";
import { ProjectDetailPage } from "@/pages-layer/project/[slug]";
import { projectDetailList } from "@/shared/constant/project-detail";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string; locale: string }>;
};

export default async function ProjectModal({ params }: Props) {
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
