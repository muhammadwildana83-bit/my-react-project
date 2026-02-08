import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; 

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

 const handleRegister = async (e) => {
  e.preventDefault();
  
  // 1. Alert pembuktian (biarkan dulu untuk tes)
  alert("SAYA SEDANG MENGEDIT FILE DI FOLDER ADMIN!");

  setLoading(true);

  try {
    const response = await fetch("https://backend-project-production-6368.up.railway.app/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    // Kita ambil datanya tapi TIDAK usah di-alert
    const result = await response.json();

    if (response.ok) {
      // 2. Alert sukses tanpa variabel apapun!
      alert("PENDAFTARAN SELESAI! Silakan Login.");
      navigate("/admin/login");
    } else {
      // 3. Jika gagal, tampilkan pesan dari server (misal: "Email already used")
      alert(result.message || "Gagal mendaftar");
    }
  } catch (error) {
    alert("Koneksi ke server gagal!");
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <h1>Create Admin Account</h1>
          <p>Daftarkan akun admin baru untuk toko font kamu.</p>
        </div>

        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="new-admin@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Minimal 6 karakter"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? "Memproses..." : "Daftar Sekarang"}
          </button>
        </form>
        
        <div className="login-footer">
          <p style={{fontSize: '14px', color: '#777'}}>Sudah punya akun?</p>
          <button onClick={() => navigate("/admin/login")} className="btn-back">
            Login di sini
          </button>
        </div>
      </div>
    </div>
  );
}