import { useState } from "react";
import { ChevronLeft, Users, Truck, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { MOCK_DRIVERS, MOCK_SHIPMENTS, type Driver } from "../data/mock";

type Filter = "all" | "on_duty" | "available";

function avatarColor(id: string) {
  const hue = (id.charCodeAt(1) * 37) % 360;
  return { bg: `hsl(${hue},55%,88%)`, fg: `hsl(${hue},55%,30%)` };
}

function initials(name: string) {
  return name.split(" ").map(n => n[0]).join("").slice(0, 2);
}

export function DriverManagementPage() {
  const nav = useNavigate();
  const [filter, setFilter] = useState<Filter>("all");

  // Derive current shipment for on_duty drivers
  const driverShipmentMap = Object.fromEntries(
    MOCK_SHIPMENTS.map(s => [s.driver, s])
  );

  const allDrivers = MOCK_DRIVERS;
  const onDuty   = allDrivers.filter(d => d.status === "on_duty");
  const available = allDrivers.filter(d => d.status === "available");

  const displayed = filter === "all" ? allDrivers : filter === "on_duty" ? onDuty : available;

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "var(--bg)", overflow: "hidden" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg,#0ea5e9 0%,#0284c7 100%)", padding: "calc(14px + env(safe-area-inset-top)) 16px 20px", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <button type="button" onClick={() => nav(-1)}
            style={{ background: "rgba(255,255,255,0.18)", border: "none", borderRadius: 10, width: 36, height: 36, display: "grid", placeItems: "center", cursor: "pointer" }}>
            <ChevronLeft size={20} color="#fff" strokeWidth={2.2} />
          </button>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 900, fontSize: 18, color: "#fff" }}>Driver Fleet</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.70)", marginTop: 1 }}>Status real-time semua driver</div>
          </div>
        </div>

        {/* Stat cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
          {[
            { label: "Total", value: allDrivers.length, icon: <Users size={18} />, bg: "rgba(255,255,255,0.18)", color: "#fff" },
            { label: "Bertugas", value: onDuty.length, icon: <Truck size={18} />, bg: "rgba(239,68,68,0.22)", color: "#fca5a5" },
            { label: "Kosong", value: available.length, icon: <span style={{ fontSize: 18 }}>✅</span>, bg: "rgba(16,185,129,0.22)", color: "#6ee7b7" },
          ].map(s => (
            <div key={s.label} style={{ background: s.bg, borderRadius: 14, padding: "12px 10px", textAlign: "center" }}>
              <div style={{ color: s.color, display: "flex", justifyContent: "center", marginBottom: 4 }}>{s.icon}</div>
              <div style={{ fontSize: 24, fontWeight: 900, color: "#fff", letterSpacing: "-0.04em" }}>{s.value}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.65)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter pills */}
      <div style={{ display: "flex", gap: 8, padding: "14px 16px 0", flexShrink: 0 }}>
        {(["all", "on_duty", "available"] as Filter[]).map(f => (
          <button key={f} type="button" onClick={() => setFilter(f)}
            style={{ padding: "7px 16px", borderRadius: 99, border: `1.5px solid ${filter === f ? "var(--primary)" : "var(--border)"}`, background: filter === f ? "rgba(14,165,233,0.10)" : "#fff", color: filter === f ? "var(--primary-dark)" : "var(--text-secondary)", fontWeight: 700, fontSize: 13, cursor: "pointer", transition: "all 0.15s" }}>
            {f === "all" ? "Semua" : f === "on_duty" ? "🔴 Bertugas" : "🟢 Kosong"}
          </button>
        ))}
      </div>

      {/* Driver list */}
      <div style={{ flex: 1, overflowY: "auto", padding: "12px 16px 24px", display: "flex", flexDirection: "column", gap: 10 }}>
        {displayed.map((d: Driver) => {
          const av = avatarColor(d.id);
          const busy = d.status === "on_duty";
          const currentShipment = d.currentShipmentId ? MOCK_SHIPMENTS.find(s => s.id === d.currentShipmentId) : undefined;
          const progress = currentShipment ? Math.round((1 - (currentShipment.freshnessPct / 100)) * 100) : 0;

          return (
            <div key={d.id}
              style={{ background: "#fff", borderRadius: 20, border: `1.5px solid ${busy ? "rgba(239,68,68,0.18)" : "rgba(16,185,129,0.18)"}`, padding: "16px", boxShadow: "var(--shadow-sm)", animation: "fadeInUp 0.35s ease both" }}>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                {/* Avatar */}
                <div style={{ width: 48, height: 48, borderRadius: 16, background: av.bg, display: "grid", placeItems: "center", fontSize: 16, fontWeight: 800, color: av.fg, flexShrink: 0 }}>
                  {initials(d.name)}
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: 15, color: "var(--text)" }}>{d.name}</div>
                      <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 2 }}>{d.vehicleType}</div>
                    </div>
                    <span style={{ padding: "4px 10px", borderRadius: 99, fontSize: 11, fontWeight: 700, background: busy ? "var(--danger-soft)" : "var(--success-soft)", color: busy ? "var(--danger-dark)" : "var(--success-dark)", border: `1px solid ${busy ? "rgba(239,68,68,0.25)" : "rgba(16,185,129,0.25)"}`, flexShrink: 0, marginLeft: 8 }}>
                      {busy ? "🔴 Bertugas" : "🟢 Tersedia"}
                    </span>
                  </div>

                  {/* Rating & trips */}
                  <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <Star size={12} color="#fbbf24" fill="#fbbf24" />
                      <span style={{ fontSize: 12, fontWeight: 700, color: "var(--text)" }}>{d.rating}</span>
                    </div>
                    <div style={{ fontSize: 12, color: "var(--text-secondary)", fontWeight: 600 }}>{d.totalTrips} trip</div>
                    <div style={{ fontSize: 12, color: "var(--text-secondary)", fontWeight: 600 }}>OTIF {d.otifPct}%</div>
                    <div style={{ fontSize: 12, color: "var(--text-secondary)", fontWeight: 600 }}>🌿 {d.avgFreshness}%</div>
                  </div>
                </div>
              </div>

              {/* On-duty info */}
              {busy && currentShipment && (
                <div style={{ marginTop: 12, background: "rgba(239,68,68,0.05)", borderRadius: 12, padding: "10px 12px", border: "1px solid rgba(239,68,68,0.14)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                    <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--text)" }}>{currentShipment.code}</div>
                    <div style={{ fontSize: 11.5, color: "var(--text-secondary)", fontWeight: 600 }}>ETA {currentShipment.eta}</div>
                  </div>
                  <div style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 8 }}>
                    {currentShipment.origin} → {currentShipment.destination}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 11, color: "var(--text-tertiary)", fontWeight: 600 }}>Progress pengiriman</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "var(--primary-dark)" }}>{progress}%</span>
                  </div>
                  <div style={{ height: 5, borderRadius: 99, background: "#eef2f7", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${progress}%`, borderRadius: 99, background: "linear-gradient(90deg,#22d3ee,#0ea5e9)", transition: "width 0.6s ease" }} />
                  </div>
                </div>
              )}

              {/* Available info */}
              {!busy && (
                <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ padding: "5px 12px", borderRadius: 99, fontSize: 12, fontWeight: 700, background: "var(--success-soft)", color: "var(--success-dark)", border: "1px solid rgba(16,185,129,0.25)" }}>
                    ✓ Siap Ditugaskan
                  </span>
                  <span style={{ fontSize: 12, color: "var(--text-tertiary)" }}>{d.vehicle}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
