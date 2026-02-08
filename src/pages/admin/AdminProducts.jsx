
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
        const response = await fetch("https://backend-project-production-6368.up.railway.app/api/products");
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
  const getImageUrl = (image) => {
    if (!image) return "/img/default.png";
    if (image.startsWith("http")) return image;
    return `http://localhost:5000/${image}`;
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
        `https://backend-project-production-6368.up.railway.app/api/products/${confirmId}`,
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
      {/* Header Dashboard Produk */}
      <div className="admin-header">
        <h1>Dashboard Produk</h1>
      </div>

      {/* Tabel Produk */}
      <div className="product-table">
        <div className="table-head">
          <span>Produk</span>
          <span>Nama</span>
          <span>Harga</span>
          <span>Aksi</span>
        </div>

        {products.length > 0 ? (
          products.map((product) => (
            <div className="table-row" key={product._id}>
              <img
                src={getImageUrl(product.image)}
                alt={product.name}
                className="product-img-thumb"
              />
              <span className="product-name">{product.name}</span>
              <span className="product-price">
                {product.price
                  ? `Rp ${product.price.toLocaleString()}`
                  : "Rp 0"}
              </span>

              <div className="actions">
                <button
                  className="edit-btn"
                  onClick={() => navigate(`/admin/edit-product/${product._id}`)}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => setConfirmId(product._id)}
                >
                  Hapus
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-data">Belum ada produk nih. Ayo tambah dulu!</div>
        )}
      </div>

      {/* Modal Konfirmasi Hapus Produk */}
      {confirmId && (
        <div className="confirm-overlay">
          <div className="confirm-box">
            <h3>Hapus Produk?</h3>
            <p>Data bakal hilang selamanya loh, yakin?</p>
            <div className="confirm-actions">
              <button
                className="cancel-btn"
                onClick={() => setConfirmId(null)}
                disabled={deleting}
              >
                Batal
              </button>
              <button
                className="danger-btn"
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? "Lagi Hapus..." : "Ya, Hapus!"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
