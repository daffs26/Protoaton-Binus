import { Clock, Leaf, Navigation, ShieldCheck, Thermometer, Wind } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { MapMock } from "../components/MapMock";

export function NavigationPage() {
  const { id } = useParams();
  const nav = useNavigate();

  const STEPS = [
    { dist: "0.4 km", dir: "Belok kanan", road: "Jl. Gatot Subroto", icon: "→" },
    { dist: "2.4 km", dir: "Keluar tol", road: "Tol Jagorawi exit 5", icon: "↗" },
    { dist: "1.1 km", dir: "Terus lurus", road: "Jl. Semanggi Raya", icon: "↑" },
    { dist: "200 m", dir: "Belok kiri", road: "Tujuan: RS Siloam Semanggi", icon: "↖" },
  ];

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: "100%", background: "#fff" }}>
      {/* Top bar */}
      <div
        style={{
          padding: "calc(10px + env(safe-area-inset-top)) 14px 10px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 10,
          background: "#fff",
          borderBottom: "1px solid var(--border-light)",
          zIndex: 10,
        }}
      >
        <button
          type="button"
          onClick={() => nav(-1)}
          style={{
            width: 36,
            height: 36,
            borderRadius: 11,
            background: "var(--surface-muted)",
            border: "none",
            cursor: "pointer",
            display: "grid",
            placeItems: "center",
            color: "var(--text-secondary)",
            fontSize: 18,
            flexShrink: 0,
          }}
        >
          ←
        </button>

        {/* Next maneuver */}
        <div
          style={{
            flex: 1,
            padding: "8px 12px",
            borderRadius: 12,
            background: "rgba(14,165,233,0.08)",
            border: "1px solid rgba(14,165,233,0.20)",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 10,
              background: "var(--primary)",
              display: "grid",
              placeItems: "center",
              color: "#fff",
              fontWeight: 900,
              fontSize: 16,
            }}
          >
            →
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "var(--primary-dark)" }}>0.4 km</div>
            <div style={{ fontSize: 14, fontWeight: 800, color: "var(--text)" }}>Belok kanan</div>
          </div>
        </div>

        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <div style={{ fontSize: 11, color: "var(--text-tertiary)", fontWeight: 600 }}>ETA AI</div>
          <div style={{ fontSize: 18, fontWeight: 900, color: "var(--primary-dark)", letterSpacing: "-0.03em" }}>18:09</div>
        </div>
      </div>

      {/* Map */}
      <div style={{ flex: 1, padding: "0 12px", marginTop: 10 }}>
        <MapMock variant="nav" showNewRoute />
      </div>

      {/* Live stats bar */}
      <div
        style={{
          padding: "12px 16px",
          background: "#fff",
          borderTop: "1px solid var(--border-light)",
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8, marginBottom: 12 }}>
          {[
            { label: "ETA", value: "18:09", icon: <Clock size={14} />, color: "var(--primary)" },
            { label: "Sisa jarak", value: "5.2 km", icon: <Navigation size={14} />, color: "var(--text)" },
            { label: "Suhu kabin", value: "5.1°C", icon: <Thermometer size={14} />, color: "var(--success)" },
            { label: "Freshness", value: "78%", icon: <Leaf size={14} />, color: "var(--warning-dark)" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                textAlign: "center",
                padding: "8px 4px",
                borderRadius: 12,
                background: "var(--surface-muted)",
              }}
            >
              <div style={{ color: stat.color, display: "flex", justifyContent: "center", marginBottom: 2 }}>{stat.icon}</div>
              <div style={{ fontSize: 13.5, fontWeight: 900, color: stat.color }}>{stat.value}</div>
              <div style={{ fontSize: 10, color: "var(--text-tertiary)", fontWeight: 600 }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Freshness live strip */}
        <div
          style={{
            padding: "10px 14px",
            borderRadius: 12,
            background: "rgba(14,165,233,0.06)",
            border: "1px solid rgba(14,165,233,0.18)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Wind size={16} color="var(--primary)" />
            <div>
              <div style={{ fontSize: 12.5, fontWeight: 700 }}>Rute AI aktif — hembusan dingin stabil</div>
              <div style={{ fontSize: 11.5, color: "var(--text-secondary)", marginTop: 1 }}>Shipment {id} · suhu terjaga</div>
            </div>
          </div>
          <span className="chip chip-success" style={{ fontSize: 10.5 }}>AI ON</span>
        </div>

        {/* Route steps preview */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 8 }}>Panduan Rute</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {STEPS.slice(0, 3).map((step, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 10,
                  alignItems: "center",
                  padding: "8px 10px",
                  borderRadius: 10,
                  background: i === 0 ? "rgba(14,165,233,0.08)" : "var(--surface-muted)",
                  border: i === 0 ? "1px solid rgba(14,165,233,0.20)" : "none",
                }}
              >
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 9,
                    background: i === 0 ? "var(--primary)" : "rgba(100,116,139,0.15)",
                    display: "grid",
                    placeItems: "center",
                    fontSize: 15,
                    color: i === 0 ? "#fff" : "var(--text-secondary)",
                    fontWeight: 800,
                    flexShrink: 0,
                  }}
                >
                  {step.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: i === 0 ? 700 : 600, fontSize: 13 }}>{step.dir}</div>
                  <div style={{ fontSize: 11.5, color: "var(--text-secondary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {step.road}
                  </div>
                </div>
                <div style={{ fontSize: 12, fontWeight: 700, color: i === 0 ? "var(--primary-dark)" : "var(--text-tertiary)", flexShrink: 0 }}>
                  {step.dist}
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="btn btn-success btn-block btn-lg"
          onClick={() => id && nav(`/app/delivery-success/${id}`)}
        >
          <ShieldCheck size={20} />
          Tandai Pengiriman Selesai
        </button>
      </div>
    </div>
  );
}
