import { AlertTriangle, Filter, Map, Package, Search, Truck, CalendarClock, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, FreshnessBar, SectionHeader } from "../components/Ui";
import { MOCK_SHIPMENTS } from "../data/mock";
import { useApp } from "../context/AppContext";

/* ─────────────────────────────────────────────────────────────────
   OPERATIONS MANAGER — full shipment list with filters & search
──────────────────────────────────────────────────────────────────*/
const FILTERS = ["Semua", "At Risk", "In Transit"];

function OperationsShipmentList() {
  const [filter, setFilter] = useState("Semua");
  const [search, setSearch] = useState("");

  const filtered = MOCK_SHIPMENTS.filter((s) => {
    const matchFilter =
      filter === "Semua" ||
      (filter === "At Risk" && s.status === "at_risk") ||
      (filter === "In Transit" && s.status === "in_transit");
    const matchSearch =
      !search ||
      s.code.toLowerCase().includes(search.toLowerCase()) ||
      s.product.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="screen-scroll" style={{ padding: "calc(16px + env(safe-area-inset-top)) 16px 16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div>
          <h1 className="page-title" style={{ fontSize: 20 }}>Semua Shipment</h1>
          <p className="subtle" style={{ marginTop: 3 }}>{MOCK_SHIPMENTS.length} shipment aktif</p>
        </div>
        <span className="chip chip-live">
          <span className="pulse-dot" style={{ width: 7, height: 7 }} />Live
        </span>
      </div>

      {/* Search */}
      <div style={{ position: "relative", marginBottom: 12 }}>
        <Search size={16} style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "var(--text-tertiary)" }} />
        <input
          type="text"
          placeholder="Cari kode atau produk…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: "100%", border: "1.5px solid var(--border)", borderRadius: 12, padding: "11px 14px 11px 40px", fontSize: 14.5, background: "#fff", outline: "none", color: "var(--text)" }}
        />
      </div>

      {/* Filter chips */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {FILTERS.map((f) => (
          <button key={f} type="button" onClick={() => setFilter(f)}
            style={{
              padding: "7px 14px", borderRadius: 99, fontSize: 13, fontWeight: 700,
              border: filter === f ? "1.5px solid var(--primary)" : "1.5px solid var(--border)",
              background: filter === f ? "rgba(14,165,233,0.10)" : "#fff",
              color: filter === f ? "var(--primary-dark)" : "var(--text-secondary)",
              cursor: "pointer", transition: "all 0.15s", whiteSpace: "nowrap",
            }}>
            {f}
            {f === "At Risk" && (
              <span style={{ marginLeft: 5, background: "var(--warning)", color: "#fff", borderRadius: 99, padding: "1px 6px", fontSize: 10.5 }}>
                {MOCK_SHIPMENTS.filter(s => s.status === "at_risk").length}
              </span>
            )}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {filtered.map((s, i) => (
          <Link key={s.id} to={`/app/shipments/${s.id}`} className={`anim-fade-up anim-delay-${Math.min(i + 1, 5)}`}>
            <Card>
              <div style={{ padding: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontWeight: 800, fontSize: 14.5 }}>{s.code}</span>
                      {s.status === "at_risk"
                        ? <span className="chip chip-warn" style={{ fontSize: 10 }}><AlertTriangle size={10} /> At risk</span>
                        : <span className="chip chip-live" style={{ fontSize: 10 }}>In transit</span>}
                    </div>
                    <div style={{ fontWeight: 600, fontSize: 13.5, marginTop: 4 }}>{s.product}</div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontWeight: 800, fontSize: 15 }}>ETA {s.eta}</div>
                    <div style={{ fontSize: 11.5, color: "var(--text-tertiary)", marginTop: 1 }}>{s.vehicle}</div>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--primary)", flexShrink: 0 }} />
                  <span className="subtle" style={{ fontSize: 12.5, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.origin}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--success)", flexShrink: 0 }} />
                  <span className="subtle" style={{ fontSize: 12.5, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.destination}</span>
                </div>

                <div style={{ marginTop: 10 }}>
                  <FreshnessBar pct={s.freshnessPct} label={`Freshness · ${s.driver} · ${s.tempC}°C`} />
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   DRIVER — hanya 1 shipment aktif mereka, map-first, CTA besar
──────────────────────────────────────────────────────────────────*/
function DriverActiveRoute() {
  const nav = useNavigate();
  const myShipment = MOCK_SHIPMENTS[0];

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}
    >

      {/* Green header */}
      <div
        className="anim-fade"
        style={{
          background: "linear-gradient(135deg, #10b981 0%, #059669 60%, #047857 100%)",
          padding: "calc(18px + env(safe-area-inset-top)) 18px 22px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", right: -20, bottom: -30, width: 130, height: 130, borderRadius: "50%", background: "rgba(255,255,255,0.07)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
            <h1 style={{ fontSize: 20, fontWeight: 900, color: "#fff", margin: 0, letterSpacing: "-0.02em" }}>
              Rute Aktif Saya
            </h1>
            <span style={{
              display: "flex", alignItems: "center", gap: 5, padding: "4px 11px", borderRadius: 99,
              background: "rgba(255,255,255,0.20)", fontSize: 11.5, fontWeight: 800, color: "#fff",
              border: "1px solid rgba(255,255,255,0.30)",
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#a7f3d0", display: "inline-block", animation: "blink-dot 1.4s ease-in-out infinite" }} />
              Live
            </span>
          </div>
          <p style={{ margin: 0, fontSize: 12.5, color: "rgba(255,255,255,0.70)" }}>
            Pantau kondisi muatan secara real-time
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="screen-driver" style={{ padding: "14px 14px 0", display: "flex", flexDirection: "column", gap: 12 }}>

        {/* Active trip card — pulsing green */}
        <div
          className="anim-fade-up driver-pulse-card"
          style={{
            background: "#fff", borderRadius: 20,
            border: "2px solid rgba(16,185,129,0.40)",
          }}
        >
          <div style={{ padding: "14px 16px" }}>
            {/* Code + status */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 22 }}>🚛</span>
                <div>
                  <div style={{ fontWeight: 900, fontSize: 15 }}>{myShipment.code}</div>
                  <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 1 }}>
                    {myShipment.product.split(" ").slice(0, 3).join(" ")}
                  </div>
                </div>
              </div>
              {myShipment.status === "at_risk" && (
                <span className="chip chip-warn" style={{ fontSize: 10.5 }}>
                  <AlertTriangle size={10} /> AI Risk
                </span>
              )}
            </div>

            {/* Route pills */}
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12, flexWrap: "wrap" }}>
              <div style={{ padding: "5px 11px", borderRadius: 99, background: "rgba(14,165,233,0.10)", fontSize: 11.5, fontWeight: 700, color: "var(--primary-dark)" }}>
                📍 {myShipment.origin}
              </div>
              <span style={{ fontSize: 14, color: "var(--text-tertiary)" }}>→</span>
              <div style={{ padding: "5px 11px", borderRadius: 99, background: "var(--driver-accent-soft)", fontSize: 11.5, fontWeight: 700, color: "var(--driver-accent-dark)" }}>
                🏁 {myShipment.destination}
              </div>
            </div>

            {/* Live stats */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 12 }}>
              <div className="driver-stat">
                <div className="val" style={{ color: myShipment.freshnessPct < 80 ? "var(--warning-dark)" : "var(--driver-accent-dark)" }}>
                  {myShipment.freshnessPct}%
                </div>
                <div className="lbl">Freshness</div>
              </div>
              <div className="driver-stat">
                <div className="val" style={{ color: myShipment.tempC > 6 ? "var(--danger)" : "var(--driver-accent-dark)" }}>
                  {myShipment.tempC}°C
                </div>
                <div className="lbl">Suhu</div>
              </div>
              <div className="driver-stat">
                <div className="val" style={{ color: "var(--text)" }}>{myShipment.eta}</div>
                <div className="lbl">ETA</div>
              </div>
            </div>

            <FreshnessBar pct={myShipment.freshnessPct} />
          </div>
        </div>

        {/* Primary CTAs */}
        <div className="anim-fade-up anim-delay-1">
          <button
            type="button"
            className="btn btn-success btn-block btn-lg"
            onClick={() => nav(`/app/navigation/${myShipment.id}`)}
          >
            🗺 Buka Navigasi AI
          </button>
        </div>

        <div className="anim-fade-up anim-delay-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <button
            type="button"
            className="btn btn-danger btn-block"
            style={{ padding: "12px 8px", fontSize: 13.5 }}
            onClick={() => nav(`/app/alert/${myShipment.id}`)}
          >
            <AlertTriangle size={15} /> Lihat Alert
          </button>
          <Link
            to={`/app/shipments/${myShipment.id}/freshness`}
            className="btn btn-block"
            style={{
              padding: "12px 8px", fontSize: 13.5, textAlign: "center",
              background: "var(--driver-accent-soft)", color: "var(--driver-accent-dark)",
              border: "1.5px solid rgba(16,185,129,0.30)", borderRadius: 14,
            }}
          >
            🌿 Freshness
          </Link>
        </div>

        {/* Next shipments */}
        <div className="anim-fade-up anim-delay-3">
          <div style={{ fontWeight: 800, fontSize: 14.5, marginBottom: 8 }}>Pengiriman Berikutnya</div>
          {MOCK_SHIPMENTS.slice(1, 3).map((s, i) => (
            <div
              key={s.id}
              className={`anim-fade-up anim-delay-${i + 4}`}
              style={{
                background: "#fff", borderRadius: 14, border: "1px solid var(--border-light)",
                padding: "11px 14px", marginBottom: 8,
                display: "flex", justifyContent: "space-between", alignItems: "center",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <div>
                <div style={{ fontWeight: 700, fontSize: 13.5 }}>{s.code}</div>
                <div className="subtle" style={{ fontSize: 12, marginTop: 2 }}>
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
  );
}


/* ─────────────────────────────────────────────────────────────────
   MARKETPLACE — daftar active bookings & permintaan booking baru
──────────────────────────────────────────────────────────────────*/
const MOCK_BOOKINGS = [
  { id: "b1", shipmentCode: "SHP-2048", client: "PT Distribusi Pangan Utama", service: "Reefer 8-ton", status: "active", earning: 420000, eta: "18:42", freshness: 72 },
  { id: "b2", shipmentCode: "SHP-2033", client: "Dairy Chain Indonesia", service: "Reefer 6-ton", status: "pending", earning: 310000, eta: "18:55", freshness: 83 },
  { id: "b3", shipmentCode: "SHP-REQ-01", client: "RS Siloam Logistics", service: "Cold Hub Storage", status: "request", earning: 185000, eta: "—", freshness: 0 },
];

function MarketplaceBookingList() {
  const nav = useNavigate();

  const statusConfig = {
    active:  { label: "Berlangsung", chip: "chip-live", dot: true },
    pending: { label: "Dikonfirmasi", chip: "chip-success", dot: false },
    request: { label: "Permintaan Baru", chip: "chip-warn", dot: false },
  };

  return (
    <div className="screen-scroll" style={{ padding: "calc(16px + env(safe-area-inset-top)) 16px 16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
        <div>
          <h1 className="page-title" style={{ fontSize: 20 }}>Booking Aktif</h1>
          <p className="subtle" style={{ marginTop: 4 }}>Kelola layanan armada & cold storage</p>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 12, color: "var(--text-tertiary)", fontWeight: 600 }}>Pendapatan hari ini</div>
          <div style={{ fontWeight: 900, fontSize: 18, color: "#7c3aed" }}>
            Rp {(420000 + 310000).toLocaleString("id-ID")}
          </div>
        </div>
      </div>

      {/* Summary strip */}
      <div className="stat-grid-3 anim-fade-up" style={{ marginBottom: 16 }}>
        {[
          { label: "Aktif", value: 1, color: "var(--primary)" },
          { label: "Selesai hari ini", value: 4, color: "var(--success)" },
          { label: "Request baru", value: 1, color: "#7c3aed" },
        ].map(s => (
          <Card key={s.label}>
            <div style={{ padding: "12px 10px", textAlign: "center" }}>
              <div style={{ fontSize: 22, fontWeight: 900, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 10.5, fontWeight: 700, color: "var(--text-tertiary)", textTransform: "uppercase", marginTop: 3 }}>{s.label}</div>
            </div>
          </Card>
        ))}
      </div>

      {/* Booking list */}
      <SectionHeader title="Daftar Booking" />
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {MOCK_BOOKINGS.map((b, i) => {
          const cfg = statusConfig[b.status as keyof typeof statusConfig];
          const isRequest = b.status === "request";
          return (
            <Card key={b.id} className={`anim-fade-up anim-delay-${i + 1}`} glowWarn={isRequest}>
              <div style={{ padding: "16px 18px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <div>
                    <span className={`chip ${cfg.chip}`} style={{ fontSize: 10.5 }}>
                      {cfg.dot && <span className="pulse-dot" style={{ width: 6, height: 6 }} />}
                      {cfg.label}
                    </span>
                    <div style={{ fontWeight: 800, fontSize: 15, marginTop: 6 }}>{b.shipmentCode}</div>
                    <div className="subtle" style={{ fontSize: 12.5, marginTop: 2 }}>{b.client}</div>
                  </div>
                  {b.earning > 0 && (
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 11, color: "var(--text-tertiary)", fontWeight: 600 }}>Pendapatan</div>
                      <div style={{ fontWeight: 900, fontSize: 16, color: "var(--success-dark)", marginTop: 2 }}>
                        Rp {b.earning.toLocaleString("id-ID")}
                      </div>
                    </div>
                  )}
                </div>

                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
                  <span className="chip chip-neutral" style={{ fontSize: 10.5 }}>🚛 {b.service}</span>
                  {b.eta !== "—" && <span className="chip chip-neutral" style={{ fontSize: 10.5 }}>⏱ ETA {b.eta}</span>}
                  {b.freshness > 0 && <span className={`chip ${b.freshness < 80 ? "chip-warn" : "chip-success"}`} style={{ fontSize: 10.5 }}>🌿 {b.freshness}% segar</span>}
                </div>

                {isRequest ? (
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    <button type="button" className="btn btn-primary btn-block"
                      onClick={() => nav(`/app/marketplace/recommend/1`)}>
                      <CheckCircle2 size={15} /> Terima
                    </button>
                    <button type="button" className="btn btn-primary outline btn-block">
                      Tolak
                    </button>
                  </div>
                ) : (
                  <button type="button" className="btn btn-primary outline btn-block btn-sm"
                    onClick={() => nav(`/app/shipments/1`)}>
                    Pantau Pengiriman
                  </button>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   EXPORT — role-aware wrapper
──────────────────────────────────────────────────────────────────*/
export function ShipmentListPage() {
  const { role } = useApp();
  if (role === "driver")      return <DriverActiveRoute />;
  if (role === "marketplace") return <MarketplaceBookingList />;
  return <OperationsShipmentList />;
}
