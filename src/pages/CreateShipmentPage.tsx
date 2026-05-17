import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, CheckCircle, Brain, MapPin, Truck, Clock, Thermometer, Package, AlertTriangle, Navigation } from "lucide-react";
import { MOCK_DRIVERS } from "../data/mock";

type Priority = "normal" | "express" | "kritis";
type CargoType = "seafood" | "sayur" | "daging" | "susu" | "buah" | "lainnya";

const CARGO_OPTIONS: { id: CargoType; emoji: string; label: string; temp: string }[] = [
  { id: "seafood", emoji: "🐟", label: "Seafood", temp: "-2" },
  { id: "sayur",   emoji: "🥬", label: "Sayur",   temp: "4"  },
  { id: "daging",  emoji: "🥩", label: "Daging",  temp: "2"  },
  { id: "susu",    emoji: "🥛", label: "Susu",    temp: "4"  },
  { id: "buah",    emoji: "🍑", label: "Buah",    temp: "8"  },
  { id: "lainnya", emoji: "📦", label: "Lainnya", temp: "6"  },
];

const PRIORITY_OPTIONS: { id: Priority; label: string; color: string; bg: string }[] = [
  { id: "normal",  label: "Normal",  color: "#64748b", bg: "rgba(100,116,139,0.10)" },
  { id: "express", label: "Express", color: "#0284c7", bg: "rgba(14,165,233,0.10)"  },
  { id: "kritis",  label: "Kritis",  color: "#b91c1c", bg: "rgba(239,68,68,0.10)"   },
];

