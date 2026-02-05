/* =====================================================
   REGISTER PAGE
   Komponen untuk registrasi user baru
====================================================== */
import { useState } from "react";

/* =========================
   FUNGSI UTAMA REGISTER
   Menangani form registrasi dan request ke server
========================= */
export default function Register({ setMode, setShowForm }) {
  /* =========================
     STATE UNTUK FORM REGISTRASI
  ========================= */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /* =========================
     HANDLE SUBMIT REGISTER
  ========================= */
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Register sukses, silakan login");
        setMode("login");      // switch ke login
        setShowForm(false);    // tutup modal
        setEmail("");
        setPassword("");
      } else {
        alert(data.message || "Register gagal");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  /* =========================
     RENDER FORM REGISTER
  ========================= */
  return (
    <form onSubmit={handleRegister}>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn-primary">
        Register
      </button>
    </form>
  );
}
