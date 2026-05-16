import { CheckCircle2, XCircle, AlertTriangle, Truck, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { Card, FreshnessBar, SectionHeader } from "../components/Ui";
import { MOCK_HISTORY } from "../data/mock";

/* ─── shared result config ─────────────────────────────────────── */
const RESULT_CONFIG = {
  success:  { label: "Sukses",               color: "var(--success-dark)", bg: "var(--success-soft)",   icon: <CheckCircle2 size={13} /> },
  saved:    { label: "AI Diselamatkan",       color: "var(--primary-dark)", bg: "rgba(14,165,233,0.10)", icon: <CheckCircle2 size={13} /> },
  at_risk:  { label: "Risiko tidak teratasi", color: "var(--danger-dark)",  bg: "var(--danger-soft)",    icon: <XCircle size={13} /> },
};

/* ─────────────────────────────────────────────────────────────────
   OPERATIONS MANAGER — full delivery history with analytics link
──────────────────────────────────────────────────────────────────*/
function OperationsHistory() {
  return (
    <div className="screen-scroll" style={{ padding: "calc(16px + env(safe-area-inset-top)) 16px 16px" }}>
      <div style={{ marginBottom: 18 }}>
        <h1 className="page-title" style={{ fontSize: 20 }}>Riwayat Pengiriman</h1>
        <p className="subtle" style={{ marginTop: 3 }}>{MOCK_HISTORY.length} pengiriman · 7 hari terakhir</p>
      </div>

      {/* Summary strip */}
      <div className="stat-grid-3 anim-fade-up" style={{ marginBottom: 18 }}>
        {[
          { label: "Sukses",    count: MOCK_HISTORY.filter(h => h.result === "success").length, color: "var(--success)" },
          { label: "AI Saved",  count: MOCK_HISTORY.filter(h => h.result === "saved").length,   color: "var(--primary)" },
          { label: "At Risk",   count: MOCK_HISTORY.filter(h => h.result === "at_risk").length, color: "var(--danger)" },
        ].map(s => (
          <Card key={s.label}>
            <div style={{ padding: "12px 10px", textAlign: "center" }}>
              <div style={{ fontSize: 22, fontWeight: 900, color: s.color }}>{s.count}</div>
              <div style={{ fontSize: 10.5, fontWeight: 700, color: "var(--text-tertiary)", textTransform: "uppercase", marginTop: 3 }}>{s.label}</div>
            </div>
          </Card>
        ))}
      </div>

      <SectionHeader title="Semua Riwayat" />
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {MOCK_HISTORY.map((h, i) => {
          const cfg = RESULT_CONFIG[h.result];
          return (
            <Card key={h.id} className={`anim-fade-up anim-delay-${Math.min(i + 1, 5)}`}>
              <div style={{ padding: "16px 18px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", gap: 7, alignItems: "center", flexWrap: "wrap" }}>
                      <span style={{ fontWeight: 800, fontSize: 14 }}>{h.code}</span>
                      <span style={{ padding: "3px 9px", borderRadius: 99, fontSize: 10.5, fontWeight: 700, background: cfg.bg, color: cfg.color, display: "flex", alignItems: "center", gap: 4 }}>
                        {cfg.icon}{cfg.label}
                      </span>
                      {h.rerouted && <span className="chip chip-live" style={{ fontSize: 10 }}>🔀 Rerouted</span>}
                    </div>
                    <div style={{ fontWeight: 600, fontSize: 13.5, marginTop: 5 }}>{h.product}</div>
                    <div className="subtle" style={{ fontSize: 12, marginTop: 2 }}>{h.origin} → {h.destination}</div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontSize: 12, color: "var(--text-tertiary)", fontWeight: 600 }}>{h.date}</div>
                    <div style={{ fontSize: 12.5, fontWeight: 700, marginTop: 2 }}>{h.duration}</div>
                  </div>
                </div>
                <div style={{ marginTop: 12 }}>
                  <FreshnessBar pct={h.finalFreshness} label="Freshness akhir" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>
      <div style={{ marginTop: 16, textAlign: "center" }}>
        <Link to="/app/analytics" style={{ fontSize: 13.5, fontWeight: 700, color: "var(--primary-dark)" }}>
          Lihat Analytics Lengkap →
        </Link>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   DRIVER — riwayat personal + performa + rating
──────────────────────────────────────────────────────────────────*/
const DRIVER_HISTORY = [
  { id: "d1", code: "SHP-2048", product: "Ikan & Seafood Beku",     date: "Hari ini",  result: "saved" as const,  freshness: 81, earning: 340000, rating: 5, duration: "2j 42m" },
  { id: "d2", code: "SHP-2040", product: "Ayam Potong Segar",       date: "Kemarin",   result: "success" as const, freshness: 96, earning: 285000, rating: 5, duration: "4j 12m" },
  { id: "d3", code: "SHP-2031", product: "Ikan Tuna Segar",         date: "2 hari lalu",result:"success" as const, freshness: 91, earning: 410000, rating: 4, duration: "5j 20m" },
  { id: "d4", code: "SHP-2022", product: "Daging Beku Import",      date: "3 hari lalu",result:"at_risk" as const, freshness: 61, earning: 220000, rating: 3, duration: "6j 40m" },
];

function DriverHistory() {
  const totalEarning = DRIVER_HISTORY.reduce((s, d) => s + d.earning, 0);
  const avgRating = (DRIVER_HISTORY.reduce((s, d) => s + d.rating, 0) / DRIVER_HISTORY.length).toFixed(1);

  return (
    <div className="screen-scroll" style={{ padding: "calc(16px + env(safe-area-inset-top)) 16px 16px" }}>
      <div style={{ marginBottom: 18 }}>
        <h1 className="page-title" style={{ fontSize: 20 }}>Riwayat Saya</h1>
        <p className="subtle" style={{ marginTop: 3 }}>Performa pengiriman personal</p>
      </div>

      {/* Earnings card */}
      <Card glow className="anim-fade-up" style={{ marginBottom: 14 }}>
        <div style={{ padding: "18px 20px" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 6 }}>
            Total Pendapatan (7 hari)
          </div>
          <div style={{ fontSize: 30, fontWeight: 900, color: "var(--success-dark)", letterSpacing: "-0.04em" }}>
            Rp {totalEarning.toLocaleString("id-ID")}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginTop: 16 }}>
            {[
              { label: "Pengiriman",    value: DRIVER_HISTORY.length },
              { label: "Rating avg",   value: `${avgRating} ★` },
              { label: "Freshness avg", value: `${Math.round(DRIVER_HISTORY.reduce((s,d)=>s+d.freshness,0)/DRIVER_HISTORY.length)}%` },
            ].map(s => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 18, fontWeight: 900, color: "var(--success)" }}>{s.value}</div>
                <div style={{ fontSize: 10.5, color: "var(--text-tertiary)", fontWeight: 700, textTransform: "uppercase", marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <SectionHeader title="Riwayat Pengiriman" />
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {DRIVER_HISTORY.map((h, i) => {
          const cfg = RESULT_CONFIG[h.result];
          return (
            <Card key={h.id} className={`anim-fade-up anim-delay-${Math.min(i+1,4)}`}>
              <div style={{ padding: "14px 16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", gap: 7, alignItems: "center", flexWrap: "wrap" }}>
                      <span style={{ fontWeight: 800, fontSize: 13.5 }}>{h.code}</span>
                      <span style={{ padding: "2px 8px", borderRadius: 99, fontSize: 10.5, fontWeight: 700, background: cfg.bg, color: cfg.color, display: "flex", alignItems: "center", gap: 4 }}>{cfg.icon}{cfg.label}</span>
                    </div>
                    <div style={{ fontWeight: 600, fontSize: 13, marginTop: 4 }}>{h.product}</div>
                    <div className="subtle" style={{ fontSize: 11.5, marginTop: 2 }}>{h.date} · {h.duration}</div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontWeight: 900, fontSize: 15, color: "var(--success-dark)" }}>
                      Rp {h.earning.toLocaleString("id-ID")}
                    </div>
                    <div style={{ fontSize: 13, marginTop: 4 }}>
                      {"★".repeat(h.rating)}<span style={{ color: "var(--text-tertiary)" }}>{"★".repeat(5 - h.rating)}</span>
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: 10 }}>
                  <FreshnessBar pct={h.freshness} label="Freshness akhir" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   MARKETPLACE — riwayat booking + pendapatan
──────────────────────────────────────────────────────────────────*/
const MKT_HISTORY = [
  { id: "m1", client: "PT Distribusi Pangan Utama", service: "Reefer 8-ton",    date: "Hari ini",    status: "saved" as const,  earning: 420000, duration: "3j 10m" },
  { id: "m2", client: "Dairy Chain Indonesia",      service: "Reefer 6-ton",    date: "Kemarin",     status: "success" as const, earning: 310000, duration: "2j 45m" },
  { id: "m3", client: "RS Siloam Logistics",        service: "Cold Hub Storage",date: "2 hari lalu", status: "success" as const, earning: 185000, duration: "8j 00m" },
  { id: "m4", client: "Hypermart Logistics",        service: "Chiller Van 3-ton",date:"3 hari lalu",  status: "at_risk" as const, earning: 140000, duration: "5j 20m" },
];

function MarketplaceHistory() {
  const totalEarning = MKT_HISTORY.reduce((s, m) => s + m.earning, 0);

  return (
    <div className="screen-scroll" style={{ padding: "calc(16px + env(safe-area-inset-top)) 16px 16px" }}>
      <div style={{ marginBottom: 18 }}>
        <h1 className="page-title" style={{ fontSize: 20 }}>Riwayat Booking</h1>
        <p className="subtle" style={{ marginTop: 3 }}>Layanan & pendapatan armada Anda</p>
      </div>

      {/* Revenue card */}
      <div className="anim-fade-up" style={{
        background: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)",
        borderRadius: 22, padding: "20px 22px", marginBottom: 16,
        boxShadow: "0 12px 40px rgba(124,58,237,0.30)", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", right: -20, top: -20, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
        <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.70)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 6 }}>
          Total Pendapatan (7 hari)
        </div>
        <div style={{ fontSize: 30, fontWeight: 900, color: "#fff", letterSpacing: "-0.04em" }}>
          Rp {totalEarning.toLocaleString("id-ID")}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginTop: 16 }}>
          {[
            { label: "Booking",     value: MKT_HISTORY.length },
            { label: "Sukses",      value: MKT_HISTORY.filter(m => m.status !== "at_risk").length },
            { label: "Rating",      value: "4.9 ★" },
          ].map(s => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: "#fff" }}>{s.value}</div>
              <div style={{ fontSize: 10.5, color: "rgba(255,255,255,0.65)", fontWeight: 700, textTransform: "uppercase", marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <SectionHeader title="Riwayat Booking" />
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {MKT_HISTORY.map((m, i) => {
          const cfg = RESULT_CONFIG[m.status];
          return (
            <Card key={m.id} className={`anim-fade-up anim-delay-${Math.min(i+1,4)}`}>
              <div style={{ padding: "14px 16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
                      <Truck size={16} color="#7c3aed" />
                      <span style={{ fontWeight: 700, fontSize: 13.5 }}>{m.service}</span>
                      <span style={{ padding: "2px 8px", borderRadius: 99, fontSize: 10.5, fontWeight: 700, background: cfg.bg, color: cfg.color, display: "flex", alignItems: "center", gap: 4 }}>{cfg.icon}{cfg.label}</span>
                    </div>
                    <div style={{ fontWeight: 600, fontSize: 13, marginTop: 5, color: "var(--text-secondary)" }}>{m.client}</div>
                    <div className="subtle" style={{ fontSize: 11.5, marginTop: 2 }}>{m.date} · {m.duration}</div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, color: "var(--success-dark)", justifyContent: "flex-end" }}>
                      <DollarSign size={14} />
                      <span style={{ fontWeight: 900, fontSize: 15 }}>Rp {m.earning.toLocaleString("id-ID")}</span>
                    </div>
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

/* ─── Export ───────────────────────────────────────────────────── */
export function HistoryPage() {
  const { role } = useApp();
  if (role === "driver")      return <DriverHistory />;
  if (role === "marketplace") return <MarketplaceHistory />;
  return <OperationsHistory />;
}
