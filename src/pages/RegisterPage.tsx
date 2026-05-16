import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { Building2, ChevronLeft } from "lucide-react";

const LOGISTICS_TYPES = [
  "Reefer Trucking",
  "Cold Chain Distribution",
  "Last-mile Food Delivery",
  "Warehousing & Cold Storage",
  "Fleet Marketplace Provider",
  "Lainnya",
];

export function RegisterPage() {
  const { login } = useApp();
  const nav = useNavigate();
  const [form, setForm] = useState({
    company: "",
    type: "",
    email: "",
    pass: "",
  });
  const [loading, setLoading] = useState(false);

  function handleChange(k: keyof typeof form, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      login();
      nav("/role", { replace: true });
    }, 900);
  }

  return (
    <div
      className="screen-scroll no-tab"
      style={{ minHeight: "100%", display: "flex", flexDirection: "column" }}
    >
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(160deg, #0f172a 0%, #1e293b 100%)",
          padding: "44px 24px 32px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", right: -20, top: -20, width: 140, height: 140, borderRadius: "50%", background: "rgba(14,165,233,0.10)" }} />
        <button
          className="back-btn"
          onClick={() => nav(-1)}
          style={{ color: "rgba(255,255,255,0.65)", marginBottom: 16 }}
        >
          <ChevronLeft size={18} strokeWidth={2.5} />
          Kembali ke login
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 42, height: 42, borderRadius: 12, background: "rgba(14,165,233,0.18)", display: "grid", placeItems: "center" }}>
            <Building2 size={22} color="#38bdf8" />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 20, color: "#fff", letterSpacing: "-0.02em" }}>Daftar Organisasi</div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", marginTop: 2 }}>Buat akun ID-NEXUS untuk perusahaan Anda</div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div
        style={{
          flex: 1,
          padding: "28px 22px 32px",
          background: "var(--bg)",
          borderRadius: "22px 22px 0 0",
          marginTop: -12,
        }}
      >
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="company">Nama Perusahaan</label>
            <input
              id="company"
              type="text"
              placeholder="PT Distribusi Pangan Indonesia"
              value={form.company}
              onChange={(e) => handleChange("company", e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="logtype">Jenis Logistik</label>
            <select
              id="logtype"
              value={form.type}
              onChange={(e) => handleChange("type", e.target.value)}
              required
            >
              <option value="">Pilih jenis layanan…</option>
              {LOGISTICS_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="remail">Email Kerja</label>
            <input
              id="remail"
              type="email"
              placeholder="admin@perusahaan.co.id"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="rpass">Password</label>
            <input
              id="rpass"
              type="password"
              placeholder="Min. 8 karakter"
              value={form.pass}
              onChange={(e) => handleChange("pass", e.target.value)}
              minLength={8}
              required
            />
          </div>

          {/* Terms */}
          <p style={{ fontSize: 12.5, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 22 }}>
            Dengan mendaftar, Anda menyetujui{" "}
            <span style={{ color: "var(--primary-dark)", fontWeight: 700 }}>Syarat & Ketentuan</span>{" "}
            dan{" "}
            <span style={{ color: "var(--primary-dark)", fontWeight: 700 }}>Kebijakan Privasi</span>{" "}
            ID-NEXUS.
          </p>

          <button
            type="submit"
            className="btn btn-primary btn-block btn-lg"
            disabled={loading}
            style={{ opacity: loading ? 0.8 : 1 }}
          >
            {loading ? (
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.7s linear infinite", display: "inline-block" }} />
                Membuat akun…
              </span>
            ) : (
              "Buat Akun Organisasi"
            )}
          </button>
        </form>

        <p style={{ textAlign: "center", fontSize: 13.5, color: "var(--text-secondary)", marginTop: 22 }}>
          Sudah punya akun?{" "}
          <Link to="/login" style={{ color: "var(--primary-dark)", fontWeight: 700 }}>
            Masuk
          </Link>
        </p>
      </div>
    </div>
  );
}
