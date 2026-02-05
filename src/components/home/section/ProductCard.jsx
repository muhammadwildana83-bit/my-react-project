import { Link } from "react-router-dom";
import "./ProductCard.css";

export default function ProductCard({ product, setNotif }) {
  // ================= NOTIFICATION =================
  // Menampilkan notifikasi sementara (like / bookmark)
  const showTempNotif = (message) => {
    setNotif({ message, show: true });
    setTimeout(() => setNotif({ message: "", show: false }), 1200);
  };

  // ================= IMAGE SOURCE =================
  // Image sekarang diambil dari backend
  // product.image = "uploads/xxxxx.jpg"
  const imageUrl = product.image?.startsWith("http")
  ? product.image
  : product.image
  ? `http://localhost:5000/${product.image}`
  : "/img/default.png";


  return (
    <div className="product-card">
      <div className="image-wrapper">
        {/* ================= PRODUCT DETAIL LINK ================= */}
        {/* MongoDB pakai _id, bukan id */}
        <Link to={`/product/${product._id}`} className="product-link">
          <img src={imageUrl} alt={product.name} />
        </Link>

        {/* ================= HOVER UI ================= */}
        <div className="hover-icons">
          <span className="hover-name">{product.name}</span>

          <button
            className="icon-btn"
            onClick={(e) => {
              e.stopPropagation();
              showTempNotif("Disukai");
            }}
          >
            <i className="fa-regular fa-heart"></i>
          </button>

          <button
            className="icon-btn"
            onClick={(e) => {
              e.stopPropagation();
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
