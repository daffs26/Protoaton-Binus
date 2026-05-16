import { BarChart3, Brain, ShieldCheck, Star, TrendingUp, Truck, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { Card, MiniBarChart, MiniLineChart, SectionHeader, StatCard } from "../components/Ui";
import { MOCK_ANALYTICS } from "../data/mock";

/* ─────────────────────────────────────────────────────────────────
   OPERATIONS MANAGER — full business KPIs
──────────────────────────────────────────────────────────────────*/
function OperationsAnalytics() {
  const a = MOCK_ANALYTICS;
  return (
    <div className="screen-scroll no-tab" style={{ padding: "calc(16px + env(safe-area-inset-top)) 16px 24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <h1 className="page-title" style={{ fontSize: 20 }}>Analytics Operasional</h1>
          <p className="subtle" style={{ marginTop: 3 }}>Performa armada 7 hari terakhir</p>
        </div>
        <Link to="/app" style={{ fontSize: 13, fontWeight: 700, color: "var(--primary-dark)" }}>Dashboard →</Link>
      </div>

      <div className="stat-grid-2 anim-fade-up" style={{ marginBottom: 12 }}>
        <StatCard label="OTIF 7 Hari"        value={`${a.otif7d}%`}          color="var(--success)"      icon={<TrendingUp size={18} />} />
        <StatCard label="Freshness Sukses"    value={`${a.freshnessSuccess}%`} color="var(--primary)"      icon={<ShieldCheck size={18} />} />
      </div>
      <div className="stat-grid-2 anim-fade-up anim-delay-1" style={{ marginBottom: 16 }}>
        <StatCard label="Reroute Berhasil"    value={`${a.rerouteSuccess}%`}  icon={<BarChart3 size={18} />} />
        <StatCard label="Total Shipment"       value={a.totalShipments}         color="var(--warning-dark)" icon={<Brain size={18} />} />
      </div>

      {/* OTIF trend */}
      <Card className="anim-fade-up anim-delay-2" style={{ marginBottom: 14 }}>
        <div style={{ padding: "16px 18px" }}>
          <SectionHeader title="OTIF Trend" action={<span className="chip chip-success">↑ +3.2%</span>} />
          <MiniLineChart data={a.lineData} color="#0ea5e9" height={70} />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
            {a.barLabels.map((l, i) => <span key={i} style={{ fontSize: 10, color: "var(--text-tertiary)", fontWeight: 600 }}>{l}</span>)}
          </div>
        </div>
      </Card>

      {/* Freshness bar chart */}
      <Card className="anim-fade-up anim-delay-3" style={{ marginBottom: 14 }}>
        <div style={{ padding: "16px 18px" }}>
          <SectionHeader title="Freshness Success Rate" action={<span className="chip chip-live">7 Hari</span>} />
          <MiniBarChart data={a.barData} labels={a.barLabels} color="#10b981" />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12, paddingTop: 12, borderTop: "1px solid var(--border-light)" }}>
            {[
              { label: "Min", value: `${Math.min(...a.barData)}%`, color: "var(--danger)" },
              { label: "Avg", value: `${Math.round(a.barData.reduce((s,v)=>s+v,0)/a.barData.length)}%`, color: "var(--primary)" },
              { label: "Max", value: `${Math.max(...a.barData)}%`, color: "var(--success)" },
            ].map(stat => (
              <div key={stat.label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 11.5, color: "var(--text-tertiary)", fontWeight: 700, textTransform: "uppercase" }}>{stat.label}</div>
                <div style={{ fontSize: 18, fontWeight: 900, color: stat.color, marginTop: 2 }}>{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* AI Reroute stats */}
      <Card glow className="anim-fade-up anim-delay-4" style={{ marginBottom: 14 }}>
        <div style={{ padding: "16px 18px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <Brain size={20} color="var(--primary-dark)" strokeWidth={1.6} />
            <div style={{ fontWeight: 800, fontSize: 14.5 }}>AI Rerouting Statistics</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[
              { label: "Alert AI dikirim",       value: a.aiAlerts, color: "var(--warning)" },
              { label: "Berhasil diatasi",        value: Math.round(a.aiAlerts * 0.74), color: "var(--success)" },
              { label: "Freshness diselamatkan",  value: `${a.freshnessSaved}% avg`, color: "var(--primary)" },
              { label: "Kerugian dicegah",        value: "Rp 68jt", color: "var(--success-dark)" },
            ].map(stat => (
              <div key={stat.label} style={{ padding: "12px 14px", borderRadius: 14, background: "var(--surface-muted)", border: "1px solid var(--border-light)" }}>
                <div style={{ fontSize: 11, color: "var(--text-tertiary)", fontWeight: 700, textTransform: "uppercase" }}>{stat.label}</div>
                <div style={{ fontSize: 18, fontWeight: 900, color: stat.color, marginTop: 4 }}>{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Link to="/app/history" className="btn btn-primary outline btn-block" style={{ display: "flex", justifyContent: "center" }}>
        Lihat Riwayat Lengkap
      </Link>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   DRIVER — performa personal: rating, delivery count, freshness
──────────────────────────────────────────────────────────────────*/
const DRIVER_WEEKLY = [310000, 285000, 410000, 220000, 340000, 390000, 460000];
const DRIVER_FRESHNESS = [91, 94, 88, 61, 81, 89, 93];

function DriverAnalytics() {
  return (
    <div className="screen-scroll no-tab" style={{ padding: "calc(16px + env(safe-area-inset-top)) 16px 24px" }}>
      <div style={{ marginBottom: 20 }}>
        <h1 className="page-title" style={{ fontSize: 20 }}>Performa Saya</h1>
        <p className="subtle" style={{ marginTop: 3 }}>Statistik pengiriman personal</p>
      </div>

      {/* Top KPIs */}
      <div className="stat-grid-2 anim-fade-up" style={{ marginBottom: 12 }}>
        <StatCard label="Rating Driver"     value="4.9 ★"   color="var(--success)"  icon={<Star size={18} />} />
        <StatCard label="Pengiriman Bulan"  value={28}       color="var(--primary)"  icon={<Truck size={18} />} />
      </div>
      <div className="stat-grid-2 anim-fade-up anim-delay-1" style={{ marginBottom: 16 }}>
        <StatCard label="Freshness Avg"    value="87%"    color="var(--success)"      icon={<ShieldCheck size={18} />} />
        <StatCard label="OTIF Personal"    value="95%"    color="var(--primary-dark)" icon={<TrendingUp size={18} />} />
      </div>

      {/* Pendapatan mingguan */}
      <Card className="anim-fade-up anim-delay-2" style={{ marginBottom: 14 }}>
        <div style={{ padding: "16px 18px" }}>
          <SectionHeader title="Pendapatan Mingguan" action={<span className="chip chip-success">↑ +12%</span>} />
          <MiniBarChart data={DRIVER_WEEKLY.map(v => v / 1000)} labels={["Sen","Sel","Rab","Kam","Jum","Sab","Min"]} color="#10b981" />
          <div style={{ marginTop: 14, paddingTop: 12, borderTop: "1px solid var(--border-light)", display: "flex", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: 11.5, color: "var(--text-tertiary)", fontWeight: 700, textTransform: "uppercase" }}>Total minggu ini</div>
              <div style={{ fontSize: 20, fontWeight: 900, color: "var(--success-dark)", marginTop: 2 }}>
                Rp {DRIVER_WEEKLY.reduce((s,v)=>s+v,0).toLocaleString("id-ID")}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 11.5, color: "var(--text-tertiary)", fontWeight: 700, textTransform: "uppercase" }}>Rata-rata/hari</div>
              <div style={{ fontSize: 20, fontWeight: 900, marginTop: 2 }}>
                Rp {Math.round(DRIVER_WEEKLY.reduce((s,v)=>s+v,0)/7).toLocaleString("id-ID")}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Freshness trend */}
      <Card className="anim-fade-up anim-delay-3" style={{ marginBottom: 14 }}>
        <div style={{ padding: "16px 18px" }}>
          <SectionHeader title="Freshness per Pengiriman" />
          <MiniLineChart data={DRIVER_FRESHNESS} color="#0ea5e9" height={65} />
          <p className="subtle" style={{ marginTop: 8, fontSize: 12.5, lineHeight: 1.55 }}>
            1 pengiriman dengan freshness rendah akibat kemacetan · diselamatkan dengan reroute AI.
          </p>
        </div>
      </Card>

      <Link to="/app/history" className="btn btn-primary outline btn-block" style={{ display: "flex", justifyContent: "center" }}>
        Lihat Riwayat Lengkap
      </Link>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   MARKETPLACE — revenue, slot utilization, booking acceptance
──────────────────────────────────────────────────────────────────*/
const MKT_REVENUE = [1200000, 980000, 1450000, 1100000, 1380000, 1600000, 1255000];
const MKT_UTIL    = [75, 80, 68, 90, 85, 92, 78];

function MarketplaceAnalytics() {
  const totalRevenue = MKT_REVENUE.reduce((s,v)=>s+v,0);
  return (
    <div className="screen-scroll no-tab" style={{ padding: "calc(16px + env(safe-area-inset-top)) 16px 24px" }}>
      <div style={{ marginBottom: 20 }}>
        <h1 className="page-title" style={{ fontSize: 20 }}>Revenue Analytics</h1>
        <p className="subtle" style={{ marginTop: 3 }}>Performa bisnis armada & cold hub</p>
      </div>

      {/* Revenue hero */}
      <div className="anim-fade-up" style={{
        background: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)",
        borderRadius: 22, padding: "20px 22px", marginBottom: 16,
        boxShadow: "0 12px 40px rgba(124,58,237,0.30)",
      }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.70)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 6 }}>Total Revenue (7 hari)</div>
        <div style={{ fontSize: 28, fontWeight: 900, color: "#fff", letterSpacing: "-0.04em" }}>Rp {totalRevenue.toLocaleString("id-ID")}</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginTop: 16 }}>
          {[
            { label: "Booking",        value: 28 },
            { label: "Acceptance",     value: "94%" },
            { label: "Slot Util.",     value: "82%" },
          ].map(s => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: "#fff" }}>{s.value}</div>
              <div style={{ fontSize: 10.5, color: "rgba(255,255,255,0.65)", fontWeight: 700, textTransform: "uppercase", marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="stat-grid-2 anim-fade-up anim-delay-1" style={{ marginBottom: 16 }}>
        <StatCard label="Rating Mitra"       value="4.9 ★" color="#7c3aed" icon={<Star size={18} />} />
        <StatCard label="Booking Bulan Ini"  value={28}    color="var(--success)" icon={<DollarSign size={18} />} />
      </div>

      {/* Revenue bar chart */}
      <Card className="anim-fade-up anim-delay-2" style={{ marginBottom: 14 }}>
        <div style={{ padding: "16px 18px" }}>
          <SectionHeader title="Revenue Harian" action={<span className="chip chip-success">↑ +8.4%</span>} />
          <MiniBarChart data={MKT_REVENUE.map(v => v / 100000)} labels={["Sen","Sel","Rab","Kam","Jum","Sab","Min"]} color="#7c3aed" />
        </div>
      </Card>

      {/* Slot utilization chart */}
      <Card className="anim-fade-up anim-delay-3" style={{ marginBottom: 14 }}>
        <div style={{ padding: "16px 18px" }}>
          <SectionHeader title="Slot Utilization (%)" />
          <MiniLineChart data={MKT_UTIL} color="#7c3aed" height={65} />
          <p className="subtle" style={{ marginTop: 8, fontSize: 12.5 }}>
            Rata-rata utilisasi slot 82% — tertinggi pada Sabtu (92%).
          </p>
        </div>
      </Card>

      <Link to="/app/history" className="btn btn-block" style={{ display: "flex", justifyContent: "center", background: "#7c3aed", color: "#fff", borderRadius: 14, padding: "14px", fontWeight: 700, fontSize: 15, border: "none", cursor: "pointer" }}>
        Lihat Riwayat Booking
      </Link>
    </div>
  );
}

/* ─── Export ───────────────────────────────────────────────────── */
export function AnalyticsPage() {
  const { role } = useApp();
  if (role === "driver")      return <DriverAnalytics />;
  if (role === "marketplace") return <MarketplaceAnalytics />;
  return <OperationsAnalytics />;
}
