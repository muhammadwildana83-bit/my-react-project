import { Link } from "react-router-dom";
import "./ProductCard.css";

export default function ProductCard({ product, setNotif }) {
  // ================= NOTIFICATION =================
  const showTempNotif = (message) => {
    setNotif({ message, show: true });
    setTimeout(() => setNotif({ message: "", show: false }), 1200);
  };

  // ================= IMAGE LOGIC (FIXED) =================
  const getFullUrl = (path) => {
    // 1. Cek jika tidak ada path
    if (!path) return "https://placehold.co/400x300?text=No+Image";

    // 2. Jika ada link railway lama di database, arahkan ke localhost
    if (path.includes("railway.app")) {
      const parts = path.split("/uploads/");
      return `http://localhost:5000/uploads/${parts[1]}`;
    }

    // 3. Jika path sudah berupa URL lengkap (tapi bukan railway)
    if (path.startsWith("http")) return path;

    // 4. Jika path adalah path mentah (uploads/xxx.jpg)
    const cleanPath = path.startsWith("/") ? path.substring(1) : path;
    return `http://localhost:5000/${cleanPath}`;
  };

  // Pakai product.image atau product.mainImage (sesuaikan dengan data backend-mu)
  const finalImageUrl = getFullUrl(product.image || product.mainImage);

  return (
    <div className="product-card">
      <div className="image-wrapper">
        <Link to={`/product/${product._id}`} className="product-link">
          {/* GUNAKAN finalImageUrl DI SINI */}
          <img src={finalImageUrl} alt={product.name} />
        </Link>

        {/* ================= HOVER UI ================= */}
        <div className="hover-icons">
          <span className="hover-name">{product.name}</span>
          <button
            className="icon-btn"
            onClick={(e) => {
              e.preventDefault(); // Pakai preventDefault agar Link tidak terpicu
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