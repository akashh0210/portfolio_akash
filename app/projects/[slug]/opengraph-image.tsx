import { ImageResponse } from "next/og";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export default async function ProjectOgImage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  const title = project?.title ?? "Case Study";
  const metric = project?.metric ?? { value: "", label: "" };
  const status = project?.status ?? "Shipped";

  return new ImageResponse(
    (
      <div
        style={{
          background: "#0c0c0e",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          padding: "64px 80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Top-right status chip */}
        <div
          style={{
            position: "absolute",
            top: 56,
            right: 80,
            fontSize: 13,
            color: "#8fb0c4",
            fontFamily: "monospace",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            border: "1px solid #2a3a45",
            borderRadius: 6,
            padding: "6px 14px",
          }}
        >
          {status}
        </div>

        {/* Metric */}
        {metric.value && (
          <div style={{ display: "flex", flexDirection: "column", marginBottom: 32 }}>
            <div
              style={{
                fontSize: 80,
                fontWeight: 700,
                color: "#8fb0c4",
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}
            >
              {metric.value}
            </div>
            <div
              style={{
                fontSize: 14,
                color: "#6b6b72",
                fontFamily: "monospace",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginTop: 8,
              }}
            >
              {metric.label}
            </div>
          </div>
        )}

        {/* Title */}
        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: "#f7f7f5",
            lineHeight: 1.1,
            letterSpacing: "-0.01em",
            maxWidth: 900,
          }}
        >
          {title}
        </div>

        {/* Byline */}
        <div
          style={{
            marginTop: 20,
            fontSize: 16,
            color: "#9b9ba3",
            fontFamily: "monospace",
          }}
        >
          Sk Akash Ali — AI PM &amp; Builder
        </div>
      </div>
    ),
    { ...size }
  );
}
