import "./MainImage.css";

const getFullUrl = (path) => {
  if (!path) {
    return "https://placehold.co/500x500?text=No+Image";
  }

  // kalau sudah full URL
  if (path.startsWith("http")) return path;

  const BASE_URL = "http://localhost:5000";

  return `${BASE_URL}/${path}`;
};

const MainImage = ({ mainImage }) => (
  <div className="main-img-container clay">
    <img
      src={getFullUrl(mainImage)}
      className="main-img"
      alt="Product"
      onError={(e) => {
        e.currentTarget.src =
          "https://placehold.co/500x500?text=Image+Not+Found";
      }}
    />
  </div>
);


export default MainImage;
