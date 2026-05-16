import { AlertTriangle, Bell, Package, Store, BrainCircuit } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { MOCK_NOTIFICATIONS } from "../data/mock";

/* ─── helpers ──────────────────────────────────────────────────── */
const TYPE_ICONS = {
  ai_alert:    <AlertTriangle size={18} strokeWidth={1.8} />,
  shipment:    <Package size={18} strokeWidth={1.8} />,
  marketplace: <Store size={18} strokeWidth={1.8} />,
};
const TYPE_COLORS = {
  ai_alert:    { bg: "rgba(249,115,22,0.12)", color: "var(--warning-dark)", border: "rgba(249,115,22,0.25)" },
  shipment:    { bg: "rgba(14,165,233,0.10)",  color: "var(--primary-dark)",  border: "rgba(14,165,233,0.22)"  },
  marketplace: { bg: "rgba(124,58,237,0.10)",  color: "#7c3aed",              border: "rgba(124,58,237,0.22)"  },
};

/* ─── Shared notification card ─────────────────────────────────── */
function NotifCard({ n, accent }: { n: typeof MOCK_NOTIFICATIONS[0]; accent: string }) {
  const nav = useNavigate();
  const colors = TYPE_COLORS[n.type];
  return (
    <button
      type="button"
      onClick={() => { if (n.shipmentId) nav(`/app/shipments/${n.shipmentId}`); }}
      style={{
        textAlign: "left", display: "flex", gap: 12, padding: "14px 16px",
        borderRadius: 16, width: "100%", cursor: "pointer", transition: "box-shadow 0.15s",
        background: n.unread ? "#fff" : "#f8fafc",
        border: `1.5px solid ${n.unread ? colors.border : "var(--border-light)"}`,
        boxShadow: n.unread ? "var(--shadow-sm)" : "none",
        position: "relative",
      }}
    >
      {n.unread && (
        <div style={{ position: "absolute", left: -3, top: "50%", transform: "translateY(-50%)", width: 5, height: 24, borderRadius: 99, background: accent }} />
      )}
      <div style={{ width: 44, height: 44, borderRadius: 14, background: colors.bg, border: `1px solid ${colors.border}`, display: "grid", placeItems: "center", color: colors.color, flexShrink: 0 }}>
        {TYPE_ICONS[n.type]}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 8, alignItems: "flex-start" }}>
          <div style={{ fontWeight: n.unread ? 800 : 700, fontSize: 13.5, lineHeight: 1.3, flex: 1 }}>{n.title}</div>
          <div style={{ fontSize: 11, color: "var(--text-tertiary)", fontWeight: 600, flexShrink: 0 }}>{n.time}</div>
        </div>
        <p style={{ fontSize: 12.5, color: "var(--text-secondary)", marginTop: 4, lineHeight: 1.5 }}>{n.body}</p>
      </div>
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────────
   OPERATIONS MANAGER — semua tipe notifikasi, dengan filter tab
