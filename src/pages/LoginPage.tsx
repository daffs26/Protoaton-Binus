import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

export function LoginPage() {
  const { login } = useApp();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !pass) { setError("Lengkapi email dan password."); return; }
    setError("");
    setLoading(true);
    setTimeout(() => {
      login();
      nav("/role", { replace: true });
    }, 900);
  }

  function handleSSO(provider: string) {
    setLoading(true);
    setTimeout(() => {
      login();
      nav("/role", { replace: true });
    }, 700);
    console.log("SSO with", provider);
  }

  return (
    <div
      className="screen-scroll no-tab"
      style={{
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header banner */}
      <div
        style={{
          background: "linear-gradient(160deg, #0ea5e9 0%, #0284c7 100%)",
          padding: "48px 28px 36px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -30,
            top: -30,
            width: 150,
            height: 150,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.08)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 40,
            bottom: -40,
            width: 100,
            height: 100,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.06)",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 12, position: "relative", zIndex: 1 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 14,
              background: "rgba(255,255,255,0.2)",
              display: "grid",
              placeItems: "center",
            }}
          >
            <svg width="26" height="26" viewBox="0 0 52 52" fill="none">
              <rect x="8" y="28" width="36" height="18" rx="4" stroke="#fff" strokeWidth="2.2" fill="none"/>
              <path d="M14 28V20C14 17.8 15.8 16 18 16H34C36.2 16 38 17.8 38 20V28" stroke="#fff" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
              <circle cx="26" cy="22" r="3" fill="rgba(255,255,255,0.8)" />
            </svg>
          </div>
          <div>
            <div style={{ fontWeight: 900, fontSize: 20, color: "#fff", letterSpacing: "-0.02em" }}>ID-NEXUS</div>
            <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.75)", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>
              Smart Logistics AI
            </div>
          </div>
        </div>
        <div style={{ marginTop: 24, position: "relative", zIndex: 1 }}>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: "#fff", margin: 0, letterSpacing: "-0.02em" }}>
            Selamat datang
          </h1>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.78)", marginTop: 6, lineHeight: 1.5 }}>
            Masuk ke platform logistik pangan AI terpadu
          </p>
        </div>
      </div>

      {/* Form */}
      <div
        style={{
          flex: 1,
          padding: "28px 22px 24px",
          background: "var(--bg)",
          borderRadius: "24px 24px 0 0",
          marginTop: -16,
          position: "relative",
        }}
      >
        <form onSubmit={handleSubmit}>
          {error && (
            <div
              style={{
                padding: "12px 14px",
                borderRadius: 12,
                background: "var(--danger-soft)",
                border: "1px solid rgba(239,68,68,0.25)",
                color: "var(--danger-dark)",
                fontSize: 13.5,
                fontWeight: 600,
                marginBottom: 18,
              }}
            >
              {error}
            </div>
          )}

          <div className="field">
            <label htmlFor="email">Email Perusahaan</label>
            <div style={{ position: "relative" }}>
              <Mail
                size={16}
                style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "var(--text-tertiary)" }}
              />
              <input
                id="email"
                type="email"
                placeholder="nama@perusahaan.co.id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ paddingLeft: 40, width: "100%" }}
                autoComplete="email"
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <div style={{ position: "relative" }}>
              <Lock
                size={16}
                style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "var(--text-tertiary)" }}
              />
              <input
                id="password"
                type={showPass ? "text" : "password"}
                placeholder="••••••••••"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                style={{ paddingLeft: 40, paddingRight: 44, width: "100%" }}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                style={{
                  position: "absolute",
                  right: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--text-tertiary)",
                  padding: 4,
                }}
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div style={{ textAlign: "right", marginTop: -8, marginBottom: 20 }}>
            <button type="button" className="btn-ghost" style={{ fontSize: 13, fontWeight: 600, color: "var(--primary-dark)", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
              Lupa password?
            </button>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block btn-lg"
            disabled={loading}
            style={{ opacity: loading ? 0.75 : 1 }}
          >
            {loading ? (
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.7s linear infinite", display: "inline-block" }} />
                Masuk…
              </span>
            ) : (
              "Masuk"
            )}
          </button>
        </form>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "20px 0" }}>
          <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
          <span style={{ fontSize: 12, color: "var(--text-tertiary)", fontWeight: 600 }}>atau masuk dengan</span>
          <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
        </div>

        {/* SSO Buttons */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <button className="sso-btn" onClick={() => handleSSO("google")} type="button">
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google
          </button>
          <button className="sso-btn" onClick={() => handleSSO("microsoft")} type="button">
            <svg width="18" height="18" viewBox="0 0 23 23">
              <rect x="1" y="1" width="10" height="10" fill="#f25022"/>
              <rect x="12" y="1" width="10" height="10" fill="#7fba00"/>
              <rect x="1" y="12" width="10" height="10" fill="#00a4ef"/>
              <rect x="12" y="12" width="10" height="10" fill="#ffb900"/>
            </svg>
            Microsoft
          </button>
        </div>

        <p style={{ textAlign: "center", fontSize: 13.5, color: "var(--text-secondary)", marginTop: 24 }}>
          Belum punya akun?{" "}
          <Link to="/register" style={{ color: "var(--primary-dark)", fontWeight: 700 }}>
            Daftar organisasi
          </Link>
        </p>
      </div>
    </div>
  );
}