export function CreateShipmentPage() {
  const nav = useNavigate();
  const [step, setStep] = useState(1);
  const [cargos, setCargos] = useState<CargoType[]>(["seafood"]);
  const [weight, setWeight] = useState("500");
  const [origin, setOrigin] = useState("");
  const [dest, setDest]     = useState("");
  const [date, setDate]     = useState("");
  const [time, setTime]     = useState("");
  const [temp, setTemp]     = useState("-2");
  const [priority, setPriority] = useState<Priority>("normal");
  const [driverId, setDriverId] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed]   = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<"maps" | "ai">("ai");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const selectedCargos = CARGO_OPTIONS.filter(c => cargos.includes(c.id));
  // Use the most restrictive (lowest) temp among selected cargos
  const minTemp = selectedCargos.length > 0
    ? Math.min(...selectedCargos.map(c => Number(c.temp))).toString()
    : "-2";
  const selectedDriver = MOCK_DRIVERS.find(d => d.id === driverId);
  const availableDrivers = MOCK_DRIVERS;

  useEffect(() => {
    if (step === 3 && !analyzed && !analyzing) {
      setAnalyzing(true);
      setTimeout(() => { setAnalyzing(false); setAnalyzed(true); }, 1800);
    }
  }, [step, analyzed, analyzing]);

  function handleNext() {
    if (step < 3) setStep(s => s + 1);
  }

  function handleBack() {
    if (step > 1) setStep(s => s - 1);
    else nav(-1);
  }

  function handleSubmit() {
    setSubmitting(true);
    setTimeout(() => { setDone(true); setTimeout(() => nav("/app/shipments"), 1600); }, 1000);
  }

  if (done) {
    return (
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, padding: 24, background: "var(--bg)" }}>
        <div style={{ width: 72, height: 72, borderRadius: "50%", background: "var(--success-soft)", display: "grid", placeItems: "center" }}>
          <CheckCircle size={36} color="var(--success)" />
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontWeight: 900, fontSize: 18, color: "var(--text)" }}>Shipment Dibuat!</div>
          <div style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: 6 }}>
            Dikirim ke {selectedDriver?.name ?? "driver"}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "var(--bg)", overflow: "hidden" }}>
      {/* Header */}
      <div style={{ background: "#fff", borderBottom: "1px solid var(--border-light)", padding: "calc(14px + env(safe-area-inset-top)) 16px 14px", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <button type="button" onClick={handleBack} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: "var(--text-secondary)", display: "flex" }}>
            <ChevronLeft size={22} strokeWidth={2.2} />
          </button>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 800, fontSize: 17 }}>Buat Shipment</div>
            <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 1 }}>
              Step {step} dari 3 — {step === 1 ? "Kargo & Rute" : step === 2 ? "Jadwal & Driver" : "Pilih Rute"}
            </div>
          </div>
        </div>
        {/* Step progress */}
        <div style={{ display: "flex", gap: 6 }}>
          {[1,2,3].map(s => (
            <div key={s} style={{ flex: 1, height: 4, borderRadius: 99, background: s <= step ? "var(--primary)" : "var(--border)", transition: "background 0.3s" }} />
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "20px 16px", display: "flex", flexDirection: "column", gap: 16 }}>

        {/* ── STEP 1 ── */}
        {step === 1 && (
          <>
            {/* Priority */}
            <div>
              <div style={labelStyle}>Prioritas</div>
              <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                {PRIORITY_OPTIONS.map(p => (
                  <button key={p.id} type="button" onClick={() => setPriority(p.id)}
                    style={{ flex: 1, padding: "9px 6px", borderRadius: 12, border: `2px solid ${priority === p.id ? p.color : "var(--border)"}`, background: priority === p.id ? p.bg : "#fff", fontWeight: 700, fontSize: 13, color: priority === p.id ? p.color : "var(--text-secondary)", cursor: "pointer", transition: "all 0.15s" }}>
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Cargo type */}
            <div>
              <div style={labelStyle}>Jenis Kargo</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginTop: 8 }}>
                {CARGO_OPTIONS.map(c => {
                  const selected = cargos.includes(c.id);
                  return (
                    <button key={c.id} type="button"
                      onClick={() => {
                        setCargos(prev =>
                          prev.includes(c.id)
                            ? prev.filter(x => x !== c.id)
                            : [...prev, c.id]
                        );
                        // auto-suggest temp only if this is the first selection
                        if (cargos.length === 0) setTemp(c.temp);
                      }}
                      style={{ padding: "12px 8px", borderRadius: 14, border: `2px solid ${selected ? "var(--primary)" : "var(--border)"}`, background: selected ? "rgba(14,165,233,0.08)" : "#fff", cursor: "pointer", transition: "all 0.15s", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, position: "relative" }}>
                      {selected && (
                        <div style={{ position: "absolute", top: 5, right: 5, width: 14, height: 14, borderRadius: "50%", background: "var(--primary)", display: "grid", placeItems: "center" }}>
                          <svg width="8" height="8" viewBox="0 0 8 8"><polyline points="1,4 3,6 7,2" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </div>
                      )}
                      <span style={{ fontSize: 22 }}>{c.emoji}</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: selected ? "var(--primary-dark)" : "var(--text-secondary)" }}>{c.label}</span>
                    </button>
                  );
                })}
              </div>
              {cargos.length > 0 && (
                <div style={{ marginTop: 8, fontSize: 12, color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                  <span style={{ fontWeight: 600 }}>Dipilih:</span>
                  {selectedCargos.map(c => (
                    <span key={c.id} style={{ padding: "2px 8px", borderRadius: 99, background: "rgba(14,165,233,0.10)", color: "var(--primary-dark)", fontWeight: 700, fontSize: 11.5 }}>
                      {c.emoji} {c.label}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Weight */}
            <div>
              <div style={labelStyle}>Berat Muatan (kg)</div>
              <input type="number" value={weight} onChange={e => setWeight(e.target.value)} placeholder="contoh: 500"
                style={inputStyle} />
            </div>

            {/* Origin */}
            <div>
              <div style={labelStyle}>Asal</div>
              <div style={{ position: "relative" }}>
                <MapPin size={16} style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "var(--primary)" }} />
                <input type="text" value={origin} onChange={e => setOrigin(e.target.value)} placeholder="Cold Hub BSD City"
                  style={{ ...inputStyle, paddingLeft: 36 }} />
              </div>
            </div>

            {/* Destination */}
            <div>
              <div style={labelStyle}>Tujuan</div>
              <div style={{ position: "relative" }}>
                <MapPin size={16} style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "var(--success)" }} />
                <input type="text" value={dest} onChange={e => setDest(e.target.value)} placeholder="RS Siloam Semanggi"
                  style={{ ...inputStyle, paddingLeft: 36 }} />
              </div>
            </div>
          </>
        )}

        {/* ── STEP 2 ── */}
        {step === 2 && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <div style={labelStyle}>Tanggal</div>
                <input type="date" value={date} onChange={e => setDate(e.target.value)} style={inputStyle} />
              </div>
              <div>
                <div style={labelStyle}>Jam</div>
                <input type="time" value={time} onChange={e => setTime(e.target.value)} style={inputStyle} />
              </div>
            </div>

            <div>
              <div style={labelStyle}>Target Suhu Kabin (°C)</div>
              <div style={{ position: "relative" }}>
                <Thermometer size={16} style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "var(--primary)" }} />
                <input type="number" value={temp} onChange={e => setTemp(e.target.value)} style={{ ...inputStyle, paddingLeft: 36 }} />
              </div>
              <div style={{ fontSize: 11.5, color: "var(--text-tertiary)", marginTop: 5 }}>
                Disarankan untuk {selectedCargos.map(c => c.label).join(", ")}: {minTemp}°C (paling ketat)
              </div>
            </div>

            <div>
              <div style={labelStyle}>Assign Driver</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 8 }}>
                {availableDrivers.map(d => {
                  const busy = d.status === "on_duty";
                  const selected = driverId === d.id;
                  return (
                    <button key={d.id} type="button" disabled={busy}
                      onClick={() => setDriverId(d.id)}
                      style={{ background: selected ? "rgba(14,165,233,0.07)" : "#fff", border: `2px solid ${selected ? "var(--primary)" : "var(--border)"}`, borderRadius: 16, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12, cursor: busy ? "not-allowed" : "pointer", opacity: busy ? 0.45 : 1, transition: "all 0.15s", textAlign: "left" }}>
                      <div style={{ width: 42, height: 42, borderRadius: 14, background: `hsl(${(d.id.charCodeAt(1) * 37) % 360}, 55%, 88%)`, display: "grid", placeItems: "center", fontSize: 16, fontWeight: 800, color: `hsl(${(d.id.charCodeAt(1) * 37) % 360}, 55%, 35%)`, flexShrink: 0 }}>
                        {d.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 700, fontSize: 14, color: "var(--text)" }}>{d.name}</div>
                        <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{d.vehicle}</div>
                        <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 2 }}>OTIF {d.otifPct}% · {d.totalTrips} trip</div>
                      </div>
                      <span style={{ padding: "4px 10px", borderRadius: 99, fontSize: 11, fontWeight: 700, background: busy ? "var(--danger-soft)" : "var(--success-soft)", color: busy ? "var(--danger-dark)" : "var(--success-dark)", border: `1px solid ${busy ? "rgba(239,68,68,0.25)" : "rgba(16,185,129,0.25)"}`, flexShrink: 0 }}>
                        {busy ? "Bertugas" : "Tersedia"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {/* ── STEP 3 ── */}
        {step === 3 && (
          <>
            {/* Summary card */}
            <div style={{ background: "#fff", borderRadius: 18, border: "1px solid var(--border-light)", padding: "16px 18px", boxShadow: "var(--shadow-sm)" }}>
              <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
                <Package size={16} color="var(--primary)" /> Ringkasan
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  { icon: <span>{selectedCargos.map(c => c.emoji).join(" ")}</span>, label: "Kargo", value: `${selectedCargos.map(c => c.label).join(", ")} · ${weight} kg` },
                  { icon: <MapPin size={13} color="var(--primary)" />, label: "Asal", value: origin || "—" },
                  { icon: <MapPin size={13} color="var(--success)" />, label: "Tujuan", value: dest || "—" },
                  { icon: <Clock size={13} color="var(--text-secondary)" />, label: "Jadwal", value: date && time ? `${date} ${time}` : "—" },
                  { icon: <Truck size={13} color="var(--primary)" />, label: "Driver", value: selectedDriver?.name ?? "—" },
                ].map(r => (
                  <div key={r.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--text-secondary)", fontSize: 12.5 }}>{r.icon}{r.label}</div>
                    <div style={{ fontWeight: 600, fontSize: 13, color: "var(--text)", textAlign: "right", maxWidth: "55%" }}>{r.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Route Analysis */}
            {analyzing && (
              <div style={{ background: "#fff", borderRadius: 18, border: "1px solid rgba(14,165,233,0.28)", padding: "24px 18px", display: "flex", flexDirection: "column", alignItems: "center", gap: 12, boxShadow: "0 0 0 1px rgba(14,165,233,0.08), 0 8px 28px rgba(14,165,233,0.12)" }}>
                <div style={{ width: 44, height: 44, borderRadius: 14, background: "rgba(14,165,233,0.12)", display: "grid", placeItems: "center" }}>
                  <Brain size={22} color="var(--primary-dark)" style={{ animation: "spin 1.5s linear infinite" }} />
                </div>
                <div style={{ fontWeight: 700, fontSize: 14, color: "var(--primary-dark)" }}>AI sedang menganalisis rute...</div>
                <div style={{ fontSize: 12.5, color: "var(--text-secondary)", textAlign: "center" }}>Mempertimbangkan kemacetan, suhu, dan freshness</div>
              </div>
            )}

            {analyzed && (
              <>
                {/* Route comparison */}
                <div>
                  <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 10, display: "flex", alignItems: "center", gap: 7 }}>
                    <Navigation size={15} color="var(--primary)" /> Pilih Rute
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    {/* Google Maps route */}
                    {[
                      { key: "maps" as const, icon: "🗺️", title: "Google Maps", subtitle: "Rute Default", eta: "2j 15m", km: "38 km", freshness: 81, risk: "medium", riskLabel: "Medium Risk", riskColor: "var(--warning-dark)", riskBg: "var(--warning-soft)" },
                      { key: "ai" as const,   icon: "🤖", title: "ID-NEXUS AI",  subtitle: "Rekomendasi AI", eta: "2j 40m", km: "41 km", freshness: 92, risk: "low", riskLabel: "Low Risk", riskColor: "var(--success-dark)", riskBg: "var(--success-soft)" },
                    ].map(r => {
                      const sel = selectedRoute === r.key;
                      return (
                        <button key={r.key} type="button" onClick={() => setSelectedRoute(r.key)}
                          style={{ background: sel ? (r.key === "ai" ? "rgba(14,165,233,0.05)" : "rgba(100,116,139,0.04)") : "#fff", border: `2px solid ${sel ? (r.key === "ai" ? "var(--primary)" : "#94a3b8") : "var(--border)"}`, borderRadius: 16, padding: "14px 12px", cursor: "pointer", textAlign: "left", transition: "all 0.2s", boxShadow: sel ? (r.key === "ai" ? "0 0 0 3px rgba(14,165,233,0.15)" : "0 0 0 3px rgba(100,116,139,0.10)") : "none" }}>
                          <div style={{ fontSize: 20, marginBottom: 4 }}>{r.icon}</div>
                          <div style={{ fontWeight: 800, fontSize: 13, color: "var(--text)" }}>{r.title}</div>
                          <div style={{ fontSize: 11, color: "var(--text-secondary)", marginBottom: 10 }}>{r.subtitle}</div>
                          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                            <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>⏱ {r.eta}</div>
                            <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>📍 {r.km}</div>
                            <div style={{ fontSize: 13, fontWeight: 800, color: r.freshness >= 85 ? "var(--success-dark)" : "var(--warning-dark)", marginTop: 2 }}>🌿 {r.freshness}%</div>
                            <span style={{ display: "inline-block", padding: "3px 8px", borderRadius: 99, fontSize: 10.5, fontWeight: 700, background: r.riskBg, color: r.riskColor, marginTop: 2 }}>
                              {r.risk === "low" ? "✅" : "⚠️"} {r.riskLabel}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Freshness projection sparkline */}
                <div style={{ background: "#fff", borderRadius: 18, border: "1px solid var(--border-light)", padding: "16px 18px", boxShadow: "var(--shadow-sm)" }}>
                  <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10, color: "var(--text)" }}>Proyeksi Freshness</div>
                  <svg width="100%" height="72" viewBox="0 0 300 72" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="gAI" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#10b981" stopOpacity="0.25" /><stop offset="100%" stopColor="#10b981" stopOpacity="0.02" /></linearGradient>
                      <linearGradient id="gMaps" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#f97316" stopOpacity="0.20" /><stop offset="100%" stopColor="#f97316" stopOpacity="0.02" /></linearGradient>
                    </defs>
                    {/* Google Maps line: 95→88→82→81 */}
                    <polygon points="0,72 0,4 100,16 200,28 300,36 300,72" fill="url(#gMaps)" />
                    <polyline points="0,4 100,16 200,28 300,36" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="5,4" />
                    {/* AI line: 95→93→92→92 */}
                    <polygon points="0,72 0,4 100,8 200,12 300,14 300,72" fill="url(#gAI)" />
                    <polyline points="0,4 100,8 200,12 300,14" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div style={{ display: "flex", gap: 16, marginTop: 6 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      <div style={{ width: 18, height: 2.5, background: "#10b981", borderRadius: 99 }} /><span style={{ fontSize: 11, color: "var(--text-secondary)", fontWeight: 600 }}>Rute AI</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      <div style={{ width: 18, height: 0, borderTop: "2.5px dashed #f97316", borderRadius: 99 }} /><span style={{ fontSize: 11, color: "var(--text-secondary)", fontWeight: 600 }}>Google Maps</span>
                    </div>
                  </div>
                </div>

                {/* AI Reason */}
                {selectedRoute === "ai" && (
                  <div style={{ background: "rgba(14,165,233,0.06)", borderRadius: 14, border: "1px solid rgba(14,165,233,0.22)", padding: "12px 14px", display: "flex", gap: 10 }}>
                    <Brain size={16} color="var(--primary-dark)" style={{ flexShrink: 0, marginTop: 1 }} />
                    <div style={{ fontSize: 13, color: "var(--primary-dark)", lineHeight: 1.55, fontWeight: 500 }}>
                      Menghindari Tol Dalam Kota — risiko macet tinggi. Suhu kabin lebih stabil via Jl. Gatot Subroto. Freshness terjaga <strong>+11%</strong> vs rute default.
                    </div>
                  </div>
                )}
                {selectedRoute === "maps" && (
                  <div style={{ background: "var(--warning-soft)", borderRadius: 14, border: "1px solid rgba(249,115,22,0.22)", padding: "12px 14px", display: "flex", gap: 10 }}>
                    <AlertTriangle size={16} color="var(--warning-dark)" style={{ flexShrink: 0, marginTop: 1 }} />
                    <div style={{ fontSize: 13, color: "var(--warning-dark)", lineHeight: 1.55, fontWeight: 500 }}>
                      Rute ini lebih cepat namun berisiko — freshness estimasi <strong>81%</strong>. AI merekomendasikan rute alternatif.
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>

      {/* Footer CTA */}
      <div style={{ padding: "12px 16px", paddingBottom: "calc(12px + env(safe-area-inset-bottom))", background: "#fff", borderTop: "1px solid var(--border-light)", flexShrink: 0 }}>
        {step < 3 ? (
          <button type="button" onClick={handleNext}
            disabled={step === 2 && !driverId}
            style={{ width: "100%", padding: "15px", borderRadius: 16, border: "none", background: step === 2 && !driverId ? "var(--border)" : "linear-gradient(135deg,#22d3ee,#0ea5e9 60%,#0284c7)", color: "#fff", fontWeight: 800, fontSize: 15.5, cursor: step === 2 && !driverId ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: step === 2 && !driverId ? "none" : "0 6px 20px rgba(14,165,233,0.38)", transition: "all 0.15s" }}>
            Lanjut <ChevronRight size={18} />
          </button>
        ) : (
          <button type="button" onClick={handleSubmit} disabled={!analyzed || submitting}
            style={{ width: "100%", padding: "15px", borderRadius: 16, border: "none", background: !analyzed || submitting ? "var(--border)" : "linear-gradient(135deg,#22d3ee,#0ea5e9 60%,#0284c7)", color: "#fff", fontWeight: 800, fontSize: 15.5, cursor: !analyzed || submitting ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: !analyzed || submitting ? "none" : "0 6px 20px rgba(14,165,233,0.38)", transition: "all 0.15s" }}>
            {submitting ? "Mengirim..." : "Buat & Kirim ke Driver →"}
          </button>
        )}
      </div>
    </div>
  );
}

const labelStyle: React.CSSProperties = { fontSize: 12, fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.04em" };
const inputStyle: React.CSSProperties = { width: "100%", border: "1.5px solid var(--border)", borderRadius: 12, padding: "13px 14px", fontSize: 15, background: "#fff", outline: "none", color: "var(--text)", fontFamily: "inherit", boxSizing: "border-box", marginTop: 8 };
