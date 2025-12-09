import "./MainImage.css";

const MainImage = ({ mainImage, imgLoaded, handleImageLoad }) => {
  return (
    <div className="main-img-container">
      {!imgLoaded && (
        <div className="img-skeleton-loader">
          <i className="fa-solid fa-image"></i>
          <span>Loading...</span>
        </div>
      )}

      <img
        src={mainImage}
        className="main-img"
        alt="Product"
        style={{ opacity: imgLoaded ? 1 : 0 }}
        onLoad={handleImageLoad}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/placeholder.png";
          handleImageLoad();
        }}
      />
    </div>
  );
};

export default MainImage;
