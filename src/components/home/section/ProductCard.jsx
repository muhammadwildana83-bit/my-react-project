import { Link } from "react-router-dom";
import "./ProductCard.css";
import { useCart } from "../../../context/CartContext";

export default function ProductCard({
  product,
  setNotifMessage,
  setShowNotif,
}) {
  const { addToCart } = useCart();
  return (
    <div className="product-card">
      <div className="image-wrapper">
        <Link to={`/product/${product.id}`} className="product-link">
         <img src={product.mainImg || product.img || '/img/default.png'} alt={product.name} />
        </Link>

        <div className="hover-icons">
          <span className="hover-name">{product.name}</span>

          <button
            className="icon-btn"
            onClick={(e) => {
              e.stopPropagation();
              setNotifMessage("Disukai");
              setShowNotif(true);
              setTimeout(() => setShowNotif(false), 1200);
            }}
          >
            <i className="fa-regular fa-heart"></i>
          </button>

          <button
            className="icon-btn"
            onClick={(e) => {
              e.stopPropagation();
              setNotifMessage("Tersimpan");
              setShowNotif(true);
              setTimeout(() => setShowNotif(false), 1200);
            }}
          >
            <i className="fa-regular fa-bookmark"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
