import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminBlogs.css";

export default function AdminBlogs() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmId, setConfirmId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/blogs");
        const data = await response.json();
        if (data.success && Array.isArray(data.data)) {
          setBlogs(data.data);
        }
      } catch (error) {
        console.error("Gagal mengambil daftar blog:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleDelete = async () => {
    if (!confirmId) return;

    setDeleting(true);
    try {
      // Pastikan kita menghapus menggunakan _id MongoDB jika tersedia.
      const target = blogs.find((b) => b._id === confirmId || b.slug === confirmId);
      const idToDelete = target ? target._id : confirmId;

      const response = await fetch(`http://localhost:5000/api/blogs/${idToDelete}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        // Ambil pesan dari server bila memungkinkan
        let serverMsg = "";
        try {
          const json = await response.json();
          serverMsg = json.message || JSON.stringify(json);
        } catch {
          try {
            serverMsg = await response.text();
          } catch {
            serverMsg = response.statusText || "Unknown error";
          }
        }
        throw new Error(`(${response.status}) ${serverMsg}`);
      }

      setBlogs((prev) => prev.filter((blog) => blog._id !== idToDelete && blog.slug !== idToDelete));
      setConfirmId(null);
      alert("Artikel berhasil dihapus!");
    } catch (error) {
      console.error("Error Hapus Blog:", error);
      alert(`Gagal menghapus artikel blog. ${error.message}`);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return <div className="admin-loading">Memuat daftar blog...</div>;
  }

  return (
    <div className="admin-products">
      <div className="admin-header">
        <div className="header-title">
          <h1>Daftar Blog</h1>
          <p className="header-subtitle">
            Kelola artikel blog kamu di sini ({blogs.length} total artikel)
          </p>
        </div>
        <button className="add-product-btn" onClick={() => navigate("/admin/add-blog")}> 
          <i className="fa-solid fa-plus"></i>
          <span>Tambah Artikel</span>
        </button>
      </div>

      <div className="table-toolbar">
        <div className="search-box">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="Cari judul atau slug..." disabled />
        </div>
      </div>

      <div className="table-card">
        {blogs.length > 0 ? (
          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>JUDUL</th>
                  <th>KATEGORI</th>
                  <th>SLUG</th>
                  <th>AKSI</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog) => {
                  // Gunakan _id untuk backend, dan slug/id untuk preview URL
                  const mongoId = blog._id;
                  const previewPath = blog.slug || blog._id;

                  return (
                    <tr key={mongoId}>
                      <td>
                        <span className="product-name">{blog.title}</span>
                      </td>
                      <td>
                        <span>{blog.category || "-"}</span>
                      </td>
                      <td>
                        <span>{blog.slug || blog._id}</span>
                      </td>
                      <td>
                        <div className="actions">
                          <button
                            className="action-btn edit-btn"
                            title="Lihat Artikel"
                            onClick={() => window.open(`/blog/${previewPath}`, "_blank")}
                          >
                            <i className="fa-solid fa-eye"></i>
                            <span>Preview</span>
                          </button>
                          <button
                            className="action-btn delete-btn"
                            title="Hapus Artikel"
                            onClick={() => setConfirmId(mongoId)}
                          >
                            <i className="fa-solid fa-trash-can"></i>
                            <span>Hapus</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            <i className="fa-solid fa-newspaper empty-icon"></i>
            <h3>Belum ada artikel blog</h3>
            <p>Tambahkan artikel baru melalui panel admin.</p>
          </div>
        )}
      </div>

      {confirmId && (
        <div className="confirm-overlay">
          <div className="confirm-box">
            <div className="warning-icon">
              <i className="fa-solid fa-triangle-exclamation"></i>
            </div>
            <h3>Hapus artikel ini?</h3>
            <p>Tindakan ini tidak dapat dibatalkan. Artikel akan dihapus dari server.</p>
            <div className="confirm-actions">
              <button className="btn-secondary" onClick={() => setConfirmId(null)} disabled={deleting}>
                Batal
              </button>
              <button className="btn-danger" onClick={handleDelete} disabled={deleting}>
                {deleting ? "Menghapus..." : "Ya, Hapus"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}