import React, { useState } from "react";

const CATEGORIES = ["Typography", "Licensing", "Design Tips", "Trends"];

const AddBlog = () => {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "Typography",
    image: "", // Bisa berupa URL string atau hasil upload dari multer/cloudinary
    readTime: "5 min read",
    featured: false,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const slugify = (text) =>
    text
      .toString()
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => {
      if (name === "title") {
        const derivedSlug = slugify(value);
        return {
          ...prev,
          title: value,
          slug: prev.slug === slugify(prev.title) || prev.slug === "" ? derivedSlug : prev.slug,
        };
      }

      return {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Jika pakai auth middleware di backend, jangan lupa tambahkan Authorization header:
          // "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setMessage("✅ Artikel berhasil diterbitkan!");
        // Reset form
        setFormData({
          title: "",
          slug: "",
          excerpt: "",
          content: "",
          category: "Typography",
          image: "",
          readTime: "5 min read",
          featured: false,
        });
      } else {
        setMessage("❌ Gagal membuat artikel: " + result.message);
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Terjadi kesalahan koneksi ke server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto", padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
      <h2>Tambah Artikel Blog Baru</h2>
      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        {/* Judul Artikel */}
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Judul Artikel:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        {/* Ringkasan / Excerpt */}
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Ringkasan (Excerpt):</label>
          <textarea
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            rows="3"
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        {/* Kategori */}
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Kategori:</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px" }}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Slug URL */}
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Slug URL:</label>
          <input
            type="text"
            name="slug"
            placeholder="misal: tips-typografi-modern"
            value={formData.slug}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
          <small style={{ color: "#555" }}>
            Gunakan huruf kecil, angka, dan tanda hubung. Slug akan dipakai di URL detail blog.
          </small>
        </div>

        {/* URL Gambar Thumbnail */}
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>URL Gambar Thumbnail:</label>
          <input
            type="text"
            name="image"
            placeholder="https://images.unsplash.com/..."
            value={formData.image}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        {/* Konten Lengkap / Read More */}
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Konten Lengkap (Read More):</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows="6"
            required
            placeholder="Tulis isi lengkap artikel di sini..."
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        {/* Estimasi Waktu Baca */}
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Waktu Baca:</label>
          <input
            type="text"
            name="readTime"
            value={formData.readTime}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        {/* Featured Story Toggle */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{ cursor: "pointer" }}>
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              style={{ marginRight: "8px" }}
            />
            Jadikan Featured Story (Tampil Paling Atas)?
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "10px 20px",
            backgroundColor: "#1f2937",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          {loading ? "Menyimpan..." : "Publish Artikel"}
        </button>
      </form>
    </div>
  );
};

export default AddBlog;