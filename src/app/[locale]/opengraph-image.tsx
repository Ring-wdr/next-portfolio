import { ImageResponse } from "next/og";
import { siteConfig } from "@/shared/constant/site";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "stretch",
          background: "linear-gradient(135deg, #0f172a 0%, #111827 45%, #1f2937 100%)",
          color: "#f8fafc",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          padding: "64px",
          width: "100%",
        }}
      >
        <div
          style={{
            border: "1px solid rgba(148, 163, 184, 0.25)",
            borderRadius: 9999,
            color: "#93c5fd",
            display: "flex",
            fontSize: 28,
            letterSpacing: "0.18em",
            padding: "14px 24px",
            textTransform: "uppercase",
            width: "auto",
          }}
        >
          Frontend Portfolio
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 840 }}>
          <div style={{ display: "flex", fontSize: 72, fontWeight: 700, lineHeight: 1.08 }}>
            Manjoong Kim
          </div>
          <div style={{ display: "flex", fontSize: 30, lineHeight: 1.4, color: "#cbd5e1" }}>
            Product-focused frontend case studies, interaction design, and engineering outcomes.
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#94a3b8" }}>{siteConfig.siteUrl}</div>
      </div>
    ),
    size
  );
}
