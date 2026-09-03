import { ImageResponse } from "next/og";

export const alt = "Alesia Nails Szczecin — delikatny manicure i stylizacja paznokci";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "linear-gradient(135deg, #FFFAF5 0%, #F3E9DB 55%, #E7D6BE 100%)",
          color: "#302720",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#9C8B7C",
          }}
        >
          Szczecin — Centrum
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 92, lineHeight: 1.02 }}>
            Alesia Nails
          </div>
          <div style={{ display: "flex", fontSize: 92, color: "#7B6A5D", lineHeight: 1.02 }}>
            Szczecin
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 30,
              color: "#7B6A5D",
              maxWidth: 820,
            }}
          >
            Delikatny manicure, precyzyjna stylizacja i kobiecy detal.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 24,
            color: "#7B6A5D",
            borderTop: "1px solid rgba(38,35,31,0.14)",
            paddingTop: 24,
          }}
        >
          @nails_alesia_szczecin
        </div>
      </div>
    ),
    size,
  );
}
