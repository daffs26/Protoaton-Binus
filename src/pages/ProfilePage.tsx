import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { Card, SectionHeader } from "../components/Ui";
import {
  BarChart3, Bell, BookOpen, ChevronRight, LogOut,
  MapPinned, Settings, Star, Truck, DollarSign, Shield,
} from "lucide-react";

const ROLE_LABELS = {
  operations:  { label: "Operations Manager", color: "var(--primary-dark)", bg: "rgba(14,165,233,0.10)", accent: "var(--primary)" },
  driver:      { label: "Driver",              color: "var(--success-dark)", bg: "var(--success-soft)",   accent: "var(--success)" },
  marketplace: { label: "Marketplace Partner", color: "#6d28d9",             bg: "rgba(124,58,237,0.10)", accent: "#7c3aed" },
};

/* ─────────────────────────────────────────────────────────────────
   OPERATIONS MANAGER
──────────────────────────────────────────────────────────────────*/
function OperationsProfile() {
  const { logout } = useApp();
  const nav = useNavigate();
  const [logoutConfirm, setLogoutConfirm] = useState(false);
  const cfg = ROLE_LABELS.operations;

  const menuItems = [
    { label: "Shipment History",     icon: BookOpen,  to: "/app/history" },
    { label: "Analytics Dashboard",  icon: BarChart3,  to: "/app/analytics" },
    { label: "Demand Heatmap",       icon: MapPinned,  to: "/app/heatmap" },
    { label: "Notification Settings",icon: Bell,       to: "/app/notifications" },
    { label: "App Settings",         icon: Settings,   to: null },
  ];

  return (
    <div className="screen-scroll" style={{ padding: "calc(16px + env(safe-area-inset-top)) 16px 16px" }}>
      {/* Hero */}
      <div className="anim-fade-up" style={{ background: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)", borderRadius: 22, padding: "24px 20px", marginBottom: 20, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: -20, top: -20, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
        <div style={{ display: "flex", gap: 16, alignItems: "center", position: "relative", zIndex: 1 }}>
          <div style={{ width: 68, height: 68, borderRadius: 22, background: "rgba(255,255,255,0.25)", display: "grid", placeItems: "center", fontSize: 32, border: "2px solid rgba(255,255,255,0.40)", flexShrink: 0 }}>
            👔
          </div>
          <div>
            <div style={{ fontWeight: 900, fontSize: 18, color: "#fff" }}>Ahmad Firmansyah</div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", marginTop: 3 }}>ops@idnexus.co.id</div>
            <div style={{ marginTop: 8, display: "inline-block", padding: "4px 12px", borderRadius: 99, background: "rgba(255,255,255,0.22)", fontSize: 12, fontWeight: 700, color: "#fff" }}>
              {cfg.label}
            </div>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginTop: 20, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.20)", position: "relative", zIndex: 1 }}>
          {[
            { label: "Total Shipment", value: "142" },
            { label: "Freshness Avg",  value: "91%" },
            { label: "Risiko Dicegah", value: "38" },
          ].map(s => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: "#fff" }}>{s.value}</div>
              <div style={{ fontSize: 10.5, color: "rgba(255,255,255,0.65)", fontWeight: 600, marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <Card className="anim-fade-up anim-delay-1" style={{ marginBottom: 16 }}>
        <div style={{ padding: "14px 16px" }}>
          <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 12 }}>Pencapaian</div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {[
              { emoji: "🏆", label: "Top Manager",    color: "#f59e0b" },
              { emoji: "🤖", label: "AI Power User",  color: "var(--primary)" },
              { emoji: "📊", label: "Analytics Pro",  color: "var(--success)" },
              { emoji: "🛡️", label: "Risk Hunter",   color: "#8b5cf6" },
            ].map(badge => (
              <div key={badge.label} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 12, background: "var(--surface-muted)", border: "1px solid var(--border-light)", fontSize: 12.5, fontWeight: 700, color: badge.color }}>
                <span style={{ fontSize: 14 }}>{badge.emoji}</span>{badge.label}
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Menu */}
      <SectionHeader title="Menu" />
      <Card className="anim-fade-up anim-delay-2" style={{ marginBottom: 14 }}>
        {menuItems.map((item, i) => {
          const Icon = item.icon;
          const content = (
            <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", borderBottom: i < menuItems.length - 1 ? "1px solid var(--border-light)" : "none" }}>
              <div style={{ width: 36, height: 36, borderRadius: 11, background: "rgba(14,165,233,0.08)", display: "grid", placeItems: "center", color: "var(--primary-dark)", flexShrink: 0 }}>
                <Icon size={18} strokeWidth={1.8} />
              </div>
              <div style={{ fontWeight: 600, fontSize: 14.5, flex: 1 }}>{item.label}</div>
              <ChevronRight size={17} color="var(--text-tertiary)" />
            </div>
          );
          return item.to ? <Link key={item.label} to={item.to} style={{ display: "block" }}>{content}</Link>
            : <button key={item.label} type="button" style={{ display: "block", width: "100%", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>{content}</button>;
        })}
      </Card>

      {/* Role switcher */}
      <Card className="anim-fade-up anim-delay-3" style={{ marginBottom: 16 }}>
        <div style={{ padding: "14px 16px" }}>
          <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 10 }}>Peran Aktif</div>
          <Link to="/role" style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 14, background: cfg.bg, border: `1px solid ${cfg.color}30` }}>
            <Shield size={18} color={cfg.color} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: cfg.color }}>{cfg.label}</div>
              <div className="subtle" style={{ fontSize: 12, marginTop: 2 }}>Ketuk untuk ganti peran</div>
            </div>
            <ChevronRight size={17} color={cfg.color} />
          </Link>
        </div>
      </Card>

      <button type="button" className="btn btn-block" onClick={() => { if (!logoutConfirm) { setLogoutConfirm(true); return; } logout(); nav("/login", { replace: true }); }}
        style={{ background: logoutConfirm ? "var(--danger-soft)" : "var(--surface)", border: `1.5px solid ${logoutConfirm ? "rgba(239,68,68,0.35)" : "var(--border)"}`, color: logoutConfirm ? "var(--danger-dark)" : "var(--text-secondary)", borderRadius: 14, padding: "14px", fontWeight: 700, fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, cursor: "pointer", transition: "all 0.18s" }}>
        <LogOut size={18} />
        {logoutConfirm ? "Ketuk lagi untuk konfirmasi keluar" : "Keluar"}
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   DRIVER
──────────────────────────────────────────────────────────────────*/
function DriverProfile() {
  const { logout } = useApp();
  const nav = useNavigate();
  const [logoutConfirm, setLogoutConfirm] = useState(false);
  const cfg = ROLE_LABELS.driver;

  const menuItems = [
    { label: "Riwayat Pengiriman",   icon: BookOpen,  to: "/app/history" },
    { label: "Performa & Statistik", icon: BarChart3,  to: "/app/analytics" },
    { label: "Notifikasi & Alert",   icon: Bell,       to: "/app/notifications" },
    { label: "Pengaturan Aplikasi",  icon: Settings,   to: null },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}>

      {/* ── Green sticky hero header ─────────────────────────── */}
      <div className="anim-fade" style={{
        background: "linear-gradient(135deg, #10b981 0%, #047857 100%)",
        padding: "calc(18px + env(safe-area-inset-top)) 18px 22px",
        position: "relative", overflow: "hidden", flexShrink: 0,
      }}>
        <div style={{ position: "absolute", right: -20, top: -20, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
        <div style={{ display: "flex", gap: 14, alignItems: "center", position: "relative", zIndex: 1, marginBottom: 16 }}>
          <div style={{ width: 60, height: 60, borderRadius: 18, background: "rgba(255,255,255,0.25)", display: "grid", placeItems: "center", fontSize: 28, border: "2px solid rgba(255,255,255,0.40)", flexShrink: 0 }}>
            🚛
          </div>
          <div>
            <div style={{ fontWeight: 900, fontSize: 18, color: "#fff" }}>Budi Santoso</div>
            <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.75)", marginTop: 3 }}>budi.driver@idnexus.co.id</div>
            <div style={{ marginTop: 6, display: "inline-flex", alignItems: "center", gap: 4, padding: "4px 12px", borderRadius: 99, background: "rgba(255,255,255,0.22)", fontSize: 11.5, fontWeight: 700, color: "#fff" }}>
              <Truck size={11} /> {cfg.label}
            </div>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.20)", position: "relative", zIndex: 1 }}>
          {[
            { label: "Pengiriman", value: "28" },
            { label: "Rating",     value: "4.9 ★" },
            { label: "Freshness",  value: "87%" },
          ].map(s => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: "#fff" }}>{s.value}</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.65)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.03em", marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Scrollable content ─────────────────────────────────── */}
      <div className="screen-scroll" style={{ padding: "16px 16px 0" }}>

      {/* Earnings card */}
      <Card glow className="anim-fade-up anim-delay-1" style={{ marginBottom: 16 }}>
        <div style={{ padding: "14px 18px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text-tertiary)", textTransform: "uppercase" }}>Pendapatan Bulan Ini</div>
              <div style={{ fontSize: 24, fontWeight: 900, color: "var(--success-dark)", marginTop: 4, letterSpacing: "-0.04em" }}>Rp 8.245.000</div>
            </div>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: "var(--success-soft)", display: "grid", placeItems: "center", color: "var(--success-dark)" }}>
              <DollarSign size={24} />
            </div>
          </div>
          <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
            <span className="chip chip-success">↑ +12% dari bulan lalu</span>
          </div>
        </div>
      </Card>

      {/* Achievements */}
      <Card className="anim-fade-up anim-delay-2" style={{ marginBottom: 16 }}>
        <div style={{ padding: "14px 16px" }}>
          <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 12 }}>Pencapaian Driver</div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {[
              { emoji: "⭐", label: "Top Driver",      color: "#f59e0b" },
              { emoji: "❄️", label: "Cold Chain Pro",  color: "var(--primary)" },
              { emoji: "⚡", label: "Fast Responder",  color: "var(--success)" },
              { emoji: "🗺️", label: "Route Master",   color: "#8b5cf6" },
            ].map(badge => (
              <div key={badge.label} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 12, background: "var(--surface-muted)", border: "1px solid var(--border-light)", fontSize: 12.5, fontWeight: 700, color: badge.color }}>
                <span style={{ fontSize: 14 }}>{badge.emoji}</span>{badge.label}
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Menu */}
      <SectionHeader title="Menu" />
      <Card className="anim-fade-up anim-delay-3" style={{ marginBottom: 14 }}>
        {menuItems.map((item, i) => {
          const Icon = item.icon;
          const content = (
            <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", borderBottom: i < menuItems.length - 1 ? "1px solid var(--border-light)" : "none" }}>
              <div style={{ width: 36, height: 36, borderRadius: 11, background: "var(--success-soft)", display: "grid", placeItems: "center", color: "var(--success-dark)", flexShrink: 0 }}>
                <Icon size={18} strokeWidth={1.8} />
              </div>
              <div style={{ fontWeight: 600, fontSize: 14.5, flex: 1 }}>{item.label}</div>
              <ChevronRight size={17} color="var(--text-tertiary)" />
            </div>
          );
          return item.to ? <Link key={item.label} to={item.to} style={{ display: "block" }}>{content}</Link>
            : <button key={item.label} type="button" style={{ display: "block", width: "100%", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>{content}</button>;
        })}
      </Card>

      <Link to="/role" style={{ display: "block", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 16px", borderRadius: 14, background: cfg.bg, border: `1px solid ${cfg.color}30` }}>
          <Star size={18} color={cfg.color} />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: cfg.color }}>{cfg.label}</div>
            <div className="subtle" style={{ fontSize: 12, marginTop: 2 }}>Ketuk untuk ganti peran</div>
          </div>
          <ChevronRight size={17} color={cfg.color} />
        </div>
      </Link>

      <button type="button" className="btn btn-block" onClick={() => { if (!logoutConfirm) { setLogoutConfirm(true); return; } logout(); nav("/login", { replace: true }); }}
        style={{ background: logoutConfirm ? "var(--danger-soft)" : "var(--surface)", border: `1.5px solid ${logoutConfirm ? "rgba(239,68,68,0.35)" : "var(--border)"}`, color: logoutConfirm ? "var(--danger-dark)" : "var(--text-secondary)", borderRadius: 14, padding: "14px", fontWeight: 700, fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, cursor: "pointer" }}>
        <LogOut size={18} />
        {logoutConfirm ? "Ketuk lagi untuk konfirmasi keluar" : "Keluar"}
      </button>
      </div>
    </div>
  );
}


