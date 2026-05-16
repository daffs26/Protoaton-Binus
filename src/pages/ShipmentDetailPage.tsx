import {
  AlertTriangle, Phone, Route, Thermometer, ThermometerSun, User,
  MapPin, Clock, Package, ShieldAlert
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MapMock } from "../components/MapMock";
import { Card, FreshnessBar, PageHeader, TempBadge } from "../components/Ui";
import { getShipment } from "../data/mock";

export function ShipmentDetailPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const s = id ? getShipment(id) : undefined;

  if (!s) {
    return (
      <div className="screen-scroll no-tab" style={{ padding: 24 }}>
        <p>Shipment tidak ditemukan.</p>
        <button type="button" className="btn btn-primary" onClick={() => nav("/app/shipments")}>
          Kembali
        </button>
      </div>
    );
  }

  const atRisk = s.status === "at_risk";

  return (
    <div className="screen-scroll no-tab" style={{ padding: "calc(12px + env(safe-area-inset-top)) 16px 24px" }}>
      <PageHeader
        title={s.code}
        subtitle={`${s.origin} → ${s.destination}`}
        back
        right={
          atRisk
            ? <span className="chip chip-warn"><AlertTriangle size={12} /> AI monitoring</span>
            : <span className="chip chip-live"><span className="pulse-dot" style={{ width: 7, height: 7 }} /> Stable</span>
        }
      />

      {/* Map */}
      <div className="anim-fade-up" style={{ marginBottom: 14 }}>
        <MapMock variant="full" highlightRisk={atRisk} />
      </div>

      {/* Status quick cards */}
      <div className="stat-grid-2 anim-fade-up anim-delay-1" style={{ marginBottom: 14 }}>
        <Card>
          <div style={{ padding: "14px 16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <ThermometerSun size={16} color={s.freshnessPct < 80 ? "var(--warning)" : "var(--success)"} />
              <span style={{ fontSize: 11.5, fontWeight: 700, color: "var(--text-tertiary)", textTransform: "uppercase" }}>Freshness</span>
            </div>
            <div style={{
              fontSize: 26,
              fontWeight: 900,
              color: s.freshnessPct < 80 ? "var(--warning-dark)" : "var(--success-dark)",
              letterSpacing: "-0.04em",
            }}>
              {s.freshnessPct}%
            </div>
            <FreshnessBar pct={s.freshnessPct} />
          </div>
        </Card>
        <Card>
          <div style={{ padding: "14px 16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <Thermometer size={16} color="var(--primary)" />
              <span style={{ fontSize: 11.5, fontWeight: 700, color: "var(--text-tertiary)", textTransform: "uppercase" }}>Suhu Kabin</span>
            </div>
            <div style={{ fontSize: 26, fontWeight: 900, color: s.tempC > 6 ? "var(--danger)" : "var(--text)", letterSpacing: "-0.04em" }}>
              {s.tempC}°C
            </div>
            <div style={{ marginTop: 8 }}>
              <TempBadge tempC={s.tempC} />
            </div>
          </div>
        </Card>
      </div>

      {/* Shipment info card */}
      <Card className="anim-fade-up anim-delay-2" style={{ marginBottom: 12 }}>
        <div style={{ padding: "16px 18px" }}>
          <div style={{ fontWeight: 800, fontSize: 14.5, marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
            <Package size={17} color="var(--primary)" />
            Informasi Shipment
          </div>
          <div style={{ display: "grid", gap: 12 }}>
            {[
              { label: "Produk", value: s.product },
              { label: "Asal", value: s.origin, icon: <MapPin size={13} color="var(--primary)" /> },
              { label: "Tujuan", value: s.destination, icon: <MapPin size={13} color="var(--success)" /> },
              { label: "ETA Tujuan", value: s.eta, icon: <Clock size={13} color="var(--text-secondary)" /> },
            ].map((row) => (
              <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                <div className="subtle" style={{ fontSize: 12.5, flexShrink: 0 }}>{row.label}</div>
                <div style={{ fontWeight: 600, fontSize: 13.5, textAlign: "right", display: "flex", alignItems: "center", gap: 5 }}>
                  {row.icon}
                  {row.value}
                </div>
              </div>
            ))}
          </div>

          {s.riskNote && (
            <div
              style={{
                marginTop: 14,
                padding: "12px 14px",
                borderRadius: 12,
                background: "var(--danger-soft)",
                border: "1px solid rgba(239,68,68,0.22)",
              }}
            >
              <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <ShieldAlert size={16} color="var(--danger)" style={{ marginTop: 1, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 12, fontWeight: 800, color: "var(--danger-dark)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                    Catatan Risiko AI
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "var(--danger-dark)", marginTop: 4, lineHeight: 1.45 }}>
                    {s.riskNote}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Driver card */}
      <Card className="anim-fade-up anim-delay-3" style={{ marginBottom: 16 }}>
        <div style={{ padding: "16px 18px" }}>
          <div style={{ fontWeight: 800, fontSize: 14.5, marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
            <User size={17} color="var(--primary)" />
            Driver
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 16,
                  background: "linear-gradient(135deg, #e0f2fe, #dbeafe)",
                  display: "grid",
                  placeItems: "center",
                  fontSize: 22,
                  border: "1px solid rgba(14,165,233,0.20)",
                  flexShrink: 0,
                }}
              >
                👤
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{s.driver}</div>
                <div className="subtle" style={{ fontSize: 12.5, marginTop: 2 }}>{s.vehicle}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 4 }}>
                  <span style={{ color: "#fbbf24", fontSize: 12 }}>★★★★★</span>
                  <span style={{ fontSize: 11.5, color: "var(--text-secondary)", fontWeight: 600 }}>4.9</span>
                </div>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-primary outline"
              aria-label="Hubungi driver"
              style={{ width: 46, height: 46, borderRadius: 14, padding: 0 }}
            >
              <Phone size={18} />
            </button>
          </div>
        </div>
      </Card>

      {/* Action buttons */}
      <div className="anim-fade-up anim-delay-4" style={{ display: "grid", gap: 10 }}>
        <Link
          to={`/app/shipments/${s.id}/freshness`}
          className="btn btn-primary outline btn-block"
        >
          <ThermometerSun size={18} />
          Freshness Detail & Analisis AI
        </Link>
        <button
          type="button"
          className="btn btn-primary btn-block"
          onClick={() => nav(`/app/navigation/${s.id}`)}
        >
          <Route size={18} />
          Buka Navigasi Live
        </button>
        {atRisk && (
          <button
            type="button"
            className="btn btn-danger btn-block"
            onClick={() => nav(`/app/alert/${s.id}`)}
          >
            <AlertTriangle size={18} />
            Lihat Smart Alert AI
          </button>
        )}
      </div>
    </div>
  );
}
