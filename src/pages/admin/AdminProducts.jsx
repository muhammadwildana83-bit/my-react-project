
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminProducts.css";

export default function AdminProducts() {
  // Inisialisasi navigasi
  const navigate = useNavigate();

  /* =========================
      STATE MANAGEMENT
  ========================= */
  // State utama untuk produk, loading, konfirmasi hapus, dan status hapus
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmId, setConfirmId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  /* =====================================================
      FETCH DATA: Ambil daftar produk dari Backend
  ====================================================== */
  useEffect(() => {
    // Ambil data produk dari backend saat komponen mount
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        const resData = await response.json();

        if (resData.success && Array.isArray(resData.data)) {
          setProducts(resData.data);
        }
      } catch (err) {
        console.error("Gagal ambil data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  /* =====================================================
      HELPER: Handle URL Gambar agar tidak broken
  ====================================================== */
  // Helper untuk memastikan URL gambar valid
 /* =====================================================
      HELPER: Handle URL Gambar agar tidak broken
  ====================================================== */
  const getImageUrl = (image) => {
    const BASE_URL = "http://localhost:5000";
    
    if (!image) return "/img/default.png";

    // Jika di database isinya link localhost, ganti paksa ke Railway
    if (image.includes("localhost:5000")) {
      return image.replace("http://localhost:5000", BASE_URL);
    }

    // Jika sudah link internet (http/https), langsung pakai
    if (image.startsWith("http")) return image;

    // Jika cuma path folder (uploads/xxx.jpg), gabungkan dengan BASE_URL
    const cleanPath = image.startsWith("/") ? image.slice(1) : image;
    return `${BASE_URL}/${cleanPath}`;
  };

  /* =====================================================
      FUNGSI HAPUS: Hapus di DB & update tampilan di UI
  ====================================================== */
  // Fungsi untuk menghapus produk dari database dan update UI
  const handleDelete = async () => {
    if (!confirmId) return;

    setDeleting(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/products/${confirmId}`,
        {
          method: "DELETE",
          // headers: { "Authorization": `Bearer ${localStorage.getItem("adminToken")}` } // Jika butuh token
        },
      );

      if (!response.ok) throw new Error("Gagal menghapus di server");

      // Update UI: Buang produk yang dihapus dari list
      setProducts((prev) => prev.filter((p) => p._id !== confirmId));

      setConfirmId(null);
      alert("Produk berhasil dihapus, Bos!");
    } catch (error) {
      console.error("Error Hapus:", error);
      alert("Waduh, gagal hapus produk!");
    } finally {
      setDeleting(false);
    }
  };

  // Loading state
  if (loading)
    return (
      <div className="admin-loading">Sabar ya Bos, lagi ambil data...</div>
    );

  // Render utama halaman admin produk
return (
    <div className="admin-products">
      {/* Top Header */}
      <div className="admin-header">
        <div className="header-title">
          <h1>Daftar Produk</h1>
          <p className="header-subtitle">
            Kelola katalog barang toko kamu di sini ({products.length} Total Produk)
          </p>
        </div>
        <button 
          className="add-product-btn"
          onClick={() => navigate("/admin/add-product")}
        >
          <i className="fa-solid fa-plus"></i>
          <span>Tambah Produk</span>
        </button>
      </div>

      {/* Action Bar / Quick Search */}
      <div className="table-toolbar">
        <div className="search-box">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="Cari nama produk..." />
        </div>
      </div>

      {/* Main Data Table */}
      <div className="table-card">
        {products.length > 0 ? (
          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>FOTO</th>
                  <th>NAMA PRODUK</th>
                  <th>HARGA</th>
                  <th>AKSI</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    {/* Thumbnail */}
                    <td>
                      <div className="img-wrapper">
                        <img
                          src={getImageUrl(product.image)}
                          alt={product.name}
                          className="product-img-thumb"
                        />
                      </div>
                    </td>

                    {/* Nama */}
                    <td>
                      <span className="product-name">{product.name}</span>
                    </td>

                    {/* Harga */}
                    <td>
                      <span className="product-price">
                        {product.price
                          ? `Rp ${product.price.toLocaleString("id-ID")}`
                          : "Rp 0"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td>
                      <div className="actions">
                        <button
                          className="action-btn edit-btn"
                          title="Edit Produk"
                          onClick={() => navigate(`/admin/edit-product/${product._id}`)}
                        >
                          <i className="fa-solid fa-pen-to-square"></i>
                          <span>Edit</span>
                        </button>
                        <button
                          className="action-btn delete-btn"
                          title="Hapus Produk"
                          onClick={() => setConfirmId(product._id)}
                        >
                          <i className="fa-solid fa-trash-can"></i>
                          <span>Hapus</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            <i className="fa-solid fa-box-open empty-icon"></i>
            <h3>Belum ada produk</h3>
            <p>Mulai tambahkan produk pertama kamu sekarang.</p>
          </div>
        )}
      </div>

      {/* Modal Konfirmasi Hapus */}
      {confirmId && (
        <div className="confirm-overlay">
          <div className="confirm-box">
            <div className="warning-icon">
              <i className="fa-solid fa-triangle-exclamation"></i>
            </div>
            <h3>Hapus Produk Ini?</h3>
            <p>Tindakan ini tidak dapat dibatalkan. Data akan terhapus dari basis data.</p>
            <div className="confirm-actions">
              <button
                className="btn-secondary"
                onClick={() => setConfirmId(null)}
                disabled={deleting}
              >
                Batal
              </button>
              <button
                className="btn-danger"
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? "Menghapus..." : "Ya, Hapus"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}