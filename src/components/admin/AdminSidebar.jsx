import { NavLink, Link } from "react-router-dom";
import "./AdminSidebar.css";

export default function AdminSidebar() {
  const handleLogout = () => {
    if (window.confirm("Yakin ingin keluar, Bos?")) {
      localStorage.removeItem("adminToken");
      window.location.href = "/admin/login";
    }
  };

  return (
    <aside className="admin-sidebar">
      {/* Header Sidebar */}
      <div className="sidebar-top">
        <div className="sidebar-brand">
          <div className="brand-icon">
            <i className="fa-solid fa-shield-halved"></i>
          </div>
          <div className="brand-info">
            <h2 className="sidebar-title">Admin Panel</h2>
            <span className="admin-status">
              <span className="status-dot"></span> Online
            </span>
          </div>
        </div>

        {/* Navigasi Utama */}
        <nav className="sidebar-nav">
          <span className="nav-group-title">CATALOG</span>
          
          <NavLink to="/admin/products" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
            <i className="fa-solid fa-box-archive"></i>
            <span>Products</span>
          </NavLink>

          <NavLink to="/admin/add-product" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
            <i className="fa-solid fa-plus-circle"></i>
            <span>Add Product</span>
          </NavLink>

          <div className="sidebar-divider"></div>

          <span className="nav-group-title">CONTENT</span>

          <NavLink to="/admin/blogs" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
            <i className="fa-solid fa-newspaper"></i>
            <span>Blogs</span>
          </NavLink>

          <NavLink to="/admin/add-blog" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
            <i className="fa-solid fa-pen-to-square"></i>
            <span>Add Blog</span>
          </NavLink>

          <div className="sidebar-divider"></div>

          <Link to="/" className="nav-link shop-link">
            <i className="fa-solid fa-arrow-left-long"></i>
            <span>Back to Store</span>
          </Link>
        </nav>
      </div>

      {/* Footer Sidebar / Logout */}
      <div className="sidebar-bottom">
        <button onClick={handleLogout} className="btn-logout">
          <i className="fa-solid fa-right-from-bracket"></i>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}