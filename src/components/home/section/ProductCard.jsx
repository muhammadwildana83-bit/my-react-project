import { Link } from "react-router-dom";
import "./ProductCard.css";

export default function ProductCard({ product, setNotif }) {
  // ================= CONFIG URL =================
  const API_BASE_URL = import.meta.env.VITE_API_URL || "https://backend-project-production-6368.up.railway.app";

  // ================= NOTIFICATION =================
  const showTempNotif = (message) => {
    setNotif({ message, show: true });
    setTimeout(() => setNotif({ message: "", show: false }), 1200);
  };

  // ================= IMAGE LOGIC =================
  const getFullUrl = (path) => {
    if (!path) return "https://placehold.co/400x300?text=No+Image";

    // 1. Bersihkan path dari backslash Windows
    let cleanPath = path.replace(/\\/g, "/");

    // 2. Ambil nama filenya saja jika ada path panjang/lama
    if (cleanPath.includes("/uploads/")) {
      cleanPath = `uploads/${cleanPath.split("/uploads/")[1]}`;
    }

    // 3. Jika sudah URL luar (cloudinary/http), langsung return
    if (cleanPath.startsWith("http") && !cleanPath.includes("localhost")) {
      return cleanPath;
    }

    // 4. Buat Base URL khusus Static Files (Tanpa /api di ujungnya)
    const STATIC_BASE_URL = API_BASE_URL.replace(/\/api$/, "");
    
    // 5. Pastikan tidak ada double slash di awal path
    const finalPath = cleanPath.startsWith("/") ? cleanPath.substring(1) : cleanPath;
    
    return `${STATIC_BASE_URL}/${finalPath}`;
  };

  // --- BARIS KRITIS: Mendefinisikan variabel sebelum di-render ---
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