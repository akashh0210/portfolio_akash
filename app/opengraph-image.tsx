import { ImageResponse } from "next/og";

export const alt = "Sk Akash Ali — AI PM & Builder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
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
          justifyContent: "center",
          padding: "80px 96px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 15,
            color: "#8fb0c4",
            fontFamily: "monospace",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          AI PM &amp; Builder
        </div>

        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "#f7f7f5",
            lineHeight: 1.05,
            marginBottom: 24,
          }}
        >
          Sk Akash Ali
        </div>

        <div
          style={{
            fontSize: 26,
            color: "#9b9ba3",
            lineHeight: 1.5,
          }}
        >
          Products that move metrics.
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 64,
            right: 96,
            fontSize: 14,
            color: "#6b6b72",
            fontFamily: "monospace",
          }}
        >
          akashali.vercel.app
        </div>
      </div>
    ),
    { ...size }
  );
}
