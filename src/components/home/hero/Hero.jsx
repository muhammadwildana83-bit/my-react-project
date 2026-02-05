/* =====================================================
   HERO COMPONENT
   Komponen hero halaman utama, menampilkan welcome dan login/register
====================================================== */
import { useState } from "react";
import "./Hero.css";
import Register from "../../../pages/Register"; // path sesuai foldermu

/* =========================
   FUNGSI UTAMA HERO
   Menampilkan hero, login, dan register
========================= */
export default function Hero() {
  /* =========================
     STATE UNTUK MODAL DAN FORM LOGIN/REGISTER
  ========================= */
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("login"); // login | register

  // Tampilkan modal login
  const handleStartNow = () => {
    setMode("login");
    setShowForm(true);
  };

  // Tutup modal
  const handleClose = () => setShowForm(false);

  /* =========================
     HANDLE LOGIN USER
  ========================= */
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        alert("Login sukses!");
        setShowForm(false);
        setEmail("");
        setPassword("");
      } else {
        alert(data.message || "Login gagal");
      }
    } catch (err) {
      console.error(err); 
      alert("Server error");
    }
  };

  /* =========================
     RENDER HERO DAN MODAL LOGIN/REGISTER
  ========================= */
  return (
    <section className="hero">
      <div className="hero-content">
        <h2>Welcome to the Galery Aksara Tiga</h2>
        <p>Find Your Font</p>
        <button className="btn" onClick={handleStartNow}>
          Start Now
        </button>
      </div>

      {/* Modal Login/Register */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal">
            {mode === "login" ? (
              <>
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn-primary">Login</button>
                </form>
                <p>
                  Belum punya akun?{" "}
                  <span onClick={() => setMode("register")} className="switch">
                    Register
                  </span>
                </p>
              </>
            ) : (
              <>
                <h2>Register</h2>
                <Register setMode={setMode} setShowForm={setShowForm} />
                <p>
                  Sudah punya akun?{" "}
                  <span onClick={() => setMode("login")} className="switch">
                    Login
                  </span>
                </p>
              </>
            )}
            <button className="btn-secondary close-btn" onClick={handleClose}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