──────────────────────────────────────────────────────────────────*/
function OperationsNotifications() {
  const [filter, setFilter] = useState("Semua");
  const tabs = ["Semua", "AI Alert", "Shipment", "Marketplace"];
  const filtered = MOCK_NOTIFICATIONS.filter(n => {
    if (filter === "Semua")       return true;
    if (filter === "AI Alert")    return n.type === "ai_alert";
    if (filter === "Shipment")    return n.type === "shipment";
    if (filter === "Marketplace") return n.type === "marketplace";
    return true;
  });
  const unread = MOCK_NOTIFICATIONS.filter(n => n.unread).length;

  return (
    <div className="screen-scroll" style={{ padding: "calc(16px + env(safe-area-inset-top)) 16px 16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div>
          <h1 className="page-title" style={{ fontSize: 20 }}>Notifikasi</h1>
          {unread > 0 && <p className="subtle" style={{ marginTop: 3 }}>{unread} belum dibaca</p>}
        </div>
        <button type="button" style={{ fontSize: 12.5, fontWeight: 700, color: "var(--primary-dark)", background: "none", border: "none", cursor: "pointer" }}>
          Tandai semua dibaca
        </button>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 16, overflowX: "auto" }}>
        {tabs.map(t => (
          <button key={t} type="button" onClick={() => setFilter(t)}
            style={{ padding: "7px 14px", borderRadius: 99, fontSize: 13, fontWeight: 700, whiteSpace: "nowrap", flexShrink: 0, cursor: "pointer", transition: "all 0.15s",
              border: filter === t ? "1.5px solid var(--primary)" : "1.5px solid var(--border)",
              background: filter === t ? "rgba(14,165,233,0.10)" : "#fff",
              color: filter === t ? "var(--primary-dark)" : "var(--text-secondary)" }}>
            {t}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {filtered.map(n => <NotifCard key={n.id} n={n} accent="var(--primary)" />)}
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "48px 20px" }}>
            <Bell size={40} style={{ opacity: 0.2, marginBottom: 12 }} />
            <div style={{ fontWeight: 700, color: "var(--text-secondary)" }}>Tidak ada notifikasi</div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   DRIVER — hanya AI alert & update rute milik mereka
──────────────────────────────────────────────────────────────────*/
function DriverNotifications() {
  const driverNotifs = MOCK_NOTIFICATIONS.filter(n =>
    n.type === "ai_alert" || (n.type === "shipment" && n.shipmentId === "1")
  );
  const unread = driverNotifs.filter(n => n.unread).length;

  return (
    <div className="screen-scroll" style={{ padding: "calc(16px + env(safe-area-inset-top)) 16px 16px" }}>
      <div style={{ marginBottom: 20 }}>
        <h1 className="page-title" style={{ fontSize: 20 }}>Alert & Update Rute</h1>
        {unread > 0 && (
          <div style={{ marginTop: 6, display: "flex", alignItems: "center", gap: 6 }}>
            <span className="pulse-dot warn" style={{ width: 7, height: 7 }} />
            <p className="subtle">{unread} alert memerlukan perhatian</p>
          </div>
        )}
      </div>

      {/* AI alert banner if any unread */}
      {driverNotifs.some(n => n.unread && n.type === "ai_alert") && (
        <div className="anim-fade-up" style={{
          padding: "14px 16px", borderRadius: 16, marginBottom: 16,
          background: "rgba(249,115,22,0.08)", border: "1.5px solid rgba(249,115,22,0.30)",
          display: "flex", gap: 12, alignItems: "center",
          boxShadow: "0 4px 16px rgba(249,115,22,0.12)",
        }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(249,115,22,0.15)", display: "grid", placeItems: "center", color: "var(--warning-dark)", flexShrink: 0 }}>
            <BrainCircuit size={20} />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 14, color: "var(--warning-dark)" }}>AI mendeteksi risiko pada muatan Anda</div>
            <p className="subtle" style={{ fontSize: 12.5, marginTop: 2 }}>Segera tinjau smart alert dan pertimbangkan reroute</p>
          </div>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {driverNotifs.map(n => <NotifCard key={n.id} n={n} accent="var(--success)" />)}
        {driverNotifs.length === 0 && (
          <div style={{ textAlign: "center", padding: "48px 20px" }}>
            <Bell size={40} style={{ opacity: 0.2, marginBottom: 12 }} />
            <div style={{ fontWeight: 700, color: "var(--text-secondary)" }}>Tidak ada alert aktif</div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   MARKETPLACE — booking requests & marketplace notifikasi
──────────────────────────────────────────────────────────────────*/
function MarketplaceNotifications() {
  const mktNotifs = MOCK_NOTIFICATIONS.filter(n => n.type === "marketplace" || n.type === "ai_alert");
  const unread = mktNotifs.filter(n => n.unread).length;
  const nav = useNavigate();

  return (
    <div className="screen-scroll" style={{ padding: "calc(16px + env(safe-area-inset-top)) 16px 16px" }}>
      <div style={{ marginBottom: 20 }}>
        <h1 className="page-title" style={{ fontSize: 20 }}>Notifikasi Bisnis</h1>
        {unread > 0 && <p className="subtle" style={{ marginTop: 3 }}>{unread} permintaan baru</p>}
      </div>

      {/* New booking request card */}
      <div className="anim-fade-up" style={{ marginBottom: 16 }}>
        <div style={{
          padding: "16px 18px", borderRadius: 20,
          background: "rgba(124,58,237,0.07)", border: "2px solid rgba(124,58,237,0.25)",
          boxShadow: "0 8px 24px rgba(124,58,237,0.12)",
        }}>
          <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: 14, background: "rgba(124,58,237,0.15)", display: "grid", placeItems: "center", fontSize: 22, flexShrink: 0 }}>🚛</div>
            <div>
              <div style={{ fontWeight: 900, fontSize: 15 }}>Permintaan Armada Darurat</div>
              <p className="subtle" style={{ fontSize: 12.5, marginTop: 3, lineHeight: 1.45 }}>
                Rute SHP-2048 membutuhkan reefer truck dalam <strong style={{ color: "#7c3aed" }}>28 menit</strong>
              </p>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <button type="button" className="btn btn-block"
              onClick={() => nav("/app/marketplace/recommend/1")}
              style={{ background: "#7c3aed", color: "#fff", fontWeight: 700, borderRadius: 12, padding: "12px", border: "none", cursor: "pointer", fontSize: 14 }}>
              ✓ Terima & Tawarkan
            </button>
            <button type="button" className="btn btn-primary outline btn-block">
              Lihat Detail
            </button>
          </div>
        </div>
      </div>

      <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 12 }}>Semua Notifikasi</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {mktNotifs.map(n => <NotifCard key={n.id} n={n} accent="#7c3aed" />)}
      </div>
    </div>
  );
}

/* ─── Export ───────────────────────────────────────────────────── */
export function NotificationsPage() {
  const { role } = useApp();
  if (role === "driver")      return <DriverNotifications />;
  if (role === "marketplace") return <MarketplaceNotifications />;
  return <OperationsNotifications />;
}
