import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import "./EditProduct.css";

/* =====================================================
  EDIT PRODUCT PAGE
  Halaman admin untuk mengedit produk
====================================================== */
export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  /* =========================
     STATE FORM
  ========================= */
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(true);

  /* =========================
     FETCH DATA PRODUCT
  ========================= */
  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed fetch");
        return res.json();
      })
      .then((data) => {
        setName(data.name || "");
        setPrice(data.price ? String(data.price) : "");
        setDescription(data.description || "");
        setImagePreview(
          data.image ? `http://localhost:5000/${data.image}` : ""
        );
        setLoading(false);
      })
      .catch(() => {
        alert("Gagal mengambil data produk");
        setLoading(false);
      });
  }, [id]);

  /* =========================
     HANDLE IMAGE CHANGE
  ========================= */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  /* =========================
     HANDLE SUBMIT
  ========================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("description", description);

      if (imageFile) {
        // upload gambar baru
        formData.append("image", imageFile);
      } else {
        // kirim path gambar lama
        const oldPath = imagePreview.replace(
          "http://localhost:5000/",
          ""
        );
        formData.append("image", oldPath);
      }

      const res = await fetch(
        `http://localhost:5000/api/products/${id}`,
        {
          method: "PUT",
          body: formData, // JANGAN set Content-Type
        }
      );

      if (!res.ok) throw new Error("Update failed");

      alert("Produk berhasil diupdate!");
      navigate("/admin/products");
    } catch (error) {
      alert("Terjadi kesalahan saat update produk");
    }
  };

  /* =========================
     LOADING STATE
  ========================= */
  if (loading) return <p>Loading...</p>;

  /* =========================
     RENDER
  ========================= */
  return (
    <AdminLayout>
      <div className="edit-product-container">
        <h1>Edit Produk</h1>

        <form className="edit-form" onSubmit={handleSubmit}>
          <div className="image-section">
            <img
              src={imagePreview || "/img/default.png"}
              alt="Preview"
            />

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          <input
            type="text"
            placeholder="Nama produk"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Harga"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />

          <textarea
            placeholder="Deskripsi"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="actions">
            <button type="button" onClick={() => navigate(-1)}>
              Batal
            </button>
            <button type="submit">Simpan</button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
