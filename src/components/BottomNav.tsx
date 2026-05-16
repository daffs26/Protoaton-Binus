import { Link, useLocation } from "react-router-dom";
import {
  Home, Package, Store, Bell, User,
  Map, AlertTriangle, CalendarClock, LayoutGrid,
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
  const { role } = useApp();

  const unreadAll   = MOCK_NOTIFICATIONS.filter((n) => n.unread).length;
  const unreadAI    = MOCK_NOTIFICATIONS.filter((n) => n.unread && n.type === "ai_alert").length;
  const unreadMkt   = MOCK_NOTIFICATIONS.filter((n) => n.unread && n.type === "marketplace").length;

  const navMap: Record<string, NavItem[]> = {
    operations: [
      { to: "/app",              icon: Home,          label: "Home",      exact: true },
      { to: "/app/shipments",    icon: Package,       label: "Shipment" },
      { to: "/app/marketplace",  icon: Store,         label: "Market" },
      { to: "/app/notifications",icon: Bell,          label: "Notif",   badgeCount: unreadAll },
      { to: "/app/profile",      icon: User,          label: "Profil" },
    ],
    driver: [
      { to: "/app",              icon: Home,          label: "Home",      exact: true },
      { to: "/app/shipments",    icon: Map,           label: "Rute" },
      { to: "/app/alert/1",      icon: AlertTriangle, label: "Alert",   badgeCount: unreadAI },
      { to: "/app/notifications",icon: Bell,          label: "Notif" },
      { to: "/app/profile",      icon: User,          label: "Profil" },
    ],
    marketplace: [
      { to: "/app",              icon: Home,          label: "Home",      exact: true },
      { to: "/app/shipments",    icon: CalendarClock, label: "Booking" },
      { to: "/app/marketplace",  icon: LayoutGrid,    label: "Fleet" },
      { to: "/app/notifications",icon: Bell,          label: "Notif",   badgeCount: unreadMkt },
      { to: "/app/profile",      icon: User,          label: "Profil" },
    ],
  };

  const items = navMap[role ?? "operations"] ?? navMap.operations;

  function isActive(item: NavItem) {
    if (item.exact) return loc.pathname === item.to;
    // alert route: active when on any /app/alert/*
    if (item.to === "/app/alert/1") return loc.pathname.startsWith("/app/alert");
    return loc.pathname.startsWith(item.to);
  }

  // accent colour per role
  const accent =
    role === "driver"      ? "var(--success)"
    : role === "marketplace" ? "#7c3aed"
    : "var(--primary)";

  const accentDark =
    role === "driver"      ? "var(--success-dark)"
    : role === "marketplace" ? "#6d28d9"
    : "var(--primary-dark)";

  return (
    <nav
      style={{
        position: "fixed",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "min(393px, 100%)",
        background: "rgba(255,255,255,0.96)",
        backdropFilter: "blur(18px)",
        borderTop: "1px solid rgba(226,232,240,0.8)",
        display: "flex",
        paddingBottom: "calc(10px + env(safe-area-inset-bottom))",
        paddingTop: 8,
        paddingLeft: 6,
        paddingRight: 6,
        zIndex: 100,
        boxShadow: "0 -4px 24px rgba(15,23,42,0.07)",
      }}
    >
      {items.map((item) => {
        const active = isActive(item);
        const Icon = item.icon;
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
            }}
          >
            <div style={{ position: "relative" }}>
              <Icon
                size={22}
                strokeWidth={active ? 2.2 : 1.7}
                style={{ transition: "stroke-width 0.15s" }}
              />
              {!!item.badgeCount && item.badgeCount > 0 && (
                <div
                  style={{
                    position: "absolute",
                    top: -4,
                    right: -5,
                    minWidth: 16,
                    height: 16,
                    borderRadius: 99,
                    background: "var(--danger)",
                    border: "2px solid #fff",
                    fontSize: 9,
                    fontWeight: 800,
                    color: "#fff",
                    display: "grid",
                    placeItems: "center",
                    padding: "0 3px",
                  }}
                >
                  {item.badgeCount}
                </div>
              )}
            </div>
            <span
              style={{
                fontSize: 10.5,
                fontWeight: active ? 700 : 500,
                letterSpacing: "0.01em",
                lineHeight: 1,
              }}
            >
              {item.label}
            </span>
            {active && (
              <div
                style={{
                  position: "absolute",
                  bottom: -8,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 20,
                  height: 3,
                  borderRadius: 99,
                  background: accent,
                }}
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
