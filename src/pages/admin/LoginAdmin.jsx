import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

 const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        email: email.trim(), 
        password: password 
      }),
    });

    const resData = await response.json();
    
    // Log ini buat kita mastiin tokennya masuk
    console.log("Cek Token di Sini:", resData.token);

    // LOGIKA BARU: Gak usah pake 'resData.success' lagi
    // Cukup cek: Apakah resData punya properti token?
    if (resData && resData.token) {
      // 1. Simpan kuncinya
      localStorage.setItem("adminToken", resData.token);
      
      // 2. Kasih tau user
      alert("AKHIRNYA! Login Berhasil, Bos.");
      
      // 3. Pindah halaman (pake window.location biar router-nya refresh)
      window.location.href = "/admin/products";
    } else {
      // Kalau beneran gak ada token di dalem resData
      alert(resData.message || "Email atau Password salah!");
    }
  } catch (error) {
    console.error("Error Login:", error);
    alert("Koneksi ke server bermasalah!");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <h1>Admin Panel</h1>
          <p>Silakan login untuk mengelola produk font kamu.</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="admin@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? "Logging in..." : "Login Sekarang"}
          </button>
        </form>
        
        <div className="login-footer">
          <button onClick={() => navigate("/")} className="btn-back">
            ← Kembali ke Toko
          </button>
        </div>
      </div>
    </div>
  );
}