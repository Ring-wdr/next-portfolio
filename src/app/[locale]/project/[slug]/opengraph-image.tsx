import { ImageResponse } from "next/og";
import { projectDetailList } from "@/shared/constant/project-detail";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projectDetailList.find((item) => item.slug === slug);

  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "stretch",
          background: "linear-gradient(135deg, #020617 0%, #111827 55%, #172554 100%)",
          color: "#f8fafc",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          padding: "56px",
          width: "100%",
        }}
      >
        <div
          style={{
            border: "1px solid rgba(125, 211, 252, 0.32)",
            borderRadius: 9999,
            color: "#7dd3fc",
            display: "flex",
            fontSize: 24,
            letterSpacing: "0.14em",
            padding: "12px 20px",
            textTransform: "uppercase",
            width: "auto",
          }}
        >
          Case Study
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 900 }}>
          <div style={{ display: "flex", fontSize: 68, fontWeight: 700, lineHeight: 1.05 }}>
            {project?.title ?? "Project"}
          </div>
          <div style={{ display: "flex", fontSize: 28, lineHeight: 1.35, color: "#cbd5e1" }}>
            {project?.summary ?? "Frontend project case study from Manjoong Kim Portfolio"}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#94a3b8" }}>
          manjoong kim · frontend portfolio
        </div>
      </div>
    ),
    size
  );
}
