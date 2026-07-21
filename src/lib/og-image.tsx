import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${SITE_NAME} — crypto account recovery`;

export function renderOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#10231e",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div style={{ width: 14, height: 56, background: "#18a058", borderRadius: 99 }} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontSize: 34,
                fontWeight: 800,
                color: "#ffffff",
                letterSpacing: "0.14em",
              }}
            >
              CORESEC
            </span>
            <span
              style={{
                fontSize: 17,
                fontWeight: 700,
                color: "#18a058",
                letterSpacing: "0.42em",
              }}
            >
              FINANCE
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontSize: 88,
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1.02,
              letterSpacing: "-0.035em",
            }}
          >
            Frozen crypto
          </span>
          <span
            style={{
              fontSize: 88,
              fontWeight: 800,
              color: "#18a058",
              lineHeight: 1.02,
              letterSpacing: "-0.035em",
            }}
          >
            account recovery
          </span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid rgba(255,255,255,0.12)",
            paddingTop: "32px",
          }}
        >
          <span style={{ fontSize: 26, color: "rgba(255,255,255,0.6)" }}>
            AML holds · stalled KYC · compliance reviews
          </span>
          <span style={{ fontSize: 26, color: "rgba(255,255,255,0.4)" }}>
            {SITE_URL.replace(/^https?:\/\//, "")}
          </span>
        </div>
      </div>
    ),
    size,
  );
}
