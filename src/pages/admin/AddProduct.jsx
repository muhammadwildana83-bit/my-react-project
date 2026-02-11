import { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import "./AddProduct.css";

export default function AddProduct() {
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

    // Bikin preview buat semua foto gallery yang dipilih
    const previews = files.map((file) => URL.createObjectURL(file));
    setGalleryPreviews(previews);
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    
    // Foto Utama
    if (image) formData.append("image", image);

    // Gallery
    galleryFiles.forEach((file) => {
      formData.append("gallery", file);
    });

    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:5000/api/products", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`
        // PENTING: Jangan set 'Content-Type' manual kalau pakai FormData
      },
      body: formData,
    });

    // Cek apakah responnya JSON atau HTML error
    const contentType = response.headers.get("content-type");
    
    if (contentType && contentType.includes("application/json")) {
      const result = await response.json();
      if (response.ok) {
        alert("Produk Berhasil Disimpan!");
        // Reset state di sini...
      } else {
        alert("Gagal: " + result.message);
      }
    } else {
      // Jika server ngirim HTML (Error 500)
      const errorHTML = await response.text();
      console.error("Server Error HTML:", errorHTML);
      alert("Backend Error (500). Cek LOGS di Dashboard Railway kamu!");
    }

  } catch (error) {
    console.error("Error Koneksi:", error);
    alert("Gagal menghubungi server. Pastikan internet aman.");
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

          {/* UPLOAD FOTO UTAMA */}
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

          {/* UPLOAD GALLERY */}
          <div className="upload-section">
            <label>Gallery Foto Tambahan (Bisa pilih banyak)</label>
            <input
              type="file"
              accept="image/*"
              multiple // INI KUNCINYA
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
            {loading ? "Sedang Menyimpan..." : "Publish Produk"}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}