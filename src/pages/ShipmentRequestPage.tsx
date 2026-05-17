import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ChevronLeft, MapPin, Package, CheckCircle, Thermometer, FileText } from "lucide-react";

type CargoOption = { id: string; emoji: string; label: string; temp: string };

const CARGO_OPTIONS: CargoOption[] = [
  { id: "seafood", emoji: "🐟", label: "Seafood",  temp: "-2" },
  { id: "sayur",   emoji: "🥬", label: "Sayur",    temp: "4"  },
  { id: "daging",  emoji: "🥩", label: "Daging",   temp: "2"  },
  { id: "susu",    emoji: "🥛", label: "Susu",     temp: "4"  },
  { id: "buah",    emoji: "🍑", label: "Buah",     temp: "8"  },
  { id: "lainnya", emoji: "📦", label: "Lainnya",  temp: "6"  },
];

export function ShipmentRequestPage() {
  const nav = useNavigate();
  const [params] = useSearchParams();
  const prefillOrigin = params.get("origin") ?? "";
  const prefillDest   = params.get("dest") ?? "";

  const [cargos, setCargos]   = useState<string[]>([]);
  const [weight, setWeight]   = useState("");
  const [origin, setOrigin]   = useState(prefillOrigin);
  const [dest,   setDest]     = useState(prefillDest);
  const [date,   setDate]     = useState("");
  const [time,   setTime]     = useState("");
  const [temp,   setTemp]     = useState("");
  const [notes,  setNotes]    = useState("");
  const [done,   setDone]     = useState(false);
  const [loading, setLoading] = useState(false);

  const selectedCargos = CARGO_OPTIONS.filter(c => cargos.includes(c.id));
  const canSubmit = cargos.length > 0 && weight && origin && dest && date && time;

  function handleSubmit() {
    if (!canSubmit) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setDone(true); }, 1200);
  }

  if (done) {
    return (
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18, padding: 28, background: "var(--bg)", textAlign: "center" }}>
        <div style={{ width: 80, height: 80, borderRadius: "50%", background: "rgba(124,58,237,0.12)", display: "grid", placeItems: "center" }}>
          <CheckCircle size={38} color="#7c3aed" />
        </div>
        <div>
          <div style={{ fontWeight: 900, fontSize: 20, color: "var(--text)" }}>Request Terkirim!</div>
          <div style={{ fontSize: 14, color: "var(--text-secondary)", marginTop: 8, lineHeight: 1.6 }}>
            Request pengiriman kamu sudah diterima oleh<br /><strong>Operations Manager ID-NEXUS.</strong>
          </div>
          <div style={{ marginTop: 12, padding: "10px 16px", borderRadius: 12, background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.22)", display: "inline-block" }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#7c3aed" }}>Status: Menunggu Konfirmasi ⏳</span>
          </div>
        </div>
        <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>
          Kamu akan diberitahu saat Manager menyetujui request ini.
        </div>
        <button type="button" onClick={() => nav("/app")}
          style={{ padding: "14px 32px", borderRadius: 16, border: "none", background: "#7c3aed", color: "#fff", fontWeight: 800, fontSize: 15, cursor: "pointer", boxShadow: "0 6px 20px rgba(124,58,237,0.38)" }}>
          Kembali ke Dashboard
        </button>
      </div>
    );
  }

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "var(--bg)", overflow: "hidden" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg,#7c3aed,#6d28d9)", padding: "calc(14px + env(safe-area-inset-top)) 16px 20px", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button type="button" onClick={() => nav(-1)}
            style={{ background: "rgba(255,255,255,0.18)", border: "none", borderRadius: 10, width: 36, height: 36, display: "grid", placeItems: "center", cursor: "pointer" }}>
            <ChevronLeft size={20} color="#fff" strokeWidth={2.2} />
          </button>
          <div>
            <div style={{ fontWeight: 900, fontSize: 18, color: "#fff" }}>Request Pengiriman</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", marginTop: 1 }}>Kirim permintaan ke Operations Manager</div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div style={{ flex: 1, overflowY: "auto", padding: "20px 16px", display: "flex", flexDirection: "column", gap: 18 }}>

        {/* Cargo multi-select */}
        <div>
          <div style={labelStyle}><Package size={13} style={{ display: "inline", marginRight: 5 }} />Jenis Kargo</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginTop: 8 }}>
            {CARGO_OPTIONS.map(c => {
              const sel = cargos.includes(c.id);
              return (
                <button key={c.id} type="button"
                  onClick={() => {
                    setCargos(prev => prev.includes(c.id) ? prev.filter(x => x !== c.id) : [...prev, c.id]);
                    if (cargos.length === 0) setTemp(c.temp);
                  }}
                  style={{ padding: "12px 8px", borderRadius: 14, border: `2px solid ${sel ? "#7c3aed" : "var(--border)"}`, background: sel ? "rgba(124,58,237,0.08)" : "#fff", cursor: "pointer", transition: "all 0.15s", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, position: "relative" }}>
                  {sel && (
                    <div style={{ position: "absolute", top: 5, right: 5, width: 14, height: 14, borderRadius: "50%", background: "#7c3aed", display: "grid", placeItems: "center" }}>
                      <svg width="8" height="8" viewBox="0 0 8 8"><polyline points="1,4 3,6 7,2" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                  )}
                  <span style={{ fontSize: 22 }}>{c.emoji}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: sel ? "#6d28d9" : "var(--text-secondary)" }}>{c.label}</span>
                </button>
              );
            })}
          </div>
          {selectedCargos.length > 0 && (
            <div style={{ marginTop: 8, display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)" }}>Dipilih:</span>
              {selectedCargos.map(c => (
                <span key={c.id} style={{ padding: "2px 8px", borderRadius: 99, background: "rgba(124,58,237,0.10)", color: "#6d28d9", fontWeight: 700, fontSize: 11.5 }}>
                  {c.emoji} {c.label}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Weight */}
        <div>
          <div style={labelStyle}>Berat Muatan (kg)</div>
          <input type="number" value={weight} onChange={e => setWeight(e.target.value)} placeholder="Contoh: 300"
            style={inputStyle} />
        </div>

        {/* Origin */}
        <div>
          <div style={labelStyle}><MapPin size={12} style={{ display: "inline", marginRight: 4, color: "#7c3aed" }} />Lokasi Asal</div>
          <input type="text" value={origin} onChange={e => setOrigin(e.target.value)} placeholder="Gudang / Farm / Pelabuhan"
            style={inputStyle} />
        </div>

        {/* Destination */}
        <div>
          <div style={labelStyle}><MapPin size={12} style={{ display: "inline", marginRight: 4, color: "var(--success)" }} />Lokasi Tujuan</div>
          <input type="text" value={dest} onChange={e => setDest(e.target.value)} placeholder="Toko / RS / Gudang Tujuan"
            style={inputStyle} />
        </div>

        {/* Date & Time */}
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

        {/* Temperature */}
        <div>
          <div style={labelStyle}><Thermometer size={12} style={{ display: "inline", marginRight: 4 }} />Target Suhu (°C) — opsional</div>
          <input type="number" value={temp} onChange={e => setTemp(e.target.value)} placeholder="Contoh: 4"
            style={inputStyle} />
          {selectedCargos.length > 0 && (
            <div style={{ fontSize: 11.5, color: "var(--text-tertiary)", marginTop: 4 }}>
              Saran: {Math.min(...selectedCargos.map(c => Number(c.temp)))}°C (paling ketat)
            </div>
          )}
        </div>

        {/* Notes */}
        <div>
          <div style={labelStyle}><FileText size={12} style={{ display: "inline", marginRight: 4 }} />Catatan Khusus — opsional</div>
          <textarea value={notes} onChange={e => setNotes(e.target.value)}
            placeholder="Instruksi khusus, prioritas, atau informasi tambahan..."
            rows={3}
            style={{ ...inputStyle, resize: "none", lineHeight: 1.55 }} />
        </div>

        {/* Info banner */}
        <div style={{ background: "rgba(124,58,237,0.07)", borderRadius: 14, border: "1px solid rgba(124,58,237,0.20)", padding: "12px 14px", display: "flex", gap: 10, alignItems: "flex-start" }}>
          <span style={{ fontSize: 18, flexShrink: 0 }}>ℹ️</span>
          <div style={{ fontSize: 12.5, color: "#6d28d9", lineHeight: 1.55 }}>
            Request akan dikirim ke Operations Manager. Setelah disetujui, driver akan ditugaskan dan kamu dapat melacak pengiriman secara real-time.
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding: "12px 16px", paddingBottom: "calc(12px + env(safe-area-inset-bottom))", background: "#fff", borderTop: "1px solid var(--border-light)", flexShrink: 0 }}>
        <button type="button" onClick={handleSubmit} disabled={!canSubmit || loading}
          style={{ width: "100%", padding: "15px", borderRadius: 16, border: "none", background: canSubmit && !loading ? "#7c3aed" : "var(--border)", color: "#fff", fontWeight: 800, fontSize: 15.5, cursor: canSubmit && !loading ? "pointer" : "not-allowed", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: canSubmit && !loading ? "0 6px 20px rgba(124,58,237,0.38)" : "none", transition: "all 0.15s" }}>
          {loading ? "Mengirim..." : "🚀 Kirim Request ke Manager"}
        </button>
      </div>
    </div>
  );
}

const labelStyle: React.CSSProperties = { fontSize: 12, fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.04em" };
const inputStyle: React.CSSProperties = { width: "100%", border: "1.5px solid var(--border)", borderRadius: 12, padding: "13px 14px", fontSize: 15, background: "#fff", outline: "none", color: "var(--text)", fontFamily: "inherit", boxSizing: "border-box", marginTop: 8 };
