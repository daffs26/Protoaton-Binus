import { ArrowRight, CheckCircle2, Clock, ShieldCheck, TrendingDown, Zap } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { MapMock } from "../components/MapMock";
import { Card, PageHeader } from "../components/Ui";
import { getShipment } from "../data/mock";

export function ReroutePage() {
  const { id } = useParams();
  const nav = useNavigate();
  const s = id ? getShipment(id) : undefined;

  const oldRoute = {
    name: "Tol Dalam Kota → JORR E",
    eta: "18:42",
    risk: "Tinggi",
    freshnessEnd: 68,
    distance: "28.4 km",
    issues: ["Kemacetan 3 titik", "Thermal drift aktif", "Freshness -8% projeksikan"],
  };

  const newRoute = {
    name: "Jl. Gatot Subroto → Semanggi",
    eta: "18:09",
    risk: "Rendah",
    freshnessEnd: 81,
    distance: "22.1 km",
    issues: ["Suhu stabil", "ETA 33 menit lebih cepat", "Freshness +13% terjaga"],
  };

  return (
    <div className="screen-scroll no-tab" style={{ padding: "calc(12px + env(safe-area-inset-top)) 16px 24px" }}>
      <PageHeader title="AI Rerouting" subtitle="Rekomendasi rute aman berbasis AI" back />

      {/* AI badge */}
      <div className="anim-fade-up" style={{ marginBottom: 16 }}>
        <div
          style={{
            padding: "14px 16px",
            borderRadius: 16,
            background: "rgba(14,165,233,0.07)",
            border: "1px solid rgba(14,165,233,0.22)",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(14,165,233,0.15)", display: "grid", placeItems: "center", color: "var(--primary-dark)", flexShrink: 0 }}>
            <Zap size={20} strokeWidth={1.7} />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 14 }}>AI Route Optimizer aktif</div>
            <p className="subtle" style={{ fontSize: 12.5, marginTop: 2 }}>
              Analisis 247 variabel rute · Confidence 96% · Diperbarui 2 mnt lalu
            </p>
          </div>
        </div>
      </div>

      {/* Maps comparison */}
      <div className="anim-fade-up anim-delay-1" style={{ marginBottom: 14 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: "var(--warning-dark)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6, textAlign: "center" }}>
              ⚠ Rute Lama
            </div>
            <MapMock variant="compare" highlightRisk />
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: "var(--success-dark)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6, textAlign: "center" }}>
              ✓ Rute AI Baru
            </div>
            <MapMock variant="compare" showNewRoute />
          </div>
        </div>
      </div>

      {/* Route comparison cards */}
      <div className="anim-fade-up anim-delay-2" style={{ marginBottom: 14 }}>
        <div style={{ display: "grid", gap: 10 }}>
          {/* Old route */}
          <Card>
            <div style={{ padding: "16px 18px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 800, color: "var(--warning-dark)", textTransform: "uppercase", letterSpacing: "0.04em" }}>Rute Saat Ini</div>
                  <div style={{ fontWeight: 700, fontSize: 14, marginTop: 4 }}>{oldRoute.name}</div>
                </div>
                <span className="chip chip-danger">Risiko {oldRoute.risk}</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                <div>
                  <div style={{ fontSize: 11, color: "var(--text-tertiary)", fontWeight: 700 }}>ETA</div>
                  <div style={{ fontSize: 16, fontWeight: 900, marginTop: 2, textDecoration: "line-through", color: "var(--text-secondary)" }}>{oldRoute.eta}</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: "var(--text-tertiary)", fontWeight: 700 }}>Jarak</div>
                  <div style={{ fontSize: 16, fontWeight: 900, marginTop: 2, color: "var(--text-secondary)" }}>{oldRoute.distance}</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: "var(--text-tertiary)", fontWeight: 700 }}>Freshness akhir</div>
                  <div style={{ fontSize: 16, fontWeight: 900, marginTop: 2, color: "var(--danger)" }}>{oldRoute.freshnessEnd}%</div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 5, marginTop: 12 }}>
                {oldRoute.issues.map((iss) => (
                  <div key={iss} style={{ display: "flex", gap: 7, alignItems: "center" }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--danger)", flexShrink: 0 }} />
                    <span style={{ fontSize: 12.5, color: "var(--danger-dark)", fontWeight: 600 }}>{iss}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* New route */}
          <Card glow>
            <div style={{ padding: "16px 18px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 800, color: "var(--success-dark)", textTransform: "uppercase", letterSpacing: "0.04em" }}>🔀 Rute AI Baru</div>
                  <div style={{ fontWeight: 700, fontSize: 14, marginTop: 4 }}>{newRoute.name}</div>
                </div>
                <span className="chip chip-success">Risiko {newRoute.risk}</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                <div>
                  <div style={{ fontSize: 11, color: "var(--text-tertiary)", fontWeight: 700 }}>ETA Baru</div>
                  <div style={{ fontSize: 16, fontWeight: 900, marginTop: 2, color: "var(--primary-dark)" }}>{newRoute.eta}</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: "var(--text-tertiary)", fontWeight: 700 }}>Jarak</div>
                  <div style={{ fontSize: 16, fontWeight: 900, marginTop: 2 }}>{newRoute.distance}</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: "var(--text-tertiary)", fontWeight: 700 }}>Freshness akhir</div>
                  <div style={{ fontSize: 16, fontWeight: 900, marginTop: 2, color: "var(--success)" }}>{newRoute.freshnessEnd}%</div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 5, marginTop: 12 }}>
                {newRoute.issues.map((iss) => (
                  <div key={iss} style={{ display: "flex", gap: 7, alignItems: "center" }}>
                    <CheckCircle2 size={14} color="var(--success)" style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: 12.5, color: "var(--success-dark)", fontWeight: 600 }}>{iss}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Risk reduction summary */}
      <Card className="anim-fade-up anim-delay-3" style={{ marginBottom: 16 }}>
        <div style={{ padding: "14px 18px" }}>
          <div style={{ fontWeight: 800, fontSize: 14.5, marginBottom: 12 }}>
            Dampak Positif Reroute
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[
              { label: "Waktu lebih cepat", value: "-33 mnt", icon: <Clock size={16} />, color: "var(--primary)" },
              { label: "Freshness diselamatkan", value: "+13%", icon: <ShieldCheck size={16} />, color: "var(--success)" },
              { label: "Risiko berkurang", value: "78%", icon: <TrendingDown size={16} />, color: "var(--success-dark)" },
              { label: "Potensi kerugian dicegah", value: "Rp 2.4 jt", icon: <ArrowRight size={16} />, color: "var(--warning-dark)" },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  padding: "12px 14px",
                  borderRadius: 14,
                  background: "var(--surface-muted)",
                  border: "1px solid var(--border-light)",
                }}
              >
                <div style={{ color: stat.color, marginBottom: 6 }}>{stat.icon}</div>
                <div style={{ fontSize: 11.5, color: "var(--text-tertiary)", fontWeight: 700, textTransform: "uppercase" }}>{stat.label}</div>
                <div style={{ fontSize: 18, fontWeight: 900, marginTop: 3, color: stat.color }}>{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* CTA */}
      <div className="anim-fade-up anim-delay-4" style={{ display: "grid", gap: 10 }}>
        <button
          type="button"
          className="btn btn-success btn-block btn-lg"
          onClick={() => id && nav(`/app/navigation/${id}`)}
        >
          <ShieldCheck size={20} />
          Aktifkan Rute AI Baru
        </button>
        <button
          type="button"
          className="btn btn-primary outline btn-block"
          onClick={() => id && nav(`/app/marketplace/recommend/${id}`)}
        >
          Cari Armada Marketplace
        </button>
      </div>
    </div>
  );
}
