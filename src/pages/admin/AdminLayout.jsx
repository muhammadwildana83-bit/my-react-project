// Komponen ini sudah dipindahkan ke components/admin
import AdminSidebar from "../../components/admin/AdminSidebar";

export default function AdminLayout({ children }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <AdminSidebar />

      <main style={{ flex: 1, padding: "24px" }}>
        {children}
      </main>
    </div>
  );
}
