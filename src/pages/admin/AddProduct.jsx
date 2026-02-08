/* ... import lainnya tetap sama ... */

export default function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("image", image);

      // Ambil token dari localStorage (Pastikan kamu simpan token pas login)
      const token = localStorage.getItem("token");

      const response = await fetch("https://backend-project-production-6368.up.railway.app/api/products", {
        method: "POST",
        headers: {
          // Tambahkan Authorization jika backend kamu butuh login
          "Authorization": `Bearer ${token}`
        },
        body: formData,
      });

      if (response.ok) {
        alert("Produk berhasil ditambahkan!");
        // --- RESET SEMUA STATE ---
        setName("");
        setPrice("");
        setDescription("");
        setImage(null);
        setPreview(null); // Ini penting supaya preview hilang setelah sukses
      } else {
        const errorData = await response.json();
        alert(`Gagal: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Gagal menghubungi server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="admin-page">
        <form onSubmit={handleSubmit} className="admin-form">
          <h1>Tambah Produk</h1>

          <input
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

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setImage(file);
                setPreview(URL.createObjectURL(file)); // Membuat link sementara buat dilihat di browser
              }
            }}
            required
          />

          {/* Preview ini HANYA untuk melihat sebelum diupload */}
          {preview && (
            <div className="preview-container">
               <p>Preview Gambar:</p>
               <img src={preview} alt="preview" style={{ width: "220px", borderRadius: "8px" }} />
            </div>
          )}

          <button type="submit" disabled={loading}>
            {loading ? "Sedang Menyimpan..." : "Tambah Produk"}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}