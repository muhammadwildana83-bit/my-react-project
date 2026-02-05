/* =====================================================
  ADD PRODUCT PAGE
  Halaman admin untuk menambah produk baru
====================================================== */
import { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import "./AddProduct.css";

/* =========================
  FUNGSI UTAMA HALAMAN ADD PRODUCT
  Menyimpan data produk baru ke server
========================= */
export default function AddProduct() {
  /* =========================
      STATE UNTUK FORM PRODUK
    ========================= */
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  /* =========================
       CLEANUP PREVIEW GAMBAR SAAT UNMOUNT
    ========================= */
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  /* =========================
       HANDLE SUBMIT FORM PRODUK
    ========================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("image", image);

      await fetch("http://localhost:5000/api/products", {
        method: "POST",
        body: formData,
      });

      alert("Produk berhasil ditambahkan!");

      setName("");
      setPrice("");
      setDescription("");
      setImage(null);
    } catch (error) {
      alert("Gagal menambahkan produk");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
       RENDER FORM TAMBAH PRODUK
    ========================= */
  return (
    <AdminLayout>
      <div className="admin-page">
        <form onSubmit={handleSubmit} className="admin-form">
          <h1>Tambah Produk</h1>

          {/* Input Nama Produk */}
          <input
            placeholder="Nama produk"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          {/* Input Harga Produk */}
          <input
            type="number"
            placeholder="Harga"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />

          {/* Input Deskripsi Produk */}
          <textarea
            placeholder="Deskripsi"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {/* Input Gambar Produk */}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              setImage(file);
              setPreview(URL.createObjectURL(file));
            }}
            required
          />

          {/* Preview Gambar Produk */}
          {preview && (
            <img
              src={preview}
              alt="preview"
              style={{
                width: "220px",
                marginTop: "10px",
                borderRadius: "8px",
                objectFit: "cover",
                border: "1px solid #ddd",
              }}
            />
          )}

          {/* Tombol Submit */}
          <button type="submit" disabled={loading}>
            {loading ? "Menyimpan..." : "Tambah Produk"}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}
