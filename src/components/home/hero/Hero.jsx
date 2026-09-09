/* =====================================================
   HERO COMPONENT
   Komponen hero halaman utama, menampilkan welcome dan login/register
====================================================== */
import { useState } from "react";
import "./Hero.css";
import RegisterUser from "../../../pages/RegisterUser"; // Komponen form register user biasa

/* =========================
   HERO UTAMA
========================= */
export default function Hero() {
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("login"); // login | register

  const handleStartNow = () => {
    setMode("login");
    setShowForm(true);
  };

  const handleClose = () => setShowForm(false);

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

  return (
    <section className="hero">
      <div className="hero-inner">
        <div className="hero-copy">
          <span className="hero-chip">Aksara Tiga Studio</span>
          <h2>Modern type, refined design, and bold product storytelling.</h2>
          <p>
            Discover curated fonts and premium layouts made for creative brands, digital shops, and strong visual impact.
          </p>
          <div className="hero-actions">
            <button className="btn-start" onClick={handleStartNow}>
              Start Now <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>

        <div className="hero-panel">
          <div className="hero-highlight">
            <div className="hero-highlight-top">
              <span>Featured</span>
              <span>#01</span>
            </div>
            <h3>Minimal Font Suite</h3>
            <p>Perfect for branding, editorial layouts, and bold product headlines.</p>
            <div className="hero-highlight-meta">
              <div>
                <strong>30+</strong>
                <span>Styles</span>
              </div>
              <div>
                <strong>24</strong>
                <span>Templates</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="modal-overlay" onClick={handleClose}>
          <div className="modal glass" onClick={(e) => e.stopPropagation()}>
            <button className="close-x" onClick={handleClose}>
              &times;
            </button>

            <div className="modal-header">
              <h2>{mode === "login" ? "Welcome Back" : "Join Us"}</h2>
              <p>{mode === "login" ? "Login to your account" : "Create your account today"}</p>
            </div>

            {mode === "login" ? (
              <form onSubmit={handleLogin} className="auth-form">
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    placeholder="name@example.com"
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
                <button type="submit" className="btn-auth">
                  Login
                </button>
              </form>
            ) : (
              <RegisterUser setMode={setMode} setShowForm={setShowForm} />
            )}

            <div className="modal-footer">
              <p>
                {mode === "login" ? "Don’t have an account?" : "Already have an account?"}{" "}
                <span onClick={() => setMode(mode === "login" ? "register" : "login")} className="switch">
                  {mode === "login" ? "Register Now" : "Login here"}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
