import { Brain, Clock, Thermometer } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, FreshnessGauge, MiniLineChart, PageHeader } from "../components/Ui";
import { getShipment } from "../data/mock";

const TEMP_HISTORY = [4.0, 4.1, 4.3, 4.8, 5.2, 5.9, 6.2];
const TEMP_LABELS = ["14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "Skrg"];

export function FreshnessDetailPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const s = id ? getShipment(id) : undefined;

  if (!s) {
    return (
      <div className="screen-scroll no-tab" style={{ padding: 24 }}>
        <button className="btn btn-ghost" onClick={() => nav(-1)}>← Kembali</button>
        <p>Shipment tidak ditemukan.</p>
      </div>
    );
  }

  const freshnessColor =
    s.freshnessPct >= 85 ? "var(--success)" :
    s.freshnessPct >= 70 ? "var(--warning)" :
    "var(--danger)";

  const etaDecayRate = ((100 - s.freshnessPct) / 3).toFixed(1);

  // AI recommendation text based on freshness
  const aiAnalysis = s.freshnessPct < 80
    ? "Deteksi penurunan freshness secara anomali. Suhu kabin tidak stabil selama 45 menit terakhir akibat kemacetan. Rekomendasi: segera reroute atau transfer ke cold storage terdekat untuk mencegah kerusakan lebih lanjut."
    : "Freshness dalam rentang normal. Suhu kabin konsisten di bawah 5°C. Tidak ada anomali terdeteksi. Estimasi produk tiba dalam kondisi segar 85–90%.";

  return (
    <div className="screen-scroll no-tab" style={{ padding: "calc(12px + env(safe-area-inset-top)) 16px 24px" }}>
      <PageHeader
        title="Freshness Detail"
        subtitle={`${s.code} · ${s.product}`}
        back
      />

      {/* Freshness gauge */}
      <Card className="anim-fade-up" style={{ marginBottom: 14 }}>
        <div style={{ padding: "24px 16px 20px", textAlign: "center" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 16 }}>
            Freshness Index
          </div>
          <FreshnessGauge pct={s.freshnessPct} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginTop: 20 }}>
            <div>
              <div style={{ fontSize: 11.5, color: "var(--text-tertiary)", fontWeight: 700, textTransform: "uppercase" }}>Degradasi/jam</div>
              <div style={{ fontSize: 18, fontWeight: 900, marginTop: 4, color: "var(--warning-dark)" }}>-{etaDecayRate}%</div>
            </div>
            <div>
              <div style={{ fontSize: 11.5, color: "var(--text-tertiary)", fontWeight: 700, textTransform: "uppercase" }}>Suhu saat ini</div>
              <div style={{ fontSize: 18, fontWeight: 900, marginTop: 4, color: s.tempC > 6 ? "var(--danger)" : "var(--success)" }}>
                {s.tempC}°C
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11.5, color: "var(--text-tertiary)", fontWeight: 700, textTransform: "uppercase" }}>ETD produk</div>
              <div style={{ fontSize: 18, fontWeight: 900, marginTop: 4 }}>{s.eta}</div>
            </div>
          </div>
        </div>
      </Card>

      {/* ETD countdown */}
      <Card className="anim-fade-up anim-delay-1" style={{ marginBottom: 14 }}>
        <div style={{ padding: "14px 18px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 38, height: 38, borderRadius: 12, background: "rgba(249,115,22,0.12)", display: "grid", placeItems: "center", color: "var(--warning-dark)" }}>
              <Clock size={20} />
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text-tertiary)", textTransform: "uppercase" }}>Waktu tersisa sebelum ambang kritis</div>
              <div style={{ fontSize: 22, fontWeight: 900, color: "var(--warning-dark)", letterSpacing: "-0.03em", marginTop: 2 }}>
                1j 24m <span style={{ fontSize: 14, fontWeight: 600, color: "var(--text-secondary)" }}>(est.)</span>
              </div>
            </div>
          </div>
          <div style={{ marginTop: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 12, color: "var(--text-secondary)", fontWeight: 600 }}>Freshness window</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: freshnessColor }}>{s.freshnessPct}% / 60% threshold</span>
            </div>
            <div className="progress-track">
              <div
                className="progress-fill warn"
                style={{ width: `${(s.freshnessPct / 100) * 100}%` }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
              <span style={{ fontSize: 11, color: "var(--text-tertiary)" }}>Kritis (60%)</span>
              <span style={{ fontSize: 11, color: "var(--text-tertiary)" }}>Segar (100%)</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Temperature history chart */}
      <Card className="anim-fade-up anim-delay-2" style={{ marginBottom: 14 }}>
        <div style={{ padding: "16px 18px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <Thermometer size={18} color="var(--primary)" />
            <span style={{ fontWeight: 800, fontSize: 14.5 }}>Riwayat Suhu (3 jam terakhir)</span>
          </div>
          <MiniLineChart data={TEMP_HISTORY} color={s.tempC > 5.5 ? "#f97316" : "#0ea5e9"} height={70} />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
            {TEMP_LABELS.map((l, i) => (
              <span key={i} style={{ fontSize: 9.5, color: "var(--text-tertiary)", textAlign: "center" }}>{l}</span>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12, padding: "10px 0", borderTop: "1px solid var(--border-light)" }}>
            {[
              { label: "Terendah", value: "4.0°C", color: "var(--success)" },
              { label: "Rata-rata", value: "4.9°C", color: "var(--primary)" },
              { label: "Tertinggi", value: `${s.tempC}°C`, color: s.tempC > 6 ? "var(--danger)" : "var(--warning)" },
            ].map((stat) => (
              <div key={stat.label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 12, color: "var(--text-tertiary)", fontWeight: 600 }}>{stat.label}</div>
                <div style={{ fontSize: 16, fontWeight: 900, marginTop: 2, color: stat.color }}>{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* AI analysis */}
      <Card glow className="anim-fade-up anim-delay-3" style={{ marginBottom: 16 }}>
        <div style={{ padding: "16px 18px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(14,165,233,0.12)", display: "grid", placeItems: "center", color: "var(--primary-dark)" }}>
              <Brain size={20} strokeWidth={1.6} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 14.5 }}>Analisis AI Freshness</div>
              <div style={{ fontSize: 11.5, color: "var(--text-secondary)", marginTop: 2 }}>
                Diproses real-time · confidence 94%
              </div>
            </div>
          </div>
          <p className="subtle" style={{ lineHeight: 1.65, fontSize: 13.5 }}>
            {aiAnalysis}
          </p>
          {s.freshnessPct < 80 && (
            <div style={{ display: "grid", gap: 8, marginTop: 14 }}>
              {[
                "Reroute ke arteri Jl. Gatot Subroto (suhu lebih stabil)",
                "Handoff ke Cold Hub Cipinang (4.2 km)",
                "Notifikasi penerima kemungkinan keterlambatan",
              ].map((rec, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <div style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(14,165,233,0.12)", display: "grid", placeItems: "center", flexShrink: 0, fontSize: 11, fontWeight: 700, color: "var(--primary-dark)", marginTop: 1 }}>
                    {i + 1}
                  </div>
                  <div style={{ fontSize: 13, color: "var(--text)", lineHeight: 1.5 }}>{rec}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
