import { CheckCircle2, Home, Leaf, Package, Thermometer } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { getShipment } from "../data/mock";

export function DeliverySuccessPage() {
  const { id } = useParams();
  const s = id ? getShipment(id) : undefined;

  const finalFreshness = 81;
  const savedFreshness = finalFreshness - (s?.freshnessPct ?? 72);

  return (
    <div
      style={{
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 20px calc(32px + env(safe-area-inset-bottom))",
        background: "radial-gradient(ellipse at 50% 20%, rgba(16,185,129,0.15) 0%, transparent 60%), var(--bg)",
        textAlign: "center",
      }}
    >
      {/* Checkmark animation */}
      <div className="anim-scale" style={{ marginBottom: 28, position: "relative" }}>
        {/* Pulsing rings */}
        {[80, 100, 120].map((size, i) => (
          <div
            key={size}
            style={{
              position: "absolute",
              width: size,
              height: size,
              borderRadius: "50%",
              border: "2px solid rgba(16,185,129,0.25)",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              animation: `pulse-ring 2.5s ease-out infinite`,
              animationDelay: `${i * 0.4}s`,
            }}
          />
        ))}
        <div
          style={{
            width: 88,
            height: 88,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #34d399, #10b981)",
            display: "grid",
            placeItems: "center",
            boxShadow: "0 12px 40px rgba(16,185,129,0.40)",
            position: "relative",
          }}
        >
          <CheckCircle2 size={44} color="#fff" strokeWidth={2.5} />
        </div>
      </div>

      {/* Title */}
      <div className="anim-fade-up" style={{ marginBottom: 24 }}>
        <h1
          style={{
            fontSize: 28,
            fontWeight: 900,
            letterSpacing: "-0.03em",
            color: "var(--success-dark)",
            margin: 0,
          }}
        >
          Shipment Berhasil!
        </h1>
        <div style={{ fontSize: 15, color: "var(--text-secondary)", marginTop: 8, lineHeight: 1.5 }}>
          Produk diselamatkan dengan rute AI baru
        </div>
        {s && (
          <div
            style={{
              display: "inline-block",
              marginTop: 10,
              padding: "5px 14px",
              borderRadius: 99,
              background: "var(--success-soft)",
              border: "1px solid rgba(16,185,129,0.30)",
              fontSize: 13,
              fontWeight: 700,
              color: "var(--success-dark)",
            }}
          >
            {s.code} · {s.product}
          </div>
        )}
      </div>

      {/* Stats grid */}
      <div
        className="anim-fade-up anim-delay-1"
        style={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12,
          marginBottom: 20,
        }}
      >
        {[
          {
            label: "Freshness akhir",
            value: `${finalFreshness}%`,
            icon: <Leaf size={20} />,
            color: "var(--success-dark)",
            bg: "var(--success-soft)",
            border: "rgba(16,185,129,0.25)",
          },
          {
            label: "Freshness diselamatkan",
            value: `+${savedFreshness}%`,
            icon: <CheckCircle2 size={20} />,
            color: "var(--primary-dark)",
            bg: "rgba(14,165,233,0.10)",
            border: "rgba(14,165,233,0.25)",
          },
          {
            label: "Suhu kabin akhir",
            value: "4.8°C",
            icon: <Thermometer size={20} />,
            color: "var(--success-dark)",
            bg: "var(--success-soft)",
            border: "rgba(16,185,129,0.25)",
          },
          {
            label: "Produk tiba",
            value: "18:09",
            icon: <Package size={20} />,
            color: "var(--text)",
            bg: "var(--surface-muted)",
            border: "var(--border-light)",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              background: "#fff",
              borderRadius: 18,
              padding: "16px 14px",
              border: `1.5px solid ${stat.border}`,
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <div style={{ color: stat.color, marginBottom: 8 }}>{stat.icon}</div>
            <div style={{ fontSize: 11.5, color: "var(--text-tertiary)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.03em" }}>
              {stat.label}
            </div>
            <div
              style={{
                fontSize: 22,
                fontWeight: 900,
                letterSpacing: "-0.04em",
                color: stat.color,
                marginTop: 4,
              }}
            >
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Summary card */}
      <div
        className="anim-fade-up anim-delay-2"
        style={{
          width: "100%",
          background: "#fff",
          borderRadius: 20,
          padding: "16px 18px",
          border: "1px solid var(--border-light)",
          boxShadow: "var(--shadow-sm)",
          marginBottom: 24,
        }}
      >
        <div style={{ fontWeight: 800, fontSize: 14.5, marginBottom: 12 }}>Ringkasan Pengiriman</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            ["Rute AI", "Diaktifkan & berhasil"],
            ["Waktu tempuh", "2 jam 42 menit"],
            ["Pengurangan risiko", "78%"],
            ["Kerugian dicegah", "Rp 2.4 juta"],
            ["Penerima", s?.destination ?? "RS Siloam Semanggi"],
          ].map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between" }}>
              <span className="subtle" style={{ fontSize: 13 }}>{k}</span>
              <span style={{ fontWeight: 700, fontSize: 13 }}>{v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="anim-fade-up anim-delay-3" style={{ width: "100%", display: "grid", gap: 10 }}>
        <Link to="/app" className="btn btn-success btn-block btn-lg">
          <Home size={20} />
          Kembali ke Dashboard
        </Link>
        <Link to="/app/history" className="btn btn-primary outline btn-block">
          Lihat Riwayat Pengiriman
        </Link>
      </div>
    </div>
  );
}
