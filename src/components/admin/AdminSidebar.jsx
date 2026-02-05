/* =====================================================
   ADMIN SIDEBAR COMPONENT
   Sidebar navigasi untuk halaman admin
====================================================== */
import { Link } from "react-router-dom";

/* =========================
   FUNGSI UTAMA SIDEBAR ADMIN
   Menampilkan menu navigasi admin
========================= */
export default function AdminSidebar() {
  /* =========================
     RENDER SIDEBAR ADMIN
  ========================= */
  return (
    <aside
      style={{
        width: "220px",
        background: "#111",
        color: "#fff",
        padding: "24px",
      }}
    >
      <h2 style={{ marginBottom: "32px" }}>Admin</h2>
      {/* Navigasi Menu Admin */}
      <nav style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <Link to="/admin/products" style={{ color: "#fff" }}>
          Products
        </Link>
        <Link to="/admin/add-product" style={{ color: "#fff" }}>
          Add Product
        </Link>
      </nav>
    </aside>
  );
}
