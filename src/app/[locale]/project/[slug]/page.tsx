import { ProjectDetailPage } from "@/pages-layer/project/[slug]";
import { projectDetailList } from "@/shared/constant/project-detail";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string; locale: string }>;
};

export async function generateStaticParams() {
  return projectDetailList.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projectDetailList.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} - Manjoong Portfolio`,
    description: project.summary,
    openGraph: {
      title: `${project.title} - Manjoong Portfolio`,
      description: project.summary,
      images:
        typeof project.thumbnail === "string"
          ? [project.thumbnail]
          : [project.thumbnail.src],
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const project = projectDetailList.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailPage project={project} />;
}
