import "./Gallery.css";

const Gallery = ({ gallery, mainImage, handleThumbnailClick }) => {
  return (
    <div className="gallery-section">
      <div className="gallery-scroll">
        {gallery.map((img, i) => (
          <img
            key={i}
            src={img}
            loading="lazy" 
            className={`gallery-thumb ${img === mainImage ? "active" : ""}`}
            onClick={() => handleThumbnailClick(img)}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
