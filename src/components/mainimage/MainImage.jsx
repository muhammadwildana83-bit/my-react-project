import "./MainImage.css";

// Kita buat fungsi pembantu yang bisa di-export supaya bisa dipakai di tempat lain
export const getFullUrl = (path) => {
  if (!path) return "https://placehold.co/500x500?text=No+Image";

  // Jika ada domain Railway (data lama), paksa balik ke localhost
  if (typeof path === 'string' && path.includes("railway.app")) {
    const parts = path.split("/uploads/");
    return `http://localhost:5000/uploads/${parts[1]}`;
  }

  // Jika sudah http, pakai langsung
  if (path.startsWith("http")) return path;

  // Jika path mentah
  const BASE_URL = "http://localhost:5000";
  const cleanPath = path.startsWith("/") ? path.substring(1) : path;
  return `${BASE_URL}/${cleanPath}`;
};

const MainImage = ({ mainImage }) => {
  return (
    <div className="main-img-container">
      <img
        src={getFullUrl(mainImage)}
        className="main-img"
        alt="Product"
        style={{ width: '100%', display: 'block' }}
        onError={(e) => {
          e.target.onerror = null; 
          e.target.src = "https://placehold.co/500x500?text=Gambar+Tidak+Ditemukan";
        }}
      />
    </div>
  );
};

export default MainImage;