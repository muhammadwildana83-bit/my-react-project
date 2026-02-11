import { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import "./AddProduct.css";

export default function AddProduct() {
  // Ambil URL API dari Environment Variable
  const API_URL = import.meta.env.VITE_API_URL;

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  
  // State Foto Utama
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // State Gallery (Banyak Foto)
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [galleryPreviews, setGalleryPreviews] = useState([]);

  const [loading, setLoading] = useState(false);

  // Cleanup memory untuk URL preview biar gak leak
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
      galleryPreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [preview, galleryPreviews]);

  // Handler Gallery
  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    setGalleryFiles(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setGalleryPreviews(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // LOG UNTUK DEBUG (Bisa dihapus nanti)
    console.log("Menghubungi API ke:", `${API_URL}/products`);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("description", description);
      
      if (image) formData.append("image", image);

      galleryFiles.forEach((file) => {
        formData.append("gallery", file);
      });

      const token = localStorage.getItem("token");

      // SEKARANG SUDAH PAKAI API_URL DINAMIS
      const response = await fetch(`${API_URL}/products`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: formData,
      });

      const contentType = response.headers.get("content-type");
      
      if (contentType && contentType.includes("application/json")) {
        const result = await response.json();
        if (response.ok) {
          alert("Produk Berhasil Disimpan, Mantap Bos!");
          // Reset Form
          setName("");
          setPrice("");
          setDescription("");
          setImage(null);
          setPreview(null);
          setGalleryFiles([]);
          setGalleryPreviews([]);
        } else {
          alert("Gagal Simpan: " + result.message);
        }
      } else {
        const errorHTML = await response.text();
        console.error("Server Error:", errorHTML);
        alert("Server lagi pusing (500). Cek log Railway!");
      }

    } catch (error) {
      console.error("Error Koneksi:", error);
      alert("Gagal menghubungi server. Cek koneksi internet atau URL API di Vercel.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="admin-page">
        <form onSubmit={handleSubmit} className="admin-form">
          <h1>Tambah Produk Baru</h1>

          <div className="input-group">
            <label>Nama Produk</label>
            <input
              placeholder="Contoh: Aksaratiga Display Typeface"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Harga (IDR)</label>
            <input
              type="number"
              placeholder="Contoh: 150000"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Deskripsi</label>
            <textarea
              placeholder="Jelaskan detail produk..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="upload-section">
            <label>Foto Utama (Thumbnail)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setImage(file);
                  setPreview(URL.createObjectURL(file));
                }
              }}
              required
            />
            {preview && (
              <div className="preview-box">
                <img src={preview} alt="main-preview" />
              </div>
            )}
          </div>

          <div className="upload-section">
            <label>Gallery Foto Tambahan</label>
            <input
              type="file"
              accept="image/*"
              multiple 
              onChange={handleGalleryChange}
            />
            <div className="gallery-preview-grid">
              {galleryPreviews.map((url, index) => (
                <div key={index} className="gallery-preview-item">
                  <img src={url} alt={`gallery-${index}`} />
                </div>
              ))}
            </div>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Sabar, Lagi Upload..." : "Publish Produk"}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}