import AdminSidebar from "./AdminSidebar";
import "./AdminLayout.css"; // Import CSS-nya di sini

export default function AdminLayout({ children }) {
  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="admin-main-content">
        {children}
      </main>
    </div>
  );
}