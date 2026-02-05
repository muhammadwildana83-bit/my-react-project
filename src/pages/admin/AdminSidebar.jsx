// Komponen ini sudah dipindahkan ke components/admin
import { Link } from "react-router-dom";

export default function AdminSidebar() {
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
