import { AlertTriangle, Brain, ShieldCheck, Thermometer, X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { getShipment } from "../data/mock";

const AI_RECOMMENDATIONS = [
  {
    icon: "🔀",
    title: "Reroute melalui Jl. Gatot Subroto",
    desc: "Hindari kemacetan Tol Dalam Kota. Estimasi 23 menit lebih cepat.",
    tag: "Prioritas Utama",
    tagColor: "var(--primary-dark)",
    tagBg: "rgba(14,165,233,0.12)",
  },
  {
    icon: "🏪",
    title: "Handoff ke Cold Hub Cipinang",
    desc: "Cold storage terdekat 4.2 km. Kapasitas 28 ton tersedia.",
    tag: "Opsional",
    tagColor: "var(--success-dark)",
    tagBg: "var(--success-soft)",
  },
  {
    icon: "🚛",
    title: "Armada backup dari marketplace",
    desc: "2 unit reefer truck tersedia dalam 18 menit.",
    tag: "Alternatif",
    tagColor: "#7c3aed",
    tagBg: "rgba(124,58,237,0.10)",
  },
];

export function SmartAlertPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const s = id ? getShipment(id) : undefined;

  return (
    <div
      style={{
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        background: "radial-gradient(ellipse at 50% 0%, rgba(239,68,68,0.07) 0%, transparent 60%), var(--bg)",
        padding: "calc(20px + env(safe-area-inset-top)) 16px calc(24px + env(safe-area-inset-bottom))",
      }}
    >
      {/* Close button */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
        <button
          type="button"
          onClick={() => nav(-1)}
          style={{
            width: 38,
            height: 38,
            borderRadius: 12,
            background: "rgba(100,116,139,0.10)",
            border: "none",
            cursor: "pointer",
            display: "grid",
            placeItems: "center",
            color: "var(--text-secondary)",
          }}
        >
          <X size={18} />
        </button>
      </div>

      {/* Alert banner */}
      <div
        className="anim-scale"
        style={{
          background: "#fff",
          borderRadius: 22,
          padding: 22,
          border: "2px solid rgba(249,115,22,0.35)",
          boxShadow: "0 0 0 1px rgba(249,115,22,0.12), 0 20px 60px rgba(249,115,22,0.18)",
          marginBottom: 14,
          animation: "alertPulse 2.5s ease-in-out infinite, scaleIn 0.35s ease both",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 18,
              background: "rgba(249,115,22,0.15)",
              display: "grid",
              placeItems: "center",
              color: "var(--warning-dark)",
              flexShrink: 0,
            }}
          >
            <AlertTriangle size={28} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 900, fontSize: 19, color: "var(--text)", letterSpacing: "-0.02em" }}>
              AI Risk Detected
            </div>
            <div style={{ fontSize: 12.5, color: "var(--text-secondary)", marginTop: 3 }}>
              Diperlukan konfirmasi operasional
            </div>
          </div>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "var(--danger)",
              animation: "blink-dot 1s ease-in-out infinite",
            }}
          />
        </div>

        {/* Risk detail */}
        <div
          style={{
            marginTop: 18,
            padding: "14px 16px",
            borderRadius: 16,
            background: "rgba(239,68,68,0.06)",
            border: "1px solid rgba(239,68,68,0.18)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <span className="subtle" style={{ fontSize: 12 }}>Shipment</span>
            <span style={{ fontWeight: 800, fontSize: 14 }}>{s?.code ?? "SHP-2048"}</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
            <div style={{ padding: "10px 12px", borderRadius: 12, background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.15)" }}>
              <div style={{ fontSize: 11, color: "var(--text-tertiary)", fontWeight: 700, textTransform: "uppercase" }}>Freshness</div>
              <div style={{ fontSize: 20, fontWeight: 900, color: "var(--danger)", marginTop: 3 }}>{s?.freshnessPct ?? 72}%</div>
            </div>
            <div style={{ padding: "10px 12px", borderRadius: 12, background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.15)" }}>
              <div style={{ fontSize: 11, color: "var(--text-tertiary)", fontWeight: 700, textTransform: "uppercase" }}>Suhu</div>
              <div style={{ fontSize: 20, fontWeight: 900, color: "var(--warning-dark)", marginTop: 3, display: "flex", alignItems: "center", gap: 4 }}>
                <Thermometer size={16} />
                {s?.tempC ?? 6.2}°C
              </div>
            </div>
          </div>
          <p style={{ fontSize: 13.5, fontWeight: 600, color: "#9a3412", lineHeight: 1.55 }}>
            {s?.riskNote ?? "Suhu naik di atas baseline + kemacetan koridor tol dalam."}
          </p>
        </div>

        {/* AI Risk tags */}
        <div style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" }}>
          {["Thermal drift", "Congestion zona tol", "Freshness kritis", "Estimasi kerugian: Rp 2.4 jt"].map((tag) => (
            <span key={tag} className="chip chip-danger" style={{ fontSize: 11 }}>{tag}</span>
          ))}
        </div>
      </div>

      {/* AI Recommendations */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <Brain size={18} color="var(--primary-dark)" strokeWidth={1.6} />
          <span style={{ fontWeight: 800, fontSize: 15 }}>Rekomendasi AI</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {AI_RECOMMENDATIONS.map((rec, i) => (
            <div
              key={i}
              className={`anim-fade-up anim-delay-${i + 1}`}
              style={{
                background: "#fff",
                borderRadius: 16,
                padding: "14px 16px",
                border: "1px solid var(--border-light)",
                boxShadow: "var(--shadow-sm)",
                display: "flex",
                gap: 12,
                alignItems: "flex-start",
              }}
            >
              <div style={{ width: 40, height: 40, borderRadius: 12, background: "var(--surface-muted)", display: "grid", placeItems: "center", fontSize: 20, flexShrink: 0 }}>
                {rec.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                  <div style={{ fontWeight: 700, fontSize: 13.5, lineHeight: 1.3 }}>{rec.title}</div>
                  <span style={{ padding: "3px 8px", borderRadius: 99, background: rec.tagBg, color: rec.tagColor, fontSize: 10.5, fontWeight: 700, flexShrink: 0 }}>
                    {rec.tag}
                  </span>
                </div>
                <p className="subtle" style={{ marginTop: 4, fontSize: 12.5, lineHeight: 1.5 }}>{rec.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA buttons */}
      <div style={{ display: "grid", gap: 10 }}>
        <button
          type="button"
          className="btn btn-primary btn-block btn-lg"
          onClick={() => id && nav(`/app/reroute/${id}`)}
        >
          <ShieldCheck size={20} />
          Tinjau AI Rerouting
        </button>
        <button
          type="button"
          className="btn btn-primary outline btn-block"
          onClick={() => id && nav(`/app/marketplace/recommend/${id}`)}
        >
          Cari Armada / Cold Storage
        </button>
        <button
          type="button"
          className="btn btn-ghost btn-block"
          style={{ color: "var(--text-secondary)", fontSize: 13.5 }}
          onClick={() => nav(-1)}
        >
          Abaikan untuk sementara
        </button>
      </div>
    </div>
  );
}
