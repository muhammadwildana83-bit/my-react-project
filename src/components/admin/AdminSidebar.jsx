import { Link, useNavigate } from "react-router-dom";
import "./AdminSidebar.css";

export default function AdminSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Yakin ingin keluar, Bos?")) {
      // 1. Hapus token dari browser
      localStorage.removeItem("adminToken");
      
      // 2. Tendang balik ke halaman login & refresh state
      window.location.href = "/admin/login";
    }
  };

  return (
    <aside className="admin-sidebar">
      {/* Bagian Atas: Logo dan Navigasi */}
      <div className="sidebar-top">
        <h2 className="sidebar-title">Admin Panel</h2>

        <nav className="sidebar-nav">
          <Link to="/admin/products" className="nav-link">
            <i className="fa-solid fa-box"></i> Products
          </Link>

          <Link to="/admin/add-product" className="nav-link">
            <i className="fa-solid fa-plus"></i> Add Product
          </Link>
          
          <div className="sidebar-divider"></div>
          
          <Link to="/" className="nav-link shop-link">
            <i className="fa-solid fa-arrow-left"></i> Back to Store
          </Link>
        </nav>
      </div>

      {/* Bagian Bawah: Tombol Logout */}
      <button onClick={handleLogout} className="btn-logout">
        Logout
      </button>
    </aside>
  );
}