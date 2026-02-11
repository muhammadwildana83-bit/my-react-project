import React from 'react';
import './Gallery.css';

const Gallery = ({ gallery, mainImage, handleThumbnailClick }) => {
  // Fungsi pembantu untuk membajak URL (sama seperti di MainImage)
  const getFullUrl = (path) => {
    if (!path) return "https://placehold.co/100x100?text=No+Image";
    if (path.startsWith("http")) {
      // Jika ada link railway, kita arahkan ke localhost
      if (path.includes("railway.app")) {
        const parts = path.split("/uploads/");
        return `http://localhost:5000/uploads/${parts[1]}`;
      }
      return path;
    }
    return `http://localhost:5000/${path.startsWith("/") ? path.substring(1) : path}`;
  };

  if (!gallery || gallery.length === 0) return null;

 // ... kode di atas tetap sama ...

 return (
  <div className="product-gallery-section">
    <div className="gallery-scroll-container">
      {gallery.map((img, index) => {
        const fullImageUrl = getFullUrl(img);
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
            />
          </div>
        );
      })}
    </div>
  </div>
);
};
export default Gallery;