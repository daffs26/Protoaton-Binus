import { MapPin, Search, Star, Thermometer, Truck, Zap } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MapMock } from "../components/MapMock";
import { Card, PageHeader, SectionHeader } from "../components/Ui";
import { MOCK_COLD_HUBS, MOCK_FLEET, getShipment } from "../data/mock";

/* ── Marketplace Home ─────────────────────────────────────────── */
export function MarketplaceHomePage() {
  const [search, setSearch] = useState("");

  const filtered = MOCK_FLEET.filter(
    (f) =>
      search === "" ||
      f.company.toLowerCase().includes(search.toLowerCase()) ||
      f.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="screen-scroll" style={{ padding: "calc(16px + env(safe-area-inset-top)) 16px 16px" }}>
      {/* Header */}
      <div style={{ marginBottom: 18 }}>
        <h1 className="page-title" style={{ fontSize: 20 }}>Marketplace Armada</h1>
        <p className="subtle" style={{ marginTop: 4 }}>
          Temukan reefer truck, chiller van & cold storage
        </p>
      </div>

      {/* Search */}
      <div style={{ position: "relative", marginBottom: 16 }}>
        <Search size={16} style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "var(--text-tertiary)" }} />
        <input
          type="text"
          placeholder="Cari armada atau tipe…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: "100%", border: "1.5px solid var(--border)", borderRadius: 12, padding: "11px 14px 11px 40px", fontSize: 14.5, background: "#fff", outline: "none", color: "var(--text)" }}
        />
      </div>

      {/* Map preview */}
      <div className="anim-fade-up" style={{ marginBottom: 18 }}>
        <SectionHeader title="Sebaran Armada" action={<span className="chip chip-live"><span className="pulse-dot" style={{ width: 7, height: 7 }} />Live</span>} />
        <MapMock variant="preview" />
      </div>

      {/* Fleet cards */}
      <div className="anim-fade-up anim-delay-1">
        <SectionHeader title={`Armada Tersedia (${filtered.length})`} />
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {filtered.map((f, i) => (
            <div key={f.id} className={`fleet-card anim-fade-up anim-delay-${Math.min(i + 2, 5)}`}>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(14,165,233,0.10)", display: "grid", placeItems: "center", flexShrink: 0 }}>
                  <Truck size={22} color="var(--primary-dark)" strokeWidth={1.6} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                    <div style={{ fontWeight: 800, fontSize: 14, lineHeight: 1.3 }}>{f.company}</div>
                    {f.badge && (
                      <span
                        style={{
                          padding: "3px 9px",
                          borderRadius: 99,
                          fontSize: 10.5,
                          fontWeight: 800,
                          background: f.badge === "AI Recommended" ? "rgba(14,165,233,0.12)" : f.badge === "Fastest" ? "var(--success-soft)" : "var(--surface-muted)",
                          color: f.badge === "AI Recommended" ? "var(--primary-dark)" : f.badge === "Fastest" ? "var(--success-dark)" : "var(--text-secondary)",
                          flexShrink: 0,
                        }}
                      >
                        {f.badge === "AI Recommended" ? "⚡ " : f.badge === "Fastest" ? "🚀 " : ""}{f.badge}
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: 12.5, color: "var(--text-secondary)", marginTop: 3 }}>{f.type}</div>

                  <div style={{ display: "flex", gap: 12, marginTop: 10, flexWrap: "wrap" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <Star size={12} color="#f59e0b" fill="#f59e0b" />
                      <span style={{ fontSize: 12.5, fontWeight: 700 }}>{f.rating}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <Zap size={12} color="var(--primary)" />
                      <span style={{ fontSize: 12.5, fontWeight: 600, color: "var(--text-secondary)" }}>ETA {f.eta}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <Thermometer size={12} color="var(--success)" />
                      <span style={{ fontSize: 12.5, fontWeight: 600, color: "var(--text-secondary)" }}>{f.tempRange}</span>
                    </div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
                    <div>
                      <span style={{ fontSize: 15, fontWeight: 900 }}>Rp {f.pricePerKm.toLocaleString("id-ID")}</span>
                      <span style={{ fontSize: 12, color: "var(--text-secondary)", marginLeft: 2 }}>/km</span>
                    </div>
                    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                      <span style={{ fontSize: 12, color: "var(--success-dark)", fontWeight: 700 }}>
                        {f.available} slot tersedia
                      </span>
                      <button type="button" className="btn btn-primary btn-sm">
                        Pesan
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cold Hubs */}
      <div className="anim-fade-up anim-delay-4" style={{ marginTop: 24 }}>
        <SectionHeader title="Cold Storage Terdekat" />
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {MOCK_COLD_HUBS.map((hub, i) => (
            <Card key={hub.id} className={`anim-fade-up anim-delay-${i + 5}`}>
              <div style={{ padding: "14px 16px", display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div style={{ width: 42, height: 42, borderRadius: 12, background: "rgba(16,185,129,0.10)", display: "grid", placeItems: "center", color: "var(--success-dark)", flexShrink: 0 }}>
                  <MapPin size={20} strokeWidth={1.8} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800, fontSize: 14 }}>{hub.name}</div>
                  <div className="subtle" style={{ fontSize: 12, marginTop: 3 }}>{hub.address}</div>
                  <div style={{ display: "flex", gap: 10, marginTop: 8, flexWrap: "wrap" }}>
                    <span className="chip chip-success" style={{ fontSize: 10.5 }}>📍 {hub.distance}</span>
                    <span className="chip chip-live" style={{ fontSize: 10.5 }}>Tersedia {hub.available}</span>
                    <span className="chip chip-neutral" style={{ fontSize: 10.5 }}>Min {hub.minTemp}°C</span>
                  </div>
                </div>
                <button type="button" className="btn btn-primary btn-sm" style={{ flexShrink: 0 }}>
                  Booking
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Marketplace Recommend ────────────────────────────────────── */
export function MarketplaceRecommendPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const s = id ? getShipment(id) : undefined;
  const [booked, setBooked] = useState<string | null>(null);

  function handleBook(fleetId: string) {
    setBooked(fleetId);
    setTimeout(() => {
      nav(`/app/navigation/${id}`);
    }, 1200);
  }

  const topFleet = MOCK_FLEET[0];

  return (
    <div className="screen-scroll no-tab" style={{ padding: "calc(12px + env(safe-area-inset-top)) 16px 24px" }}>
      <PageHeader
        title="Rekomendasi Marketplace"
        subtitle={s ? `Untuk ${s.code} · ${s.product}` : "Armada darurat"}
        back
      />

      {/* Urgency banner */}
      {s?.status === "at_risk" && (
        <div
          className="anim-fade-up ai-glow-warn"
          style={{
            padding: "12px 16px",
            borderRadius: 16,
            background: "var(--warning-soft)",
            border: "1px solid rgba(249,115,22,0.30)",
            marginBottom: 16,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div style={{ fontSize: 22 }}>⚠️</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 13.5, color: "var(--warning-dark)" }}>
              Diperlukan armada dalam 28 menit
            </div>
            <p className="subtle" style={{ fontSize: 12, marginTop: 2 }}>
              Freshness {s.freshnessPct}% · Transfer segera untuk selamatkan muatan
            </p>
          </div>
        </div>
      )}

      {/* AI Top Pick */}
      <div className="anim-fade-up anim-delay-1" style={{ marginBottom: 16 }}>
        <SectionHeader title="Pilihan AI Terbaik" />
        <div
          style={{
            background: "#fff",
            borderRadius: 20,
            border: "2px solid rgba(14,165,233,0.35)",
            boxShadow: "0 0 0 1px rgba(14,165,233,0.10), 0 12px 36px rgba(14,165,233,0.16)",
            padding: "18px 18px",
          }}
        >
          <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <div style={{ width: 52, height: 52, borderRadius: 16, background: "rgba(14,165,233,0.10)", display: "grid", placeItems: "center", flexShrink: 0 }}>
              <Truck size={26} color="var(--primary-dark)" strokeWidth={1.6} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ fontWeight: 900, fontSize: 15.5 }}>{topFleet.company}</div>
                <span style={{ padding: "4px 10px", borderRadius: 99, background: "rgba(14,165,233,0.12)", color: "var(--primary-dark)", fontSize: 11, fontWeight: 800 }}>
                  ⚡ AI Recommended
                </span>
              </div>
              <div className="subtle" style={{ fontSize: 13, marginTop: 3 }}>{topFleet.type}</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 14 }}>
                {[
                  { label: "Rating", value: `${topFleet.rating} ★` },
                  { label: "ETA Tiba", value: topFleet.eta },
                  { label: "Harga/km", value: `Rp ${topFleet.pricePerKm.toLocaleString("id-ID")}` },
                  { label: "Suhu range", value: topFleet.tempRange },
                ].map((stat) => (
                  <div key={stat.label} style={{ padding: "10px 12px", borderRadius: 12, background: "var(--surface-muted)" }}>
                    <div style={{ fontSize: 11, color: "var(--text-tertiary)", fontWeight: 700, textTransform: "uppercase" }}>{stat.label}</div>
                    <div style={{ fontSize: 14, fontWeight: 800, marginTop: 3 }}>{stat.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            type="button"
            className="btn btn-primary btn-block btn-lg"
            style={{ marginTop: 16, opacity: booked ? 0.7 : 1 }}
            onClick={() => handleBook(topFleet.id)}
            disabled={!!booked}
          >
            {booked === topFleet.id ? (
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.7s linear infinite", display: "inline-block" }} />
                Memproses booking…
              </span>
            ) : (
              "⚡ Booking Sekarang"
            )}
          </button>
        </div>
      </div>

      {/* Other options */}
      <SectionHeader title="Opsi Lainnya" />
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
        {MOCK_FLEET.slice(1).map((f, i) => (
          <div key={f.id} className="fleet-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{f.company}</div>
                <div className="subtle" style={{ fontSize: 12.5 }}>{f.type}</div>
                <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                  <span style={{ fontSize: 12.5, fontWeight: 700 }}>★ {f.rating}</span>
                  <span className="subtle" style={{ fontSize: 12.5 }}>ETA {f.eta}</span>
                  <span style={{ fontSize: 12.5, fontWeight: 700 }}>Rp {f.pricePerKm.toLocaleString("id-ID")}/km</span>
                </div>
              </div>
              <button
                type="button"
                className="btn btn-primary outline btn-sm"
                onClick={() => handleBook(f.id)}
                disabled={!!booked}
              >
                Pilih
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cold hubs section */}
      <SectionHeader title="Cold Storage Terdekat" />
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {MOCK_COLD_HUBS.map((hub) => (
          <Card key={hub.id}>
            <div style={{ padding: "12px 14px", display: "flex", gap: 12, alignItems: "center" }}>
              <div style={{ width: 38, height: 38, borderRadius: 11, background: "var(--success-soft)", display: "grid", placeItems: "center", color: "var(--success-dark)", flexShrink: 0 }}>
                <MapPin size={18} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 13.5 }}>{hub.name}</div>
                <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 2 }}>{hub.distance} · {hub.available} tersedia</div>
              </div>
              <button type="button" className="btn btn-primary btn-sm">
                Booking
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
