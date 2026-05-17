import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home, Package, Store, Bell, User,
  Map, AlertTriangle, CalendarClock, LayoutGrid, Plus,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { MOCK_NOTIFICATIONS } from "../data/mock";

type NavItem = {
  to: string;
  icon: React.ElementType;
  label: string;
  exact?: boolean;
  badgeCount?: number;
};

export function BottomNav() {
  const loc = useLocation();
  const nav = useNavigate();
  const { role } = useApp();

  const unreadAll   = MOCK_NOTIFICATIONS.filter((n) => n.unread).length;
  const unreadAI    = MOCK_NOTIFICATIONS.filter((n) => n.unread && n.type === "ai_alert").length;
  const unreadMkt   = MOCK_NOTIFICATIONS.filter((n) => n.unread && n.type === "marketplace").length;

  // accent colour per role
  const accent =
    role === "driver"      ? "var(--success)"
    : role === "marketplace" ? "#7c3aed"
    : "var(--primary)";

  const accentDark =
    role === "driver"      ? "var(--success-dark)"
    : role === "marketplace" ? "#6d28d9"
    : "var(--primary-dark)";

  function isActive(item: NavItem) {
    if (item.exact) return loc.pathname === item.to;
    if (item.to === "/app/alert/1") return loc.pathname.startsWith("/app/alert");
    return loc.pathname.startsWith(item.to);
  }

  /* ── Marketplace nav (unchanged) ─────────────────────────────── */
  if (role === "marketplace") {
    const items: NavItem[] = [
      { to: "/app",              icon: Home,          label: "Home",    exact: true },
      { to: "/app/shipments",    icon: CalendarClock, label: "Booking" },
      { to: "/app/marketplace",  icon: LayoutGrid,    label: "Fleet" },
      { to: "/app/notifications",icon: Bell,          label: "Notif",  badgeCount: unreadMkt },
      { to: "/app/profile",      icon: User,          label: "Profil" },
    ];
    return (
      <nav style={navStyle}>
        {items.map((item) => {
          const active = isActive(item);
          const Icon = item.icon;
          return <NavTab key={item.to} item={item} active={active} accent={accent} accentDark={accentDark} Icon={Icon} />;
        })}
      </nav>
    );
  }

  /* ── Driver nav ───────────────────────────────────────────────── */
  if (role === "driver") {
    const items: NavItem[] = [
      { to: "/app",              icon: Home,          label: "Home",  exact: true },
      { to: "/app/shipments",    icon: Map,           label: "Rute" },
      { to: "/app/alert/1",      icon: AlertTriangle, label: "Alert", badgeCount: unreadAI },
      { to: "/app/notifications",icon: Bell,          label: "Notif" },
      { to: "/app/profile",      icon: User,          label: "Profil" },
    ];
    return (
      <nav style={navStyle}>
        {items.map((item) => {
          const active = isActive(item);
          const Icon = item.icon;
          return <NavTab key={item.to} item={item} active={active} accent={accent} accentDark={accentDark} Icon={Icon} />;
        })}
      </nav>
    );
  }

  /* ── Operations nav — FAB centre ─────────────────────────────── */
  const leftItems: NavItem[] = [
    { to: "/app",           icon: Home,    label: "Home",     exact: true },
    { to: "/app/shipments", icon: Package, label: "Shipment" },
  ];
  const rightItems: NavItem[] = [
    { to: "/app/marketplace", icon: Store, label: "Market" },
    { to: "/app/profile",     icon: User,  label: "Profil" },
  ];
  const isFABActive = loc.pathname.startsWith("/app/create-shipment");

  return (
    <nav style={navStyle}>
      {/* Left tabs */}
      {leftItems.map((item) => {
        const active = isActive(item);
        const Icon = item.icon;
        return <NavTab key={item.to} item={item} active={active} accent={accent} accentDark={accentDark} Icon={Icon} />;
      })}

      {/* Centre FAB */}
      <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <button
          id="fab-create-shipment"
          type="button"
          onClick={() => nav("/app/create-shipment")}
          style={{
            width: 52,
            height: 52,
            borderRadius: "50%",
            background: isFABActive
              ? "linear-gradient(135deg, #0ea5e9, #0284c7)"
              : "linear-gradient(135deg, #22d3ee 0%, #0ea5e9 60%, #0284c7 100%)",
            border: "none",
            display: "grid",
            placeItems: "center",
            cursor: "pointer",
            boxShadow: isFABActive
              ? "0 0 0 4px rgba(14,165,233,0.20), 0 8px 24px rgba(14,165,233,0.50)"
              : "0 4px 18px rgba(14,165,233,0.45)",
            transform: isFABActive ? "scale(0.94)" : "scale(1)",
            transition: "box-shadow 0.2s, transform 0.15s",
            flexShrink: 0,
            marginBottom: 2,
          }}
          aria-label="Buat Shipment Baru"
        >
          <Plus size={24} color="#fff" strokeWidth={2.5} />
        </button>
      </div>

      {/* Right tabs */}
      {rightItems.map((item) => {
        const active = isActive(item);
        const Icon = item.icon;
        return <NavTab key={item.to} item={item} active={active} accent={accent} accentDark={accentDark} Icon={Icon} />;
      })}
    </nav>
  );
}

/* ── Shared nav tab item ────────────────────────────────────────── */
function NavTab({
  item, active, accent, accentDark, Icon,
}: {
  item: NavItem;
  active: boolean;
  accent: string;
  accentDark: string;
  Icon: React.ElementType;
}) {
  return (
    <Link
      key={item.to}
      to={item.to}
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        padding: "6px 4px",
        borderRadius: 12,
        color: active ? accentDark : "var(--text-tertiary)",
        transition: "color 0.15s, background 0.15s",
        background: active ? `${accent}14` : "transparent",
        position: "relative",
        textDecoration: "none",
      }}
    >
      <div style={{ position: "relative" }}>
        <Icon size={22} strokeWidth={active ? 2.2 : 1.7} style={{ transition: "stroke-width 0.15s" }} />
        {!!item.badgeCount && item.badgeCount > 0 && (
          <div style={{
            position: "absolute", top: -4, right: -5,
            minWidth: 16, height: 16, borderRadius: 99,
            background: "var(--danger)", border: "2px solid #fff",
            fontSize: 9, fontWeight: 800, color: "#fff",
            display: "grid", placeItems: "center", padding: "0 3px",
          }}>
            {item.badgeCount}
          </div>
        )}
      </div>
      <span style={{ fontSize: 10.5, fontWeight: active ? 700 : 500, letterSpacing: "0.01em", lineHeight: 1 }}>
        {item.label}
      </span>
      {active && (
        <div style={{
          position: "absolute", bottom: -8, left: "50%",
          transform: "translateX(-50%)",
          width: 20, height: 3, borderRadius: 99, background: accent,
        }} />
      )}
    </Link>
  );
}

const navStyle: React.CSSProperties = {
  position: "sticky",
  bottom: 0,
  width: "100%",
  background: "rgba(255,255,255,0.97)",
  backdropFilter: "blur(20px)",
  borderTop: "1px solid rgba(226,232,240,0.8)",
  display: "flex",
  alignItems: "center",
  paddingBottom: "calc(10px + env(safe-area-inset-bottom))",
  paddingTop: 8,
  paddingLeft: 6,
  paddingRight: 6,
  zIndex: 100,
  boxShadow: "0 -4px 24px rgba(15,23,42,0.07)",
  flexShrink: 0,
};
