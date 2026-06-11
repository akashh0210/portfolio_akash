import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function AboutOgImage() {
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
        {/* Top-right label */}
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
          About
        </div>

        {/* Role chips */}
        <div style={{ display: "flex", gap: 10, marginBottom: 32 }}>
          {["AI PM", "Builder", "Open to Work"].map((tag) => (
            <div
              key={tag}
              style={{
                fontSize: 13,
                color: "#6b6b72",
                fontFamily: "monospace",
                letterSpacing: "0.08em",
                border: "1px solid #2a2a30",
                borderRadius: 6,
                padding: "5px 12px",
              }}
            >
              {tag}
            </div>
          ))}
        </div>

        {/* Name */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "#f7f7f5",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
          }}
        >
          Sk Akash Ali
        </div>

        {/* Tagline */}
        <div
          style={{
            marginTop: 16,
            fontSize: 22,
            color: "#9b9ba3",
            lineHeight: 1.4,
            maxWidth: 700,
          }}
        >
          I work at the intersection of product strategy and engineering —
          structuring messy problems into crisp specs, then building the
          prototype to validate the solution.
        </div>

        {/* Bottom byline */}
        <div
          style={{
            marginTop: 40,
            fontSize: 14,
            color: "#8fb0c4",
            fontFamily: "monospace",
            letterSpacing: "0.06em",
          }}
        >
          portfolio-akash-seven.vercel.app/about
        </div>
      </div>
    ),
    { ...size }
  );
}
