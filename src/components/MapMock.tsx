import { useId, useEffect, useState } from "react";

type MapMockProps = {
  variant?: "preview" | "full" | "nav" | "heatmap" | "compare";
  highlightRisk?: boolean;
  showNewRoute?: boolean;
  shipmentId?: string;
};

export function MapMock({
  variant = "preview",
  highlightRisk = false,
  showNewRoute = false,
}: MapMockProps) {
  const uid = useId().replace(/:/g, "");
  const gridId = `grid-${uid}`;
  const pathId = `path-${uid}`;

  const h =
    variant === "full"
      ? 220
      : variant === "nav"
      ? 340
      : variant === "heatmap"
      ? 280
      : variant === "compare"
      ? 160
      : 150;

  // Animated truck position
  const [truckPct, setTruckPct] = useState(28);
  useEffect(() => {
    const id = setInterval(() => {
      setTruckPct((p) => {
        if (p >= 80) return 28;
        return p + 0.4;
      });
    }, 80);
    return () => clearInterval(id);
  }, []);

  // Interpolate truck position along the main path
  const pathPoints = [
    { x: 40, y: 150 },
    { x: 110, y: 120 },
    { x: 190, y: 70 },
    { x: 260, y: 55 },
    { x: 310, y: 48 },
  ];

  function lerp(a: number, b: number, t: number) {
    return a + (b - a) * t;
  }

  function getPointOnPath(pct: number) {
    const t = pct / 100;
    const segCount = pathPoints.length - 1;
    const seg = Math.min(Math.floor(t * segCount), segCount - 1);
    const segT = t * segCount - seg;
    return {
      x: lerp(pathPoints[seg].x, pathPoints[seg + 1].x, segT),
      y: lerp(pathPoints[seg].y, pathPoints[seg + 1].y, segT),
    };
  }

  const truck = getPointOnPath(truckPct);

  if (variant === "heatmap") {
    return (
      <div
        className="map-wrap"
        style={{
          height: h,
          background: "linear-gradient(165deg, #e0f2fe 0%, #f8fafc 50%, #dbeafe 100%)",
        }}
      >
        <svg width="100%" height="100%" viewBox="0 0 360 280" preserveAspectRatio="none" style={{ display: "block" }}>
          <defs>
            <pattern id={gridId} width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(148,163,184,0.15)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${gridId})`} />
          {/* Simplified Indonesia-like islands */}
          <ellipse cx="180" cy="140" rx="140" ry="55" fill="rgba(203,213,225,0.4)" />
          <ellipse cx="90" cy="160" rx="55" ry="30" fill="rgba(203,213,225,0.35)" />
          <ellipse cx="270" cy="150" rx="60" ry="25" fill="rgba(203,213,225,0.35)" />
        </svg>
        {/* Overlay chips */}
        <div style={{ position: "absolute", left: 12, top: 12, display: "flex", gap: 8 }}>
          <span className="chip chip-live">
            <span className="pulse-dot" style={{ width: 7, height: 7 }} />
            Demand Live
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="map-wrap"
      style={{
        height: h,
        background: "linear-gradient(165deg, #e0f2fe 0%, #f8fafc 45%, #dbeafe 100%)",
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 360 200"
        preserveAspectRatio="none"
        style={{ display: "block" }}
      >
        <defs>
          <pattern id={gridId} width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(148,163,184,0.18)" strokeWidth="1" />
          </pattern>
          <path
            id={pathId}
            d="M 40 150 C 80 130 130 90 190 70 S 260 50 310 48"
          />
          <linearGradient id="riskGrad" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${gridId})`} />

        {/* Road-like background path — old/risky route */}
        {highlightRisk && (
          <path
            d="M 40 150 Q 140 90 200 80 T 310 48"
            fill="none"
            stroke="#fde68a"
            strokeWidth="12"
            strokeLinecap="round"
            opacity="0.5"
          />
        )}

        {/* Old risk route (dashed orange) */}
        {highlightRisk && (
          <path
            d="M 40 150 Q 140 90 200 80 T 310 48"
            fill="none"
            stroke={highlightRisk ? "#f97316" : "#94a3b8"}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="9 7"
            opacity={0.75}
          />
        )}

        {/* Main (AI/safe) route background */}
        <path
          d="M 40 150 C 80 130 130 90 190 70 S 260 50 310 48"
          fill="none"
          stroke="rgba(56,189,248,0.22)"
          strokeWidth="10"
          strokeLinecap="round"
        />

        {/* Main AI route (solid cyan) */}
        <path
          d="M 40 150 C 80 130 130 90 190 70 S 260 50 310 48"
          fill="none"
          stroke={showNewRoute ? "#10b981" : "#0ea5e9"}
          strokeWidth={showNewRoute ? 4 : 3.5}
          strokeLinecap="round"
          opacity={0.95}
        />

        {/* Risk zone pulsing circle */}
        {highlightRisk && (
          <>
            <circle cx="200" cy="82" r="18" fill="rgba(249,115,22,0.12)" />
            <circle cx="200" cy="82" r="11" fill="rgba(249,115,22,0.22)" stroke="#f97316" strokeWidth="2" />
          </>
        )}

        {/* Origin dot */}
        <circle cx="40" cy="150" r="8" fill="#fff" stroke="#0ea5e9" strokeWidth="2.5" />
        <circle cx="40" cy="150" r="3" fill="#0ea5e9" />

        {/* Destination dot */}
        <circle cx="310" cy="48" r="8" fill="#10b981" stroke="#fff" strokeWidth="2.5" />
        <circle cx="310" cy="48" r="3" fill="#fff" />

        {/* Animated truck */}
        <g transform={`translate(${truck.x}, ${truck.y})`}>
          <rect x="-10" y="-7" width="20" height="14" rx="4" fill="var(--primary)" />
          <rect x="-14" y="-4" width="6" height="8" rx="2" fill="var(--primary-dark)" />
          <circle cx="-6" cy="8" r="3.5" fill="#1e293b" />
          <circle cx="6" cy="8" r="3.5" fill="#1e293b" />
          <circle cx="-6" cy="8" r="1.5" fill="#94a3b8" />
          <circle cx="6" cy="8" r="1.5" fill="#94a3b8" />
          {/* Snowflake indicator */}
          <text x="0" y="4" textAnchor="middle" fontSize="8" fill="#fff" fontFamily="system-ui">❄</text>
        </g>

        {/* Road labels */}
        {variant === "nav" && (
          <>
            <text x="125" y="108" fontSize="9" fill="#475569" fontFamily="inherit" textAnchor="middle" transform="rotate(-25,125,108)">
              Jl. Gatot Subroto
            </text>
            <text x="240" y="60" fontSize="9" fill="#475569" fontFamily="inherit" textAnchor="middle">
              Tol Jagorawi
            </text>
          </>
        )}
      </svg>

      {/* Overlay labels */}
      <div
        style={{
          position: "absolute",
          left: 10,
          top: 10,
          display: "flex",
          gap: 7,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <span className="chip chip-live">
          <span className="pulse-dot" style={{ width: 7, height: 7 }} />
          Live tracking
        </span>
        {highlightRisk ? (
          <span className="chip chip-warn">⚠ Risk zone</span>
        ) : showNewRoute ? (
          <span className="chip chip-success">✓ Rute AI aman</span>
        ) : (
          <span className="chip chip-success">Route stable</span>
        )}
      </div>

      {/* Nav card overlay */}
      {variant === "nav" && (
        <div
          style={{
            position: "absolute",
            bottom: 10,
            left: 10,
            right: 10,
            background: "rgba(255,255,255,0.94)",
            backdropFilter: "blur(10px)",
            borderRadius: 14,
            padding: "12px 14px",
            border: "1px solid rgba(226,232,240,0.9)",
            boxShadow: "0 8px 24px rgba(15,23,42,0.08)",
          }}
        >
          <div style={{ fontSize: 11.5, color: "#64748b", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>
            Manuver berikutnya
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, marginTop: 4, color: "var(--text)" }}>
            Keluar Tol Jagorawi · 2.4 km
          </div>
          <div style={{ fontSize: 12.5, color: "#0284c7", marginTop: 3, fontWeight: 600 }}>
            Belok kanan → Jl. Raya Bogor
          </div>
        </div>
      )}
    </div>
  );
}
