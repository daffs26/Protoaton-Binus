import { AlertTriangle, ArrowRight, Brain, MapPinned, Package, BarChart3, Zap, Thermometer, Bell, Users, CheckCircle, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { MapMock } from "../components/MapMock";
import { Card, FreshnessBar, SectionHeader, StatCard } from "../components/Ui";
import { MOCK_SHIPMENTS, MOCK_NOTIFICATIONS } from "../data/mock";
import { useApp } from "../context/AppContext";

/* ── Operations Manager Dashboard ──────────────────────────────── */
function OperationsDashboard() {
  const nav = useNavigate();
  const focus = MOCK_SHIPMENTS[0]; // at-risk shipment
  const atRiskCount = MOCK_SHIPMENTS.filter((s) => s.status === "at_risk").length;
  const unread = MOCK_NOTIFICATIONS.filter(n => n.unread).length;

  return (
    <div className="screen-scroll" style={{ padding: "calc(16px + env(safe-area-inset-top)) 16px 16px" }}>
      {/* Top bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 12, color: "var(--text-secondary)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em" }}>
            Selamat datang kembali,
          </div>
          <h1 className="page-title" style={{ fontSize: 20, marginTop: 2 }}>Command Center</h1>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span className="chip chip-live">
            <span className="pulse-dot" style={{ width: 7, height: 7 }} />
            Live
          </span>
          <Link to="/app/notifications" style={{ position: "relative", width: 38, height: 38, borderRadius: 12, background: "var(--surface)", border: "1px solid var(--border)", display: "grid", placeItems: "center", color: "var(--text-secondary)" }}>
            <Bell size={18} strokeWidth={1.8} />
            {unread > 0 && (<div style={{ position: "absolute", top: -3, right: -3, minWidth: 16, height: 16, borderRadius: 99, background: "var(--danger)", border: "2px solid #fff", fontSize: 9, fontWeight: 800, color: "#fff", display: "grid", placeItems: "center", padding: "0 3px" }}>{unread}</div>)}
          </Link>
          <div style={{ width: 38, height: 38, borderRadius: 12, background: "var(--surface)", border: "1px solid var(--border)", display: "grid", placeItems: "center", fontSize: 18 }}>👤</div>
        </div>
      </div>

      {/* Stat grid */}
      <div className="stat-grid-2 anim-fade-up" style={{ marginBottom: 14 }}>
        <StatCard
          label="Shipment Aktif"
          value={MOCK_SHIPMENTS.length}
          icon={<Package size={18} strokeWidth={1.8} />}
        />
        <StatCard
          label="Risiko AI"
          value={atRiskCount}
          color={atRiskCount > 0 ? "var(--warning-dark)" : "var(--success)"}
          icon={<AlertTriangle size={18} strokeWidth={1.8} />}
        />
      </div>

      <div className="stat-grid-3 anim-fade-up anim-delay-1" style={{ marginBottom: 16 }}>
        <Card>
          <div style={{ padding: "12px 14px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.04em" }}>OTIF</div>
            <div style={{ fontSize: 20, fontWeight: 900, marginTop: 4, color: "var(--success)" }}>96%</div>
          </div>
        </Card>
        <Card>
          <div style={{ padding: "12px 14px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.04em" }}>Segar</div>
            <div style={{ fontSize: 20, fontWeight: 900, marginTop: 4, color: "var(--primary)" }}>91%</div>
          </div>
        </Card>
        <Card>
          <div style={{ padding: "12px 14px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.04em" }}>Reroute</div>
            <div style={{ fontSize: 20, fontWeight: 900, marginTop: 4 }}>74%</div>
          </div>
        </Card>
      </div>

      {/* AI Insight Card */}
      <div className="anim-fade-up anim-delay-2">
        <Card glow style={{ marginBottom: 16 }}>
          <div style={{ padding: 18 }}>
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 14,
                  background: "rgba(14,165,233,0.12)",
                  display: "grid",
                  placeItems: "center",
                  color: "var(--primary-dark)",
                  flexShrink: 0,
                }}
              >
                <Brain size={22} strokeWidth={1.6} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontWeight: 800, fontSize: 14.5 }}>AI Insight</div>
                  <span className="chip chip-warn" style={{ fontSize: 10.5 }}>
                    <AlertTriangle size={11} />
                    Perlu aksi
                  </span>
                </div>
                <p className="subtle" style={{ marginTop: 6, lineHeight: 1.55 }}>
                  Freshness <strong style={{ color: "var(--text)" }}>{focus.code}</strong> turun lebih cepat dari baseline. Suhu kabin +{(focus.tempC - 4).toFixed(1)}°C di atas target.
                </p>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" }}>
              <span className="chip chip-warn"><AlertTriangle size={12} /> Thermal drift</span>
              <span className="chip chip-warn">Congestion tol</span>
              <span className="chip chip-danger">Freshness kritis</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 14 }}>
              <button
                type="button"
                className="btn btn-primary btn-block"
                onClick={() => nav(`/app/alert/${focus.id}`)}
              >
                <Zap size={16} /> Smart alert
              </button>
              <button
                type="button"
                className="btn btn-primary outline btn-block"
                onClick={() => nav(`/app/reroute/${focus.id}`)}
              >
                Reroute AI
              </button>
            </div>
          </div>
        </Card>
      </div>

      {/* Live map */}
      <div className="anim-fade-up anim-delay-2" style={{ marginBottom: 16 }}>
        <SectionHeader
          title="Map Overview"
          action={<span className="chip chip-live"><span className="pulse-dot" style={{ width: 7, height: 7 }} />Realtime</span>}
        />
        <MapMock variant="full" highlightRisk />
      </div>

      {/* Freshness monitoring */}
      <div className="anim-fade-up anim-delay-3" style={{ marginBottom: 16 }}>
        <SectionHeader
          title="Freshness Monitor"
          action={
            <Link to={`/app/shipments/${focus.id}/freshness`} style={{ fontSize: 13, fontWeight: 700, color: "var(--primary-dark)" }}>
              Detail
            </Link>
          }
        />
        <Card>
          <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
            {MOCK_SHIPMENTS.slice(0, 3).map((s) => (
              <div key={s.id}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <div>
                    <span style={{ fontWeight: 700, fontSize: 13 }}>{s.code}</span>
                    <span className="subtle" style={{ marginLeft: 8, fontSize: 12 }}>{s.product.split(" ").slice(0, 2).join(" ")}</span>
                  </div>
                  <span style={{ fontSize: 11.5, fontWeight: 700, color: s.freshnessPct >= 85 ? "var(--success-dark)" : s.freshnessPct >= 70 ? "var(--warning-dark)" : "var(--danger-dark)" }}>
                    {s.freshnessPct}%
                  </span>
                </div>
                <FreshnessBar pct={s.freshnessPct} />
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Active Shipments */}
      <div className="anim-fade-up anim-delay-4" style={{ marginBottom: 16 }}>
        <SectionHeader
          title="Shipment Aktif"
          action={
            <Link to="/app/shipments" style={{ fontSize: 13, fontWeight: 700, color: "var(--primary-dark)", display: "flex", alignItems: "center", gap: 4 }}>
              Semua <ArrowRight size={14} />
            </Link>
          }
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {MOCK_SHIPMENTS.slice(0, 3).map((s) => (
            <Link key={s.id} to={`/app/shipments/${s.id}`} style={{ display: "block" }}>
              <Card>
                <div style={{ padding: "14px 16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontWeight: 700, fontSize: 14 }}>{s.code}</span>
                        {s.status === "at_risk" && (
                          <span className="chip chip-warn" style={{ fontSize: 10 }}>
                            <AlertTriangle size={10} /> At risk
                          </span>
                        )}
                      </div>
                      <div className="subtle" style={{ marginTop: 3, fontSize: 12.5, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {s.origin} → {s.destination}
                      </div>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div style={{ fontSize: 13.5, fontWeight: 800 }}>{s.eta}</div>
                      <div className="subtle" style={{ fontSize: 11 }}>ETA</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 10 }}>
                    <Thermometer size={13} color={s.tempC > 6 ? "var(--danger)" : "var(--primary)"} />
                    <span style={{ fontSize: 12.5, color: s.tempC > 6 ? "var(--danger-dark)" : "var(--text-secondary)", fontWeight: 600 }}>
                      {s.tempC}°C
                    </span>
                    <div style={{ flex: 1 }}>
                      <FreshnessBar pct={s.freshnessPct} />
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick actions */}
      <div className="anim-fade-up anim-delay-5" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <Link
          to="/app/heatmap"
          className="btn btn-primary outline btn-block"
          style={{ padding: "13px 10px", fontSize: 13.5 }}
        >
          <MapPinned size={17} /> Demand Heatmap
        </Link>
        <Link
          to="/app/analytics"
          className="btn btn-primary outline btn-block"
          style={{ padding: "13px 10px", fontSize: 13.5 }}
        >
          <BarChart3 size={17} /> Analytics
        </Link>
        <Link
          to="/app/drivers"
          className="btn btn-primary btn-block"
          style={{ padding: "13px 10px", fontSize: 13.5, gridColumn: "1 / -1" }}
        >
          <Users size={17} /> Driver Fleet
        </Link>
      </div>
    </div>
  );
}

/* ── Driver Dashboard ───────────────────────────────────────────── */
function DriverDashboard() {
  const nav = useNavigate();
  const { setDriverStatus } = useApp();
  const focus = MOCK_SHIPMENTS[0];
  const [jobStatus, setJobStatus] = useState<"pending" | "accepted" | "rejected">("pending");
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}>

      {/* ── Green gradient header strip ─────────────────────────── */}
      <div
        className="anim-fade"
        style={{
          background: "linear-gradient(145deg, #10b981 0%, #047857 100%)",
          padding: "calc(18px + env(safe-area-inset-top)) 18px 20px",
          position: "relative",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        <div style={{ position: "absolute", right: -24, top: -24, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.08)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 11.5, fontWeight: 700, color: "rgba(255,255,255,0.65)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Selamat pagi,
            </div>
            <h1 style={{ fontSize: 20, fontWeight: 900, color: "#fff", margin: "3px 0 0", letterSpacing: "-0.02em" }}>
              Budi Santoso
            </h1>
          </div>
          <span style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "5px 12px", borderRadius: 99,
            background: "rgba(255,255,255,0.20)",
            fontSize: 12, fontWeight: 800, color: "#fff",
            border: "1px solid rgba(255,255,255,0.30)",
          }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#a7f3d0", display: "inline-block", animation: "blink-dot 1.4s ease-in-out infinite" }} />
            On Duty
          </span>
        </div>
      </div>

      {/* ── Scrollable content ──────────────────────────────────── */}
      <div className="screen-driver" style={{ padding: "14px 14px 0", display: "flex", flexDirection: "column", gap: 12 }}>

        {/* Job Baru Masuk */}
        {jobStatus !== "rejected" && (
          <div className="anim-fade-up" style={{ borderRadius: 18, border: `2px solid ${jobStatus === "accepted" ? "rgba(16,185,129,0.35)" : "rgba(249,115,22,0.35)"}`, background: jobStatus === "accepted" ? "rgba(16,185,129,0.04)" : "rgba(249,115,22,0.04)", padding: "14px 16px", flexShrink: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <div style={{ fontWeight: 800, fontSize: 14 }}>📦 Job Baru Masuk</div>
              <span style={{ padding: "3px 10px", borderRadius: 99, background: jobStatus === "accepted" ? "var(--success-soft)" : "var(--warning-soft)", color: jobStatus === "accepted" ? "var(--success-dark)" : "var(--warning-dark)", fontSize: 11, fontWeight: 700 }}>
                {jobStatus === "accepted" ? "✓ Diterima" : "Menunggu"}
              </span>
            </div>
            <div style={{ fontSize: 13, fontWeight: 700 }}>SHP-2059 · Sayur Organik</div>
            <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 2 }}>Farm Cibodas → Superindo Sudirman</div>
            <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 1 }}>📅 18 Mei 2026 · 07:00 · 🌡 4°C</div>
            {jobStatus === "pending" && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 12 }}>
                <button type="button" onClick={() => { setJobStatus("accepted"); setDriverStatus("on_duty"); }}
                  style={{ padding: "10px", borderRadius: 12, border: "none", background: "linear-gradient(135deg,#34d399,#10b981)", color: "#fff", fontWeight: 800, fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                  <CheckCircle size={15} /> Terima
                </button>
                <button type="button" onClick={() => setJobStatus("rejected")}
                  style={{ padding: "10px", borderRadius: 12, border: "1.5px solid rgba(239,68,68,0.35)", background: "transparent", color: "var(--danger-dark)", fontWeight: 700, fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                  <X size={15} /> Tolak
                </button>
              </div>
            )}
          </div>
        )}

        {/* Map */}
        <div className="anim-fade-up" style={{ borderRadius: 18, overflow: "hidden", flexShrink: 0, boxShadow: "0 4px 20px rgba(15,23,42,0.10)" }}>
          <MapMock variant="full" highlightRisk />
        </div>

        {/* Active trip — pulsing green border */}
        <div
          className="anim-fade-up anim-delay-1 driver-pulse-card"
          style={{
            background: "#fff",
            borderRadius: 20,
            border: "2px solid rgba(16,185,129,0.45)",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <div style={{ padding: "14px 16px" }}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 34, height: 34, borderRadius: 10, background: "rgba(16,185,129,0.12)", display: "grid", placeItems: "center", fontSize: 18 }}>
                  🚛
                </div>
                <div>
                  <div style={{ fontWeight: 900, fontSize: 14, color: "var(--text)" }}>{focus.code}</div>
                  <div style={{ fontSize: 11.5, color: "var(--text-secondary)", marginTop: 1 }}>{focus.product.split(" ").slice(0, 3).join(" ")}</div>
                </div>
              </div>
              {focus.status === "at_risk" && (
                <span className="chip chip-warn" style={{ fontSize: 10.5 }}>
                  <AlertTriangle size={10} /> AI Risk
                </span>
              )}
            </div>

            {/* Route */}
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--success)", flexShrink: 0 }} />
              <span style={{ fontSize: 12, color: "var(--text-secondary)", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {focus.origin}
              </span>
              <span style={{ fontSize: 12, color: "var(--text-tertiary)" }}>→</span>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--primary)", flexShrink: 0 }} />
              <span style={{ fontSize: 12, color: "var(--text-secondary)", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {focus.destination}
              </span>
            </div>

            {/* Live stats row */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 12 }}>
              <div className="driver-stat">
                <div className="val" style={{ fontSize: 18, color: focus.freshnessPct < 80 ? "var(--warning-dark)" : "var(--driver-accent-dark)" }}>
                  {focus.freshnessPct}%
                </div>
                <div className="lbl">Freshness</div>
              </div>
              <div className="driver-stat">
                <div className="val" style={{ fontSize: 18, color: focus.tempC > 6 ? "var(--danger)" : "var(--driver-accent-dark)" }}>
                  {focus.tempC}°C
                </div>
                <div className="lbl">Suhu Kabin</div>
              </div>
              <div className="driver-stat">
                <div className="val" style={{ fontSize: 18, color: "var(--text)" }}>{focus.eta}</div>
                <div className="lbl">ETA</div>
              </div>
            </div>

            {/* Freshness bar */}
            <div style={{ marginBottom: 14 }}>
              <FreshnessBar pct={focus.freshnessPct} />
            </div>

            {/* Alert CTA */}
            {focus.status === "at_risk" && (
              <button
                type="button"
                className="btn btn-danger btn-block"
                style={{ fontSize: 14, padding: "12px 16px" }}
                onClick={() => nav(`/app/alert/${focus.id}`)}
              >
                <AlertTriangle size={17} /> Tinjau Smart Alert
              </button>
            )}
            {/* Selesai Pengiriman */}
            <button type="button" onClick={() => setShowConfirm(true)}
              style={{ width: "100%", padding: "11px", borderRadius: 13, border: "1.5px solid rgba(16,185,129,0.38)", background: "rgba(16,185,129,0.07)", color: "var(--success-dark)", fontWeight: 800, fontSize: 13.5, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 7, marginTop: 4 }}>
              <CheckCircle size={16} /> Selesai Pengiriman
            </button>
          </div>
        </div>

        {/* Action buttons row */}
        <div className="anim-fade-up anim-delay-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, flexShrink: 0 }}>
          <button
            type="button"
            className="btn btn-success btn-block btn-lg"
            style={{ fontSize: 14 }}
            onClick={() => nav(`/app/navigation/${focus.id}`)}
          >
            <Thermometer size={16} /> Navigasi AI
          </button>
          <Link
            to={`/app/shipments/${focus.id}`}
            className="btn btn-primary outline btn-block btn-lg"
            style={{ textAlign: "center", fontSize: 14 }}
          >
            Detail Muatan
          </Link>
        </div>

        {/* Quick links row */}
        <div className="anim-fade-up anim-delay-3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, flexShrink: 0 }}>
          <Link
            to={`/app/shipments/${focus.id}/freshness`}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
              padding: "11px 8px", borderRadius: 14, fontSize: 13, fontWeight: 700,
              background: "var(--driver-accent-soft)", color: "var(--driver-accent-dark)",
              border: "1.5px solid rgba(16,185,129,0.28)", textDecoration: "none",
            }}
          >
            🌿 Freshness Detail
          </Link>
          <Link
            to="/app/notifications"
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
              padding: "11px 8px", borderRadius: 14, fontSize: 13, fontWeight: 700,
              background: "var(--surface-muted)", color: "var(--text-secondary)",
              border: "1.5px solid var(--border-light)", textDecoration: "none",
            }}
          >
            🔔 Alert Saya
          </Link>
        </div>

        {/* Upcoming shipments */}
        <div className="anim-fade-up anim-delay-4" style={{ flexShrink: 0 }}>
          <div style={{ fontWeight: 800, fontSize: 14.5, marginBottom: 8 }}>Antrian Berikutnya</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {MOCK_SHIPMENTS.slice(1, 3).map((s, i) => (
              <div
                key={s.id}
                className={`anim-fade-up anim-delay-${i + 5}`}
                style={{
                  background: "#fff",
                  borderRadius: 14,
                  border: "1px solid var(--border-light)",
                  padding: "11px 14px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13.5 }}>{s.code}</div>
                  <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 2 }}>
                    {s.product.split(" ").slice(0, 3).join(" ")}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontWeight: 700, fontSize: 13 }}>ETA {s.eta}</div>
                  <span className="chip chip-neutral" style={{ fontSize: 10, marginTop: 4 }}>Antrian</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Confirmation modal */}
      {showConfirm && (
        <div style={{ position: "absolute", inset: 0, background: "rgba(15,23,42,0.55)", display: "flex", alignItems: "flex-end", zIndex: 200, backdropFilter: "blur(4px)" }}>
          <div style={{ background: "#fff", width: "100%", borderRadius: "24px 24px 0 0", padding: "28px 24px", paddingBottom: "calc(28px + env(safe-area-inset-bottom))" }}>
            <div style={{ width: 40, height: 4, borderRadius: 99, background: "var(--border)", margin: "0 auto 20px" }} />
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: "var(--success-soft)", display: "grid", placeItems: "center", margin: "0 auto 12px" }}>
                <CheckCircle size={28} color="var(--success)" />
              </div>
              <div style={{ fontWeight: 900, fontSize: 17 }}>Konfirmasi Selesai?</div>
              <div style={{ fontSize: 13.5, color: "var(--text-secondary)", marginTop: 6, lineHeight: 1.5 }}>
                Tandai pengiriman <strong>{focus.code}</strong> sebagai selesai?
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <button type="button" onClick={() => setShowConfirm(false)}
                style={{ padding: "14px", borderRadius: 14, border: "1.5px solid var(--border)", background: "#fff", fontWeight: 700, fontSize: 14.5, cursor: "pointer", color: "var(--text-secondary)" }}>
                Batalkan
              </button>
              <button type="button" onClick={() => { setShowConfirm(false); nav(`/app/delivery-success/${focus.id}`); }}
                style={{ padding: "14px", borderRadius: 14, border: "none", background: "linear-gradient(135deg,#34d399,#10b981)", color: "#fff", fontWeight: 800, fontSize: 14.5, cursor: "pointer", boxShadow: "0 4px 16px rgba(16,185,129,0.35)" }}>
                ✓ Konfirmasi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


/* ── Marketplace Dashboard ──────────────────────────────────────── */
function MarketplaceDashboard() {
  const nav = useNavigate();
  const focus = MOCK_SHIPMENTS[0];

  return (
    <div className="screen-scroll" style={{ padding: 0, paddingBottom: 16 }}>

      {/* ── Purple gradient hero ────────────────────────────────── */}
      <div style={{
        background: "linear-gradient(145deg, #7c3aed 0%, #6d28d9 55%, #5b21b6 100%)",
        padding: "calc(22px + env(safe-area-inset-top)) 20px 26px",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", right: -30, top: -30, width: 160, height: 160, borderRadius: "50%", background: "rgba(255,255,255,0.07)" }} />
        <div style={{ position: "absolute", left: -20, bottom: -40, width: 110, height: 110, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />

        <div style={{ position: "relative", zIndex: 1 }}>
          {/* Header row */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
            <div>
              <div style={{ fontSize: 11.5, fontWeight: 700, color: "rgba(255,255,255,0.60)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Marketplace Partner
              </div>
              <h1 style={{ fontSize: 20, fontWeight: 900, color: "#fff", margin: "4px 0 0", letterSpacing: "-0.02em" }}>
                PT Sejuk Ekspres
              </h1>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <span style={{ padding: "5px 12px", borderRadius: 99, background: "rgba(52,211,153,0.25)", fontSize: 11.5, fontWeight: 800, color: "#6ee7b7", border: "1px solid rgba(52,211,153,0.35)" }}>
                🟢 Open
              </span>
              <div style={{ width: 38, height: 38, borderRadius: 12, background: "rgba(255,255,255,0.18)", display: "grid", placeItems: "center", fontSize: 18 }}>
                🏭
              </div>
            </div>
          </div>

          {/* Revenue */}
          <div style={{ marginBottom: 6 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.60)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
              Pendapatan Hari Ini
            </div>
            <div style={{ fontSize: 34, fontWeight: 900, color: "#fff", letterSpacing: "-0.04em", marginTop: 4 }}>
              Rp 1.255.000
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
              <span style={{ padding: "3px 10px", borderRadius: 99, background: "rgba(52,211,153,0.22)", fontSize: 11, fontWeight: 800, color: "#6ee7b7", border: "1px solid rgba(52,211,153,0.30)" }}>
                ↑ +8.4% vs kemarin
              </span>
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.50)", fontWeight: 600 }}>4 booking selesai</span>
            </div>
          </div>

          {/* KPI strip */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginTop: 18, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.18)" }}>
            {[
              { label: "Booking Aktif", value: "2" },
              { label: "Slot Bebas",   value: "12" },
              { label: "Rating",        value: "4.9 ★" },
            ].map(s => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 20, fontWeight: 900, color: "#fff" }}>{s.value}</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.55)", fontWeight: 700, textTransform: "uppercase", marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main content ────────────────────────────────────────── */}
      <div style={{ padding: "16px 16px 0" }}>

        {/* Urgent booking request — purple themed */}
        <div className="anim-fade-up" style={{ marginBottom: 14 }}>
          <div style={{
            background: "#fff", borderRadius: 20, padding: "16px 18px",
            border: "2px solid rgba(124,58,237,0.28)",
            boxShadow: "0 0 0 1px rgba(124,58,237,0.07), 0 8px 28px rgba(124,58,237,0.13)",
          }}>
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: 14, background: "rgba(124,58,237,0.12)", display: "grid", placeItems: "center", fontSize: 22, flexShrink: 0 }}>
                ⚡
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontWeight: 900, fontSize: 14.5 }}>Permintaan Darurat</div>
                  <span style={{ padding: "3px 9px", borderRadius: 99, background: "rgba(249,115,22,0.12)", color: "var(--warning-dark)", fontSize: 10.5, fontWeight: 800 }}>
                    ⏱ 28 menit
                  </span>
                </div>
                <p className="subtle" style={{ fontSize: 12.5, marginTop: 4, lineHeight: 1.5 }}>
                  {focus.code} butuh reefer truck darurat. Freshness {focus.freshnessPct}% — risiko kritis.
                </p>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <button type="button"
                onClick={() => nav(`/app/marketplace/recommend/${focus.id}`)}
                style={{
                  background: "#7c3aed", color: "#fff", border: "none", borderRadius: 13,
                  padding: "12px 8px", fontWeight: 800, fontSize: 13.5, cursor: "pointer",
                  boxShadow: "0 4px 16px rgba(124,58,237,0.35)",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                }}>
                ✓ Terima & Tawarkan
              </button>
              <button type="button"
                style={{
                  background: "rgba(124,58,237,0.08)", color: "#7c3aed",
                  border: "1.5px solid rgba(124,58,237,0.28)", borderRadius: 13,
                  padding: "12px 8px", fontWeight: 700, fontSize: 13.5, cursor: "pointer",
                }}>
                Lihat Detail
              </button>
            </div>
          </div>
        </div>

        {/* Fleet status — purple tinted */}
        <div className="anim-fade-up anim-delay-1" style={{ marginBottom: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ fontWeight: 800, fontSize: 15 }}>Status Armada</span>
            <Link to="/app/marketplace" style={{ fontSize: 13, fontWeight: 700, color: "#7c3aed" }}>Kelola →</Link>
          </div>
          <div style={{ background: "#fff", borderRadius: 18, border: "1px solid rgba(124,58,237,0.16)", overflow: "hidden", boxShadow: "var(--shadow-sm)" }}>
            {[
              { icon: "🚛", label: "Reefer Truck 8-ton", available: 2, total: 3 },
              { icon: "🚐", label: "Chiller Van 3-ton",  available: 1, total: 3 },
              { icon: "🏪", label: "Cold Hub Slot",        available: 28, total: 120 },
            ].map((fleet, i, arr) => (
              <div key={fleet.label} style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "13px 16px",
                borderBottom: i < arr.length - 1 ? "1px solid var(--border-light)" : "none",
              }}>
                <div style={{ width: 38, height: 38, borderRadius: 11, background: "rgba(124,58,237,0.10)", display: "grid", placeItems: "center", fontSize: 18, flexShrink: 0 }}>
                  {fleet.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 13.5 }}>{fleet.label}</div>
                  <div style={{ fontSize: 11.5, color: "var(--text-secondary)", marginTop: 2 }}>{fleet.total} unit total</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontWeight: 900, fontSize: 20, color: fleet.available > 0 ? "var(--success-dark)" : "var(--danger)" }}>
                    {fleet.available}
                  </div>
                  <div style={{ fontSize: 10.5, color: "var(--text-tertiary)", fontWeight: 700, textTransform: "uppercase" }}>tersedia</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Map */}
        <div className="anim-fade-up anim-delay-2" style={{ marginBottom: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ fontWeight: 800, fontSize: 15 }}>Sebaran Armada Aktif</span>
            <span style={{ padding: "4px 10px", borderRadius: 99, background: "rgba(124,58,237,0.10)", color: "#7c3aed", fontSize: 11, fontWeight: 800, border: "1px solid rgba(124,58,237,0.22)", display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#7c3aed", display: "inline-block", animation: "blink-dot 1.2s ease-in-out infinite" }} />Live
            </span>
          </div>
          <MapMock variant="preview" />
        </div>

        {/* Quick actions — fully purple */}
        <div className="anim-fade-up anim-delay-3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <Link to="/app/history"
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
              padding: "13px 8px", borderRadius: 14, fontSize: 13, fontWeight: 700,
              background: "rgba(124,58,237,0.10)", color: "#6d28d9",
              border: "1.5px solid rgba(124,58,237,0.25)", textDecoration: "none",
            }}>
            📋 Riwayat Booking
          </Link>
          <Link to="/app/analytics"
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
              padding: "13px 8px", borderRadius: 14, fontSize: 13, fontWeight: 700,
              background: "#7c3aed", color: "#fff",
              border: "1.5px solid #7c3aed", textDecoration: "none",
              boxShadow: "0 4px 16px rgba(124,58,237,0.32)",
            }}>
            📊 Revenue Analytics
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ── Main Export ─────────────────────────────────────────────────── */
export function HomeDashboard() {
  const { role } = useApp();
  if (role === "driver") return <DriverDashboard />;
  if (role === "marketplace") return <MarketplaceDashboard />;
  return <OperationsDashboard />;
}