/* ─────────────────────────────────────────────────────────────────
   MARKETPLACE PARTNER
──────────────────────────────────────────────────────────────────*/
function MarketplaceProfile() {
  const { logout } = useApp();
  const nav = useNavigate();
  const [logoutConfirm, setLogoutConfirm] = useState(false);
  const cfg = ROLE_LABELS.marketplace;

  const menuItems = [
    { label: "Riwayat Booking",      icon: BookOpen,  to: "/app/history" },
    { label: "Revenue Analytics",    icon: BarChart3,  to: "/app/analytics" },
    { label: "Notifikasi Bisnis",    icon: Bell,       to: "/app/notifications" },
    { label: "Kelola Armada",        icon: Truck,      to: "/app/marketplace" },
    { label: "Pengaturan Akun",      icon: Settings,   to: null },
  ];

  return (
    <div className="screen-scroll" style={{ padding: "calc(16px + env(safe-area-inset-top)) 16px 16px" }}>
      {/* Hero */}
      <div className="anim-fade-up" style={{ background: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)", borderRadius: 22, padding: "24px 20px", marginBottom: 20, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: -20, top: -20, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
        <div style={{ display: "flex", gap: 16, alignItems: "center", position: "relative", zIndex: 1 }}>
          <div style={{ width: 68, height: 68, borderRadius: 22, background: "rgba(255,255,255,0.25)", display: "grid", placeItems: "center", fontSize: 32, border: "2px solid rgba(255,255,255,0.40)", flexShrink: 0 }}>
            🏭
          </div>
          <div>
            <div style={{ fontWeight: 900, fontSize: 18, color: "#fff" }}>PT Sejuk Ekspres</div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", marginTop: 3 }}>admin@sejukekspres.co.id</div>
            <div style={{ marginTop: 8, display: "inline-block", padding: "4px 12px", borderRadius: 99, background: "rgba(255,255,255,0.22)", fontSize: 12, fontWeight: 700, color: "#fff" }}>
              {cfg.label}
            </div>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginTop: 20, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.20)", position: "relative", zIndex: 1 }}>
          {[
            { label: "Armada",    value: "8 unit" },
            { label: "Rating",    value: "4.9 ★" },
            { label: "Booking",   value: "142" },
          ].map(s => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: "#fff" }}>{s.value}</div>
              <div style={{ fontSize: 10.5, color: "rgba(255,255,255,0.65)", fontWeight: 600, marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Revenue card */}
      <Card className="anim-fade-up anim-delay-1" style={{ marginBottom: 16, border: "2px solid rgba(124,58,237,0.25)" }}>
        <div style={{ padding: "14px 18px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text-tertiary)", textTransform: "uppercase" }}>Revenue Bulan Ini</div>
              <div style={{ fontSize: 24, fontWeight: 900, color: "#7c3aed", marginTop: 4, letterSpacing: "-0.04em" }}>Rp 28.750.000</div>
            </div>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(124,58,237,0.12)", display: "grid", placeItems: "center", color: "#7c3aed" }}>
              <DollarSign size={24} />
            </div>
          </div>
          <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
            <span style={{ padding: "4px 10px", borderRadius: 99, background: "rgba(124,58,237,0.10)", color: "#6d28d9", fontSize: 11.5, fontWeight: 700, border: "1px solid rgba(124,58,237,0.20)" }}>
              ↑ +8.4% dari bulan lalu
            </span>
          </div>
        </div>
      </Card>

      {/* Fleet summary */}
      <Card className="anim-fade-up anim-delay-2" style={{ marginBottom: 16 }}>
        <div style={{ padding: "14px 16px" }}>
          <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 12 }}>Status Armada</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { label: "Reefer Truck 8-ton",   total: 3, active: 2 },
              { label: "Chiller Van 3-ton",    total: 3, active: 1 },
              { label: "Cold Hub Slot",         total: 120, active: 92 },
            ].map(fleet => (
              <div key={fleet.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 13.5, fontWeight: 600 }}>{fleet.label}</span>
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  <span className="chip chip-live" style={{ fontSize: 10.5 }}>{fleet.active} aktif</span>
                  <span className="chip chip-neutral" style={{ fontSize: 10.5 }}>{fleet.total - fleet.active} kosong</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Menu */}
      <SectionHeader title="Menu Bisnis" />
      <Card className="anim-fade-up anim-delay-3" style={{ marginBottom: 14 }}>
        {menuItems.map((item, i) => {
          const Icon = item.icon;
          const content = (
            <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", borderBottom: i < menuItems.length - 1 ? "1px solid var(--border-light)" : "none" }}>
              <div style={{ width: 36, height: 36, borderRadius: 11, background: "rgba(124,58,237,0.10)", display: "grid", placeItems: "center", color: "#7c3aed", flexShrink: 0 }}>
                <Icon size={18} strokeWidth={1.8} />
              </div>
              <div style={{ fontWeight: 600, fontSize: 14.5, flex: 1 }}>{item.label}</div>
              <ChevronRight size={17} color="var(--text-tertiary)" />
            </div>
          );
          return item.to ? <Link key={item.label} to={item.to} style={{ display: "block" }}>{content}</Link>
            : <button key={item.label} type="button" style={{ display: "block", width: "100%", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>{content}</button>;
        })}
      </Card>

      <Link to="/role" style={{ display: "block", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 16px", borderRadius: 14, background: cfg.bg, border: `1px solid ${cfg.color}30` }}>
          <Star size={18} color={cfg.color} />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: cfg.color }}>{cfg.label}</div>
            <div className="subtle" style={{ fontSize: 12, marginTop: 2 }}>Ketuk untuk ganti peran</div>
          </div>
          <ChevronRight size={17} color={cfg.color} />
        </div>
      </Link>

      <button type="button" className="btn btn-block" onClick={() => { if (!logoutConfirm) { setLogoutConfirm(true); return; } logout(); nav("/login", { replace: true }); }}
        style={{ background: logoutConfirm ? "var(--danger-soft)" : "var(--surface)", border: `1.5px solid ${logoutConfirm ? "rgba(239,68,68,0.35)" : "var(--border)"}`, color: logoutConfirm ? "var(--danger-dark)" : "var(--text-secondary)", borderRadius: 14, padding: "14px", fontWeight: 700, fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, cursor: "pointer" }}>
        <LogOut size={18} />
        {logoutConfirm ? "Ketuk lagi untuk konfirmasi keluar" : "Keluar"}
      </button>
    </div>
  );
}

/* ─── Export ───────────────────────────────────────────────────── */
export function ProfilePage() {
  const { role } = useApp();
  if (role === "driver")      return <DriverProfile />;
  if (role === "marketplace") return <MarketplaceProfile />;
  return <OperationsProfile />;
}
