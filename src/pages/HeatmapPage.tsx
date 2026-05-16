import { MapPin } from "lucide-react";
import { MapMock } from "../components/MapMock";
import { Card, SectionHeader } from "../components/Ui";
import { MOCK_HEATMAP_ZONES } from "../data/mock";

const DEMAND_COLORS = {
  critical: "#ef4444",
  high: "#f97316",
  medium: "#eab308",
  low: "#22c55e",
};

const DEMAND_LABELS = {
  critical: "Sangat Tinggi",
  high: "Tinggi",
  medium: "Sedang",
  low: "Rendah",
};

export function HeatmapPage() {
  return (
    <div className="screen-scroll no-tab" style={{ padding: "calc(16px + env(safe-area-inset-top)) 16px 24px" }}>
      <div style={{ marginBottom: 18 }}>
        <h1 className="page-title" style={{ fontSize: 20 }}>Demand Heatmap</h1>
        <p className="subtle" style={{ marginTop: 4 }}>Prediksi AI permintaan per distrik · Jabodetabek</p>
      </div>

      {/* Legend */}
      <div
        className="anim-fade-up"
        style={{
          display: "flex",
          gap: 12,
          marginBottom: 14,
          padding: "10px 14px",
          borderRadius: 12,
          background: "#fff",
          border: "1px solid var(--border-light)",
          flexWrap: "wrap",
        }}
      >
        {Object.entries(DEMAND_COLORS).map(([k, c]) => (
          <div key={k} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
            <span style={{ fontSize: 11.5, fontWeight: 600, color: "var(--text-secondary)" }}>
              {DEMAND_LABELS[k as keyof typeof DEMAND_LABELS]}
            </span>
          </div>
        ))}
      </div>

      {/* Heatmap SVG Map */}
      <div className="anim-fade-up anim-delay-1" style={{ marginBottom: 16 }}>
        <div
          style={{
            borderRadius: 18,
            overflow: "hidden",
            border: "1px solid rgba(14,165,233,0.20)",
            background: "linear-gradient(165deg, #e0f2fe 0%, #f0f9ff 50%, #dbeafe 100%)",
            position: "relative",
            height: 280,
          }}
        >
          {/* Background SVG map */}
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 360 280"
            style={{ position: "absolute", inset: 0 }}
          >
            <defs>
              <pattern id="hmgrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(148,163,184,0.15)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hmgrid)" />
            {/* Simplified Jabodetabek outline */}
            <ellipse cx="180" cy="140" rx="155" ry="90" fill="rgba(203,213,225,0.30)" stroke="rgba(148,163,184,0.25)" strokeWidth="1" />
          </svg>

          {/* Heatmap dots */}
          {MOCK_HEATMAP_ZONES.map((zone) => {
            const color = DEMAND_COLORS[zone.demand as keyof typeof DEMAND_COLORS];
            const size = zone.demand === "critical" ? 52 : zone.demand === "high" ? 42 : 30;
            return (
              <div
                key={zone.id}
                style={{
                  position: "absolute",
                  left: `${zone.x}%`,
                  top: `${zone.y}%`,
                  width: size,
                  height: size,
                  borderRadius: "50%",
                  background: color,
                  opacity: zone.demand === "critical" ? 0.55 : zone.demand === "high" ? 0.45 : 0.30,
                  transform: "translate(-50%, -50%)",
                  animation: `blink-dot ${zone.demand === "critical" ? "1.2s" : "2s"} ease-in-out infinite`,
                }}
              />
            );
          })}

          {/* Labels */}
          {MOCK_HEATMAP_ZONES.map((zone) => (
            <div
              key={`label-${zone.id}`}
              style={{
                position: "absolute",
                left: `${zone.x}%`,
                top: `${zone.y}%`,
                transform: "translate(-50%, calc(-50% - 22px))",
                background: "rgba(255,255,255,0.92)",
                padding: "2px 8px",
                borderRadius: 99,
                fontSize: 9.5,
                fontWeight: 800,
                color: "var(--text)",
                border: "1px solid var(--border-light)",
                whiteSpace: "nowrap",
                boxShadow: "0 2px 6px rgba(15,23,42,0.08)",
              }}
            >
              {zone.name}
            </div>
          ))}

          {/* Chips overlay */}
          <div style={{ position: "absolute", left: 12, top: 12, display: "flex", gap: 8 }}>
            <span className="chip chip-live">
              <span className="pulse-dot" style={{ width: 7, height: 7 }} />
              AI Demand Live
            </span>
          </div>
        </div>
      </div>

      {/* Zone list */}
      <SectionHeader title="Prediksi Permintaan per Zona" />
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {MOCK_HEATMAP_ZONES.map((zone, i) => {
          const demandColor = DEMAND_COLORS[zone.demand as keyof typeof DEMAND_COLORS];
          const riskConfig = {
            high: { bg: "var(--danger-soft)", color: "var(--danger-dark)" },
            medium: { bg: "var(--warning-soft)", color: "var(--warning-dark)" },
            low: { bg: "var(--success-soft)", color: "var(--success-dark)" },
          }[zone.risk];

          return (
            <Card key={zone.id} className={`anim-fade-up anim-delay-${Math.min(i + 1, 5)}`}>
              <div style={{ padding: "14px 16px", display: "flex", gap: 12, alignItems: "center" }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    background: `${demandColor}20`,
                    display: "grid",
                    placeItems: "center",
                    flexShrink: 0,
                    color: demandColor,
                  }}
                >
                  <MapPin size={20} strokeWidth={1.8} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{zone.name}</div>
                  <div style={{ display: "flex", gap: 8, marginTop: 5 }}>
                    <span
                      style={{
                        padding: "2px 9px",
                        borderRadius: 99,
                        fontSize: 10.5,
                        fontWeight: 800,
                        background: `${demandColor}18`,
                        color: demandColor,
                      }}
                    >
                      Demand: {DEMAND_LABELS[zone.demand as keyof typeof DEMAND_LABELS]}
                    </span>
                    <span
                      style={{
                        padding: "2px 9px",
                        borderRadius: 99,
                        fontSize: 10.5,
                        fontWeight: 800,
                        background: riskConfig?.bg,
                        color: riskConfig?.color,
                      }}
                    >
                      Risiko: {zone.risk === "high" ? "Tinggi" : zone.risk === "medium" ? "Sedang" : "Rendah"}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
