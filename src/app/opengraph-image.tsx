import { ImageResponse } from "@vercel/og";

export const runtime = "nodejs";

export const alt =
  "Fascord Limited | Premium Global Express Logistics & Courier Services";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#0c1b33",
        padding: "60px 80px",
        fontFamily: "sans-serif",
        color: "#ffffff",
        position: "relative",
      }}
    >
      {/* Background Accent glow */}
      <div
        style={{
          position: "absolute",
          top: "-150px",
          right: "-150px",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          backgroundColor: "#ff3b30",
          opacity: 0.15,
          filter: "blur(100px)",
        }}
      />

      {/* Header Branding */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              backgroundColor: "#ff3b30",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 900,
              fontSize: "28px",
              color: "#ffffff",
            }}
          >
            F
          </div>
          <span
            style={{
              fontSize: "32px",
              fontWeight: 800,
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            FASCORD
          </span>
        </div>

        <div
          style={{
            padding: "8px 20px",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderRadius: "999px",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            fontSize: "18px",
            fontWeight: 600,
            color: "#f3f4f6",
          }}
        >
          UK & Global Logistics Hub
        </div>
      </div>

      {/* Main Hero Tagline */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <h1
          style={{
            fontSize: "56px",
            fontWeight: 900,
            lineHeight: 1.15,
            letterSpacing: "-1px",
            margin: 0,
            color: "#ffffff",
            maxWidth: "900px",
          }}
        >
          GLOBAL EXPRESS COURIER & FREIGHT FORWARDING
        </h1>
        <p
          style={{
            fontSize: "24px",
            color: "#9ca3af",
            margin: 0,
            lineHeight: 1.4,
            maxWidth: "850px",
          }}
        >
          Door-to-door domestic UK and international cargo delivery to 240+
          countries. Fast, verified, and trackable.
        </p>
      </div>

      {/* Footer Features Bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: "1px solid rgba(255, 255, 255, 0.15)",
          paddingTop: "32px",
        }}
      >
        <div style={{ display: "flex", gap: "36px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: "#22c55e",
              }}
            />
            <span style={{ fontSize: "18px", fontWeight: 600 }}>
              Live Telemetry Tracking
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: "#ff3b30",
              }}
            />
            <span style={{ fontSize: "18px", fontWeight: 600 }}>
              240+ World Destinations
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: "#3b82f6",
              }}
            />
            <span style={{ fontSize: "18px", fontWeight: 600 }}>
              Instant Online Quotes
            </span>
          </div>
        </div>

        <div style={{ fontSize: "20px", fontWeight: 700, color: "#ff3b30" }}>
          fascord.co.uk
        </div>
      </div>
    </div>,
    {
      ...size,
    },
  );
}
