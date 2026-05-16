import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import type { UserRole } from "../types";
import { BarChart3, Truck, Store, CheckCircle2, ArrowRight } from "lucide-react";
import { useState } from "react";

const ROLES: {
  id: UserRole;
  label: string;
  desc: string;
  icon: typeof BarChart3;
  color: string;
  bg: string;
  gradient: string;
  perks: string[];
  destination: string;   // ← route spesifik per role
  destinationLabel: string;
}[] = [
  {
    id: "operations",
    label: "Operations Manager",
    desc: "Pantau seluruh armada & rantai distribusi dari command center AI",
    icon: BarChart3,
    color: "#0284c7",
    bg: "rgba(14,165,233,0.10)",
    gradient: "linear-gradient(135deg, #22d3ee, #0284c7)",
    perks: ["Dashboard real-time", "AI risk analysis", "Reroute control"],
    destination: "/app",
    destinationLabel: "Command Center",
  },
  {
    id: "driver",
    label: "Driver",
    desc: "Navigasi rute AI terbaik & monitor kondisi muatan secara live",
    icon: Truck,
    color: "#047857",
    bg: "rgba(16,185,129,0.10)",
    gradient: "linear-gradient(135deg, #34d399, #047857)",
    perks: ["Map-first interface", "AI alert push", "Live freshness"],
    destination: "/app/shipments",   // ← langsung ke rute aktif
    destinationLabel: "Rute Aktif Saya",
  },
  {
    id: "marketplace",
    label: "Marketplace Partner",
    desc: "Tawarkan armada, slot reefer & cold storage ke mitra logistik",
    icon: Store,
    color: "#7c3aed",
    bg: "rgba(124,58,237,0.10)",
    gradient: "linear-gradient(135deg, #a78bfa, #7c3aed)",
    perks: ["Fleet slot mgmt", "Booking cepat", "Revenue tracker"],
    destination: "/app/marketplace",  // ← langsung ke marketplace hub
    destinationLabel: "Marketplace Hub",
  },
];

export function RoleSelectPage() {
  const { setRole } = useApp();
  const nav = useNavigate();
  const [selected, setSelected] = useState<UserRole | null>(null);

  const selectedRole = ROLES.find((r) => r.id === selected);

  function handleConfirm() {
    if (!selected || !selectedRole) return;
    setRole(selected);
    nav(selectedRole.destination, { replace: true });
  }

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "var(--bg)", overflow: "hidden" }}>

      {/* Header */}
      <div style={{
        padding: "calc(20px + env(safe-area-inset-top)) 22px 22px",
        background: "#fff",
        borderBottom: "1px solid var(--border-light)",
        flexShrink: 0,
      }}>
        <div className="chip chip-live" style={{ marginBottom: 12 }}>
          <span className="pulse-dot" style={{ width: 7, height: 7 }} />
          ID-NEXUS Platform
        </div>
        <h1 className="page-title" style={{ fontSize: 24 }}>Pilih peran Anda</h1>
        <p className="subtle" style={{ marginTop: 6, lineHeight: 1.55, fontSize: 13 }}>
          Setiap peran mendapatkan tampilan dan fitur yang disesuaikan khusus untuk kebutuhan operasional Anda.
        </p>
      </div>

      {/* Role Cards — scrollable */}
      <div style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: "16px 16px 0", display: "flex", flexDirection: "column", gap: 12 }}>
        {ROLES.map((r, i) => {
          const Icon = r.icon;
          const isSelected = selected === r.id;
          return (
            <button
              key={r.id}
              type="button"
              className="anim-fade-up"
              onClick={() => setSelected(r.id)}
              style={{
                textAlign: "left",
                background: "#fff",
                border: `2px solid ${isSelected ? r.color : "var(--border-light)"}`,
                borderRadius: 20,
                padding: "16px 16px",
                cursor: "pointer",
                transition: "border-color 0.18s, box-shadow 0.18s, transform 0.12s",
                boxShadow: isSelected
                  ? `0 0 0 1px ${r.color}20, 0 8px 28px ${r.color}20`
                  : "var(--shadow-sm)",
                transform: isSelected ? "scale(1.015)" : "scale(1)",
                animationDelay: `${i * 0.08}s`,
                width: "100%",
                flexShrink: 0,
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: 13 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 13,
                  background: isSelected ? r.gradient : r.bg,
                  display: "grid", placeItems: "center",
                  color: isSelected ? "#fff" : r.color,
                  transition: "background 0.18s, color 0.18s",
                  flexShrink: 0,
                  boxShadow: isSelected ? `0 4px 14px ${r.color}40` : "none",
                }}>
                  <Icon size={21} strokeWidth={1.8} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800, fontSize: 15, color: "var(--text)" }}>{r.label}</div>
                  <div style={{ fontSize: 12.5, color: "var(--text-secondary)", marginTop: 3, lineHeight: 1.5 }}>{r.desc}</div>
                  <div style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
                    {r.perks.map((p) => (
                      <div key={p} style={{
                        padding: "3px 9px", borderRadius: 99,
                        background: isSelected ? `${r.color}18` : "var(--surface-muted)",
                        fontSize: 10.5, fontWeight: 700,
                        color: isSelected ? r.color : "var(--text-secondary)",
                        transition: "background 0.18s, color 0.18s",
                      }}>
                        {p}
                      </div>
                    ))}
                  </div>
                  {/* Destination preview */}
                  {isSelected && (
                    <div style={{
                      marginTop: 10, display: "flex", alignItems: "center", gap: 5,
                      fontSize: 11.5, fontWeight: 700, color: r.color,
                    }}>
                      <ArrowRight size={13} />
                      Menuju → {r.destinationLabel}
                    </div>
                  )}
                </div>
                {isSelected && (
                  <CheckCircle2 size={20} color={r.color} style={{ flexShrink: 0, marginTop: 2 }} />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Confirm button — sticky at bottom */}
      <div style={{
        padding: "14px 16px calc(14px + env(safe-area-inset-bottom))",
        background: "#fff",
        borderTop: "1px solid var(--border-light)",
        flexShrink: 0,
      }}>
        <button
          type="button"
          disabled={!selected}
          onClick={handleConfirm}
          style={{
            width: "100%",
            padding: "15px 20px",
            borderRadius: 16,
            border: "none",
            fontWeight: 800,
            fontSize: 15.5,
            cursor: selected ? "pointer" : "not-allowed",
            transition: "all 0.2s",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            background: selected
              ? (selectedRole?.gradient ?? "var(--primary)")
              : "var(--border)",
            color: selected ? "#fff" : "var(--text-tertiary)",
            boxShadow: selected
              ? `0 6px 20px ${selectedRole?.color ?? "transparent"}50`
              : "none",
            transform: selected ? "translateY(0)" : "translateY(2px)",
          }}
        >
          {selected ? (
            <>
              <ArrowRight size={18} />
              Masuk sebagai {selectedRole?.label}
            </>
          ) : (
            "Pilih peran terlebih dahulu"
          )}
        </button>
      </div>
    </div>
  );
}
