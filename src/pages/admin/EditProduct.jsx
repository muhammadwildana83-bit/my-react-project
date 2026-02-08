import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import "./EditProduct.css";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  /* =========================
      STATE FORM
  ========================= */
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imagePreview, setImagePreview] = useState(""); // Untuk nampilin di layar
  const [imageFile, setImageFile] = useState(null);    // Untuk dikirim ke server
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false); // State biar tombol gak diklik 2x

  /* =========================
      FETCH DATA PRODUCT: Ambil data lama
  ========================= */
  useEffect(() => {
    fetch(`https://backend-project-production-6368.up.railway.app/api/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Gagal mengambil data");
        return res.json();
      })
      .then((res) => {
        const productData = res.data;
        setName(productData.name || "");
        setPrice(productData.price ? String(productData.price) : "");
        setDescription(productData.description || "");

        // Set preview awal dengan gambar dari server
        if (productData.image) {
          setImagePreview(`https://backend-project-production-6368.up.railway.app/api/products/${productData.image}`);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        alert("Gagal mengambil data produk");
        navigate("/admin/products"); // Balikin ke list kalau ID salah
      });
  }, [id, navigate]);

  /* =========================
      HANDLE IMAGE CHANGE: Preview Instan
  ========================= */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Bersihkan memory preview lama kalau ada, biar gak berat
      if (imagePreview && imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
      setImagePreview(URL.createObjectURL(file));
    }
  };

  /* =========================
      HANDLE SUBMIT: Update ke Server
  ========================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true); // Mulai loading simpan

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("description", description);

      // LOGIC GAMBAR: 
      // Kalau ada file baru, upload file-nya.
      // Kalau nggak ada, backend biasanya gak perlu dikirimin field image 
      // atau kirim path lamanya aja (tergantung setup backend-mu).
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "PUT",
        body: formData, // Biarkan browser yang set Content-Type secara otomatis
      });

      if (!res.ok) throw new Error("Update failed");

      alert("Produk berhasil diperbarui, Bos!");
      navigate("/admin/products");
    } catch (error) {
      console.error(error);
      alert("Waduh, gagal update produk!");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <AdminLayout>
      <div className="edit-loading">Lagi ngambil data produk lama...</div>
    </AdminLayout>
  );

  return (
    <AdminLayout>
      <div className="edit-product-container">
        <header className="edit-header">
          <h1>Edit Detail Produk</h1>
          <p>ID: {id}</p>
        </header>

        <form className="edit-form" onSubmit={handleSubmit}>
          {/* SECTION GAMBAR */}
          <div className="image-section">
            <label>Foto Produk</label>
            <div className="preview-wrapper">
              <img src={imagePreview || "/img/default.png"} alt="Preview" />
            </div>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageChange}
              id="file-input"
            />
            <label htmlFor="file-input" className="file-label">
              <i className="fa-solid fa-camera"></i> Ganti Foto
            </label>
          </div>

          {/* SECTION INPUT DATA */}
          <div className="input-section">
            <label>Nama Produk</label>
            <input
              type="text"
              placeholder="Contoh: Kopi Gula Aren"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label>Harga (Rp)</label>
            <input
              type="number"
              placeholder="Contoh: 15000"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />

            <label>Deskripsi Produk</label>
            <textarea
              placeholder="Jelaskan detail produknya di sini..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="5"
            />
          </div>

          <div className="edit-actions">
            <button 
              type="button" 
              className="btn-back" 
              onClick={() => navigate(-1)}
            >
              Batal
            </button>
            <button 
              type="submit" 
              className="btn-save" 
              disabled={saving}
            >
              {saving ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}