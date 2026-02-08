import "./Gallery.css";

/**
 * Komponen Gallery
 * @param {Array} gallery - Array berisi URL gambar
 * @param {String} mainImage - URL gambar yang sedang aktif di MainImage
 * @param {Function} handleThumbnailClick - Fungsi untuk mengubah gambar utama
 */
const Gallery = ({ gallery, mainImage, handleThumbnailClick }) => {
  // Jika gallery kosong, jangan tampilkan apa-apa
  if (!gallery || gallery.length === 0) return null;

  return (
    <div className="gallery-section">
      <div className="gallery-scroll">
        {gallery.map((img, i) => (
          <div 
            key={i}
            className={`gallery-thumb-wrapper ${img === mainImage ? "active" : ""}`}
            onClick={() => handleThumbnailClick(img)}
          >
            <img
              src={img}
              alt={`Thumbnail ${i + 1}`}
              loading="lazy" 
              className="gallery-thumb-img"
            />
            {/* Overlay tipis kalau lagi aktif biar makin cakep */}
            {img === mainImage && <div className="thumb-overlay"></div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;