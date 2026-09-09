import React from "react";
import "./Gallery.css";

// Base backend TANPA /api (khusus file & image)
const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL ||
  "http://localhost:5000"; // Ganti dengan URL backend Anda

const buildImageUrl = (path) => {
  if (!path) return "http://placehold.co/100x100?text=No+Image";

  // normalisasi slash (Windows fix)
  let cleanPath = path.replace(/\\/g, "/");

  // kalau sudah full URL (Cloudinary, dll)
  if (cleanPath.startsWith("http")) {
    return cleanPath;
  }

  // buang prefix uploads kalau sudah ada
  if (cleanPath.startsWith("uploads/")) {
    return `${BACKEND_URL}/${cleanPath}`;
  }

  // nama file saja → masuk ke uploads
  return `${BACKEND_URL}/uploads/${cleanPath}`;
};

const Gallery = ({ gallery = [], mainImage, handleThumbnailClick }) => {
  if (!gallery.length) return null;

  const activeImage = buildImageUrl(mainImage);

  return (
    <div className="product-gallery-section">
      <div className="gallery-scroll-container">
        {gallery.map((img, index) => {
          const fullUrl = buildImageUrl(img);
          const isActive = fullUrl === activeImage;

          return (
            <div
              key={index}
              className={`gallery-item ${isActive ? "active" : ""} clay`}
              onClick={() => handleThumbnailClick(fullUrl)}
            >
              <img
                src={fullUrl}
                alt={`Gallery ${index + 1}`}
                className="gallery-img-thumb"
                onError={(e) => {
                  e.currentTarget.src =
                    "http://placehold.co/100x100?text=Error";
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Gallery;
