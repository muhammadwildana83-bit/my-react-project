import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminProducts.css";

export default function AdminProducts() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [confirmId, setConfirmId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const getImageUrl = (image) => {
    if (!image) return "/img/default.png";

    if (image.startsWith("http")) return image;

    return `http://localhost:5000/${image}`;
  };

  const handleDelete = async () => {
    if (!confirmId) return;

    setDeleting(true);

    try {
      await fetch(`http://localhost:5000/products/${confirmId}`, {
        method: "DELETE",
      });

      /* =====================================================
         ADMIN PRODUCTS PAGE
         Halaman admin untuk melihat, mengedit, dan menghapus produk
      ====================================================== */
      setProducts((prev) => prev.filter((p) => p._id !== confirmId));
    } catch {
      alert("Gagal menghapus produk");
    } finally {
      setDeleting(false);
      /* =========================
           FUNGSI UTAMA HALAMAN ADMIN PRODUCTS
           Menampilkan daftar produk, mengedit, dan menghapus produk
      ========================= */
      setConfirmId(null);
    }
  };

  if (loading) return <p style={{ padding: 40 }}>Loading...</p>;

  return (
    <div className="admin-products">
      <h1>Daftar Produk</h1>

      <div className="product-table">
        <div className="table-head">
          <span>Gambar</span>
          <span>Nama</span>
          <span>Harga</span>
          <span>Aksi</span>
        </div>

        {products.map((product) => (
          <div className="table-row" key={product._id}>
            <img
              src={getImageUrl(product.image)}
              alt={product.name}
              width="60"
              height="60"
              style={{
                borderRadius: "6px",
                objectFit: "cover",
              }}
            />

            <span>{product.name}</span>

            <span>Rp {product.price.toLocaleString()}</span>

            <span className="actions">
              <button
                className="edit"
                onClick={() => navigate(`/admin/edit-product/${product._id}`)} // Sederhanakan navigasi
              >
                Edit
              </button>

              <button
                className="delete"
                onClick={() => setConfirmId(product._id)}
              >
                Hapus
              </button>
            </span>
          </div>
        ))}
      </div>

      {confirmId && (
        <div className="confirm-overlay">
          <div className="confirm-box">
            <h3>Hapus produk?</h3>
            <p>Tindakan ini tidak bisa dibatalkan.</p>

            <div className="confirm-actions">
              <button onClick={() => setConfirmId(null)}>Batal</button>

              <button
                className="danger"
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? "Menghapus..." : "Ya, hapus"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
