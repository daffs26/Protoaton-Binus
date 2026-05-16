import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TAGLINES = [
  "Memuat modul AI monitoring…",
  "Sinkronisasi data rantai dingin…",
  "Mengaktifkan smart alert system…",
  "Siap memulai operasional…",
];

export function SplashPage() {
  const nav = useNavigate();
  const [pct, setPct] = useState(0);
  const [tagline, setTagline] = useState(0);

  useEffect(() => {
    const tick = window.setInterval(() => {
      setPct((p) => {
        if (p >= 100) return 100;
        return p + 1.8;
      });
    }, 40);

    const tline = window.setInterval(() => {
      setTagline((t) => (t + 1) % TAGLINES.length);
    }, 700);

    const done = window.setTimeout(() => nav("/login", { replace: true }), 3000);
    return () => {
      clearInterval(tick);
      clearInterval(tline);
      clearTimeout(done);
    };
  }, [nav]);

  const dots = [
    { x: "20%", y: "15%", size: 6, delay: 0 },
    { x: "80%", y: "20%", size: 4, delay: 0.4 },
    { x: "10%", y: "60%", size: 5, delay: 0.8 },
    { x: "88%", y: "55%", size: 7, delay: 0.2 },
    { x: "50%", y: "8%",  size: 5, delay: 0.6 },
    { x: "30%", y: "85%", size: 4, delay: 1.0 },
    { x: "72%", y: "78%", size: 6, delay: 0.3 },
  ];

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 32,
        background: "radial-gradient(ellipse at 50% 15%, rgba(14,165,233,0.18) 0%, transparent 60%), #f8fafc",
        position: "relative",
        overflow: "hidden",
        minHeight: "100%",
      }}
    >
      {/* Background decorative dots */}
      {dots.map((d, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: d.x,
            top: d.y,
            width: d.size,
            height: d.size,
            borderRadius: "50%",
            background: "var(--primary)",
            opacity: 0.2,
            animation: `blink-dot 2.5s ease-in-out infinite`,
            animationDelay: `${d.delay}s`,
          }}
        />
      ))}

      {/* Decorative ring */}
      <div
        style={{
          position: "absolute",
          width: 240,
          height: 240,
          borderRadius: "50%",
          border: "1px solid rgba(14,165,233,0.12)",
          animation: "pulse-ring 3s ease-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 320,
          height: 320,
          borderRadius: "50%",
          border: "1px solid rgba(14,165,233,0.07)",
          animation: "pulse-ring 3s ease-out infinite",
          animationDelay: "0.6s",
        }}
      />

      {/* Logo */}
      <div className="anim-scale" style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{
            width: 96,
            height: 96,
            borderRadius: 28,
            background: "#fff",
            border: "1px solid rgba(14,165,233,0.30)",
            boxShadow: "0 20px 60px rgba(14,165,233,0.22), 0 4px 20px rgba(15,23,42,0.08)",
            display: "grid",
            placeItems: "center",
            marginBottom: 28,
          }}
        >
          <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
            {/* Stylized logistics/AI icon */}
            <rect x="8" y="28" width="36" height="18" rx="4" stroke="#0ea5e9" strokeWidth="2" fill="none"/>
            <path d="M14 28V20C14 17.8 15.8 16 18 16H34C36.2 16 38 17.8 38 20V28" stroke="#0ea5e9" strokeWidth="2" fill="none" strokeLinecap="round"/>
            <circle cx="26" cy="22" r="3" fill="#10b981" />
            <path d="M14 36h8M30 36h8" stroke="#0ea5e9" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M20 40l3-3 3 3" stroke="#22d3ee" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Wordmark */}
      <div className="anim-fade-up anim-delay-1" style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{
            fontSize: 34,
            fontWeight: 900,
            letterSpacing: "-0.04em",
            color: "#0f172a",
            textAlign: "center",
          }}
        >
          ID-NEXUS
        </div>
        <div
          style={{
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.22em",
            color: "var(--primary)",
            textAlign: "center",
            marginTop: 4,
            textTransform: "uppercase",
          }}
        >
          Smart Logistics AI
        </div>
      </div>

      <div className="anim-fade-up anim-delay-2" style={{ marginTop: 12, textAlign: "center", maxWidth: 260, position: "relative", zIndex: 1 }}>
        <p className="subtle">
          Platform AI untuk monitoring distribusi pangan secara real-time
        </p>
      </div>

      {/* Progress bar */}
      <div className="anim-fade-up anim-delay-3" style={{ width: "min(260px, 82%)", marginTop: 48, position: "relative", zIndex: 1 }}>
        <div
          style={{
            height: 5,
            borderRadius: 99,
            background: "rgba(14,165,233,0.15)",
            overflow: "hidden",
            marginBottom: 14,
          }}
        >
          <div
            style={{
              height: "100%",
              borderRadius: 99,
              width: `${pct}%`,
              background: "linear-gradient(90deg, #22d3ee, #0ea5e9)",
              transition: "width 0.08s linear",
              boxShadow: "0 0 10px rgba(14,165,233,0.5)",
            }}
          />
        </div>
        <div
          style={{
            fontSize: 12,
            color: "var(--text-secondary)",
            textAlign: "center",
            minHeight: 18,
            transition: "opacity 0.2s",
            fontWeight: 500,
          }}
        >
          {TAGLINES[tagline]}
        </div>
      </div>

      {/* Partner badges */}
      <div className="anim-fade anim-delay-4" style={{ marginTop: 36, display: "flex", gap: 8, position: "relative", zIndex: 1 }}>
        {["Kemenhub", "BPOM", "ISO 28000"].map((b) => (
          <div
            key={b}
            style={{
              padding: "4px 10px",
              borderRadius: 99,
              background: "rgba(14,165,233,0.08)",
              border: "1px solid rgba(14,165,233,0.18)",
              fontSize: 10.5,
              fontWeight: 700,
              color: "var(--primary-dark)",
            }}
          >
            {b}
          </div>
        ))}
      </div>
    </div>
  );
}
