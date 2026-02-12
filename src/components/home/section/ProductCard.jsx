import { Link } from "react-router-dom";
import "./ProductCard.css";

export default function ProductCard({ product, setNotif }) {
  // ================= CONFIG URL =================
  // Ambil dari .env Vercel, kalau gak ada otomatis pakai URL Railway kamu
  const API_BASE_URL = import.meta.env.VITE_API_URL || "https://backend-project-production-6368.up.railway.app";

  // ================= NOTIFICATION =================
  const showTempNotif = (message) => {
    setNotif({ message, show: true });
    setTimeout(() => setNotif({ message: "", show: false }), 1200);
  };

  // ================= IMAGE LOGIC (FINAL & CLEAN) =================
  const getFullUrl = (path) => {
    if (!path) return "https://placehold.co/400x300?text=No+Image";

    // 1. Bersihkan path dari karakter aneh dan dobel slash
    let cleanPath = path.replace(/\\/g, "/");

    // 2. Jika path mengandung URL lama (localhost atau railway lama), kita ambil nama filenya saja
    if (cleanPath.includes("/uploads/")) {
      const parts = cleanPath.split("/uploads/");
      cleanPath = `uploads/${parts[1]}`;
    }

    // 3. Jika path ternyata URL lengkap (selain localhost), langsung return
    if (cleanPath.startsWith("http") && !cleanPath.includes("localhost")) {
      return cleanPath;
    }

    // 4. Gabungkan dengan Base URL yang bener (Railway/Localhost)
    const finalPath = cleanPath.startsWith("/") ? cleanPath.substring(1) : cleanPath;
    
    // Pastikan pakai HTTPS agar tidak Mixed Content
    return `${API_BASE_URL}/${finalPath}`;
  };

  const finalImageUrl = getFullUrl(product.image || product.mainImage);

  return (
    <div className="product-card">
      <div className="image-wrapper">
        <Link to={`/product/${product._id}`} className="product-link">
          <img 
            src={finalImageUrl} 
            alt={product.name} 
            onError={(e) => { e.target.src = "https://placehold.co/400x300?text=Error+Loading+Image" }}
          />
        </Link>

        <div className="hover-icons">
          <span className="hover-name">{product.name}</span>
          <button
            className="icon-btn"
            onClick={(e) => {
              e.preventDefault();
              showTempNotif("Disukai");
            }}
          >
            <i className="fa-regular fa-heart"></i>
          </button>

          <button
            className="icon-btn"
            onClick={(e) => {
              e.preventDefault();
              showTempNotif("Tersimpan");
            }}
          >
            <i className="fa-regular fa-bookmark"></i>
          </button>
        </div>
      </div>
    </div>
  );
}