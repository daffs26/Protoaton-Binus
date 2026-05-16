import type { CSSProperties, ReactNode } from "react";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

// ── Card ──────────────────────────────────────────────────────────
type CardProps = {
  children: ReactNode;
  style?: CSSProperties;
  glow?: boolean;
  glowWarn?: boolean;
  className?: string;
  onClick?: () => void;
};

export function Card({ children, style, glow, glowWarn, className = "", onClick }: CardProps) {
  return (
    <div
      className={`card ${glow ? "ai-glow" : glowWarn ? "ai-glow-warn" : ""} ${className}`}
      style={style}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

// ── PageHeader ────────────────────────────────────────────────────
type PageHeaderProps = {
  title: string;
  subtitle?: string;
  right?: ReactNode;
  back?: boolean;
};

export function PageHeader({ title, subtitle, right, back }: PageHeaderProps) {
  const nav = useNavigate();
  return (
    <div style={{ marginBottom: 18 }}>
      {back && (
        <button className="back-btn" onClick={() => nav(-1)}>
          <ChevronLeft size={18} strokeWidth={2.5} />
          Kembali
        </button>
      )}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
        <div>
          <h1 className="page-title">{title}</h1>
          {subtitle && <p className="subtle" style={{ marginTop: 4 }}>{subtitle}</p>}
        </div>
        {right && <div style={{ flexShrink: 0 }}>{right}</div>}
      </div>
    </div>
  );
}

// ── StatCard ──────────────────────────────────────────────────────
type StatCardProps = {
  label: string;
  value: string | number;
  color?: string;
  icon?: ReactNode;
  suffix?: string;
};

export function StatCard({ label, value, color, icon, suffix }: StatCardProps) {
  return (
    <Card>
      <div style={{ padding: "14px 16px" }}>
        {icon && (
          <div style={{ marginBottom: 8, color: color ?? "var(--primary)" }}>{icon}</div>
        )}
        <div className="subtle" style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em" }}>
          {label}
        </div>
        <div
          className="stat-num"
          style={{ marginTop: 6, color: color ?? "var(--text)" }}
        >
          {value}
          {suffix && <span style={{ fontSize: 14, fontWeight: 600, color: "var(--text-secondary)", marginLeft: 3 }}>{suffix}</span>}
        </div>
      </div>
    </Card>
  );
}

// ── FreshnessBar ──────────────────────────────────────────────────
type FreshnessBarProps = { pct: number; label?: string };

export function FreshnessBar({ pct, label }: FreshnessBarProps) {
  const cls = pct >= 85 ? "fresh" : pct >= 70 ? "warn" : "danger";
  const color = pct >= 85 ? "var(--success)" : pct >= 70 ? "var(--warning)" : "var(--danger)";
  return (
    <div>
      {label && (
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, alignItems: "center" }}>
          <span className="subtle" style={{ fontSize: 12 }}>{label}</span>
          <span style={{ fontSize: 13, fontWeight: 800, color }}>{pct}%</span>
        </div>
      )}
      <div className="progress-track">
        <div className={`progress-fill ${cls}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

// ── TempBadge ─────────────────────────────────────────────────────
export function TempBadge({ tempC }: { tempC: number }) {
  const ok = tempC <= 8;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: "3px 9px",
        borderRadius: 99,
        fontSize: 12.5,
        fontWeight: 700,
        background: ok ? "var(--success-soft)" : "var(--danger-soft)",
        color: ok ? "var(--success-dark)" : "var(--danger-dark)",
        border: `1px solid ${ok ? "rgba(16,185,129,0.25)" : "rgba(239,68,68,0.25)"}`,
      }}
    >
      {tempC > 0 ? "+" : ""}{tempC}°C
    </span>
  );
}

// ── SectionHeader ─────────────────────────────────────────────────
type SectionHeaderProps = {
  title: string;
  action?: ReactNode;
};

export function SectionHeader({ title, action }: SectionHeaderProps) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
      <div className="section-title">{title}</div>
      {action}
    </div>
  );
}

// ── IconBox ───────────────────────────────────────────────────────
type IconBoxProps = {
  children: ReactNode;
  color?: string;
  bg?: string;
  size?: number;
};

export function IconBox({ children, color = "var(--primary)", bg = "var(--cyan-soft)", size = 40 }: IconBoxProps) {
  return (
    <div
      className="icon-box"
      style={{ width: size, height: size, background: bg, color }}
    >
      {children}
    </div>
  );
}

// ── FreshnessGauge SVG ────────────────────────────────────────────
export function FreshnessGauge({ pct }: { pct: number }) {
  const r = 60;
  const cx = 80;
  const cy = 80;
  const stroke = 10;
  const circumference = Math.PI * r; // half circle
  const filled = (pct / 100) * circumference;
  const color = pct >= 85 ? "#10b981" : pct >= 70 ? "#f97316" : "#ef4444";
  const label = pct >= 85 ? "Segar" : pct >= 70 ? "Menurun" : "Kritis";

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <svg width={160} height={95} viewBox="0 0 160 95">
        {/* Track */}
        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none"
          stroke="#eef2f7"
          strokeWidth={stroke}
          strokeLinecap="round"
        />
        {/* Fill */}
        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${filled} ${circumference}`}
          style={{ transition: "stroke-dasharray 0.8s ease" }}
        />
        {/* Center text */}
        <text x={cx} y={cy - 12} textAnchor="middle" fontSize={28} fontWeight={900} fill={color} fontFamily="inherit">
          {pct}%
        </text>
        <text x={cx} y={cy + 8} textAnchor="middle" fontSize={13} fill="#64748b" fontFamily="inherit">
          {label}
        </text>
      </svg>
    </div>
  );
}

// ── MiniChart SVG ─────────────────────────────────────────────────
export function MiniLineChart({ data, color = "#0ea5e9", height = 60 }: { data: number[]; color?: string; height?: number }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 300;
  const h = height;
  const pts = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / range) * (h - 10) - 2;
      return `${x},${y}`;
    })
    .join(" ");
  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id="lcg" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`0,${h} ${pts} ${w},${h}`} fill="url(#lcg)" />
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── MiniBarChart ──────────────────────────────────────────────────
export function MiniBarChart({ data, labels, color = "#0ea5e9" }: { data: number[]; labels?: string[]; color?: string }) {
  const max = Math.max(...data);
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "flex-end", height: 80 }}>
      {data.map((v, i) => (
        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, height: "100%" }}>
          <div
            style={{
              flex: 1,
              width: "100%",
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            <div
              style={{
                width: "100%",
                height: `${(v / max) * 100}%`,
                borderRadius: "6px 6px 3px 3px",
                background: color,
                opacity: 0.85,
                transition: "height 0.6s ease",
              }}
            />
          </div>
          {labels && <div style={{ fontSize: 10, color: "var(--text-secondary)", fontWeight: 600 }}>{labels[i]}</div>}
        </div>
      ))}
    </div>
  );
}
