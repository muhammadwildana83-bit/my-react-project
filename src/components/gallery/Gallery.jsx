import React from 'react';
import './Gallery.css';

const Gallery = ({ gallery, mainImage, handleThumbnailClick }) => {
  // Ambil URL Backend secara dinamis (Vercel akan pakai Railway, Local pakai localhost)
  const API_BASE_URL = import.meta.env.VITE_API_URL || "https://backend-project-production-6368.up.railway.app";

  // Fungsi pembantu untuk membersihkan dan membangun URL yang valid
  const getFullUrl = (path) => {
    if (!path) return "https://placehold.co/100x100?text=No+Image";

    // 1. Ganti backslash Windows (\) jadi slash normal (/)
    let cleanPath = path.replace(/\\/g, "/");

    // 2. Jika path mengandung URL lama (localhost/railway lama), ambil nama filenya saja
    if (cleanPath.includes("/uploads/")) {
      const parts = cleanPath.split("/uploads/");
      cleanPath = `uploads/${parts[1]}`;
    }

    // 3. Jika path adalah URL lengkap (selain localhost), gunakan apa adanya
    if (cleanPath.startsWith("http") && !cleanPath.includes("localhost")) {
      return cleanPath;
    }

    // 4. Gabungkan dengan URL Backend yang benar (Pastikan HTTPS)
    const finalPath = cleanPath.startsWith("/") ? cleanPath.substring(1) : cleanPath;
    return `${API_BASE_URL}/${finalPath}`;
  };

  if (!gallery || gallery.length === 0) return null;

  return (
    <div className="product-gallery-section">
      <div className="gallery-scroll-container">
        {gallery.map((img, index) => {
          const fullImageUrl = getFullUrl(img);
          // Bandingkan URL untuk menentukan mana yang sedang aktif
          const isActive = getFullUrl(mainImage) === fullImageUrl;

          return (
            <div
              key={index}
              className={`gallery-item ${isActive ? 'active' : ''}`}
              onClick={() => handleThumbnailClick(fullImageUrl)}
            >
              <img 
                src={fullImageUrl} 
                alt={`Gallery ${index}`} 
                className="gallery-img-thumb" 
                onError={(e) => { e.target.src = "https://placehold.co/100x100?text=Error" }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Gallery;